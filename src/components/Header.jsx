import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Layers, 
  ChevronDown, 
  HelpCircle, 
  X,
  Package,
  Anchor,
  Truck,
  ThermometerSnowflake,
  Sparkles,
  Command,
  Radio,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Flame,
  FileText,
  Compass
} from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function Header({ 
  activeRole, 
  setActiveRole, 
  onSearch, 
  alertCount, 
  onOpenAlerts, 
  onOpenRoleModal, 
  onOpenGuideModal,
  onOpenCommandPalette,
  onOpenSandbox,
  onOpenBriefing,
  onSelectTab
}) {
  const [timeString, setTimeString] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isShiftDrawerOpen, setIsShiftDrawerOpen] = useState(false);
  const [shiftTasks, setShiftTasks] = useState({
    customs: true,
    reefer: false,
    backhaul: true,
    port: false
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit'
      });
      setTimeString(`${istTime} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (onSearch) onSearch('');
  };

  const toggleTask = (key) => {
    playIosChime('success');
    setShiftTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const roleConfigs = {
    all: { label: 'Unified Control Tower', icon: Layers, tint: 'text-[#0071E3]' },
    cargo_owner: { label: 'Cargo Owner & Importer', icon: Package, tint: 'text-[#5E5CE6]' },
    port: { label: 'Port Operations', icon: Anchor, tint: 'text-[#FF3B30]' },
    fleet: { label: 'Fleet & Dispatch', icon: Truck, tint: 'text-[#34C759]' },
    coldchain: { label: 'Cold-Chain Telemetry', icon: ThermometerSnowflake, tint: 'text-[#30B0C7]' }
  };

  const currentRole = roleConfigs[activeRole] || roleConfigs.all;
  const RoleIcon = currentRole.icon;
  const completedCount = Object.values(shiftTasks).filter(Boolean).length;

  return (
    <>
      <header className="apple-glass sticky top-0 z-40 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              playIosChime('tap');
              onOpenRoleModal();
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            title="Switch Persona"
          >
            <div className="w-8 h-8 rounded-[10px] bg-[#1D1D1F] text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
              <span>WP</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-[#1D1D1F] text-sm sm:text-base">
                  Waypoint
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-black/[0.05] text-[#86868B] rounded-md">
                  Corridor
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Quick Omnibox Trigger & Shortcuts */}
        <div className="flex items-center gap-2 max-w-xl flex-1 mx-4 justify-center">
          {/* Global Search Bar (Opens Command Palette on click) */}
          <button
            onClick={() => {
              playIosChime('tap');
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            className="w-full max-w-sm bg-black/[0.04] hover:bg-black/[0.07] border border-black/[0.06] rounded-full text-xs py-1.5 px-3.5 flex items-center justify-between text-[#86868B] hover:text-[#1D1D1F] transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span className="text-[11.5px] truncate">Search vessels, containers, ports...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-white rounded border border-black/10 text-slate-500 shadow-2xs">
                ⌘K
              </kbd>
            </div>
          </button>

          {/* Quick Action: What-If Sandbox */}
          <button
            onClick={() => {
              playIosChime('tap');
              if (onOpenSandbox) onOpenSandbox();
            }}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-[#5856D6] hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
            title="Launch What-If Rerouting Sandbox"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sandbox</span>
          </button>

          {/* Quick Action: Executive Briefing */}
          <button
            onClick={() => {
              playIosChime('tap');
              if (onOpenBriefing) onOpenBriefing();
            }}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0071E3] hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            title="Generate Executive Briefing"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Briefing</span>
          </button>
        </div>

        {/* Right Controls: Persona, Shift Hub, Alerts */}
        <div className="flex items-center gap-2">
          {/* Persona Switcher */}
          <button
            onClick={() => {
              playIosChime('tap');
              onOpenRoleModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] bg-black/[0.04] hover:bg-black/[0.07] rounded-full transition-colors cursor-pointer"
          >
            <RoleIcon className={`w-3.5 h-3.5 ${currentRole.tint}`} />
            <span className="max-w-[110px] sm:max-w-[140px] truncate">
              {currentRole.label}
            </span>
            <ChevronDown className="w-3 h-3 text-[#86868B]" />
          </button>

          {/* Guide Modal Trigger */}
          <button
            onClick={() => {
              playIosChime('tap');
              onOpenGuideModal();
            }}
            className="hidden sm:flex p-2 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.04] rounded-full transition-colors cursor-pointer"
            title="How Waypoint Works"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Live Alert Bell */}
          <button
            onClick={() => {
              playIosChime('alert');
              onOpenAlerts();
            }}
            className="relative p-2 text-[#1D1D1F] hover:bg-black/[0.04] rounded-full transition-colors cursor-pointer"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse"></span>
            )}
          </button>
        </div>
      </header>

      {/* Expandable Shift Overview Tray */}
      {isShiftDrawerOpen && (
        <div className="px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-xl border-b border-black/[0.08] shadow-lg animate-in fade-in duration-200 z-30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.05]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1D1D1F]">Daily Operations Protocol</span>
                <span className="text-[10px] text-[#86868B]">• 14-Day Zero-Deadhead Streak</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#0071E3]">
                  {completedCount} of 4 Complete
                </span>
                <button 
                  onClick={() => setIsShiftDrawerOpen(false)}
                  className="text-[#86868B] hover:text-[#1D1D1F] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
              {[
                { key: 'customs', label: 'ICEGATE Clearances', desc: '4/4 Containers Fast-Tracked' },
                { key: 'reefer', label: 'Cold-Chain Surveillance', desc: 'VC-2048 Genset Override' },
                { key: 'backhaul', label: 'Backhaul Dispatch', desc: '11 Rigs Matched (₹3.36L)' },
                { key: 'port', label: 'Vizag Berth Fast-Track', desc: 'Terminal Gate Pass Staged' }
              ].map(item => (
                <div 
                  key={item.key} 
                  onClick={() => toggleTask(item.key)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    shiftTasks[item.key]
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-white border-black/[0.06] text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    shiftTasks[item.key] ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                  }`}>
                    {shiftTasks[item.key] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold">{item.label}</div>
                    <div className="text-[9.5px] text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
