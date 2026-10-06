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
  Flame
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

        {/* Center: Live Activity Capsule & Global Search */}
        <div className="flex items-center gap-2.5 max-w-xl flex-1 mx-4 justify-center">
          {/* Subtle Live Activity Status Capsule */}
          <button
            onClick={() => {
              playIosChime('tap');
              setIsShiftDrawerOpen(!isShiftDrawerOpen);
            }}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-black/[0.04] hover:bg-black/[0.07] rounded-full text-xs transition-colors cursor-pointer border border-black/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse"></span>
            <span className="font-semibold text-[#1D1D1F] text-[11.5px]">
              {activeRole === 'coldchain' ? 'VC-2048 Core Temp: +7.9°C' :
               activeRole === 'port' ? 'Visakhapatnam Berth 04 Staging' :
               activeRole === 'fleet' ? '11 Backhauls Ready' :
               'Corridor Active • 4 Containers In Transit'}
            </span>
            <span className="text-[10px] text-[#86868B] font-mono pl-1 border-l border-black/10">
              {completedCount}/4 Sync
            </span>
          </button>

          {/* Minimal Search Field */}
          <div className="relative flex-1 max-w-xs hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input
              type="text"
              placeholder="Search container, vessel, truck..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-black/[0.04] hover:bg-black/[0.07] focus:bg-white border border-transparent focus:border-black/15 rounded-full text-xs py-1.5 pl-8 pr-8 text-[#1D1D1F] placeholder-[#86868B] focus:outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
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
            <span className="max-w-[120px] sm:max-w-[150px] truncate">
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
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3B30] rounded-full"></span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2.5">
              {[
                { key: 'customs', label: 'E-Gate Clearances', sub: '4 of 4 verified', tab: 'shipments' },
                { key: 'reefer', label: 'VC-2048 Temperature', sub: '+7.9°C near threshold', tab: 'coldchain', alert: true },
                { key: 'backhaul', label: '11 Return Loads', sub: 'Genome Valley matches', tab: 'backhaul' },
                { key: 'port', label: 'Vizag 72h Peak Dwell', sub: '81% surge simulated', tab: 'impact' }
              ].map(task => (
                <div
                  key={task.key}
                  onClick={() => toggleTask(task.key)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shiftTasks[task.key]
                      ? 'bg-[#34C759]/5 border-[#34C759]/30 text-[#1D1D1F]'
                      : task.alert
                        ? 'bg-[#FF3B30]/5 border-[#FF3B30]/30'
                        : 'bg-black/[0.02] border-black/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      shiftTasks[task.key] ? 'bg-[#34C759] text-white' : 'border border-[#86868B]'
                    }`}>
                      {shiftTasks[task.key] && '✓'}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate text-[#1D1D1F]">{task.label}</div>
                      <div className="text-[10px] text-[#86868B] truncate">{task.sub}</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTab) onSelectTab(task.tab);
                      setIsShiftDrawerOpen(false);
                    }}
                    className="text-[#86868B] hover:text-[#0071E3] p-1"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
