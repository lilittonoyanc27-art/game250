import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Volume2, 
  Trophy, 
  RotateCcw, 
  Heart, 
  Star, 
  ThumbsUp, 
  Ghost,
  MessageCircle,
  Zap,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Question {
  id: number;
  sentence: string;
  options: string[];
  correct: string;
  translation: string;
  context: string;
}

// --- Data ---

const QUESTIONS: Question[] = [
  { 
    id: 1, 
    sentence: "Javier ___ español muy bien.", 
    options: ["habla", "dice"], 
    correct: "habla", 
    translation: "Խավիերը շատ լավ է խոսում իսպաներեն:",
    context: "Լեզվով խոսելու մասին է (hablar + idioma)"
  },
  { 
    id: 2, 
    sentence: "¿Qué ___ Javier?", 
    options: ["habla", "dice"], 
    correct: "dice", 
    translation: "Ի՞նչ է ասում Խավիերը:",
    context: "Specific message or words (decir)"
  },
  { 
    id: 3, 
    sentence: "Él siempre ___ la verdad.", 
    options: ["habla", "dice"], 
    correct: "dice", 
    translation: "Նա միշտ ճշմարտությունն է ասում:",
    context: "Content of speech (la verdad, mentiras)"
  },
  { 
    id: 4, 
    sentence: "Javier y yo ___ por teléfono.", 
    options: ["hablamos", "decimos"], 
    correct: "hablamos", 
    translation: "Խավիերը և ես խոսում ենք հեռախոսով:",
    context: "The act of communication (hablar)"
  },
  { 
    id: 5, 
    sentence: "Me gusta ___ contigo.", 
    options: ["hablar", "decir"], 
    correct: "hablar", 
    translation: "Ինձ դուր է գալիս քեզ հետ խոսել:",
    context: "Conversation/Dialogue (hablar)"
  },
  { 
    id: 6, 
    sentence: "Él me ___ 'hola' cada mañana.", 
    options: ["habla", "dice"], 
    correct: "dice", 
    translation: "Նա ինձ «բարև» է ասում ամեն առավոտ:",
    context: "Short expression (decir)"
  },
  { 
    id: 7, 
    sentence: "No ___ tan rápido, por favor.", 
    options: ["hables", "digas"], 
    correct: "hables", 
    translation: "Մի՛ խոսիր այդքան արագ, խնդրում եմ:",
    context: "Manner of speaking (hablar + rápido/lento)"
  },
  { 
    id: 8, 
    sentence: "¿Puedes ___ la hora?", 
    options: ["hablar", "decir"], 
    correct: "decir", 
    translation: "Կարո՞ղ ես ասել ժամը:",
    context: "Giving information (decir)"
  },
  { 
    id: 9, 
    sentence: "Javier ___ sobre sus viajes.", 
    options: ["habla", "dice"], 
    correct: "habla", 
    translation: "Խավիերը խոսում է իր ճամփորդությունների մասին:",
    context: "Topic of conversation (hablar sobre...)"
  },
  { 
    id: 10, 
    sentence: "Te ___ que te quiero.", 
    options: ["hablo", "digo"], 
    correct: "digo", 
    translation: "Ես քեզ ասում եմ, որ սիրում եմ քեզ:",
    context: "Specific statement (decir que...)"
  }
];

// --- Utilities ---

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Components ---

