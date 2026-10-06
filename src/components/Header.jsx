import React, { useState, useEffect } from 'react';
import { 
  Compass, 
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
  Command
} from 'lucide-react';

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
      const istTime = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
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
    all: { label: 'Unified Control Tower', icon: Layers, badge: 'All Corridors', color: 'text-sky-600' },
    cargo_owner: { label: 'Cargo Owner & Importer', icon: Package, badge: 'My Cargo', color: 'text-blue-600' },
    port: { label: 'Port Operations', icon: Anchor, badge: 'Harbour Ops', color: 'text-rose-600' },
    fleet: { label: 'Fleet & Dispatch', icon: Truck, badge: 'Trucking', color: 'text-emerald-600' },
    coldchain: { label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, badge: 'Reefer IoT', color: 'text-teal-600' }
  };

  const currentRole = roleConfigs[activeRole] || roleConfigs.all;
  const RoleIcon = currentRole.icon;

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between z-30 sticky top-0 shrink-0">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenRoleModal}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          title="Switch Persona"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-slate-800 transition-colors">
            WP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 text-base">
                Waypoint
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md">
                Corridor Intelligence
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              Sea to Warehouse Door Synchronization
            </p>
          </div>
        </button>
      </div>

      {/* Middle: Universal Search Box */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search container, vessel, port, or truck (e.g. SHP-8821, Eastern, TK-307)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs py-2 pl-9 pr-8 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Role Switcher, Guide, Alerts */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Persona / Role Selector Button */}
        <button
          onClick={onOpenRoleModal}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all shadow-2xs"
          title="Switch Persona Workspace"
        >
          <RoleIcon className={`w-4 h-4 ${currentRole.color} shrink-0`} />
          <span className="max-w-[120px] sm:max-w-[160px] truncate">
            {currentRole.label}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </button>

        {/* Guide / Explanation Button */}
        <button
          onClick={onOpenGuideModal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
          title="How Waypoint Works"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden lg:inline">How It Works</span>
        </button>

        {/* Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{timeString}</span>
        </div>

        {/* Alerts Trigger */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          title="Corridor Alerts"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {alertCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Expandable Search */}
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-3 bg-white border-b border-slate-200 shadow-md md:hidden z-30">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search container, vessel, port, or truck..."
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
              className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs py-2 pl-9 pr-8 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white"
            />
            <button
              onClick={() => {
                handleClearSearch();
                setIsMobileSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
