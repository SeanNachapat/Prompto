"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, ArrowLeft, Edit2, Check, X, Pencil } from "lucide-react";

interface RefinementStepProps {
  basePrompt: string;
  onRefine: (answers: Record<string, string>) => void;
  onBack: () => void;
}

interface QuestionOption {
  id: string;
  text: string;
}

interface DiscoveryQuestion {
  id: number;
  icon: any;
  text: string;
  options: QuestionOption[];
}

export default function RefinementStep({ basePrompt, onRefine, onBack }: RefinementStepProps) {
  const questionsList: DiscoveryQuestion[] = useMemo(() => {
    return [
      { 
        id: 1, 
        icon: null, 
        text: "Who is the primary audience?", 
        options: [
          { id: "a1", text: "Developers & Technical Architects" },
          { id: "a2", text: "Executive Leadership & Stakeholders" },
          { id: "a3", text: "General Consumers (Non-Technical)" },
          { id: "a4", text: "Academic or Research Peers" }
        ]
      },
      { 
        id: 2, 
        icon: null, 
        text: "What specific tone or voice?", 
        options: [
          { id: "t1", text: "Professional & Authoritative" },
          { id: "t2", text: "Friendly & Conversational" },
          { id: "t3", text: "Highly Academic & Formal" },
          { id: "t4", text: "Inspirational & Visionary" }
        ]
      },
      { 
        id: 3, 
        icon: null, 
        text: "Any specific facts to include?", 
        options: [
          { id: "f1", text: "Technical Specs & Benchmarks" },
          { id: "f2", text: "Market Trends & User Feedback" },
          { id: "f3", text: "Historical Context & Ethics" },
          { id: "f4", text: "Regulatory & Compliance Data" }
        ]
      },
      { 
        id: 4, 
        icon: null, 
        text: "Desired structure or format?", 
        options: [
          { id: "s1", text: "Executive Summary with Bullets" },
          { id: "s2", text: "Deep-Dive Technical Analysis" },
          { id: "s3", text: "Step-by-Step Tutorial Style" },
          { id: "s4", text: "Table of Comparisons" }
        ]
      },
      { 
        id: 5, 
        icon: null, 
        text: "Any strict constraints?", 
        options: [
          { id: "c1", text: "No technical jargon or acronyms" },
          { id: "c2", text: "Strict 100-word limit" },
          { id: "c3", text: "Include source citations" },
          { id: "c4", text: "Tone must be completely neutral" }
        ]
      },
    ];
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [customValue, setCustomValue] = useState("");
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  const currentQuestion = questionsList[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || "";
  
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questionsList.length - 1;

  const handleSelectOption = (text: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: text }));
    setIsEditingCustom(false);
    setCustomValue("");
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: customValue }));
    }
    setIsEditingCustom(false);
  };

  const next = () => {
    if (isLast) {
      const formattedAnswers: Record<string, string> = {};
      questionsList.forEach(q => {
        formattedAnswers[q.text] = answers[q.id] || "No specific detail provided";
      });
      onRefine(formattedAnswers);
    } else {
      setCurrentIndex(prev => prev + 1);
      setCustomValue("");
      setIsEditingCustom(false);
    }
  };

  const prev = () => {
    if (isFirst) onBack();
    else {
      setCurrentIndex(prev => prev - 1);
      setCustomValue("");
      setIsEditingCustom(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Context Bridge Label */}
      <div className="flex items-center gap-2 mb-4 px-4">
        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Synthesized discovery step</span>
        <div className="h-px flex-1 bg-zinc-900" />
      </div>

      <div className="bg-[#0F0F0F] border border-white/5 rounded-[2rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
        
        {/* Header Area */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-white/5">
          <h2 className="text-xl font-black text-white tracking-tight leading-none uppercase">
            {currentQuestion.text}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-600">
              <button 
                onClick={prev}
                className="hover:text-white transition-colors p-1"
                disabled={isFirst && !basePrompt}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[9px] font-black uppercase tracking-widest tabular-nums font-mono">
                {currentIndex + 1} / 5
              </span>
              <button 
                onClick={next}
                className="hover:text-white transition-colors p-1"
                disabled={!currentAnswer && !customValue}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button onClick={onBack} className="p-1 text-zinc-600 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Options List */}
        <div className="p-4 space-y-1">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = currentAnswer === opt.text;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.text)}
                className={`w-full group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isSelected 
                  ? "bg-accent/5 text-white" 
                  : "text-zinc-500 hover:bg-white/[0.015] hover:text-zinc-300"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                  isSelected 
                  ? "bg-accent text-white shadow-lg shadow-accent/20" 
                  : "bg-zinc-900/50 text-zinc-700 group-hover:text-zinc-500"
                }`}>
                  {i + 1}
                </div>
                <span className="text-sm font-bold tracking-tight text-left">{opt.text}</span>
              </button>
            );
          })}

          {/* Something Else / Custom Input */}
          <div className="pt-2 px-1 pb-1">
            <div className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all duration-500 ${
              isEditingCustom || (currentAnswer && !currentQuestion.options.some(o => o.text === currentAnswer))
              ? "bg-white/[0.03] border-white/10" 
              : "bg-transparent border-transparent hover:bg-white/[0.015]"
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isEditingCustom || (currentAnswer && !currentQuestion.options.some(o => o.text === currentAnswer))
                ? "bg-accent/10 text-accent" 
                : "bg-zinc-900/50 text-zinc-700"
              }`}>
                <Pencil className="w-3.5 h-3.5" />
              </div>
              
              <div className="flex-1">
                {isEditingCustom ? (
                  <input
                    autoFocus
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    onBlur={handleCustomSubmit}
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold text-white w-full p-0 placeholder:text-zinc-800"
                    placeholder="Describe custom intent..."
                  />
                ) : (
                  <button 
                    onClick={() => setIsEditingCustom(true)}
                    className={`text-sm font-bold tracking-tight w-full text-left transition-colors ${
                      currentAnswer && !currentQuestion.options.some(o => o.text === currentAnswer)
                      ? "text-white" 
                      : "text-zinc-700 hover:text-zinc-500"
                    }`}
                  >
                    {currentAnswer && !currentQuestion.options.some(o => o.text === currentAnswer) ? currentAnswer : "Something else"}
                  </button>
                )}
              </div>

              <button
                onClick={next}
                disabled={!currentAnswer && !customValue}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  currentAnswer || customValue
                  ? "bg-zinc-800 text-white hover:bg-zinc-700"
                  : "bg-zinc-900 text-zinc-800 opacity-30 cursor-not-allowed"
                }`}
              >
                {currentAnswer || customValue ? (isLast ? "Refine" : "Next") : "Skip"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Hints */}
      <div className="mt-6 flex items-center justify-center gap-8 text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em]">
        <span className="flex items-center gap-1.5">1-4 to navigate</span>
        <span className="flex items-center gap-1.5">Enter to select</span>
        <span className="flex items-center gap-1.5">Esc to skip</span>
      </div>
    </div>
  );
}
