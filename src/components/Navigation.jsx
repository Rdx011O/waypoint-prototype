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
  Sparkles
} from 'lucide-react';

export const ALL_NAV_ITEMS = [
  { id: 'overview', label: 'Command Center', icon: LayoutDashboard, category: 'CORE' },
  { id: 'shipments', label: 'My Shipments', icon: Package, category: 'CARGO', badge: '4 Units', highlight: true },
  { id: 'graph', label: 'Sea-to-Door Graph', icon: GitFork, category: 'CORE', badge: 'Corridor' },
  { id: 'ports', label: 'Port Intelligence', icon: Anchor, category: 'HARBOUR', alert: '81% Peak' },
  { id: 'vessels', label: 'Ship Radar & AIS', icon: Ship, category: 'HARBOUR' },
  { id: 'fleet', label: 'Highway Fleet', icon: Truck, category: 'LAND' },
  { id: 'backhaul', label: 'Backhaul Matching', icon: Repeat, category: 'LAND', badge: '11 Matches' },
  { id: 'coldchain', label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, category: 'CARGO', alert: '1 Excursion' },
  { id: 'impact', label: 'Impact Demonstration', icon: Activity, category: 'SIMULATION' },
  { id: 'alerts', label: 'Operational Alerts', icon: Bell, category: 'MONITORING', badge: '4' },
  { id: 'analytics', label: 'Corridor Analytics', icon: BarChart3, category: 'MONITORING' },
];

export function Navigation({ activeTab, setActiveTab, activeRole = 'all' }) {
  let visibleNavItems = ALL_NAV_ITEMS;

  if (activeRole === 'cargo_owner') {
    visibleNavItems = [
      { id: 'shipments', label: 'My Shipments', icon: Package, highlight: true, badge: '4 Units' },
      { id: 'overview', label: 'Corridor GIS Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Sea-to-Door Graph', icon: GitFork },
      { id: 'coldchain', label: 'Reefer Telemetry', icon: ThermometerSnowflake, alert: '1 Near Limit' },
      { id: 'alerts', label: 'My Alerts', icon: Bell, alert: '2 Delays' },
      { id: 'analytics', label: 'Delivery Analytics', icon: BarChart3 }
    ];
  } else if (activeRole === 'port') {
    visibleNavItems = [
      { id: 'ports', label: 'Port & Berths', icon: Anchor, alert: '81% Peak', highlight: true },
      { id: 'vessels', label: 'Inbound Ships', icon: Ship },
      { id: 'overview', label: 'Harbour Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Corridor Route Graph', icon: GitFork },
      { id: 'impact', label: 'Bottleneck Cascade', icon: Activity },
      { id: 'alerts', label: 'Harbour Alerts', icon: Bell },
      { id: 'analytics', label: 'Dwell Analytics', icon: BarChart3 }
    ];
  } else if (activeRole === 'fleet') {
    visibleNavItems = [
      { id: 'fleet', label: 'Fleet Dispatch', icon: Truck, highlight: true },
      { id: 'backhaul', label: 'Backhaul Matching', icon: Repeat, badge: '11 Matches' },
      { id: 'overview', label: 'Highway Fleet Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Corridor Graph', icon: GitFork },
      { id: 'alerts', label: 'Fleet Alerts', icon: Bell },
      { id: 'analytics', label: 'Deadhead Analytics', icon: BarChart3 }
    ];
  } else if (activeRole === 'coldchain') {
    visibleNavItems = [
      { id: 'coldchain', label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, alert: '1 Excursion', highlight: true },
      { id: 'shipments', label: 'Pharma & Food Shipments', icon: Package },
      { id: 'overview', label: 'Corridor Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Route Graph', icon: GitFork },
      { id: 'alerts', label: 'Thermal Alerts', icon: Bell, alert: 'Critical' },
      { id: 'analytics', label: 'Sensor Analytics', icon: BarChart3 }
    ];
  }

  const roleLabels = {
    all: 'Unified Control Tower',
    cargo_owner: 'Importer Workspace',
    port: 'Port Operations',
    fleet: 'Fleet Dispatch',
    coldchain: 'Cold-Chain Surveillance'
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 xl:w-64 bg-white border-r border-slate-200 shrink-0 h-full overflow-y-auto select-none">
        {/* Workspace Tag */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            WORKSPACE
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-semibold">
            {roleLabels[activeRole] || 'Control Tower'}
          </span>
        </div>

        {/* Nav Items List */}
        <nav className="flex-1 px-2.5 py-3 space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                } ${item.highlight && !isActive ? 'bg-blue-50/70 text-blue-900 border border-blue-100' : ''}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  {item.alert && (
                    <span className={`text-[9.5px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.alert}
                    </span>
                  )}
                  {item.badge && !item.alert && (
                    <span className={`text-[9.5px] px-1.5 py-0.5 rounded-md font-medium ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/60 shrink-0" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Helper Box */}
        <div className="p-3 m-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
          <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] mb-1">
            <span>Synchronized Pipeline</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            {activeRole === 'cargo_owner' 
              ? '4 shipments actively tracked'
              : 'Sea ➔ Port ➔ Land ➔ Warehouse'}
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around z-40 shadow-lg">
        {visibleNavItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-medium transition-colors relative ${
                isActive ? 'text-slate-900 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
              <span className="truncate max-w-[64px]">{item.label.split(' ')[0]}</span>
              {item.alert && (
                <span className="absolute top-0.5 right-1 w-2 h-2 rounded-full bg-rose-600"></span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
