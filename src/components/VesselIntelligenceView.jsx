import React, { useState } from 'react';
import { VESSELS, FLEET_TRUCKS } from '../data/mockData';
import { Ship, Compass, Clock, Navigation, Anchor, Truck, Package, ArrowRight, ShieldCheck, AlertTriangle, Filter } from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function VesselIntelligenceView({ onSelectAsset, onSelectCorridor, activeRole = 'all' }) {
  const [selectedVesselId, setSelectedVesselId] = useState('VES-9481');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredVessels = VESSELS.filter(v => {
    if (categoryFilter === 'ALL') return true;
    return v.category === categoryFilter;
  });

  const activeVessel = VESSELS.find(v => v.id === selectedVesselId) || VESSELS[0];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            AIS Vessel Intelligence
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Bay of Bengal ship telemetry, draft, speed over ground, and berth arrival times
          </p>
        </div>

        {/* Apple Segmented Category Filter */}
        <div className="apple-segmented p-1 self-start sm:self-auto flex items-center overflow-x-auto no-scrollbar">
          {['ALL', 'Container', 'Tanker', 'Gas Carrier', 'Bulk Carrier', 'Reefer'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                playIosChime('tap');
                setCategoryFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              {cat === 'ALL' ? 'All Ships' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Apple Cards Strip */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
        {filteredVessels.map(v => (
          <button
            key={v.id}
            onClick={() => {
              playIosChime('tap');
              setSelectedVesselId(v.id);
              if (onSelectAsset) onSelectAsset({ ...v, assetType: 'vessel' });
            }}
            className={`apple-card p-3.5 text-left transition-all shrink-0 min-w-[195px] max-w-[240px] cursor-pointer ${
              selectedVesselId === v.id
                ? 'border-[#0071E3] shadow-md ring-2 ring-[#0071E3]/20'
                : 'hover:border-black/20'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] text-[#86868B] font-semibold uppercase">{v.category}</span>
              <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                v.status === 'delayed' ? 'bg-[#FF3B30]/10 text-[#FF3B30]' : 'bg-[#34C759]/10 text-[#34C759]'
              }`}>
                {v.status === 'delayed' ? 'Delay' : 'On Track'}
              </span>
            </div>
            <div className="font-bold text-[#1D1D1F] text-xs leading-normal whitespace-nowrap overflow-hidden text-ellipsis" title={v.name}>{v.name}</div>
            <div className="text-[11px] text-[#86868B] mt-0.5">{v.speed} • {v.cog}</div>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Spec Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="apple-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div>
                <span className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-wider">AIS Profile</span>
                <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] mt-0.5">{activeVessel.name}</h2>
                <div className="text-xs text-[#86868B]">
                  {activeVessel.imo} • MMSI: {activeVessel.mmsi} • Call Sign: {activeVessel.callSign}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                activeVessel.status === 'delayed' ? 'bg-[#FF9500]/10 text-[#FF9500]' : 'bg-[#34C759]/10 text-[#34C759]'
              }`}>
                {activeVessel.statusDetail || activeVessel.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04]">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Vessel Class</div>
                <div className="font-semibold text-[#1D1D1F] mt-0.5">{activeVessel.type}</div>
              </div>
              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04]">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Dimensions & Draught</div>
                <div className="font-semibold text-[#1D1D1F] mt-0.5">
                  LOA {activeVessel.lengthMeters}m • Draft {activeVessel.draftMeters}m
                </div>
              </div>
              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04]">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Origin Port</div>
                <div className="font-semibold text-[#1D1D1F] mt-0.5">{activeVessel.origin}</div>
              </div>
              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04]">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Destination Seaport</div>
                <div className="font-bold text-[#0071E3] mt-0.5">{activeVessel.destination}</div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl text-xs ${
              activeVessel.status === 'delayed'
                ? 'bg-[#FF9500]/5 border border-[#FF9500]/20 text-[#1D1D1F]'
                : 'bg-[#34C759]/5 border border-[#34C759]/20 text-[#1D1D1F]'
            }`}>
              <div className="font-bold flex items-center gap-1.5 text-xs">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Predicted Berth Arrival:</span>
              </div>
              <div className="mt-1 font-bold text-[#1D1D1F] text-sm">{activeVessel.predictedBerth}</div>
            </div>
          </div>

          {/* High-Value Cargo */}
          <div className="apple-card p-5 space-y-2.5">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider pb-2 border-b border-black/[0.06]">
              Sensitive Connected Cargo
            </h3>
            <div className="space-y-2 text-xs">
              {activeVessel.keyShipments.map((shp, idx) => (
                <div key={idx} className="p-3 bg-black/[0.02] rounded-xl border border-black/[0.04] flex items-center justify-between">
                  <span className="font-medium text-[#1D1D1F]">{shp}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#0071E3]/10 text-[#0071E3] rounded-full font-bold">
                    Connected
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Milestone Sequence */}
        <div className="lg:col-span-6 space-y-4">
          <div className="apple-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider pb-2 border-b border-black/[0.06]">
              Milestone Sequence
            </h3>

            <div className="space-y-4 relative pl-5 border-l-2 border-black/[0.08] ml-2">
              {activeVessel.routeTimeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    step.done ? 'bg-[#34C759] shadow-xs' : step.current ? 'bg-[#0071E3] ring-4 ring-[#0071E3]/20' : 'bg-black/20'
                  }`} />

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${step.current ? 'text-[#0071E3] font-bold' : step.done ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                        {step.step}
                      </span>
                      <span className="text-[11px] text-[#86868B]">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeVessel.connectedTrucks.length > 0 && (
              <div className="pt-3 border-t border-black/[0.06]">
                <div className="text-xs font-bold text-[#1D1D1F] mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#86868B]" />
                  <span>Assigned Land Haulage Rigs:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {activeVessel.connectedTrucks.map(tk => (
                    <div key={tk} className="p-2.5 bg-black/[0.02] border border-black/[0.05] rounded-xl text-center">
                      <div className="font-bold text-[#1D1D1F]">{tk}</div>
                      <div className="text-[10px] text-[#34C759] font-semibold mt-0.5">Ready for Discharge</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

