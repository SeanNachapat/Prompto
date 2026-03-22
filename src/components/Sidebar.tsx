import { History, Plus, Bookmark, Settings, Hash } from "lucide-react";

const mockHistory = [
  { id: 1, title: "Marketing Email Generator", date: "2 mins ago" },
  { id: 2, title: "Python Script Docstring", date: "1 hour ago" },
  { id: 3, title: "Creative Story Prompt", date: "Yesterday" },
];

interface SidebarProps {
  isCollapsed?: boolean;
}

const Tomato = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-accent fill-accent/20">
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    <path d="M12 3c0 2 1 3 3 3s3-1 3-3" />
    <path d="M12 3c0 2-1 3-3 3S6 5 6 3" />
  </svg>
);

export default function Sidebar({ isCollapsed = false }: SidebarProps) {
  return (
    <div className={`h-screen border-r border-border-subtle flex flex-col bg-background z-20 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className={`p-6 pb-2 ${isCollapsed ? "px-0 flex flex-col items-center" : ""}`}>
        <div className={`flex items-center gap-2 mb-8 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="shrink-0">
            <Tomato />
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-black tracking-tighter text-white whitespace-nowrap overflow-hidden">
              PROMPTO
            </h1>
          )}
        </div>
        
        <button className={`flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white rounded transition-all shadow-lg shadow-accent/20 ${isCollapsed ? "w-10 h-10 p-0" : "w-full py-2 px-4 text-xs font-bold uppercase tracking-widest"}`}>
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="whitespace-nowrap">NEW PROMPT</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6 scrollbar-hide">
        <div className="mb-8">
          {!isCollapsed && (
            <div className="px-3 mb-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-hidden">
              Recent
            </div>
          )}
          <div className="space-y-1">
            {mockHistory.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left rounded-lg hover:bg-zinc-900 transition-all group border border-transparent hover:border-white/5 ${isCollapsed ? "p-2 flex justify-center" : "p-3"}`}
                title={isCollapsed ? item.title : ""}
              >
                {isCollapsed ? (
                  <History className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                ) : (
                  <>
                    <div className="text-sm font-medium text-zinc-400 group-hover:text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-zinc-600">
                      {item.date}
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {!isCollapsed && (
            <div className="px-3 mb-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-between whitespace-nowrap overflow-hidden">
              <span>Library</span>
              <Bookmark className="w-3 h-3" />
            </div>
          )}
          <div className="space-y-1">
            {[
              { name: "Worksets", icon: Hash },
              { name: "Templates", icon: Hash },
              { name: "Archive", icon: Hash }
            ].map((lib) => (
              <button 
                key={lib.name} 
                className={`flex items-center gap-3 w-full text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-all ${isCollapsed ? "p-2 justify-center" : "p-3 text-sm"}`}
                title={isCollapsed ? lib.name : ""}
              >
                <lib.icon className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500" />
                {!isCollapsed && <span className="whitespace-nowrap">{lib.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-4 border-t border-border-subtle ${isCollapsed ? "px-0 flex justify-center" : ""}`}>
        <button 
          className={`flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-all ${isCollapsed ? "p-2 justify-center" : "w-full p-3 text-sm"}`}
          title={isCollapsed ? "Settings" : ""}
        >
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span className="whitespace-nowrap">Settings</span>}
        </button>
      </div>
    </div>
  );
}
