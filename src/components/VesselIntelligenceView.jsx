import React, { useState } from 'react';
import { VESSELS, FLEET_TRUCKS } from '../data/mockData';
import { Ship, Compass, Clock, Navigation, Anchor, Truck, Package, ArrowRight, ShieldCheck, AlertTriangle, Filter } from 'lucide-react';

export function VesselIntelligenceView({ onSelectAsset, onSelectCorridor }) {
  const [selectedVesselId, setSelectedVesselId] = useState('VES-9481');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredVessels = VESSELS.filter(v => {
    if (categoryFilter === 'ALL') return true;
    return v.category === categoryFilter;
  });

  const activeVessel = VESSELS.find(v => v.id === selectedVesselId) || VESSELS[0];

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-base font-bold text-[#0F172A]">
              AIS VESSEL TRAFFIC & SEA-TO-BERTH INTELLIGENCE
            </h2>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time Bay of Bengal ship positions, nautical draft, speed over ground (SOG), and berth arrival models
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {['ALL', 'Container', 'Tanker', 'Gas Carrier', 'Bulk Carrier', 'Reefer'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#0D3B66] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Vessel Fleet Strip */}
      <div className="my-3 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {filteredVessels.map(v => (
          <button
            key={v.id}
            onClick={() => setSelectedVesselId(v.id)}
            className={`px-3 py-2 rounded border text-left transition-all shrink-0 min-w-[170px] ${
              selectedVesselId === v.id
                ? 'bg-[#F0F7FF] border-[#0D3B66] ring-1 ring-[#0D3B66] shadow-xs'
                : 'bg-[#F8F9FA] hover:bg-white border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] text-[#64748B] font-bold">{v.category}</span>
              <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold ${
                v.status === 'delayed' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {v.status.toUpperCase()}
              </span>
            </div>
            <div className="font-bold text-[#0F172A] text-xs truncate">{v.name}</div>
            <div className="text-[10px] text-[#64748B] mt-0.5">{v.speed} • {v.cog}</div>
          </button>
        ))}
      </div>

      {/* Main Operations Record Grid */}
      <div className="my-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
        {/* Left: Vessel Telemetry & Operations Spec */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-4 font-mono">
            <div className="flex items-start justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase">AIS OPERATIONS RECORD</span>
                <div className="text-base font-bold text-[#0F172A]">{activeVessel.name}</div>
                <div className="text-xs text-[#475569]">
                  {activeVessel.imo} • MMSI: {activeVessel.mmsi} • Call Sign: {activeVessel.callSign}
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeVessel.status === 'delayed' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-green-100 text-green-800'
              }`}>
                {activeVessel.statusDetail || activeVessel.status.toUpperCase()}
              </span>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div>
                <div className="text-[10px] text-[#64748B]">VESSEL CLASS</div>
                <div className="font-semibold text-[#0F172A] mt-0.5">{activeVessel.type}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">DIMENSIONS & DRAUGHT</div>
                <div className="font-semibold text-[#0F172A] mt-0.5">
                  LOA {activeVessel.lengthMeters}m • Beam {activeVessel.beamMeters}m • Draft {activeVessel.draftMeters}m
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">AIS LIVE POSITION</div>
                <div className="font-semibold text-[#0F172A] mt-0.5">
                  {activeVessel.lat.toFixed(4)}°N, {activeVessel.lng.toFixed(4)}°E
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">SOG / COURSE (COG)</div>
                <div className="font-semibold text-[#0F172A] mt-0.5">
                  {activeVessel.sog || activeVessel.speed} • {activeVessel.cog || `${activeVessel.heading}°`}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">PORT OF DEPARTURE</div>
                <div className="font-semibold text-[#0F172A] mt-0.5">{activeVessel.origin}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">DESTINATION PORT</div>
                <div className="font-bold text-[#0D3B66] mt-0.5">{activeVessel.destination}</div>
              </div>
            </div>

            {/* Berth Forecast Alert */}
            <div className={`mt-3 p-3 rounded text-xs ${
              activeVessel.status === 'delayed'
                ? 'bg-amber-50 border border-amber-200 text-amber-900'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>PREDICTED BERTH ARRIVAL:</span>
              </div>
              <div className="mt-0.5 font-semibold text-[#0F172A]">{activeVessel.predictedBerth}</div>
              <div className="text-[11px] text-[#64748B] mt-1">
                Congestion Risk Index: <strong>{activeVessel.congestionRisk}</strong>
              </div>
            </div>
          </div>

          {/* Connected Cargo Manifest */}
          <div className="p-3 bg-white border border-[#CBD5E1] rounded font-mono text-xs">
            <div className="text-[10px] text-[#64748B] font-bold uppercase mb-2">
              KEY HIGH-VALUE / SENSITIVE CARGO
            </div>
            <div className="space-y-1.5">
              {activeVessel.keyShipments.map((shp, idx) => (
                <div key={idx} className="p-2 bg-[#F8F9FA] rounded border border-[#E2E8F0] flex items-center justify-between">
                  <span className="font-medium text-[#0F172A]">{shp}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#E0F2FE] text-[#0369A1] rounded font-bold">
                    CONNECTED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sequential Journey Timeline */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-4 font-mono">
            <div className="text-xs font-bold text-[#0F172A] mb-3 pb-2 border-b border-[#E2E8F0]">
              SEA ➔ PORT ➔ CARGO ➔ LAND ROUTE TIMELINE
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-[#CBD5E1] ml-2">
              {activeVessel.routeTimeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                    step.done ? 'bg-[#059669]' : step.current ? 'bg-[#0D3B66] ring-2 ring-blue-300' : 'bg-[#94A3B8]'
                  }`} />

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${step.current ? 'text-[#0D3B66]' : 'text-[#0F172A]'}`}>
                        {step.step}
                      </span>
                      <span className="text-[10px] text-[#64748B]">{step.time}</span>
                    </div>
                    {step.predicted && (
                      <span className="text-[9px] px-1 py-0.2 bg-[#EFF6FF] text-[#1E40AF] rounded mt-0.5 inline-block font-semibold">
                        WAYPOINT MODEL PREDICTION
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Trucks */}
            {activeVessel.connectedTrucks.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0D3B66]" />
                  <span>ASSIGNED LAND CORRIDOR HAULAGE:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {activeVessel.connectedTrucks.map(tk => (
                    <div key={tk} className="p-2 bg-white border border-[#CBD5E1] rounded text-center">
                      <div className="font-bold text-[#0F172A]">{tk}</div>
                      <div className="text-[9px] text-[#059669] font-bold mt-0.5">READY</div>
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
