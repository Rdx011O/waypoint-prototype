import React, { useState, useEffect } from 'react';
import { Compass, Search, Bell, Shield, Layers, RefreshCw, ChevronDown } from 'lucide-react';

export function Header({ activeRole, setActiveRole, onSearch, alertCount, onOpenAlerts, onOpenRoleModal }) {
  const [timeString, setTimeString] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const roleLabels = {
    all: 'Control Tower (All)',
    cargo_owner: 'Cargo Owner / Importer',
    port: 'Port Operations',
    fleet: 'Fleet & Backhaul',
    coldchain: 'Cold-Chain Surveillance'
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between z-30 sticky top-0 shrink-0">
      {/* Left: Brand & Corridor identity */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenRoleModal}
          className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity focus:outline-none"
          title="Switch Operational Workspace"
        >
          <div className="w-8 h-8 rounded bg-[#0D3B66] text-white flex items-center justify-center font-mono font-bold text-xs tracking-wider shadow-sm">
            WP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-[#0F172A] text-sm md:text-base font-mono">
                WAYPOINT
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] rounded">
                v2.4-PROTOTYPE
              </span>
            </div>
            <div className="text-[11px] text-[#64748B] hidden md:block">
              East Coast Corridor • Sea to Warehouse Door
            </div>
          </div>
        </button>

        <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-[#E2E8F0] gap-2 text-xs text-[#64748B] font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-[#059669]"></span>
          <span>17°41'N 83°13'E (VIZAG CORRIDOR)</span>
        </div>
      </div>

      {/* Middle: Search Box */}
      <div className="flex-1 max-w-md mx-3 hidden sm:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search IMO, vessel, port, truck (e.g. MV Eastern, TK-204, VC-2048)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#F8F9FA] border border-[#CBD5E1] rounded text-xs py-1.5 pl-8 pr-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D3B66] focus:bg-white transition-all font-mono"
          />
        </div>
      </div>

      {/* Right: Operational Role, Time, and Alerts */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Selector dropdown */}
        <button
          onClick={onOpenRoleModal}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#0F172A] bg-[#F8F9FA] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-[#0D3B66]" />
          <span className="font-mono text-[11px] max-w-[140px] truncate">{roleLabels[activeRole] || 'Workspace'}</span>
          <ChevronDown className="w-3 h-3 text-[#64748B]" />
        </button>

        {/* Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#475569] bg-[#F8F9FA] border border-[#E2E8F0] rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
          <span>{timeString}</span>
        </div>

        {/* Alert Trigger */}
        <button
          onClick={onOpenAlerts}
          className="relative p-1.5 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded transition-colors"
          title="Corridor Alerts"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1 min-w-[16px] h-4 bg-[#DC2626] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
              {alertCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
