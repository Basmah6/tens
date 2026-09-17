import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, Volume2, HelpCircle } from 'lucide-react';
import { playEnglishAudio } from '../utils/audio';

interface AITutorModalProps {
  onClose: () => void;
  currentTenseName?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  onClose,
  currentTenseName,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `مرحباً بك! أنا مرشد إتقان الذكي لقواعد وأزمنة اللغة الإنجليزية 🌟.\nمن الأساسيات حتى الطلاقة الكاملة (From basics to fluency — all in one app).\nيمكنك سؤالي عن أي زمن، مثل: "متى أستخدم Present Perfect؟" أو "ما الفرق بين will و going to؟" أو اطلب مني تصحيح وشرح أي جملة. كيف أساعدك الآن؟`,
      timestamp: 'الآن',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'الآن',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg.text,
          currentTense: currentTenseName || 'All English Tenses',
        }),
      });

      if (!response.ok) {
        throw new Error('Tutor server error');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || data.reply || 'عذراً، لم أتمكن من استخراج الإجابة.',
        timestamp: 'الآن',
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Tutor API fallback:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `شكراً لسؤالك! الأزمنة في الإنجليزية تعتمد أساساً على:
1. الفاعل + الفعل المساعد المناسب (do/does, is/am/are, has/have, did, will).
2. التصريف الصحيح للفعل الأساسي (V1 مجرد، V-ing للاستمرار، V2 للماضي البسيط، V3 للأزمنة التامة).
هل تريد مثالاً تطبيقياً على جملة محددة؟`,
        timestamp: 'الآن',
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-2xl h-[560px] max-h-[90vh] flex flex-col text-white shadow-xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#214ecf] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-[#ea9835]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-arabic">
                مرشد إتقان الذكي لقواعد الأزمنة (Itqan AI Tutor)
              </h2>
              <p className="text-xs text-slate-400 font-arabic">
                إجابات تفاعلية وتوضيحات فورية لجميع استفساراتك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5 bg-[#0B1120]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-[#214ecf] text-white'
                  : 'bg-[#1E293B] text-[#ea9835] border border-slate-700'
              }`}>
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#214ecf] text-white rounded-tr-none'
                  : 'bg-[#1E293B] text-slate-200 border border-slate-700 rounded-tl-none font-arabic'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#1E293B] text-[#ea9835] border border-slate-700 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-3 rounded-tl-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#84a5f2] animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-[#84a5f2] animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#84a5f2] animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-3.5 py-2 bg-[#0F172A] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-400 font-arabic shrink-0">أسئلة شائعة:</span>
          {[
            'ما الفرق بين Past Simple و Past Continuous؟',
            'متى نستخدم Have been؟',
            'كيف أصيغ السؤال والنفي في المضارع البسيط؟',
            'أعطني 3 أمثلة حية مع الترجمة',
          ].map((promptText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(promptText)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shrink-0 font-arabic transition disabled:opacity-50"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-800 bg-[#1E293B]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب سؤالك هنا (مثال: ما الفرق بين Past Simple و Past Continuous؟)..."
              className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#214ecf] font-arabic"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-3.5 py-2.5 rounded-lg bg-[#214ecf] hover:bg-[#1a3eb0] text-white disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
