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
  SlidersHorizontal
} from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function Header({ 
  activeRole, 
  setActiveRole, 
  onSearch, 
  alertCount, 
  onOpenAlerts, 
  onOpenRoleModal, 
  onOpenGuideModal 
}) {
  const [timeString, setTimeString] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
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

  const roleConfigs = {
    all: { label: 'Unified Control Tower', icon: Layers, badge: 'All Corridors', color: 'text-[#007AFF] bg-blue-50/80', dot: 'bg-[#007AFF]' },
    cargo_owner: { label: 'Cargo Owner & Importer', icon: Package, badge: 'My Cargo', color: 'text-[#5856D6] bg-indigo-50/80', dot: 'bg-[#5856D6]' },
    port: { label: 'Port Operations', icon: Anchor, badge: 'Harbour Ops', color: 'text-[#FF3B30] bg-rose-50/80', dot: 'bg-[#FF3B30]' },
    fleet: { label: 'Fleet & Dispatch', icon: Truck, badge: 'Trucking', color: 'text-[#34C759] bg-emerald-50/80', dot: 'bg-[#34C759]' },
    coldchain: { label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, badge: 'Reefer IoT', color: 'text-[#30B0C7] bg-teal-50/80', dot: 'bg-[#30B0C7]' }
  };

  const currentRole = roleConfigs[activeRole] || roleConfigs.all;
  const RoleIcon = currentRole.icon;

  return (
    <header className="ios-glass sticky top-0 z-40 px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border-b border-black/[0.06] shrink-0">
      {/* Left: Brand Identity with Apple Squircle */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            playIosChime('tap');
            onOpenRoleModal();
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none ios-btn cursor-pointer"
          title="Switch Corridor Persona"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-105 transition-transform border border-white/20">
            <span className="tracking-tight text-white">WP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-900 text-[15px] sm:text-base">
                Waypoint
              </span>
              <span className="px-2 py-0.5 text-[9.5px] font-bold bg-[#007AFF]/10 text-[#007AFF] rounded-full border border-[#007AFF]/20">
                PRO 2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden md:block tracking-tight">
              Sea-to-Door Corridor Intelligence
            </p>
          </div>
        </button>
      </div>

      {/* Middle: Universal Search Box (iOS Search Capsule) */}
      <div className="flex-1 max-w-md mx-3 hidden md:block">
        <div className="relative group">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007AFF] transition-colors" />
          <input
            type="text"
            placeholder="Search container, vessel, truck, port (e.g. SHP-8821, Eastern)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-200/50 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-[#007AFF]/40 rounded-full text-xs py-2 pl-9 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-[#007AFF]/10 transition-all font-medium"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchTerm ? (
              <button
                onClick={handleClearSearch}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* Right Controls: Role Switcher, Clock, Help, Alerts */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Mobile Search Button */}
        <button
          onClick={() => {
            playIosChime('tap');
            setIsMobileSearchOpen(!isMobileSearchOpen);
          }}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors ios-btn"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Persona / Role Selector Pill */}
        <button
          onClick={() => {
            playIosChime('tap');
            onOpenRoleModal();
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full transition-all shadow-2xs hover:shadow-xs ios-btn cursor-pointer"
          title="Switch Persona Workspace"
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${currentRole.color}`}>
            <RoleIcon className="w-3 h-3" />
          </div>
          <span className="max-w-[110px] sm:max-w-[150px] truncate font-bold text-slate-800">
            {currentRole.label}
          </span>
          <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
        </button>

        {/* Guide / Explanation Button */}
        <button
          onClick={() => {
            playIosChime('tap');
            onOpenGuideModal();
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white/90 hover:bg-white border border-slate-200 rounded-full transition-all shadow-2xs ios-btn cursor-pointer"
          title="How Waypoint Works"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden lg:inline">Guide</span>
        </button>

        {/* Live Satellite Clock */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold text-slate-700 bg-white/90 rounded-full border border-slate-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse"></span>
          <span>{timeString}</span>
        </div>

        {/* Alerts Trigger (iOS Badge) */}
        <button
          onClick={() => {
            playIosChime('alert');
            onOpenAlerts();
          }}
          className="relative p-2 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-full border border-slate-200 shadow-2xs transition-all ios-btn cursor-pointer"
          title="Corridor Alerts"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] bg-[#FF3B30] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-scale">
              {alertCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Expandable Search Tray */}
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-3 ios-glass border-b border-slate-200 shadow-xl md:hidden z-40 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search container, vessel, truck, port..."
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
              className="w-full bg-slate-100 border border-slate-300 rounded-full text-xs py-2 pl-9 pr-9 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007AFF] focus:bg-white"
            />
            <button
              onClick={() => {
                handleClearSearch();
                setIsMobileSearchOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
