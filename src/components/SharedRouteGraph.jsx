import React, { useState } from 'react';
import { SHARED_CORRIDOR_GRAPH, PORTS, VESSELS, FLEET_TRUCKS, WAREHOUSES } from '../data/mockData';
import { 
  Ship, 
  Anchor, 
  Truck, 
  Building2, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Layers, 
  Sparkles, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function SharedRouteGraph({ onSelectAsset, onTriggerImpactView, isCompact = false, activeRole = 'all' }) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(1); // Default to Visakhapatnam port

  const nodes = [
    {
      id: 'VES-9481',
      layer: 'Sea Transit',
      stepNumber: '1',
      entityType: 'vessel',
      title: 'MV Eastern Pearl',
      sub: 'Container Carrier • 14,800 TEU',
      icon: Ship,
      status: 'Approaching Pilot',
      statusType: 'warning',
      dwell: 'ETA: 23:45 IST',
      telemetry: 'Speed: 14.2 knots • Heading 310°',
      risk: 'Port berth queue adds 14.5h to discharge window',
      cargo: 'Pharma Batch #B29-TX (Active Reefer VC-2048)',
      data: VESSELS[0]
    },
    {
      id: 'PORT-VTZ',
      layer: 'Port Discharge',
      stepNumber: '2',
      entityType: 'port',
      title: 'Visakhapatnam Port',
      sub: 'VCTPL Terminal • Berth 02-06',
      icon: Anchor,
      status: '81% Congestion Surge',
      statusType: 'critical',
      dwell: 'Expected Dwell: 16.0 hrs',
      telemetry: '7 vessels waiting • 26 trucks staged',
      risk: 'Gate staging queue delayed by 6.2 hours',
      cargo: '3 Cold-Chain Containers prioritized',
      data: PORTS[0]
    },
    {
      id: 'TK-307',
      layer: 'Highway Haulage',
      stepNumber: '3',
      entityType: 'truck',
      title: 'Truck TK-307',
      sub: '16T Temperature-Controlled Reefer',
      icon: Truck,
      status: 'Anakapalle Gate Staged',
      statusType: 'critical',
      dwell: 'Delayed 6.2h in holding queue',
      telemetry: 'Reefer Core Temp: +7.9°C (Safe limit: 8.0°C)',
      risk: 'Compressor duty 98% under high ambient heat',
      cargo: 'Matched with Hyderabad outbound return load',
      data: FLEET_TRUCKS[2]
    },
    {
      id: 'WH-HYD-01',
      layer: 'Warehouse Receiving',
      stepNumber: '4',
      entityType: 'warehouse',
      title: 'Hyderabad Cold Hub',
      sub: 'Genome Valley Logistics Centre',
      icon: Building2,
      status: 'Dock Ready',
      statusType: 'normal',
      dwell: 'Inbound Window: +18 hrs',
      telemetry: 'Chamber 2 (2°C - 8°C) Pre-conditioned',
      risk: 'Receiving dock rescheduled automatically',
      cargo: 'Final Destination: Biocon Biologics',
      data: WAREHOUSES[0]
    }
  ];

  const activeNode = nodes[selectedNodeIndex];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Corridor Graph
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Single connected timeline from deep sea pilot to warehouse receiving dock
          </p>
        </div>

        <button
          onClick={() => {
            playIosChime('tap');
            if (onTriggerImpactView) onTriggerImpactView();
          }}
          className="apple-btn-secondary self-start sm:self-auto text-xs py-2 px-3.5 flex items-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-[#FF9500]" />
          <span>Simulate Bottleneck</span>
        </button>
      </div>

      {/* Corridor Overview Banner */}
      <div className="apple-card p-4 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1D1D1F]">Unified Corridor Synchronization</div>
            <p className="text-[11.5px] text-[#86868B] mt-0.5 leading-relaxed">
              When sea transit shifts or port dwell spikes, highway dispatch schedules and cold chamber pre-cooling automatically recalibrate to prevent demurrage and cargo spoilage.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Node Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNodeIndex === index;

          return (
            <div
              key={node.id}
              onClick={() => {
                playIosChime('tap');
                setSelectedNodeIndex(index);
                if (onSelectAsset) onSelectAsset({ ...node.data, assetType: node.entityType });
              }}
              className={`apple-card p-4 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#0071E3] shadow-md ring-2 ring-[#0071E3]/20'
                  : 'hover:border-black/20'
              }`}
            >
              <div>
                {/* Header step & status */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-black/[0.05] text-[#1D1D1F] text-[10px] font-bold flex items-center justify-center">
                      {node.stepNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-[#86868B]">
                      {node.layer}
                    </span>
                  </div>

                  <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                    node.statusType === 'critical' ? 'bg-[#FF3B30]/10 text-[#FF3B30]' :
                    node.statusType === 'warning' ? 'bg-[#FF9500]/10 text-[#FF9500]' :
                    'bg-[#34C759]/10 text-[#34C759]'
                  }`}>
                    {node.status}
                  </span>
                </div>

                <div className="text-sm font-bold text-[#1D1D1F]">
                  {node.title}
                </div>
                <div className="text-[11px] text-[#86868B] mt-0.5">
                  {node.sub}
                </div>

                {/* Telemetry pill */}
                <div className="mt-3 p-2.5 bg-black/[0.02] rounded-xl border border-black/[0.04] text-[11px]">
                  <div className="text-[9.5px] text-[#86868B] font-semibold uppercase tracking-wider">Live Telemetry</div>
                  <div className="font-semibold text-[#1D1D1F] mt-0.5">{node.telemetry}</div>
                </div>
              </div>

              {node.risk && (
                <div className="mt-3 pt-2 border-t border-black/[0.04] text-[11px] text-[#FF3B30] font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  <span className="truncate">{node.risk}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Detailed Inspector */}
      <div className="apple-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
            <span className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Stage {activeNode.stepNumber}: {activeNode.layer} Inspector
            </span>
          </div>

          <span className="text-xs text-[#86868B]">
            Inspecting: <strong className="text-[#1D1D1F] font-semibold">{activeNode.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-black/[0.02] rounded-xl border border-black/[0.04]">
            <div className="text-[10px] text-[#86868B] font-semibold uppercase">Status & Dwell</div>
            <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">{activeNode.status}</div>
            <div className="text-xs text-[#0071E3] font-semibold mt-1">{activeNode.dwell}</div>
          </div>

          <div className="p-3 bg-black/[0.02] rounded-xl border border-black/[0.04]">
            <div className="text-[10px] text-[#86868B] font-semibold uppercase">Active Consignment</div>
            <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">{activeNode.cargo}</div>
            <div className="text-xs text-[#34C759] font-semibold mt-1">Direct Custody Synchronized</div>
          </div>

          <div className="p-3 bg-black/[0.02] rounded-xl border border-black/[0.04]">
            <div className="text-[10px] text-[#86868B] font-semibold uppercase">Downstream Graph Coupling</div>
            <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">Automated Schedule Resync</div>
            <div className="text-xs text-[#86868B] mt-1">Zero Blind Delays for Warehouse</div>
          </div>
        </div>
      </div>
    </div>
  );
}

