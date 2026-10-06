import React, { useState } from 'react';
import { VESSELS, FLEET_TRUCKS } from '../data/mockData';
import { Ship, Compass, Clock, Navigation, Anchor, Truck, Package, ArrowRight, ShieldCheck, AlertTriangle, Filter } from 'lucide-react';

export function VesselIntelligenceView({ onSelectAsset, onSelectCorridor, activeRole = 'all' }) {
  const [selectedVesselId, setSelectedVesselId] = useState('VES-9481');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredVessels = VESSELS.filter(v => {
    if (categoryFilter === 'ALL') return true;
    return v.category === categoryFilter;
  });

  const activeVessel = VESSELS.find(v => v.id === selectedVesselId) || VESSELS[0];

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                AIS Vessel Traffic & Sea-to-Berth Tracking
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time Bay of Bengal ship positions, nautical draft, speed over ground, and berth arrival times
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar shadow-2xs">
          {['ALL', 'Container', 'Tanker', 'Gas Carrier', 'Bulk Carrier', 'Reefer'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? 'All Ships' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Strip */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {filteredVessels.map(v => (
          <button
            key={v.id}
            onClick={() => {
              setSelectedVesselId(v.id);
              if (onSelectAsset) onSelectAsset({ ...v, assetType: 'vessel' });
            }}
            className={`p-3.5 rounded-xl border text-left transition-all shrink-0 min-w-[175px] cursor-pointer ${
              selectedVesselId === v.id
                ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">{v.category}</span>
              <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                v.status === 'delayed' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {v.status === 'delayed' ? 'Delay' : 'On Track'}
              </span>
            </div>
            <div className="font-bold text-slate-900 text-xs truncate">{v.name}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{v.speed} • {v.cog}</div>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
        {/* Left: Spec Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-3 border-b border-slate-100 gap-1">
              <div>
                <span className="text-[11px] font-semibold text-blue-700 uppercase">AIS Vessel Profile</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{activeVessel.name}</h2>
                <div className="text-xs text-slate-500">
                  {activeVessel.imo} • MMSI: {activeVessel.mmsi} • Call Sign: {activeVessel.callSign}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                activeVessel.status === 'delayed' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {activeVessel.statusDetail || activeVessel.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Vessel Class</div>
                <div className="font-semibold text-slate-900 mt-0.5">{activeVessel.type}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Dimensions & Draught</div>
                <div className="font-semibold text-slate-900 mt-0.5">
                  LOA {activeVessel.lengthMeters}m • Draft {activeVessel.draftMeters}m
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Origin Port</div>
                <div className="font-semibold text-slate-900 mt-0.5">{activeVessel.origin}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Destination Seaport</div>
                <div className="font-bold text-blue-700 mt-0.5">{activeVessel.destination}</div>
              </div>
            </div>

            <div className={`p-4 rounded-xl text-xs ${
              activeVessel.status === 'delayed'
                ? 'bg-amber-50/70 border border-amber-200 text-amber-900'
                : 'bg-emerald-50/70 border border-emerald-200 text-emerald-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Predicted Berth Arrival:</span>
              </div>
              <div className="mt-1 font-semibold text-slate-900 text-sm">{activeVessel.predictedBerth}</div>
            </div>
          </div>

          {/* High-Value Cargo */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              High-Value & Sensitive Connected Cargo
            </h3>
            <div className="space-y-2 text-xs">
              {activeVessel.keyShipments.map((shp, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <span className="font-medium text-slate-800">{shp}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold">
                    Connected
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
              Sea ➔ Port ➔ Land Milestone Sequence
            </h3>

            <div className="space-y-3.5 relative pl-5 border-l-2 border-slate-200 ml-2">
              {activeVessel.routeTimeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    step.done ? 'bg-emerald-500 shadow-xs' : step.current ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                  }`} />

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-0.5">
                      <span className={`font-semibold ${step.current ? 'text-blue-900 font-bold' : step.done ? 'text-slate-800' : 'text-slate-500'}`}>
                        {step.step}
                      </span>
                      <span className="text-[11px] text-slate-500">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeVessel.connectedTrucks.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-700" />
                  <span>Assigned Land Haulage Rigs:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {activeVessel.connectedTrucks.map(tk => (
                    <div key={tk} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-center">
                      <div className="font-bold text-slate-900">{tk}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Ready for Discharge</div>
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
