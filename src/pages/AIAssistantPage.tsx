import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { cannedAIResponses } from '../data/mockData';
import {
  Bot,
  Send,
  Sparkles,
  AlertTriangle,
  User,
  ShieldAlert,
  Zap,
  HelpCircle,
  RefreshCw,
  Info
} from 'lucide-react';

interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  isAdvanced?: boolean;
}

export const AIAssistantPage: React.FC = () => {
  const { isLoggedIn, isPremium } = useApp();
  const [advancedMode, setAdvancedMode] = useState<boolean>(isPremium);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'ai-1',
      sender: 'ai',
      text: 'Hello! I am LuminaCare AI Health Assistant. How can I assist with your symptoms or wellness queries today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'I have a mild fever and body aches',
    'Tips for maintaining healthy blood pressure',
    'How can I improve my sleep quality?',
    'Breathing exercises for sudden anxiety',
    'Heart-healthy diet guidelines'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Response Simulation with realistic delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedKey = 'default';

      if (lower.includes('fever') || lower.includes('temperature') || lower.includes('body ache')) {
        matchedKey = 'fever';
      } else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('head pain')) {
        matchedKey = 'headache';
      } else if (lower.includes('pressure') || lower.includes('bp') || lower.includes('hypertension')) {
        matchedKey = 'blood pressure';
      } else if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('tired')) {
        matchedKey = 'sleep';
      } else if (lower.includes('anxiety') || lower.includes('stress') || lower.includes('panic')) {
        matchedKey = 'anxiety';
      } else if (lower.includes('diet') || lower.includes('food') || lower.includes('nutrition') || lower.includes('cholesterol')) {
        matchedKey = 'diet';
      }

      let aiReplyText = cannedAIResponses[matchedKey];
      if (advancedMode) {
        aiReplyText = `[Advanced Diagnostic Mode] ${aiReplyText} (Clinical Literature Ref: NIH-2026-MED)`;
      }

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdvanced: advancedMode
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-950 flex flex-col justify-between">
          
          <div className="max-w-4xl mx-auto w-full space-y-4 flex-1 flex flex-col">
            
            {/* Header & Mode Switch */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-bold text-white text-base">LuminaCare AI Health Assistant</h1>
                  <p className="text-xs text-slate-400">Intelligent medical preliminary symptom checker</p>
                </div>
              </div>

              {/* Advanced Mode Toggle for Premium Users */}
              {isPremium ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-300">Advanced AI Diagnostics</span>
                  <button
                    onClick={() => setAdvancedMode(!advancedMode)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      advancedMode ? 'bg-amber-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        advancedMode ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  Standard AI Mode (Upgrade to Gold for Clinical Mode)
                </span>
              )}
            </div>

            {/* ALWAYS DISPLAYED MEDICAL DISCLAIMER BANNER */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <p className="leading-relaxed">
                <strong>Medical Disclaimer:</strong> This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or emergency treatment. For severe symptoms, call emergency medical services immediately.
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-cyan-500 hover:text-cyan-300 transition"
                >
                  "{qp}"
                </button>
              ))}
            </div>

            {/* Chat History Box */}
            <div className="flex-1 min-h-[360px] p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 overflow-y-auto">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-teal-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 max-w-[80%]">
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white rounded-tr-none'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.isAdvanced && (
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-1.5 uppercase">
                          Advanced Clinical Insight
                        </span>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 block px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Lumina AI is analyzing symptoms...</span>
                </div>
              )}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about symptoms, blood pressure, medications, diet..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-md"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition disabled:opacity-50 flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};
