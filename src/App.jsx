import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { KpiStrip } from './components/KpiStrip';
import { DynamicIslandHabitBar } from './components/DynamicIslandHabitBar';
import { MapView } from './components/MapView';
import { SharedRouteGraph } from './components/SharedRouteGraph';
import { PortIntelligenceView } from './components/PortIntelligenceView';
import { VesselIntelligenceView } from './components/VesselIntelligenceView';
import { FleetView } from './components/FleetView';
import { BackhaulMatchingView } from './components/BackhaulMatchingView';
import { ColdChainView } from './components/ColdChainView';
import { NetworkImpactView } from './components/NetworkImpactView';
import { AlertsView } from './components/AlertsView';
import { AnalyticsView } from './components/AnalyticsView';
import { CargoOwnerView } from './components/CargoOwnerView';
import { ContextPanel } from './components/ContextPanel';
import { RoleWorkspaceModal } from './components/RoleWorkspaceModal';
import { GuideModal } from './components/GuideModal';
import { ToastProvider, useToast } from './components/ToastNotification';
import { PORTS, VESSELS, FLEET_TRUCKS, WAREHOUSES, ALERTS, CARGO_OWNER_SHIPMENTS } from './data/mockData';
import { 
  Ship, 
  Anchor, 
  Truck, 
  Building2, 
  ArrowRight, 
  Layers, 
  SlidersHorizontal, 
  Eye, 
  Package, 
  ThermometerSnowflake,
  Repeat,
  Activity,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRole, setActiveRole] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(PORTS[0]);
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState('congestion');
  const [highlightedCorridor, setHighlightedCorridor] = useState('CORRIDOR-VIZAG-HYD');
  const { addToast } = useToast();

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setIsContextPanelOpen(true);
  };

  const handleSearch = (query) => {
    if (!query || query.trim() === '') return;
    const q = query.toLowerCase();

    // Check shipments / containers
    const foundShipment = CARGO_OWNER_SHIPMENTS.find(s => 
      s.id.toLowerCase().includes(q) || 
      s.containerId.toLowerCase().includes(q) || 
      s.consignee.toLowerCase().includes(q) ||
      s.product.toLowerCase().includes(q)
    );
    if (foundShipment) {
      handleSelectAsset({ ...foundShipment, assetType: 'shipment' });
      setActiveTab('shipments');
      addToast({
        type: 'info',
        title: 'CONTAINER LOCATED',
        message: `Located ${foundShipment.id} (${foundShipment.containerId}) for ${foundShipment.consignee}.`
      });
      return;
    }

    // Check ports
    const foundPort = PORTS.find(p => p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    if (foundPort) {
      handleSelectAsset({ ...foundPort, assetType: 'port' });
      setActiveTab('ports');
      return;
    }

    // Check vessels
    const foundVessel = VESSELS.find(v => v.name.toLowerCase().includes(q) || v.imo.toLowerCase().includes(q));
    if (foundVessel) {
      handleSelectAsset({ ...foundVessel, assetType: 'vessel' });
      setActiveTab('vessels');
      return;
    }

    // Check trucks
    const foundTruck = FLEET_TRUCKS.find(t => t.id.toLowerCase().includes(q) || t.driver.toLowerCase().includes(q));
    if (foundTruck) {
      handleSelectAsset({ ...foundTruck, assetType: 'truck' });
      setActiveTab('fleet');
      return;
    }
  };

  const handleMetricClick = (tabName, metricId) => {
    setActiveMetric(metricId);
    setActiveTab(tabName);
  };

  const handleTriggerImpactView = () => {
    setActiveTab('impact');
  };

  const handleRoleSelect = (role) => {
    setActiveRole(role);
    if (role === 'cargo_owner') setActiveTab('shipments');
    else if (role === 'port') setActiveTab('ports');
    else if (role === 'fleet') setActiveTab('fleet');
    else if (role === 'coldchain') setActiveTab('coldchain');
    else setActiveTab('overview');
  };

  // Dynamic alert count by role
  const getAlertCountByRole = () => {
    if (activeRole === 'cargo_owner') return 2;
    if (activeRole === 'coldchain') return 1;
    if (activeRole === 'port') return 1;
    if (activeRole === 'fleet') return 1;
    return 4;
  };

  const roleBanners = {
    cargo_owner: {
      title: 'Cargo Owner & Importer Workspace',
      desc: 'Displaying 4 active consignments, live container dwell, dynamic ETAs, and customs clearances.',
      badge: 'CUSTOMIZED DATA',
      bg: 'bg-indigo-50/80 border-indigo-200 text-indigo-950',
      icon: Package
    },
    port: {
      title: 'Port Operations & Berth Intelligence',
      desc: 'Surveilling Visakhapatnam, Chennai, Krishnapatnam, and Paradip with 72h predictive dwell.',
      badge: 'PORT OPS FOCUS',
      bg: 'bg-rose-50/80 border-rose-200 text-rose-950',
      icon: Anchor
    },
    fleet: {
      title: 'Fleet Dispatch & Backhaul Engine',
      desc: 'Managing 184 active corridor trucks, with 11 immediate backhaul load matches to eliminate deadhead runs.',
      badge: 'DISPATCH FOCUS',
      bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
      icon: Truck
    },
    coldchain: {
      title: 'Cold-Chain Surveillance & Reefer Control',
      desc: 'Live IoT thermal curves for sensitive biologics, vaccines, and frozen perishables with override controls.',
      badge: 'SURVEILLANCE ACTIVE',
      bg: 'bg-teal-50/80 border-teal-200 text-teal-950',
      icon: ThermometerSnowflake
    }
  };

  const activeBanner = roleBanners[activeRole];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F2F4F7] text-[#0F172A] font-sans antialiased selection:bg-[#007AFF] selection:text-white">
      {/* Top iOS Header */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onSearch={handleSearch}
        alertCount={getAlertCountByRole()}
        onOpenAlerts={() => setActiveTab('alerts')}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
      />

      {/* iOS Dynamic Island & Habit Hub */}
      <DynamicIslandHabitBar
        activeRole={activeRole}
        onSelectTab={(tab) => setActiveTab(tab)}
        onTriggerImpact={handleTriggerImpactView}
      />

      {/* iOS Operational Metric Widgets */}
      <KpiStrip
        activeMetric={activeMetric}
        onMetricClick={handleMetricClick}
        activeRole={activeRole}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation Sidebar */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeRole={activeRole}
        />

        {/* Main Stage Canvas */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-w-0">
          {/* Active View Container */}
          <div className="flex-1 h-full overflow-hidden p-2 sm:p-3.5 pb-20 md:pb-3.5 flex flex-col min-w-0">
            {/* Role Context Notification Bar */}
            {activeBanner && (
              <div className={`mb-3 px-4 py-2 rounded-2xl border text-xs flex items-center justify-between gap-2 shrink-0 shadow-2xs ${activeBanner.bg}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1 rounded-lg bg-white/80 shrink-0">
                    <activeBanner.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <strong className="mr-1 font-bold">{activeBanner.title}:</strong>
                    <span className="text-[11.5px] opacity-80 hidden sm:inline">{activeBanner.desc}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9.5px] font-extrabold px-2 py-0.5 bg-white/90 rounded-full border border-black/5 shadow-2xs">
                    {activeBanner.badge}
                  </span>
                  <button
                    onClick={() => setIsRoleModalOpen(true)}
                    className="text-[11px] font-bold text-[#007AFF] hover:underline cursor-pointer"
                  >
                    Switch
                  </button>
                </div>
              </div>
            )}

            {/* Overview / GIS Map View */}
            {activeTab === 'overview' && (
              <div className="flex-1 flex flex-col h-full bg-white border border-black/[0.06] rounded-3xl overflow-hidden relative shadow-sm">
                {/* Map Control Bar */}
                <div className="px-4 py-2.5 bg-white/90 backdrop-blur-md border-b border-black/[0.06] flex items-center justify-between z-10 shrink-0 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse"></span>
                    <span className="font-extrabold text-[#0F172A] text-xs sm:text-sm tracking-tight">
                      EAST COAST FREIGHT CORRIDOR GIS MAP
                    </span>
                    <span className="hidden sm:inline text-slate-400 font-medium text-[11px]">
                      / Sea to Warehouse Door Live Telemetry
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsContextPanelOpen(!isContextPanelOpen)}
                      className={`px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ios-btn ${
                        isContextPanelOpen 
                          ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-2xs' 
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isContextPanelOpen ? 'HIDE INSPECTOR' : 'INSPECT ASSET'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab(activeRole === 'cargo_owner' ? 'shipments' : 'graph')}
                      className="px-3.5 py-1.5 bg-[#007AFF] text-white rounded-full text-[11px] font-extrabold hover:bg-blue-600 transition-colors shadow-sm ios-btn cursor-pointer"
                    >
                      {activeRole === 'cargo_owner' ? 'MY SHIPMENTS ➔' : 'CORRIDOR GRAPH ➔'}
                    </button>
                  </div>
                </div>

                {/* Hero Freight Map Container */}
                <div className="flex-1 w-full h-full relative overflow-hidden">
                  <MapView
                    selectedAsset={selectedAsset}
                    onSelectAsset={handleSelectAsset}
                    highlightedCorridor={highlightedCorridor}
                    activeRole={activeRole}
                  />

                  {/* Sleek Floating Corridor Node Bar (Bottom of Map) */}
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[400] w-[95%] max-w-4xl ios-glass-dark rounded-3xl p-3 shadow-2xl border border-white/20 text-white hidden md:block animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></span>
                        <span className="font-extrabold uppercase tracking-wider text-white">
                          SYNCHRONIZED PIPELINE (VIZAG ➔ HYDERABAD)
                        </span>
                      </div>
                      <span className="font-medium text-slate-400">TAP ANY NODE TO INSPECT TELEMETRY</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5 mt-2.5">
                      {/* Sea Node */}
                      <button
                        onClick={() => {
                          handleSelectAsset({ ...VESSELS[0], assetType: 'vessel' });
                        }}
                        className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all cursor-pointer ios-btn"
                      >
                        <div className="flex items-center justify-between text-[9.5px] text-slate-300">
                          <span className="flex items-center gap-1 font-bold text-sky-400"><Ship className="w-3 h-3" /> SEA</span>
                          <span className="text-amber-300 font-mono font-bold">14.2 kts</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-1">MV EASTERN PEARL</div>
                        <div className="text-[10px] text-slate-400 truncate">ETA: 23:45 IST</div>
                      </button>

                      {/* Port Node */}
                      <button
                        onClick={() => {
                          handleSelectAsset({ ...PORTS[0], assetType: 'port' });
                        }}
                        className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-rose-500/40 text-left transition-all relative cursor-pointer ios-btn"
                      >
                        <div className="flex items-center justify-between text-[9.5px]">
                          <span className="flex items-center gap-1 font-bold text-rose-400"><Anchor className="w-3 h-3" /> PORT</span>
                          <span className="bg-[#FF3B30] text-white font-extrabold px-1.5 py-0.2 rounded-full text-[8.5px]">81% PEAK</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-1">VISAKHAPATNAM</div>
                        <div className="text-[10px] text-rose-300 truncate">7 Vessels Queue</div>
                      </button>

                      {/* Land Node */}
                      <button
                        onClick={() => {
                          handleSelectAsset({ ...FLEET_TRUCKS[2], assetType: 'truck' });
                        }}
                        className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-500/40 text-left transition-all cursor-pointer ios-btn"
                      >
                        <div className="flex items-center justify-between text-[9.5px]">
                          <span className="flex items-center gap-1 font-bold text-amber-400"><Truck className="w-3 h-3" /> LAND</span>
                          <span className="text-amber-300 font-bold text-[8.5px]">HOLD (+7.9°C)</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-1">TRUCK TK-307</div>
                        <div className="text-[10px] text-slate-400 truncate">NH-65 Corridor</div>
                      </button>

                      {/* Warehouse Node */}
                      <button
                        onClick={() => {
                          handleSelectAsset({ ...WAREHOUSES[0], assetType: 'warehouse' });
                        }}
                        className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-500/40 text-left transition-all cursor-pointer ios-btn"
                      >
                        <div className="flex items-center justify-between text-[9.5px] text-slate-300">
                          <span className="flex items-center gap-1 font-bold text-emerald-400"><Building2 className="w-3 h-3" /> WAREHOUSE</span>
                          <span className="text-emerald-400 font-bold text-[8.5px]">READY</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-1">HYDERABAD WH</div>
                        <div className="text-[10px] text-slate-400 truncate">Genome Valley Hub</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cargo Owner / Importer Dedicated Feature Screen */}
            {activeTab === 'shipments' && (
              <CargoOwnerView
                onSelectAsset={handleSelectAsset}
                onJumpToColdChain={() => setActiveTab('coldchain')}
              />
            )}

            {activeTab === 'graph' && (
              <SharedRouteGraph
                onSelectAsset={handleSelectAsset}
                onTriggerImpactView={handleTriggerImpactView}
                isCompact={false}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'ports' && (
              <PortIntelligenceView
                onSelectAsset={handleSelectAsset}
                onTriggerImpactView={handleTriggerImpactView}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'vessels' && (
              <VesselIntelligenceView
                onSelectAsset={handleSelectAsset}
                onSelectCorridor={setHighlightedCorridor}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'fleet' && (
              <FleetView
                onSelectAsset={handleSelectAsset}
                onTriggerBackhaul={() => setActiveTab('backhaul')}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'backhaul' && (
              <BackhaulMatchingView
                onSelectAsset={handleSelectAsset}
                onAssignBackhaul={(match) => handleSelectAsset({ ...match, assetType: 'truck' })}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'coldchain' && (
              <ColdChainView
                onSelectAsset={handleSelectAsset}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'impact' && (
              <NetworkImpactView
                onSelectAsset={handleSelectAsset}
                onJumpToTab={(tab) => setActiveTab(tab)}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'alerts' && (
              <AlertsView
                onSelectAsset={handleSelectAsset}
                onJumpToTab={(tab) => setActiveTab(tab)}
                activeRole={activeRole}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView activeRole={activeRole} />
            )}
          </div>

          {/* Context Panel Drawer */}
          {isContextPanelOpen && activeTab === 'overview' && (
            <ContextPanel
              selectedAsset={selectedAsset}
              onClose={() => setIsContextPanelOpen(false)}
              onTriggerImpactView={handleTriggerImpactView}
              onJumpToTab={(tab) => setActiveTab(tab)}
            />
          )}
        </main>
      </div>

      {/* Role Workspace Modal */}
      <RoleWorkspaceModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        activeRole={activeRole}
        onSelectRole={handleRoleSelect}
      />

      {/* Guide & Glossary Modal */}
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