const Javier = ({ mood }: { mood: 'neutral' | 'happy' | 'thinking' | 'sad' }) => {
  return (
    <motion.div 
      animate={mood === 'happy' ? { y: [0, -20, 0], rotate: [0, 5, -5, 0] } : {}}
      className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
    >
       {/* Simple Cartoon Javier */}
       <div className="absolute inset-0 bg-amber-100 rounded-[60px] border-8 border-stone-800 shadow-2xl overflow-hidden">
          {/* Hair */}
          <div className="absolute top-0 left-0 w-full h-16 bg-stone-800 rounded-b-3xl" />
          
          {/* Face Elements */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 mt-8">
             <div className="flex gap-8">
                <motion.div 
                   animate={mood === 'thinking' ? { scaleY: [1, 0.2, 1] } : {}}
                   transition={{ repeat: Infinity, duration: 3 }}
                   className="w-4 h-4 bg-stone-800 rounded-full" 
                />
                <motion.div 
                   animate={mood === 'thinking' ? { scaleY: [1, 0.2, 1] } : {}}
                   transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                   className="w-4 h-4 bg-stone-800 rounded-full" 
                />
             </div>
             
             {mood === 'neutral' && <div className="w-8 h-1 bg-stone-800 rounded-full" />}
             {mood === 'happy' && <div className="w-12 h-6 border-b-8 border-stone-800 rounded-full" />}
             {mood === 'thinking' && <div className="w-6 h-6 border-2 border-stone-400 rounded-full border-dashed animate-spin" />}
             {mood === 'sad' && <div className="w-12 h-6 border-t-8 border-stone-800 rounded-full mt-4" />}
          </div>

          {/* Blush */}
          {mood === 'happy' && (
            <>
              <div className="absolute bottom-12 left-8 w-4 h-4 bg-rose-200 rounded-full blur-sm" />
              <div className="absolute bottom-12 right-8 w-4 h-4 bg-rose-200 rounded-full blur-sm" />
            </>
          )}
       </div>

       {/* Speech Bubble Icon */}
       <div className="absolute -top-4 -right-4 p-4 bg-white rounded-full border-4 border-stone-800 shadow-xl">
          <MessageCircle className="text-amber-500" />
       </div>
    </motion.div>
  );
};

export default function JavierVerbGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [mood, setMood] = useState<'neutral' | 'happy' | 'thinking' | 'sad'>('neutral');
  const [gameFinished, setGameFinished] = useState(false);

  const currentQ = QUESTIONS[currentIdx];

  const handleAnswer = (opt: string) => {
    if (feedback !== 'none') return;

    if (opt === currentQ.correct) {
      setScore(s => s + 1);
      setFeedback('correct');
      setMood('happy');
      speak(currentQ.sentence.replace('___', opt));
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else {
      setFeedback('wrong');
      setMood('sad');
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(c => c + 1);
        setFeedback('none');
        setMood('neutral');
      } else {
        setGameFinished(true);
        if (score >= 7) confetti({ particleCount: 150, spread: 70, origin: { y: 0.5 } });
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setFeedback('none');
    setMood('neutral');
    setGameFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#fff7ed] text-stone-900 font-sans p-6 flex flex-col items-center justify-center selection:bg-amber-200">
      
      {!gameFinished ? (
        <div className="w-full max-w-4xl space-y-12">
          
          {/* Header */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                   <Zap size={24} />
                </div>
                <div>
                   <h1 className="text-xl font-black uppercase tracking-tighter italic">Javier's Talk</h1>
                   <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Hablar vs Decir</p>
                </div>
             </div>

             <div className="flex items-center gap-8">
                <div className="text-right">
                   <p className="text-[10px] font-black text-stone-300 uppercase">Progress</p>
                   <p className="text-sm font-black">{currentIdx + 1} / {QUESTIONS.length}</p>
                </div>
                <div className="h-12 w-px bg-stone-200" />
                <div className="text-left">
                   <p className="text-[10px] font-black text-stone-300 uppercase">Score</p>
                   <p className="text-sm font-black text-amber-600">{score}</p>
                </div>
             </div>
          </div>

          {/* Javier & Bubble */}
          <div className="flex flex-col md:flex-row items-center gap-12">
             
             <Javier mood={mood} />

             <div className="flex-1 w-full space-y-8">
                <div className="relative group">
                   <AnimatePresence mode="wait">
                     <motion.div 
                       key={currentIdx}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="bg-white p-10 rounded-[50px] shadow-2xl border-4 border-stone-800 relative z-10"
                     >
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight mb-4">
                           {currentQ.sentence.split('___')[0]}
                           <span className={`mx-4 border-b-4 ${feedback === 'correct' ? 'border-emerald-500 text-emerald-500' : 'border-stone-200'} px-6 italic`}>
                              {feedback === 'correct' ? currentQ.correct : '...'}
                           </span>
                           {currentQ.sentence.split('___')[1]}
                        </h2>
                        <p className="text-lg font-bold text-stone-400 mb-6 italic">
                           {currentQ.translation}
                        </p>
                        
                        <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full border border-stone-100 text-[10px] font-black uppercase text-stone-400">
                           <Info size={14} /> {currentQ.context}
                        </div>
                     </motion.div>
                   </AnimatePresence>
                   
                   {/* Bubble tail */}
                   <div className="absolute top-1/2 -left-4 w-12 h-12 bg-white border-b-4 border-l-4 border-stone-800 rotate-45 -translate-y-1/2 hidden md:block" />
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                   {currentQ.options.map((opt) => (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(opt)}
                        disabled={feedback !== 'none'}
                        className={`group relative p-8 rounded-[35px] border-4 font-black text-2xl uppercase italic transition-all overflow-hidden ${
                          feedback === 'correct' && opt === currentQ.correct
                            ? 'bg-emerald-500 border-stone-800 text-white shadow-xl'
                            : feedback === 'wrong' && opt !== currentQ.correct
                            ? 'bg-rose-500 border-stone-800 text-white shadow-xl'
                            : 'bg-white border-stone-800 text-stone-800 hover:bg-amber-500 hover:text-white'
                        }`}
                      >
                         <span className="relative z-10">{opt}</span>
                         {feedback === 'correct' && opt === currentQ.correct && (
                            <CheckCircle2 className="absolute top-4 right-4 text-white/50" size={24} />
                         )}
                         {feedback === 'wrong' && opt !== currentQ.correct && (
                            <XCircle className="absolute top-4 right-4 text-white/50" size={24} />
                         )}
                      </motion.button>
                   ))}
                </div>
             </div>
          </div>

          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
               className="h-full bg-amber-500 transition-all duration-1000"
             />
          </div>

        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-20 rounded-[60px] shadow-2xl border-8 border-stone-800 text-center space-y-12 max-w-2xl w-full"
        >
           <div className="space-y-4">
              <div className="w-24 h-24 bg-amber-500 rounded-[35px] flex items-center justify-center mx-auto text-white shadow-xl border-4 border-stone-800">
                 <Trophy size={48} />
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                 ¡Magnífico!
              </h2>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-amber-50 rounded-[40px] space-y-2 border-2 border-amber-100">
                 <p className="text-[10px] font-black uppercase text-amber-400">Total Score</p>
                 <p className="text-4xl font-black text-stone-800">{score} / {QUESTIONS.length}</p>
              </div>
              <div className="p-8 bg-stone-900 rounded-[40px] space-y-2 border-2 border-stone-800">
                 <p className="text-[10px] font-black uppercase text-stone-500">Mastery</p>
                 <p className="text-4xl font-black text-white">{Math.round((score / QUESTIONS.length) * 100)}%</p>
              </div>
           </div>

           <p className="text-stone-500 font-bold max-w-md mx-auto leading-relaxed">
              Դուք հիանալի օգնեցիք Խավիերին։ Այժմ նա ճիշտ է օգտագործում <span className="text-amber-600 font-black">Hablar</span> և <span className="text-amber-600 font-black">Decir</span> բայերը:
           </p>

           <button 
             onClick={resetGame}
             className="w-full py-8 bg-amber-500 text-white font-black uppercase tracking-widest rounded-[35px] border-4 border-stone-800 shadow-[0_10px_0_#92400e] hover:shadow-none hover:translate-y-2 transition-all flex items-center justify-center gap-4 text-xl"
           >
             <RotateCcw size={28} /> Play Again
           </button>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="mt-20 opacity-20 flex flex-col items-center gap-4">
         <div className="flex gap-4">
            <Star size={24} />
            <Heart size={24} />
            <Sparkles size={24} />
         </div>
         <p className="text-[10px] font-black uppercase tracking-[1em]">Javier's Academy v1.0</p>
      </footer>
    </div>
  );
}
