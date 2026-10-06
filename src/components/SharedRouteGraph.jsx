import React, { useState } from 'react';
import { SHARED_CORRIDOR_GRAPH, PORTS, VESSELS, FLEET_TRUCKS, WAREHOUSES } from '../data/mockData';
import { Ship, Anchor, Truck, Building2, ArrowRight, ArrowDown, AlertTriangle, CheckCircle, Clock, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Shared Route Graph: Sea to Warehouse Door
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                A single connected corridor timeline linking Sea, Port, Highway, and Receiving Hub
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onTriggerImpactView}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Simulate Bottleneck Impact</span>
        </button>
      </div>

      {/* Narrative Concept Card */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs text-xs text-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-lg shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">How the Shared Corridor Works</div>
            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
              When a ship slows down or a port gets congested, traditional supply chains fail because parties operate in disconnected silos. In Waypoint, <strong>all 4 physical stages are connected on one live graph</strong> — automatically updating truck dispatch, cold chamber staging, and customer delivery ETAs.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Pipeline Cards */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-700 px-1">
          CORRIDOR STAGES (CLICK TO INSPECT NODE)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNodeIndex === index;

            return (
              <div
                key={node.id}
                onClick={() => {
                  setSelectedNodeIndex(index);
                  if (onSelectAsset) onSelectAsset({ ...node.data, assetType: node.entityType });
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  {/* Step Badge & Layer */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                        {node.stepNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {node.layer}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      node.statusType === 'critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      node.statusType === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  {/* Title & Sub */}
                  <div className="font-bold text-slate-900 text-sm mt-1">
                    {node.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {node.sub}
                  </div>

                  {/* Telemetry Box */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Live Telemetry:</div>
                    <div className="font-medium text-slate-800 mt-0.5">{node.telemetry}</div>
                  </div>
                </div>

                {/* Risk Warning */}
                {node.risk && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-rose-600 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span className="line-clamp-2">{node.risk}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Detailed Inspector */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Stage {activeNode.stepNumber}: {activeNode.layer} Inspector
            </span>
          </div>

          <span className="text-xs text-slate-600 font-semibold">
            Active Entity: <strong className="text-slate-900">{activeNode.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Current Status & Dwell</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{activeNode.status}</div>
            <div className="text-xs text-blue-700 mt-1 font-medium">{activeNode.dwell}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Cargo in Custody</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{activeNode.cargo}</div>
            <div className="text-xs text-emerald-700 mt-1 font-medium">Direct Custody Synchronized</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Downstream Graph Coupling</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">Automated Schedule Resync</div>
            <div className="text-xs text-slate-500 mt-1">Zero Blind Delays for Warehouse</div>
          </div>
        </div>
      </div>
    </div>
  );
}
