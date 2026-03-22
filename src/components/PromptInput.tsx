"use client";

import { useState, useRef, useMemo } from "react";
import { Send, Zap, SquareSlash } from "lucide-react";
import placeholders from "@/data/placeholders.json";

interface PromptInputProps {
  initialValue?: string;
  onSubmit: (text: string) => void;
}

export default function PromptInput({ initialValue = "", onSubmit }: PromptInputProps) {
  const [text, setText] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const randomPlaceholder = useMemo(() => {
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative flat-card rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/20">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          placeholder={randomPlaceholder}
          className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-zinc-600 resize-none min-h-[140px] max-h-[600px] text-lg leading-relaxed scrollbar-hide py-2"
          rows={1}
        />
        
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:text-accent hover:bg-accent/5 rounded-lg transition-all uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Optimize</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-300 rounded-lg transition-all uppercase tracking-wider">
              <SquareSlash className="w-3.5 h-3.5" />
              <span>Variables</span>
            </button>
          </div>
          
          <button 
            disabled={!text.trim()}
            onClick={() => onSubmit(text)}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg font-bold transition-all active:scale-95 shadow-lg shadow-accent/10"
          >
            <span className="text-sm">RUN PROMPT</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
