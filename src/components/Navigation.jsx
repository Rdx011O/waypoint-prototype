import React from 'react';
import { 
  LayoutDashboard, 
  GitFork, 
  Anchor, 
  Ship, 
  Truck, 
  Repeat, 
  ThermometerSnowflake, 
  Bell, 
  Activity, 
  BarChart3,
  Package,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export const ALL_NAV_ITEMS = [
  { id: 'overview', label: 'Command Center', icon: LayoutDashboard, category: 'CORE', color: 'text-[#007AFF] bg-blue-50' },
  { id: 'shipments', label: 'My Shipments', icon: Package, category: 'CARGO', badge: '4 Units', highlight: true, color: 'text-[#5856D6] bg-indigo-50' },
  { id: 'graph', label: 'Sea-to-Door Graph', icon: GitFork, category: 'CORE', badge: 'Corridor', color: 'text-[#007AFF] bg-blue-50' },
  { id: 'ports', label: 'Port Intelligence', icon: Anchor, category: 'HARBOUR', alert: '81% Peak', color: 'text-[#FF3B30] bg-rose-50' },
  { id: 'vessels', label: 'Ship Radar & AIS', icon: Ship, category: 'HARBOUR', color: 'text-[#007AFF] bg-sky-50' },
  { id: 'fleet', label: 'Highway Fleet', icon: Truck, category: 'LAND', color: 'text-[#34C759] bg-emerald-50' },
  { id: 'backhaul', label: 'Backhaul Matching', icon: Repeat, category: 'LAND', badge: '11 Matches', color: 'text-[#34C759] bg-emerald-50' },
  { id: 'coldchain', label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, category: 'CARGO', alert: '1 Excursion', color: 'text-[#30B0C7] bg-teal-50' },
  { id: 'impact', label: 'Impact Simulator', icon: Activity, category: 'SIMULATION', color: 'text-[#FF9500] bg-amber-50' },
  { id: 'alerts', label: 'Corridor Alerts', icon: Bell, category: 'MONITORING', badge: '4', color: 'text-[#FF3B30] bg-rose-50' },
  { id: 'analytics', label: 'Corridor Analytics', icon: BarChart3, category: 'MONITORING', color: 'text-[#5856D6] bg-indigo-50' },
];

export function Navigation({ activeTab, setActiveTab, activeRole = 'all' }) {
  let visibleNavItems = ALL_NAV_ITEMS;

  if (activeRole === 'cargo_owner') {
    visibleNavItems = [
      { id: 'shipments', label: 'My Shipments', icon: Package, highlight: true, badge: '4 Units', color: 'text-[#5856D6] bg-indigo-50' },
      { id: 'overview', label: 'Corridor GIS Map', icon: LayoutDashboard, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'graph', label: 'Sea-to-Door Graph', icon: GitFork, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'coldchain', label: 'Reefer Telemetry', icon: ThermometerSnowflake, alert: '1 Near Limit', color: 'text-[#30B0C7] bg-teal-50' },
      { id: 'alerts', label: 'My Alerts', icon: Bell, alert: '2 Delays', color: 'text-[#FF3B30] bg-rose-50' },
      { id: 'analytics', label: 'Delivery Analytics', icon: BarChart3, color: 'text-[#5856D6] bg-indigo-50' }
    ];
  } else if (activeRole === 'port') {
    visibleNavItems = [
      { id: 'ports', label: 'Port & Berths', icon: Anchor, alert: '81% Peak', highlight: true, color: 'text-[#FF3B30] bg-rose-50' },
      { id: 'vessels', label: 'Inbound Ships', icon: Ship, color: 'text-[#007AFF] bg-sky-50' },
      { id: 'overview', label: 'Harbour Map', icon: LayoutDashboard, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'graph', label: 'Corridor Route Graph', icon: GitFork, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'impact', label: 'Bottleneck Cascade', icon: Activity, color: 'text-[#FF9500] bg-amber-50' },
      { id: 'alerts', label: 'Harbour Alerts', icon: Bell, color: 'text-[#FF3B30] bg-rose-50' },
      { id: 'analytics', label: 'Dwell Analytics', icon: BarChart3, color: 'text-[#5856D6] bg-indigo-50' }
    ];
  } else if (activeRole === 'fleet') {
    visibleNavItems = [
      { id: 'fleet', label: 'Fleet Dispatch', icon: Truck, highlight: true, color: 'text-[#34C759] bg-emerald-50' },
      { id: 'backhaul', label: 'Backhaul Matching', icon: Repeat, badge: '11 Matches', color: 'text-[#34C759] bg-emerald-50' },
      { id: 'overview', label: 'Highway Fleet Map', icon: LayoutDashboard, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'graph', label: 'Corridor Graph', icon: GitFork, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'alerts', label: 'Fleet Alerts', icon: Bell, color: 'text-[#FF3B30] bg-rose-50' },
      { id: 'analytics', label: 'Deadhead Analytics', icon: BarChart3, color: 'text-[#5856D6] bg-indigo-50' }
    ];
  } else if (activeRole === 'coldchain') {
    visibleNavItems = [
      { id: 'coldchain', label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, alert: '1 Excursion', highlight: true, color: 'text-[#30B0C7] bg-teal-50' },
      { id: 'shipments', label: 'Pharma & Food Cargo', icon: Package, color: 'text-[#5856D6] bg-indigo-50' },
      { id: 'overview', label: 'Corridor Map', icon: LayoutDashboard, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'graph', label: 'Route Graph', icon: GitFork, color: 'text-[#007AFF] bg-blue-50' },
      { id: 'alerts', label: 'Thermal Alerts', icon: Bell, alert: 'Critical', color: 'text-[#FF3B30] bg-rose-50' },
      { id: 'analytics', label: 'Sensor Analytics', icon: BarChart3, color: 'text-[#5856D6] bg-indigo-50' }
    ];
  }

  const roleLabels = {
    all: 'Unified Control Tower',
    cargo_owner: 'Importer Workspace',
    port: 'Port Operations',
    fleet: 'Fleet Dispatch',
    coldchain: 'Cold-Chain Surveillance'
  };

  const handleNavClick = (id) => {
    playIosChime('tap');
    setActiveTab(id);
  };

  return (
    <>
      {/* Desktop iOS Sidebar */}
      <aside className="hidden md:flex flex-col w-56 xl:w-64 bg-white/70 backdrop-blur-xl border-r border-black/[0.06] shrink-0 h-full overflow-y-auto select-none p-3 space-y-3">
        {/* Workspace Tag Pill */}
        <div className="px-3 py-2 rounded-2xl bg-slate-100/80 border border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {roleLabels[activeRole] || 'Control Tower'}
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 bg-white text-slate-700 rounded-full font-bold shadow-2xs">
            LIVE
          </span>
        </div>

        {/* Nav Items List */}
        <nav className="flex-1 space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer ios-btn ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                } ${item.highlight && !isActive ? 'bg-[#007AFF]/5 text-[#007AFF] border border-[#007AFF]/20' : ''}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-6 h-6 rounded-xl flex items-center justify-center transition-transform ${
                    isActive ? 'bg-white/20 text-white' : item.color || 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  {item.alert && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-[#FF3B30] text-white' : 'bg-[#FF3B30]/15 text-[#FF3B30]'
                    }`}>
                      {item.alert}
                    </span>
                  )}
                  {item.badge && !item.alert && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70 shrink-0" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom iOS Habit Insight Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border border-blue-100/80 text-xs shadow-2xs">
          <div className="flex items-center justify-between font-bold text-slate-900 text-[11px] mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
              Corridor Sync
            </span>
            <span className="text-[10px] font-mono text-[#007AFF] font-extrabold">98.4%</span>
          </div>
          <p className="text-[10.5px] text-slate-600 leading-snug">
            {activeRole === 'cargo_owner' 
              ? '4 containers tracked sea-to-door.' 
              : 'Zero empty deadheads on NH-65 corridor today.'}
          </p>
        </div>
      </aside>

      {/* Mobile iOS Floating Bottom Glass Navigation Bar */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className="ios-glass-dark rounded-full px-2 py-1.5 flex items-center justify-around shadow-2xl border border-white/20">
          {visibleNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-full text-[9.5px] font-bold transition-all relative ios-btn cursor-pointer ${
                  isActive ? 'text-white bg-white/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white scale-110' : 'text-slate-400'} transition-transform`} />
                <span className="truncate max-w-[56px]">{item.label.split(' ')[0]}</span>
                {item.alert && (
                  <span className="absolute top-0.5 right-1.5 w-2 h-2 rounded-full bg-[#FF3B30] animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
