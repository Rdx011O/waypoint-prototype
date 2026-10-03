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
  Clock,
  AlertTriangle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ALL_NAV_ITEMS = [
  { id: 'overview', label: 'Command Center', icon: LayoutDashboard, category: 'CORE' },
  { id: 'shipments', label: 'My Shipments & Cargo', icon: Package, category: 'CARGO OWNER', badge: '4 ACTIVE', highlight: true },
  { id: 'graph', label: 'Shared Route Graph', icon: GitFork, category: 'CORE', badge: 'CORRIDOR' },
  { id: 'ports', label: 'Port Intelligence', icon: Anchor, category: 'SEA & HARBOUR', alert: '81% PEAK' },
  { id: 'vessels', label: 'Vessel Timing', icon: Ship, category: 'SEA & HARBOUR' },
  { id: 'fleet', label: 'Fleet & Haulage', icon: Truck, category: 'LAND NETWORK' },
  { id: 'backhaul', label: 'Backhaul Matching', icon: Repeat, category: 'LAND NETWORK', badge: '11 MATCH' },
  { id: 'coldchain', label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, category: 'CARGO', alert: '1 CRITICAL' },
  { id: 'impact', label: 'Network Impact Demo', icon: Activity, category: 'SIGNATURE' },
  { id: 'alerts', label: 'Operational Alerts', icon: Bell, category: 'SYSTEM', badge: '4' },
  { id: 'analytics', label: 'Corridor Analytics', icon: BarChart3, category: 'SYSTEM' },
];

export function Navigation({ activeTab, setActiveTab, activeRole = 'all' }) {
  // Filter nav items based on user role
  let visibleNavItems = ALL_NAV_ITEMS;

  if (activeRole === 'cargo_owner') {
    visibleNavItems = [
      { id: 'shipments', label: 'My Shipments (Track)', icon: Package, highlight: true, badge: '4 UNITS' },
      { id: 'overview', label: 'Corridor GIS Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Sea-to-Door Route Graph', icon: GitFork },
      { id: 'coldchain', label: 'Reefer Sensor Telemetry', icon: ThermometerSnowflake, alert: '1 RISK' },
      { id: 'alerts', label: 'My Consignment Alerts', icon: AlertTriangle, alert: '2 EXCEPTIONS' }
    ];
  } else if (activeRole === 'port') {
    visibleNavItems = [
      { id: 'ports', label: 'Port Intelligence & Berths', icon: Anchor, alert: '81% PEAK', highlight: true },
      { id: 'vessels', label: 'Inbound Vessel Queue', icon: Ship },
      { id: 'overview', label: 'Harbour GIS Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Downstream Corridor Graph', icon: GitFork },
      { id: 'impact', label: 'Port Bottleneck Impact', icon: Activity },
      { id: 'alerts', label: 'Port Alerts', icon: Bell }
    ];
  } else if (activeRole === 'fleet') {
    visibleNavItems = [
      { id: 'fleet', label: 'Fleet Dispatch & Rigs', icon: Truck, highlight: true },
      { id: 'backhaul', label: 'Backhaul Matching Engine', icon: Repeat, badge: '11 MATCH' },
      { id: 'overview', label: 'Highway Fleet Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Corridor Route Graph', icon: GitFork },
      { id: 'alerts', label: 'Fleet Alerts', icon: Bell }
    ];
  } else if (activeRole === 'coldchain') {
    visibleNavItems = [
      { id: 'coldchain', label: 'Cold-Chain Surveillance', icon: ThermometerSnowflake, alert: '1 CRITICAL', highlight: true },
      { id: 'shipments', label: 'Pharma & Food Shipments', icon: Package },
      { id: 'overview', label: 'Corridor Map', icon: LayoutDashboard },
      { id: 'graph', label: 'Shared Route Graph', icon: GitFork },
      { id: 'alerts', label: 'Excursion Alerts', icon: AlertTriangle, alert: 'CRITICAL' }
    ];
  }

  return (
    <>
      {/* Desktop & Laptop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 xl:w-64 bg-white border-r border-[#E2E8F0] shrink-0 h-full overflow-y-auto select-none font-mono">
        <div className="p-3 border-b border-[#F1F5F9] flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold px-1">
            {activeRole === 'cargo_owner' ? 'CARGO OWNER PORTAL' : 'WORKSPACE NAVIGATION'}
          </span>
          <span className="text-[9px] px-1.5 py-0.2 bg-[#F1F5F9] text-[#64748B] rounded border border-[#CBD5E1]">
            {activeRole.toUpperCase()}
          </span>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#0D3B66] text-white shadow-xs font-bold'
                    : 'text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                } ${item.highlight && !isActive ? 'border border-[#0D3B66]/20 bg-[#F0F7FF]' : ''}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-[#0D3B66]' : 'text-[#64748B]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  {item.alert && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                      isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.alert}
                    </span>
                  )}
                  {item.badge && !item.alert && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3 h-3 text-white/70 shrink-0" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Role Status Indicator in Sidebar */}
        <div className="p-3 m-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded text-[11px] text-[#64748B]">
          <div className="flex items-center justify-between text-[#0F172A] font-semibold mb-1">
            <span>{activeRole === 'cargo_owner' ? 'IMPORTER PROFILE' : 'CORRIDOR GRAPH'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
          </div>
          <div className="text-[10px] leading-tight text-[#475569]">
            {activeRole === 'cargo_owner' ? '4 Consignments Synchronized' : 'SEA ➔ PORT ➔ LAND ➔ WAREHOUSE'}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-2 py-1.5 flex items-center justify-around z-40 font-mono">
        {visibleNavItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                isActive ? 'text-[#0D3B66] font-bold' : 'text-[#64748B]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#0D3B66]' : 'text-[#94A3B8]'}`} />
              <span className="truncate max-w-[64px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
