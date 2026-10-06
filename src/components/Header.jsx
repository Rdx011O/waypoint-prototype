import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  Bell, 
  Shield, 
  Layers, 
  RefreshCw, 
  ChevronDown, 
  HelpCircle, 
  X,
  Package,
  Anchor,
  Truck,
  ThermometerSnowflake,
  Sparkles
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
      const istTime = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const utcTime = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
      setTimeString(`${istTime} IST • ${utcTime} UTC`);
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
    all: { label: 'Control Tower (All)', icon: Layers, color: 'text-[#0D3B66]' },
    cargo_owner: { label: 'Cargo Owner', icon: Package, color: 'text-[#0284C7]' },
    port: { label: 'Port Operations', icon: Anchor, color: 'text-[#DC2626]' },
    fleet: { label: 'Fleet & Backhaul', icon: Truck, color: 'text-[#059669]' },
    coldchain: { label: 'Cold-Chain', icon: ThermometerSnowflake, color: 'text-[#086788]' }
  };

  const currentRoleConfig = roleConfigs[activeRole] || roleConfigs.all;
  const RoleIcon = currentRoleConfig.icon;

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-3 sm:px-4 py-2 flex items-center justify-between z-30 sticky top-0 shrink-0 font-mono">
      {/* Left: Brand & Corridor Identity */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button 
          onClick={onOpenRoleModal}
          className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity focus:outline-none"
          title="Switch Operational Workspace Role"
        >
          <div className="w-8 h-8 rounded bg-[#0D3B66] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm ring-1 ring-[#38BDF8]/30">
            WP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-[#0F172A] text-sm md:text-base">
                WAYPOINT
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9.5px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] rounded">
                v2.4
              </span>
            </div>
            <div className="text-[10px] text-[#64748B] hidden lg:block leading-tight">
              East Coast Corridor • Sea to Warehouse Door
            </div>
          </div>
        </button>

        <div className="hidden 2xl:flex items-center ml-2 pl-3 border-l border-[#E2E8F0] gap-1.5 text-[11px] text-[#64748B]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#059669]"></span>
          <span>17°41'N 83°13'E (VIZAG)</span>
        </div>
      </div>

      {/* Middle: Universal Search Box (Desktop & Tablet) */}
      <div className="flex-1 max-w-sm lg:max-w-md mx-2 sm:mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search container, vessel, port, truck (e.g. SHP-8821, Eastern, TK-307)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#F8F9FA] border border-[#CBD5E1] rounded text-xs py-1.5 pl-8 pr-7 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D3B66] focus:bg-white transition-all font-mono"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Role Selector, Guide, Time, Alerts */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden p-1.5 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Role Selector Button (Visible on all frames) */}
        <button
          onClick={onOpenRoleModal}
          className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-semibold text-[#0F172A] bg-[#F8F9FA] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-all shadow-2xs"
          title="Switch Operational Persona & Workspace"
        >
          <RoleIcon className={`w-3.5 h-3.5 ${currentRoleConfig.color} shrink-0`} />
          <span className="text-[11px] max-w-[100px] sm:max-w-[140px] truncate">
            {currentRoleConfig.label}
          </span>
          <ChevronDown className="w-3 h-3 text-[#64748B] shrink-0" />
        </button>

        {/* "How It Works" / Guide Button */}
        <button
          onClick={onOpenGuideModal}
          className="hidden sm:flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-[#0D3B66] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded transition-colors"
          title="How Waypoint Works & Freight Glossary"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">GUIDE & GLOSSARY</span>
        </button>

        {/* Live Clock (Large screens) */}
        <div className="hidden xl:flex items-center gap-1.5 px-2 py-1 text-[10.5px] font-mono text-[#475569] bg-[#F8F9FA] border border-[#E2E8F0] rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
          <span>{timeString}</span>
        </div>

        {/* Operational Alerts Trigger */}
        <button
          onClick={onOpenAlerts}
          className="relative p-1.5 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors"
          title="Corridor Exception Alerts"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1 min-w-[16px] h-4 bg-[#DC2626] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {alertCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-2 bg-white border-b border-[#CBD5E1] shadow-md md:hidden z-30">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search container, vessel, port, truck..."
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
              className="w-full bg-[#F8F9FA] border border-[#CBD5E1] rounded text-xs py-1.5 pl-8 pr-7 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D3B66] font-mono"
            />
            <button
              onClick={() => {
                handleClearSearch();
                setIsMobileSearchOpen(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
