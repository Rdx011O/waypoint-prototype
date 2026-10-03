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
import { PORTS, VESSELS, FLEET_TRUCKS, WAREHOUSES, ALERTS, CARGO_OWNER_SHIPMENTS } from './data/mockData';
import { Ship, Anchor, Truck, Building2, ArrowRight, Layers, SlidersHorizontal, Eye, Package } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRole, setActiveRole] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(PORTS[0]); // default selected to Visakhapatnam port
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState('congestion');
  const [highlightedCorridor, setHighlightedCorridor] = useState('CORRIDOR-VIZAG-HYD');

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setIsContextPanelOpen(true);
  };

  const handleSearch = (query) => {
    if (!query || query.trim() === '') return;
    const q = query.toLowerCase();

    // Check shipments / containers
    const foundShipment = CARGO_OWNER_SHIPMENTS.find(s => s.id.toLowerCase().includes(q) || s.containerId.toLowerCase().includes(q) || s.consignee.toLowerCase().includes(q));
    if (foundShipment) {
      setSelectedAsset({ ...foundShipment, assetType: 'shipment' });
      setActiveTab('shipments');
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

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F8F9FA] text-[#0F172A]">
      {/* Top Technical Header */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onSearch={handleSearch}
        alertCount={activeRole === 'cargo_owner' ? 2 : 3}
        onOpenAlerts={() => setActiveTab('alerts')}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Control-Room Operational KPI Strip */}
      <KpiStrip
        activeMetric={activeMetric}
        onMetricClick={handleMetricClick}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation Sidebar (Dynamically adapts based on user role) */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
          }}
          activeRole={activeRole}
        />

        {/* Main Stage Canvas */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Active View Container */}
          <div className="flex-1 h-full overflow-hidden p-2 sm:p-3 pb-16 md:pb-3 flex flex-col">
            {activeTab === 'overview' && (
              <div className="flex-1 flex flex-col h-full bg-white border border-[#CBD5E1] rounded overflow-hidden relative shadow-xs">
                {/* Map Control Bar */}
                <div className="px-3 py-2 bg-white border-b border-[#E2E8F0] flex items-center justify-between z-10 shrink-0 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                    <span className="font-bold text-[#0F172A]">EAST COAST FREIGHT CORRIDOR GIS MAP</span>
                    <span className="hidden sm:inline text-[#64748B]">/ Sea to Warehouse Door</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsContextPanelOpen(!isContextPanelOpen)}
                      className={`px-2 py-1 rounded border text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                        isContextPanelOpen ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0D3B66]' : 'bg-white border-[#CBD5E1] text-[#64748B]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isContextPanelOpen ? 'HIDE ASSET PANEL' : 'INSPECT ASSET'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab(activeRole === 'cargo_owner' ? 'shipments' : 'graph')}
                      className="px-2.5 py-1 bg-[#0D3B66] text-white rounded text-[11px] font-bold hover:bg-[#0A2E50] transition-colors"
                    >
                      {activeRole === 'cargo_owner' ? 'TRACK MY SHIPMENTS ➔' : 'OPEN FULL GRAPH ➔'}
                    </button>
                  </div>
                </div>

                {/* Hero Freight Map Container */}
                <div className="flex-1 w-full h-full relative overflow-hidden">
                  <MapView
                    selectedAsset={selectedAsset}
                    onSelectAsset={handleSelectAsset}
                    highlightedCorridor={highlightedCorridor}
                  />

                  {/* Sleek Floating Corridor Node Bar (Bottom of Map) */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[400] w-[95%] max-w-4xl bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded-lg p-2.5 shadow-xl font-mono text-xs text-white hidden md:block">
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
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-[#475569] text-left transition-colors"
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
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-red-500/60 text-left transition-colors relative"
                      >
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="flex items-center gap-1 text-[#94A3B8]"><Anchor className="w-3 h-3 text-red-400" /> PORT</span>
                          <span className="bg-red-500 text-white font-bold px-1 rounded">81% PEAK</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-0.5">VISAKHAPATNAM</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">7 Vessels Queue</div>
                      </button>

                      {/* Land Node */}
                      <button
                        onClick={() => handleSelectAsset({ ...FLEET_TRUCKS[2], assetType: 'truck' })}
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-red-500/60 text-left transition-colors"
                      >
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="flex items-center gap-1 text-[#94A3B8]"><Truck className="w-3 h-3 text-[#F59E0B]" /> LAND</span>
                          <span className="text-red-400 font-bold">HOLD (7.9°C)</span>
                        </div>
                        <div className="font-bold text-white text-xs truncate mt-0.5">TRUCK TK-307</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">NH-65 Corridor</div>
                      </button>

                      {/* Warehouse Node */}
                      <button
                        onClick={() => handleSelectAsset({ ...WAREHOUSES[0], assetType: 'warehouse' })}
                        className="p-2 rounded bg-[#1E293B] hover:bg-[#334155] border border-emerald-500/60 text-left transition-colors"
                      >
                        <div className="flex items-center justify-between text-[9px] text-[#94A3B8]">
                          <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-[#10B981]" /> WAREHOUSE</span>
                          <span className="text-emerald-400 font-bold">READY</span>
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
              />
            )}

            {activeTab === 'ports' && (
              <PortIntelligenceView
                onSelectAsset={handleSelectAsset}
                onTriggerImpactView={handleTriggerImpactView}
              />
            )}

            {activeTab === 'vessels' && (
              <VesselIntelligenceView
                onSelectAsset={handleSelectAsset}
                onSelectCorridor={setHighlightedCorridor}
              />
            )}

            {activeTab === 'fleet' && (
              <FleetView
                onSelectAsset={handleSelectAsset}
                onTriggerBackhaul={() => setActiveTab('backhaul')}
              />
            )}

            {activeTab === 'backhaul' && (
              <BackhaulMatchingView
                onSelectAsset={handleSelectAsset}
                onAssignBackhaul={(match) => setSelectedAsset(match)}
              />
            )}

            {activeTab === 'coldchain' && (
              <ColdChainView
                onSelectAsset={handleSelectAsset}
              />
            )}

            {activeTab === 'impact' && (
              <NetworkImpactView
                onSelectAsset={handleSelectAsset}
                onJumpToTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'alerts' && (
              <AlertsView
                onSelectAsset={handleSelectAsset}
                onJumpToTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView />
            )}
          </div>

          {/* Context Panel Drawer (Desktop Right Side / Bottom overlay) */}
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
        onSelectRole={(role) => {
          setActiveRole(role);
          if (role === 'cargo_owner') setActiveTab('shipments');
          else if (role === 'port') setActiveTab('ports');
          else if (role === 'fleet') setActiveTab('fleet');
          else if (role === 'coldchain') setActiveTab('coldchain');
          else setActiveTab('overview');
        }}
      />
    </div>
  );
}
export default App;
