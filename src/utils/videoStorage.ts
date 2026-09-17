/**
 * Video Storage Utility using Browser IndexedDB
 * Allows storing, retrieving, and managing large local video files attached from the user's device.
 */

export interface StoredDeviceVideo {
  tenseId: string;
  fileName: string;
  fileSize: number; // in bytes
  fileType: string;
  blob: Blob;
  uploadedAt: string;
  durationFormatted?: string;
}

const DB_NAME = 'ItqanEnglishVideoDB';
const DB_VERSION = 1;
const STORE_NAME = 'tense_videos';

// Fallback in-memory map for sandboxed environments where IndexedDB might be restricted
const memoryStore = new Map<string, StoredDeviceVideo>();

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'tenseId' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Save a video file selected from the user's device for a specific tense
 */
export async function saveDeviceVideo(
  tenseId: string,
  file: File,
  durationFormatted?: string
): Promise<StoredDeviceVideo> {
  const videoData: StoredDeviceVideo = {
    tenseId,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type || 'video/mp4',
    blob: file,
    uploadedAt: new Date().toISOString(),
    durationFormatted,
  };

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(videoData);

      req.onsuccess = () => resolve(videoData);
      req.onerror = () => {
        // Fallback to memory
        memoryStore.set(tenseId, videoData);
        resolve(videoData);
      };
    });
  } catch {
    memoryStore.set(tenseId, videoData);
    return videoData;
  }
}

/**
 * Retrieve the saved video file for a specific tense
 */
export async function getDeviceVideo(tenseId: string): Promise<StoredDeviceVideo | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(tenseId);

      req.onsuccess = () => {
        const result = req.result as StoredDeviceVideo | undefined;
        if (result && result.blob) {
          resolve(result);
        } else {
          resolve(memoryStore.get(tenseId) || null);
        }
      };

      req.onerror = () => {
        resolve(memoryStore.get(tenseId) || null);
      };
    });
  } catch {
    return memoryStore.get(tenseId) || null;
  }
}

/**
 * Delete a saved video file for a specific tense
 */
export async function deleteDeviceVideo(tenseId: string): Promise<void> {
  memoryStore.delete(tenseId);
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(tenseId);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore error
  }
}

/**
 * Format bytes to readable size (e.g. 15.4 MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
