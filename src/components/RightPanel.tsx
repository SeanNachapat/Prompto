import { Cpu, Terminal, Info } from "lucide-react";

interface RightPanelProps {
  isCollapsed?: boolean;
}

export default function RightPanel({ isCollapsed = false }: RightPanelProps) {
  return (
    <div className={`h-screen border-l border-border-subtle flex flex-col bg-background z-20 transition-all duration-300 ${isCollapsed ? "w-0 border-none overflow-hidden" : "w-80"}`}>
      <div className={`min-w-[320px] h-full flex flex-col ${isCollapsed ? "opacity-0 invisible" : "opacity-100 visible transition-opacity duration-300 delay-150"}`}>
        <div className="p-6 border-b border-border-subtle">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-accent" />
            <span>Configuration</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Temperature</span>
              <span className="text-xs font-mono text-accent">0.75</span>
            </div>
            <input 
              type="range" 
              className="w-full accent-accent bg-zinc-900 h-1.5 rounded-lg cursor-pointer" 
              min="0" max="1" step="0.01" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Top P</span>
              <span className="text-xs font-mono text-accent">0.9</span>
            </div>
            <input 
              type="range" 
              className="w-full accent-accent bg-zinc-900 h-1.5 rounded-lg cursor-pointer" 
              min="0" max="1" step="0.01" 
            />
          </div>

          <div className="pt-8 border-t border-border-subtle">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>Output Config</span>
            </div>
            
            <div className="p-4 rounded-lg bg-zinc-900/50 border border-white/5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Max Length</span>
                <span className="text-zinc-300">2048</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Stop Seq</span>
                <span className="text-zinc-300">None</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border-subtle">
          <button className="w-full py-3 px-4 rounded bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all uppercase tracking-widest">
            Update Model
          </button>
        </div>
      </div>
    </div>
  );
}
