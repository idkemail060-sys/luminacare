import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { mockDoctors } from '../data/mockData';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Send,
  Sparkles,
  Clock,
  ShieldCheck,
  FileText,
  User,
  MessageSquare,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
}

export const ConsultationPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId?: string }>();
  const { isPremium, appointments } = useApp();
  const navigate = useNavigate();

  // Find appointment or default to Dr. Evelyn Vance
  const appt = appointments.find(a => a.id === appointmentId) || appointments[0];
  const doctor = mockDoctors.find(d => d.name === appt.doctorName) || mockDoctors[0];

  // Call controls state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  // Session Timer: Free = 15 mins (900s), Premium = 45 mins (2700s)
  const totalSeconds = isPremium ? 2700 : 900;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'doctor',
      text: `Hello! I am ${doctor.name}. I am reviewing your consultation notes. How are you feeling today?`,
      time: '10:30 AM'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Timer countdown hook
  useEffect(() => {
    if (callEnded) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCallEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [callEnded]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || callEnded) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'patient',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Doctor Auto-Reply Simulation after 2 seconds
    setTimeout(() => {
      const doctorReply: ChatMessage = {
        id: `m-doc-${Date.now()}`,
        sender: 'doctor',
        text: `Thank you for detailing that. Based on your symptoms, I will issue a digital prescription and recommend routine vitals monitoring.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, doctorReply]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header / Session Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-3">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500/40"
                />
                <div>
                  <h1 className="font-bold text-white text-sm">{doctor.name}</h1>
                  <p className="text-xs text-cyan-400">{doctor.specialization} Teleconsultation</p>
                </div>
              </div>

              {/* Timer badge */}
              <div className="flex items-center gap-3">
                {isPremium ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Gold Premium Session (45 Mins)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                    Standard Session (15 Mins)
                  </span>
                )}

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-cyan-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{formatTimer(secondsLeft)}</span>
                </div>
              </div>
            </div>

            {/* Video Call & Chat Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 8 cols: Large Telehealth Video Stage */}
              <div className="lg:col-span-8 space-y-4">
                <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl h-[420px] sm:h-[480px] flex items-center justify-center">
                  
                  {callEnded ? (
                    <div className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center">
                        <PhoneOff className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Teleconsultation Session Ended</h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Your consultation has been archived. Dr. {doctor.name}’s prescription summary is stored in your medical profile.
                      </p>
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Doctor Video Feed Placeholder */}
                      <img
                        src={doctor.photo}
                        alt="Doctor Stream"
                        className="w-full h-full object-cover filter brightness-90"
                      />

                      {/* Video Overlay Info */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-xs text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold">{doctor.name} (Live HD)</span>
                      </div>

                      {/* Small Patient Self-Camera Inset */}
                      <div className="absolute bottom-16 right-4 w-32 h-24 sm:w-40 sm:h-28 rounded-2xl bg-slate-950 border-2 border-slate-700 overflow-hidden shadow-xl flex items-center justify-center">
                        {isVideoOff ? (
                          <div className="text-slate-500 text-center text-[10px]">
                            <VideoOff className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                            Camera Off
                          </div>
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                            alt="Patient Camera"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Bottom Control Toolbar */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center space-x-3 shadow-2xl">
                        
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`p-3 rounded-xl transition ${
                            isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          }`}
                          title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                        >
                          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => setIsVideoOff(!isVideoOff)}
                          className={`p-3 rounded-xl transition ${
                            isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          }`}
                          title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
                        >
                          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => setCallEnded(true)}
                          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                          title="End Call"
                        >
                          <PhoneOff className="w-5 h-5" />
                          <span className="hidden sm:inline">End Call</span>
                        </button>

                      </div>
                    </>
                  )}

                </div>
              </div>

              {/* Right 4 cols: Encrypted Chat Panel */}
              <div className="lg:col-span-4 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col h-[420px] sm:h-[480px] overflow-hidden">
                
                <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-xs text-white">Clinical Live Chat</h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    HIPAA Encrypted
                  </span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'patient' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                          msg.sender === 'patient'
                            ? 'bg-cyan-600 text-white rounded-br-none'
                            : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={e => setInputMsg(e.target.value)}
                    placeholder={callEnded ? 'Call ended' : 'Type a message to doctor...'}
                    disabled={callEnded}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={callEnded || !inputMsg.trim()}
                    className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
