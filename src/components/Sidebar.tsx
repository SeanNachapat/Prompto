import { useState } from "react";
import { History, Plus, Bookmark, Settings, Hash, ChevronDown, ChevronRight, FolderPlus, Clock } from "lucide-react";

const mockHistory = [
  { id: 1, title: "Marketing Email Generator", date: "2 mins ago", category: "Today" },
  { id: 2, title: "Python Script Docstring", date: "1 hour ago", category: "Today" },
  { id: 3, title: "Creative Story Prompt", date: "Yesterday", category: "Yesterday" },
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
  const [expandedSections, setExpandedSections] = useState<string[]>(["recent", "library"]);

  const toggleSection = (section: string) => {
    if (isCollapsed) return;
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section) && !isCollapsed;

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

      <div className="flex-1 overflow-y-auto px-3 py-6 scrollbar-hide space-y-4">
        {/* Recent Section */}
        <div className="space-y-1">
          <button 
            onClick={() => toggleSection("recent")}
            className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hover:text-zinc-300 transition-colors ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Recent" : ""}
          >
            <div className={`flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}>
              <Clock className={`${isCollapsed ? "w-5 h-5" : "w-3.5 h-3.5"}`} />
              {!isCollapsed && <span>Recent</span>}
            </div>
            {!isCollapsed && (isExpanded("recent") ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />)}
          </button>
          
          {isExpanded("recent") && (
            <div className="space-y-4 mt-2 px-1">
              {["Today", "Yesterday"].map(category => (
                <div key={category} className="space-y-1">
                   <div className="px-2 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{category}</div>
                   {mockHistory.filter(item => item.category === category).map((item) => (
                    <button
                      key={item.id}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-900 transition-all group border border-transparent hover:border-white/5"
                    >
                      <div className="text-sm font-medium text-zinc-400 group-hover:text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-[9px] text-zinc-600">
                        {item.date}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Library Section */}
        <div className="space-y-1 mt-4">
          <div 
            onClick={() => toggleSection("library")}
            className={`cursor-pointer w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hover:text-zinc-300 transition-colors ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Library" : ""}
          >
            <div className={`flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}>
              <Bookmark className={`${isCollapsed ? "w-5 h-5" : "w-3.5 h-3.5"}`} />
              {!isCollapsed && <span>Library</span>}
            </div>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-white/5 text-zinc-600 hover:text-accent transition-all">
                  <FolderPlus className="w-3.5 h-3.5" />
                </button>
                {isExpanded("library") ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </div>
            )}
          </div>
          
          {isExpanded("library") && (
            <div className="space-y-1 mt-2 px-1">
              {[
                { name: "Worksets", icon: Hash },
                { name: "Templates", icon: Hash },
                { name: "Archive", icon: Hash }
              ].map((lib) => (
                <button 
                  key={lib.name} 
                  className="flex items-center gap-3 w-full p-2.5 text-sm text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-all group"
                >
                  <lib.icon className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500" />
                  <span className="whitespace-nowrap">{lib.name}</span>
                </button>
              ))}
            </div>
          )}
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
