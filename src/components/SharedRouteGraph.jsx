import React, { useState } from 'react';
import { SHARED_CORRIDOR_GRAPH, PORTS, VESSELS, FLEET_TRUCKS, WAREHOUSES } from '../data/mockData';
import { Ship, Anchor, Truck, Building2, ArrowRight, ArrowDown, AlertTriangle, CheckCircle, Clock, Zap, Layers, Sparkles } from 'lucide-react';

export function SharedRouteGraph({ onSelectAsset, onTriggerImpactView, isCompact = false, activeRole = 'all' }) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(1); // Default to Visakhapatnam port

  const nodes = [
    {
      id: 'VES-9481',
      layer: 'SEA',
      entityType: 'vessel',
      title: 'MV EASTERN PEARL',
      sub: 'IMO 9481022 • 14,800 TEU',
      icon: Ship,
      status: 'APPROACHING PILOT',
      statusType: 'warning',
      dwell: 'ETA: 23:45 IST',
      telemetry: 'Speed: 14.2 kts • Heading 310°',
      risk: '+14.5h berth delay forecast due to port queue',
      cargo: 'Pharma Batch #B29-TX (VC-2048)',
      data: VESSELS[0]
    },
    {
      id: 'PORT-VTZ',
      layer: 'PORT',
      entityType: 'port',
      title: 'VISAKHAPATNAM PORT',
      sub: 'INVTZ • Terminal 2 (Berth 02-06)',
      icon: Anchor,
      status: '81% CONGESTION PEAK (+48h)',
      statusType: 'critical',
      dwell: 'Expected Dwell: 16.0 hrs',
      telemetry: '7 vessels waiting • 26 trucks staged',
      risk: 'Gate Queue exceeding 6.2 hours',
      cargo: '3 Cold-Chain Containers at risk',
      data: PORTS[0]
    },
    {
      id: 'TK-307',
      layer: 'LAND',
      entityType: 'truck',
      title: 'TRUCK TK-307 / TK-204',
      sub: '16T Reefer / 18T Flatbed',
      icon: Truck,
      status: 'ANAKAPALLE GATE HOLD',
      statusType: 'critical',
      dwell: 'Delayed by 6.2 hrs in queue',
      telemetry: 'Reefer Temp: +7.9°C (Safe limit: 8.0°C)',
      risk: 'Compressor duty 98% • Batt: 6.5h left',
      cargo: 'Matched with Hyderabad outbound return load',
      data: FLEET_TRUCKS[2]
    },
    {
      id: 'WH-HYD-01',
      layer: 'WAREHOUSE',
      entityType: 'warehouse',
      title: 'HYDERABAD GENOME VALLEY',
      sub: 'WH-HYD-01 Central Cold Hub',
      icon: Building2,
      status: 'RECEIVING DOCK READY',
      statusType: 'normal',
      dwell: 'Inbound window: +18 hrs',
      telemetry: 'Chamber 2 (2°C - 8°C) Pre-conditioned',
      risk: 'Cold storage buffer intact',
      cargo: 'Final Destination: Biocon Oncology Biologics',
      data: WAREHOUSES[0]
    }
  ];

  const activeNode = nodes[selectedNodeIndex];

  // Compact Mode (for side widgets or small viewport overlays)
  if (isCompact) {
    return (
      <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-3 flex flex-col h-full overflow-y-auto font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0D3B66]"></span>
            <span className="font-bold text-[#0F172A] text-xs">SHARED ROUTE GRAPH</span>
          </div>
          <span className="text-[10px] text-[#64748B]">EAST COAST SPINE</span>
        </div>

        <div className="space-y-2 mt-2.5 flex-1">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNodeIndex === index;
            const isLast = index === nodes.length - 1;

            return (
              <div key={node.id} className="relative">
                <div
                  onClick={() => {
                    setSelectedNodeIndex(index);
                    if (onSelectAsset) onSelectAsset({ ...node.data, assetType: node.entityType });
                  }}
                  className={`p-2.5 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F0F7FF] border-[#0D3B66] ring-1 ring-[#0D3B66]'
                      : 'bg-white hover:bg-[#F8F9FA] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#0D3B66] shrink-0" />
                      <span className="text-[10px] font-bold px-1 py-0.2 bg-[#F1F5F9] text-[#475569] rounded">
                        {node.layer}
                      </span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded truncate max-w-[140px] ${
                      node.statusType === 'critical' ? 'bg-red-100 text-red-700' :
                      node.statusType === 'warning' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <div className="font-bold text-[#0F172A] text-xs truncate">
                    {node.title}
                  </div>
                  <div className="text-[10px] text-[#64748B] truncate mt-0.5">
                    {node.telemetry}
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="w-3 h-3 text-[#94A3B8]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Full Screen Spacious Multi-Modal View
  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-3 sm:p-5 flex flex-col h-full overflow-y-auto font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Layers className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
              SHARED ROUTE GRAPH • MULTI-MODAL FREIGHT PIPELINE
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] rounded">
              VIZAG ➔ HYDERABAD CORRIDOR
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Single deterministic corridor connecting Sea Passage ➔ Port Terminal ➔ Highway Haulage ➔ Warehouse Door
          </p>
        </div>

        <button
          onClick={onTriggerImpactView}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white text-xs font-bold rounded transition-colors shadow-xs shrink-0 self-start md:self-auto"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>SIMULATE BOTTLENECK CASCADE</span>
        </button>
      </div>

      {/* Horizontal Multi-Modal Pipeline Cards */}
      <div className="my-4 sm:my-5">
        <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-3">
          CORRIDOR NODE SEQUENCE (CLICK ANY NODE TO INSPECT TELEMETRY & CARGO)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
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
                className={`p-3.5 sm:p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F0F7FF] border-[#0D3B66] ring-2 ring-[#0D3B66] shadow-sm'
                    : 'bg-[#F8F9FA] hover:bg-white border-[#CBD5E1]'
                }`}
              >
                <div>
                  {/* Top Layer & Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1.5 bg-white border border-[#CBD5E1] rounded text-[#0D3B66]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#E2E8F0] text-[#334155] rounded">
                        {node.layer}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      node.statusType === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                      node.statusType === 'warning' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {node.status.split(' ')[0]}
                    </span>
                  </div>

                  {/* Node Title & Subtitle */}
                  <div className="font-bold text-[#0F172A] text-xs sm:text-sm mt-1">
                    {node.title}
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    {node.sub}
                  </div>

                  {/* Telemetry pill */}
                  <div className="mt-3 p-2 bg-white border border-[#E2E8F0] rounded text-[11px] text-[#334155]">
                    <div className="text-[#64748B] text-[9px] uppercase font-bold">Telemetry:</div>
                    <div className="font-semibold text-[#0F172A] mt-0.5">{node.telemetry}</div>
                  </div>
                </div>

                {/* Risk Notice */}
                {node.risk && (
                  <div className="mt-3 pt-2 border-t border-[#E2E8F0] text-[10px] text-red-600 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span className="line-clamp-2">{node.risk}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Synchronized Node Inspector Canvas */}
      <div className="mt-2 bg-[#F8F9FA] border border-[#CBD5E1] rounded-lg p-3.5 sm:p-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D3B66]"></span>
            <span className="text-xs font-bold text-[#0D3B66] uppercase tracking-wider">
              CORRIDOR NODE INSPECTOR • {activeNode.layer} TIER
            </span>
          </div>

          <span className="text-[11px] text-[#475569] font-bold">
            Target: {activeNode.title}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="p-3 bg-white border border-[#E2E8F0] rounded">
            <div className="text-[10px] text-[#64748B] uppercase">STATUS & DWELL</div>
            <div className="font-bold text-[#0F172A] mt-0.5">{activeNode.status}</div>
            <div className="text-[11px] text-[#0D3B66] mt-1">{activeNode.dwell}</div>
          </div>

          <div className="p-3 bg-white border border-[#E2E8F0] rounded">
            <div className="text-[10px] text-[#64748B] uppercase">CARGO PAYLOAD</div>
            <div className="font-bold text-[#0F172A] mt-0.5">{activeNode.cargo}</div>
            <div className="text-[11px] text-[#059669] mt-1">Direct Custody Link</div>
          </div>

          <div className="p-3 bg-white border border-[#E2E8F0] rounded">
            <div className="text-[10px] text-[#64748B] uppercase">UPSTREAM/DOWNSTREAM COUPLING</div>
            <div className="font-bold text-[#0F172A] mt-0.5">Automated Rescheduling</div>
            <div className="text-[11px] text-[#64748B] mt-1">Zero Blind Delays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
