"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import PromptInput from "@/components/PromptInput";
import RefinementStep from "@/components/RefinementStep";
import { CheckCircle2, Copy, Sparkles, Sidebar as SidebarIcon, Settings, ChevronLeft, ChevronRight } from "lucide-react";

type FlowStep = "INPUT" | "REFINE" | "RESULT";

const Tomato = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-accent fill-accent/20`}>
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    <path d="M12 3c0 2 1 3 3 3s3-1 3-3" />
    <path d="M12 3c0 2-1 3-3 3S6 5 6 3" />
  </svg>
);

export default function Home() {
  const [step, setStep] = useState<FlowStep>("INPUT");
  const [prompt, setPrompt] = useState("");
  const [refinementAnswers, setRefinementAnswers] = useState<Record<string, string>>({});
  
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  const handlePromptSubmit = (text: string) => {
    setPrompt(text);
    setStep("REFINE");
  };

  const handleRefine = (answers: Record<string, string>) => {
    setRefinementAnswers(answers);
    setStep("RESULT");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground tracking-tight font-sans">
      <Sidebar isCollapsed={isLeftCollapsed} />

      <main className="flex-1 flex flex-col relative bg-[#0D0D0D] transition-all duration-300">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border-subtle bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
              className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all"
              title={isLeftCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <SidebarIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-zinc-500 font-medium whitespace-nowrap">Workspace</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-200 font-semibold truncate max-w-[200px]">
                {step === "INPUT" ? "New Prompt" : prompt.slice(0, 30) + "..."}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-accent/10 border border-accent/20">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="text-[9px] font-black uppercase tracking-widest text-accent/80">V0.1 Alpha</span>
              </div>
              <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                Draft Saved
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs font-medium text-white hover:bg-zinc-800 transition-colors border border-white/5">
                History
              </button>
            </div>
            
            <button 
              onClick={() => setIsRightCollapsed(!isRightCollapsed)}
              className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all"
              title={isRightCollapsed ? "Expand Config" : "Collapse Config"}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className={`flex-1 ${step === "INPUT" ? "overflow-hidden justify-center" : "overflow-y-auto"} px-6 py-8 flex flex-col items-center scrollbar-hide`}>
          <div className="w-full max-w-5xl space-y-6">
            
            {step === "INPUT" && (
              <>
                <section className="text-center space-y-4 pt-4 pb-8 animate-in fade-in zoom-in-95 duration-1000">
                  <div className="relative inline-block hover:scale-105 transition-transform duration-500 cursor-default group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <Tomato className="w-12 h-12 blur-2xl opacity-40" />
                    </div>
                    <h2 className="text-6xl font-black text-white tracking-[-0.08em] leading-none uppercase flex flex-col items-center">
                      <span className="relative flex items-center gap-4">
                        <Tomato className="w-10 h-10" />
                        PROMPTO
                      </span>
                      <span className="text-[10px] font-black tracking-[1.2em] text-accent mt-3 mr-[-1.2em]">STUDIO</span>
                    </h2>
                  </div>

                  <p className="text-zinc-600 max-w-sm mx-auto text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                    High-fidelity context discovery <br /> for elite prompt engineering.
                  </p>
                </section>
                <section className="w-full pt-4">
                  <PromptInput onSubmit={handlePromptSubmit} initialValue={prompt} />
                </section>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-20 max-w-3xl mx-auto w-full">
                  {[
                    { title: "Marketing Strategy", desc: "Build a roadmap for a new product launch." },
                    { title: "Code Refactor", desc: "Optimize complex legacy logic efficiently." },
                    { title: "System Architect", desc: "Design a scalable cloud-native system." },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:border-accent/30 hover:bg-accent/5 transition-all text-left group"
                    >
                      <div className="text-xs font-bold text-zinc-400 mb-1 group-hover:text-accent transition-colors uppercase tracking-wider">
                        {item.title}
                      </div>
                      <div className="text-xs text-zinc-600 line-clamp-1">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </section>
              </>
            )}

            {step === "REFINE" && (
              <RefinementStep 
                basePrompt={prompt}
                onRefine={handleRefine} 
                onBack={() => setStep("INPUT")} 
              />
            )}

            {step === "RESULT" && (
              <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
                <div className="flat-card rounded-2xl p-10 space-y-8 bg-[#0F0F0F] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Sparkles className="w-32 h-32 text-accent" />
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-white tracking-tight">ENGINEERING COMPLETE</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Your optimized prompt is ready</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full text-[10px] font-bold transition-all uppercase tracking-widest border border-white/5">
                      <Copy className="w-3.5 h-3.5" />
                      Copy Draft
                    </button>
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] px-1">Base Objective</h4>
                      <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-300 text-lg leading-relaxed font-medium font-serif italic border-l-4 border-l-accent/40">
                        {prompt}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(refinementAnswers).map(([q, a], i) => (
                        <div key={i} className="p-5 rounded-xl border border-white/5 bg-zinc-900/30 space-y-2">
                          <h5 className="text-[9px] font-extrabold text-zinc-600 uppercase tracking-widest">{q}</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6 relative z-10">
                    <button 
                      onClick={() => setStep("INPUT")}
                      className="flex-1 py-4 px-4 rounded-xl border border-white/10 text-zinc-400 font-bold text-[10px] hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest"
                    >
                      Start New Project
                    </button>
                    <button className="flex-2 py-4 px-10 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-[10px] transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-accent/20">
                      <Sparkles className="w-4 h-4" />
                      Generate Variation
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </main>

      <RightPanel isCollapsed={isRightCollapsed} />
    </div>
  );
}
