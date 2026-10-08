import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Ship, 
  Anchor, 
  Truck, 
  Package, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  SlidersHorizontal, 
  FileText, 
  RotateCcw, 
  ThermometerSnowflake, 
  Repeat, 
  Activity,
  CheckCircle2,
  X,
  Compass,
  Zap,
  Clock,
  TrendingUp,
  CloudRain
} from 'lucide-react';
import { PORTS, VESSELS, FLEET_TRUCKS, CARGO_OWNER_SHIPMENTS, WAREHOUSES } from '../data/mockData';
import { playIosChime } from './DynamicIslandHabitBar';

export function CommandPalette({ 
  isOpen, 
  onClose, 
  onSelectAsset, 
  onSelectTab, 
  onOpenSandbox, 
  onOpenBriefing,
  onOpenRoleModal
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable items list
  const getItems = () => {
    const q = query.toLowerCase().trim();

    const quickActions = [
      {
        id: 'action-sandbox',
        category: 'Decision Sandbox',
        title: 'Launch "What-If" Port Rerouting Sandbox',
        subtitle: 'Simulate Visakhapatnam to Krishnapatnam vessel diversion & cost delta',
        icon: Sparkles,
        iconColor: 'text-[#5856D6]',
        action: () => onOpenSandbox && onOpenSandbox()
      },
      {
        id: 'action-briefing',
        category: 'Reporting & Intelligence',
        title: 'Generate Executive Corridor Briefing',
        subtitle: 'Printable snapshot of corridor KPIs, bottlenecks & carbon savings',
        icon: FileText,
        iconColor: 'text-[#007AFF]',
        action: () => onOpenBriefing && onOpenBriefing()
      },
      {
        id: 'action-personas',
        category: 'Workspace Modes',
        title: 'Switch Persona Workspace',
        subtitle: 'Toggle between Port Ops, Fleet Dispatch, Cold-Chain & Cargo Owner',
        icon: Layers,
        iconColor: 'text-[#34C759]',
        action: () => onOpenRoleModal && onOpenRoleModal()
      },
      {
        id: 'action-impact',
        category: 'Simulators',
        title: 'Simulate Bottleneck Propagation Cascade',
        subtitle: 'Run 16-hour port delay impact across Sea, Road, and Reefer links',
        icon: Activity,
        iconColor: 'text-[#FF3B30]',
        action: () => {
          onSelectTab && onSelectTab('impact');
        }
      }
    ];

    const navigationTabs = [
      { id: 'tab-overview', category: 'Navigation', title: 'Corridor Overview Map', subtitle: 'Interactive multi-modal East Coast radar', icon: Compass, iconColor: 'text-slate-700', action: () => onSelectTab('overview') },
      { id: 'tab-ports', category: 'Navigation', title: 'Port Congestion & Dwell', subtitle: '72h predictive dwell curves & berth queue', icon: Anchor, iconColor: 'text-[#FF3B30]', action: () => onSelectTab('ports') },
      { id: 'tab-vessels', category: 'Navigation', title: 'Vessel Timing & AIS', subtitle: 'Bay of Bengal live AIS telemetry & SOG', icon: Ship, iconColor: 'text-[#007AFF]', action: () => onSelectTab('vessels') },
      { id: 'tab-backhaul', category: 'Navigation', title: 'Backhaul Matching Engine', subtitle: '11 live freight matches to eliminate deadhead runs', icon: Repeat, iconColor: 'text-[#34C759]', action: () => onSelectTab('backhaul') },
      { id: 'tab-coldchain', category: 'Navigation', title: 'Cold-Chain Surveillance', subtitle: 'IoT temperature telemetry & safe threshold bands', icon: ThermometerSnowflake, iconColor: 'text-[#30B0C7]', action: () => onSelectTab('coldchain') },
      { id: 'tab-shipments', category: 'Navigation', title: 'Cargo Owner & Importer Portal', subtitle: 'Track container consignments & ICEGATE customs status', icon: Package, iconColor: 'text-[#5856D6]', action: () => onSelectTab('shipments') }
    ];

    const vesselItems = VESSELS.map(v => ({
      id: `vessel-${v.id}`,
      category: 'AIS Vessels',
      title: `${v.name} (${v.type})`,
      subtitle: `IMO: ${v.imo} • Speed: ${v.speedKnots} kn • Dest: ${v.destination} • ETA: ${v.etaHours}h`,
      icon: Ship,
      iconColor: 'text-[#007AFF]',
      asset: { ...v, assetType: 'vessel' }
    }));

    const portItems = PORTS.map(p => ({
      id: `port-${p.id}`,
      category: 'Ports & Terminals',
      title: `${p.name} (${p.shortName})`,
      subtitle: `Congestion: ${p.congestion}% • Berth Waiting: ${p.avgWaitHours}h • Vessels in Roads: ${p.vesselsWaiting}`,
      icon: Anchor,
      iconColor: 'text-[#FF3B30]',
      asset: { ...p, assetType: 'port' }
    }));

    const shipmentItems = CARGO_OWNER_SHIPMENTS.map(s => ({
      id: `shipment-${s.id}`,
      category: 'Cargo Consignments',
      title: `${s.product} — ${s.containerId}`,
      subtitle: `${s.origin} ➔ ${s.destination} • Status: ${s.status} • Value: ${s.declaredValue}`,
      icon: Package,
      iconColor: 'text-[#5856D6]',
      asset: { ...s, assetType: 'shipment' }
    }));

    const truckItems = FLEET_TRUCKS.map(t => ({
      id: `truck-${t.id}`,
      category: 'Fleet & Haulage',
      title: `${t.id} (${t.driver})`,
      subtitle: `${t.vehicleModel} • ${t.currentLocation} • Status: ${t.status} • Load: ${t.currentLoad}`,
      icon: Truck,
      iconColor: 'text-[#34C759]',
      asset: { ...t, assetType: 'truck' }
    }));

    if (!q) {
      return [...quickActions, ...navigationTabs.slice(0, 3), ...vesselItems.slice(0, 2), ...portItems.slice(0, 2)];
    }

    const all = [
      ...quickActions,
      ...navigationTabs,
      ...shipmentItems,
      ...vesselItems,
      ...portItems,
      ...truckItems
    ];

    return all.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  };

  const filteredItems = getItems();

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const executeItem = (item) => {
    playIosChime('tap');
    if (item.action) {
      item.action();
    } else if (item.asset) {
      if (onSelectAsset) onSelectAsset(item.asset);
      if (item.category === 'AIS Vessels' && onSelectTab) onSelectTab('vessels');
      if (item.category === 'Ports & Terminals' && onSelectTab) onSelectTab('ports');
      if (item.category === 'Cargo Consignments' && onSelectTab) onSelectTab('shipments');
      if (item.category === 'Fleet & Haulage' && onSelectTab) onSelectTab('fleet');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white/95 rounded-2xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="px-4 py-3.5 border-b border-black/[0.06] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, vessel, port, container ID, or corridor..."
            className="w-full text-sm font-medium bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-black/5">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-black/[0.03]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-40 animate-pulse" />
              <p className="font-semibold text-slate-600">No matching freight assets or commands found</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Try searching "Vizag", "MEDU", "Eastern Pearl", "What-If", or "Backhaul"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#0071E3]/10 text-[#0071E3]' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-2xs border border-black/5 shrink-0 ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold truncate ${isSelected ? 'text-[#0071E3]' : 'text-slate-900'}`}>
                          {item.title}
                        </span>
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    {isSelected && (
                      <span className="text-[10px] font-mono text-[#0071E3] flex items-center gap-1 font-semibold">
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2 bg-slate-50/80 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono bg-white rounded border border-black/10 shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono bg-white rounded border border-black/10 shadow-2xs">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono bg-white rounded border border-black/10 shadow-2xs">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">WAYPOINT Omnibox 2.0</span>
        </div>
      </div>
    </div>
  );
}
