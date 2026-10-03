import React, { useState } from 'react';
import { PORTS, VESSELS, FLEET_TRUCKS } from '../data/mockData';
import { Anchor, Clock, Ship, Truck, AlertTriangle, Package, Activity, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function PortIntelligenceView({ onSelectAsset, onTriggerImpactView }) {
  const [selectedPortId, setSelectedPortId] = useState('PORT-VTZ');
  const [clearedBerth, setClearedBerth] = useState(false);
  const activePort = PORTS.find(p => p.id === selectedPortId) || PORTS[0];

  const forecastData = [
    { hour: 'NOW', congestion: activePort.forecast.now, threshold: 75 },
    { hour: '+24H', congestion: activePort.forecast.h24, threshold: 75 },
    { hour: '+48H', congestion: activePort.forecast.h48, threshold: 75 },
    { hour: '+72H', congestion: activePort.forecast.h72, threshold: 75 }
  ];

  const inboundVessels = VESSELS.filter(v => v.destPortId === activePort.id);

  const handleClearBerth = () => {
    setClearedBerth(true);
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto">
      {/* Port Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-base font-bold font-mono text-[#0F172A]">
              PORT CONGESTION & HARBOUR INTELLIGENCE
            </h2>
          </div>
          <p className="text-xs text-[#64748B] font-mono mt-0.5">
            Predictive dwell, berth allocation, and downstream corridor queue modeling
          </p>
        </div>

        {/* Port Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {PORTS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPortId(p.id);
                setClearedBerth(false);
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                selectedPortId === p.id
                  ? 'bg-[#0D3B66] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              <span>{p.shortName}</span>
              <span className={`px-1 py-0.2 rounded text-[10px] ${
                p.congestion > 60 ? 'bg-red-500 text-white' : 'bg-slate-700 text-white'
              }`}>
                {p.congestion}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Port Analytics Grid */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Forecast Chart & Harbor Berthing Map */}
        <div className="lg:col-span-7 space-y-4">
          {/* Congestion Forecast Chart Card */}
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold font-mono text-[#0F172A]">
                  CONGESTION FORECAST (72H HORIZON)
                </span>
                <span className="text-[11px] text-[#64748B] font-mono ml-2">
                  {activePort.name} ({activePort.code})
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded border border-red-200">
                PEAK AT +48H ({activePort.forecast.h48}%)
              </span>
            </div>

            {/* Recharts Line Chart */}
            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '4px', fontSize: '11px', fontFamily: 'IBM Plex Mono' }}
                    formatter={(val) => [`${val}% Congestion`, 'Forecast']}
                  />
                  <ReferenceLine y={75} stroke="#DC2626" strokeDasharray="3 3" label={{ value: 'CRITICAL THRESHOLD (75%)', position: 'insideTopRight', fill: '#DC2626', fontSize: 9, fontFamily: 'IBM Plex Mono' }} />
                  <Line 
                    type="monotone" 
                    dataKey="congestion" 
                    stroke="#0D3B66" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#0D3B66' }} 
                    activeDot={{ r: 6, fill: '#DC2626' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Forecast Data Strip */}
            <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-[#E2E8F0] font-mono text-center">
              <div>
                <div className="text-[10px] text-[#64748B]">NOW</div>
                <div className="text-sm font-bold text-[#0F172A]">{activePort.forecast.now}%</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">+24H</div>
                <div className="text-sm font-bold text-[#0F172A]">{activePort.forecast.h24}%</div>
              </div>
              <div className="bg-red-50 py-1 rounded border border-red-200">
                <div className="text-[10px] text-red-600 font-bold">+48H PEAK</div>
                <div className="text-sm font-bold text-red-700">{activePort.forecast.h48}%</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">+72H</div>
                <div className="text-sm font-bold text-[#0F172A]">{activePort.forecast.h72}%</div>
              </div>
            </div>
          </div>

          {/* Harbor Berth Allocation Diagram */}
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-3.5 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="font-bold text-[#0F172A] uppercase">
                BERTH OCCUPANCY & FINGER PIER DIAGRAM
              </span>
              <span className="text-[10px] text-[#059669] font-bold">
                {clearedBerth ? 'PRIORITY REEFER BERTH ASSIGNED' : '2 / 18 BERTHS VACANT'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              {(activePort.berthsList || [
                { id: "B-01", name: "Berth 1", occupied: true, vessel: "Bulk Cargo Carrier", dwell: "18h left" },
                { id: "B-02", name: "Berth 2 (VCTPL)", occupied: true, vessel: "MV Eastern Pearl", dwell: "14.5h hold" },
                { id: "B-03", name: "Berth 3", occupied: false, vessel: "AVAILABLE", dwell: "Open" },
                { id: "B-04", name: "Berth 4", occupied: true, vessel: "Feeder Transshipment", dwell: "6h left" }
              ]).map(berth => (
                <div 
                  key={berth.id}
                  className={`p-2.5 rounded border ${
                    berth.occupied
                      ? 'bg-white border-[#E2E8F0]'
                      : 'bg-emerald-50 border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0F172A]">{berth.id}: {berth.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      berth.occupied ? 'bg-slate-200 text-slate-800' : 'bg-emerald-600 text-white'
                    }`}>
                      {berth.occupied ? 'OCCUPIED' : 'VACANT'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1 font-semibold">{berth.vessel}</div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">Dwell Status: {berth.dwell}</div>
                </div>
              ))}
            </div>

            {!clearedBerth && selectedPortId === 'PORT-VTZ' && (
              <button
                onClick={handleClearBerth}
                className="w-full mt-3 py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded text-xs font-bold transition-colors shadow-xs"
              >
                FAST-TRACK COLD-CHAIN DWELL: ALLOCATE PRIORITY BERTH 04 ➔
              </button>
            )}
            {clearedBerth && (
              <div className="mt-3 p-2 bg-emerald-100 text-emerald-800 rounded font-bold text-center text-xs">
                ✓ BERTH 04 ALLOCATED — ESTIMATED DWELL REDUCED TO 2.5 HOURS
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Affected Downstream Network */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#0F172A]">
                AFFECTED DOWNSTREAM NETWORK
              </span>
              <span className="text-[10px] text-[#64748B]">
                REAL-TIME GRAPH IMPACT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 font-mono">
              <div className="p-2 bg-white border border-[#E2E8F0] rounded flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#086788]" />
                <div>
                  <div className="text-sm font-bold text-[#0F172A]">{activePort.waitingVessels}</div>
                  <div className="text-[10px] text-[#64748B]">Vessels at Anchor</div>
                </div>
              </div>

              <div className="p-2 bg-white border border-[#E2E8F0] rounded flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D97706]" />
                <div>
                  <div className="text-sm font-bold text-[#0F172A]">{activePort.affectedTrucks}</div>
                  <div className="text-[10px] text-[#64748B]">Trucks Held / Staged</div>
                </div>
              </div>

              <div className="p-2 bg-white border border-[#E2E8F0] rounded flex items-center gap-2">
                <Package className="w-4 h-4 text-[#0D3B66]" />
                <div>
                  <div className="text-sm font-bold text-[#0F172A]">{activePort.affectedShipments}</div>
                  <div className="text-[10px] text-[#64748B]">Active Shipments</div>
                </div>
              </div>

              <div className="p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <div>
                  <div className="text-sm font-bold text-red-700">{activePort.affectedColdChain}</div>
                  <div className="text-[10px] text-red-600 font-semibold">Cold-Chain Reefer</div>
                </div>
              </div>
            </div>

            {/* Inbound Vessel Manifest Preview */}
            <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
              <div className="text-[11px] font-bold text-[#0F172A] mb-2">
                INBOUND QUEUE PREVIEW:
              </div>
              <div className="space-y-1.5">
                {inboundVessels.map(vessel => (
                  <div 
                    key={vessel.id}
                    onClick={() => onSelectAsset && onSelectAsset({ ...vessel, assetType: 'vessel' })}
                    className="p-2 bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-[#0D3B66]" />
                        <span>{vessel.name}</span>
                      </div>
                      <div className="text-[10px] text-[#64748B]">
                        {vessel.cargoTonnage} • ETA {vessel.eta}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">
                      {vessel.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onTriggerImpactView}
              className="w-full mt-3 py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Activity className="w-4 h-4 text-amber-300" />
              <span>VIEW FULL CORRIDOR CASCADE IMPACT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
