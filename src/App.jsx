import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { KpiStrip } from './components/KpiStrip';
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
        title: 'CONTAINER FOUND',
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
      title: 'CARGO OWNER / IMPORTER WORKSPACE',
      desc: 'Displaying your 4 active consignments, live container dwell, dynamic ETAs, and customs clearances.',
      badge: 'CUSTOMIZED DATA',
      bg: 'bg-sky-50 border-sky-200 text-sky-900',
      icon: Package
    },
    port: {
      title: 'PORT OPERATIONS & BERTH INTELLIGENCE WORKSPACE',
      desc: 'Surveilling Visakhapatnam, Chennai, Krishnapatnam, and Paradip terminals with 72h predictive dwell.',
      badge: 'PORT OPS FOCUS',
      bg: 'bg-red-50 border-red-200 text-red-900',
      icon: Anchor
    },
    fleet: {
      title: 'FLEET DISPATCH & BACKHAUL ENGINE WORKSPACE',
      desc: 'Managing 184 active corridor trucks, with 11 immediate backhaul load matches to eliminate deadhead miles.',
      badge: 'DISPATCH FOCUS',
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: Truck
    },
    coldchain: {
      title: 'COLD-CHAIN SURVEILLANCE & REEFER CONTROL WORKSPACE',
      desc: 'Live IoT thermal curves for sensitive biologics, vaccines, and frozen perishables with excursion overrides.',
      badge: 'SURVEILLANCE ACTIVE',
      bg: 'bg-cyan-50 border-cyan-200 text-cyan-900',
      icon: ThermometerSnowflake
    }
  };

  const activeBanner = roleBanners[activeRole];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F8F9FA] text-[#0F172A] font-sans antialiased selection:bg-[#0D3B66] selection:text-white">
      {/* Top Technical Header */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onSearch={handleSearch}
        alertCount={getAlertCountByRole()}
        onOpenAlerts={() => setActiveTab('alerts')}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
      />

      {/* Control-Room Operational KPI Strip */}
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
          <div className="flex-1 h-full overflow-hidden p-2 sm:p-3 pb-16 md:pb-3 flex flex-col min-w-0">
            {/* Role Context Notification Bar (When a specific persona is chosen) */}
            {activeBanner && (
              <div className={`mb-2.5 px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between gap-2 shrink-0 ${activeBanner.bg}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <activeBanner.icon className="w-4 h-4 shrink-0" />
                  <div className="truncate">
                    <strong className="mr-1">{activeBanner.title}:</strong>
                    <span className="text-[11px] opacity-90 hidden sm:inline">{activeBanner.desc}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-white/80 rounded border border-current">
                    {activeBanner.badge}
                  </span>
                  <button
                    onClick={() => setIsRoleModalOpen(true)}
                    className="underline text-[10.5px] font-bold hover:opacity-80"
                  >
                    Switch
                  </button>
                </div>
              </div>
            )}

            {/* Overview / GIS Map View */}
            {activeTab === 'overview' && (
              <div className="flex-1 flex flex-col h-full bg-white border border-[#CBD5E1] rounded-lg overflow-hidden relative shadow-xs">
                {/* Map Control Bar */}
                <div className="px-3 py-2 bg-white border-b border-[#E2E8F0] flex items-center justify-between z-10 shrink-0 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping"></span>
                    <span className="font-bold text-[#0F172A] text-xs sm:text-sm">EAST COAST FREIGHT CORRIDOR GIS MAP</span>
                    <span className="hidden sm:inline text-[#64748B]">/ Sea to Warehouse Door</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsContextPanelOpen(!isContextPanelOpen)}
                      className={`px-2 py-1 rounded border text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                        isContextPanelOpen ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0D3B66]' : 'bg-white border-[#CBD5E1] text-[#64748B]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isContextPanelOpen ? 'HIDE INSPECTOR' : 'INSPECT ASSET'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab(activeRole === 'cargo_owner' ? 'shipments' : 'graph')}
                      className="px-2.5 py-1 bg-[#0D3B66] text-white rounded text-[11px] font-bold hover:bg-[#0A2E50] transition-colors cursor-pointer"
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
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[400] w-[95%] max-w-4xl bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded-lg p-2.5 shadow-xl font-mono text-xs text-white hidden md:block">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#334155] text-[10px] text-[#94A3B8]">
                      <span className="font-bold uppercase tracking-wider text-[#38BDF8]">
                        ACTIVE CORRIDOR PIPELINE (VIZAG ➔ HYDERABAD)
                      </span>
                      <span>CLICK ANY NODE TO INSPECT</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {/* Sea Node */}
                      <button
                        onClick={() => handleSelectAsset({ ...VESSELS[0], assetType: 'vessel' })}
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-[#475569] text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[9px] text-[#94A3B8]">
                          <span className="flex items-center gap-1"><Ship className="w-3 h-3 text-[#38BDF8]" /> SEA</span>
                          <span className="text-amber-400 font-bold">14.2 kts</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-0.5">MV EASTERN PEARL</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">ETA: 23:45 IST</div>
                      </button>

                      {/* Port Node */}
                      <button
                        onClick={() => handleSelectAsset({ ...PORTS[0], assetType: 'port' })}
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-red-500/60 text-left transition-colors relative cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="flex items-center gap-1 text-[#94A3B8]"><Anchor className="w-3 h-3 text-red-400" /> PORT</span>
                          <span className="bg-red-500 text-white font-bold px-1 rounded text-[8px]">81% PEAK</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-0.5">VISAKHAPATNAM</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">7 Vessels Queue</div>
                      </button>

                      {/* Land Node */}
                      <button
                        onClick={() => handleSelectAsset({ ...FLEET_TRUCKS[2], assetType: 'truck' })}
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-red-500/60 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="flex items-center gap-1 text-[#94A3B8]"><Truck className="w-3 h-3 text-[#F59E0B]" /> LAND</span>
                          <span className="text-red-400 font-bold text-[8px]">HOLD (+7.9°C)</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-0.5">TRUCK TK-307</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">NH-65 Corridor</div>
                      </button>

                      {/* Warehouse Node */}
                      <button
                        onClick={() => handleSelectAsset({ ...WAREHOUSES[0], assetType: 'warehouse' })}
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-emerald-500/60 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[9px] text-[#94A3B8]">
                          <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-[#10B981]" /> WAREHOUSE</span>
                          <span className="text-emerald-400 font-bold text-[8px]">READY</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-0.5">HYDERABAD WH</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">Genome Valley Hub</div>
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
