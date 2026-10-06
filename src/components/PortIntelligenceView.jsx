import React, { useState } from 'react';
import { PORTS, VESSELS, FLEET_TRUCKS } from '../data/mockData';
import { Anchor, Clock, Ship, Truck, AlertTriangle, Package, Activity, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function PortIntelligenceView({ onSelectAsset, onTriggerImpactView, activeRole = 'all' }) {
  const [selectedPortId, setSelectedPortId] = useState('PORT-VTZ');
  const [clearedBerth, setClearedBerth] = useState(false);
  const { addToast } = useToast();

  const activePort = PORTS.find(p => p.id === selectedPortId) || PORTS[0];

  const forecastData = [
    { hour: 'Now', congestion: activePort.forecast.now, threshold: 75 },
    { hour: '+24h', congestion: activePort.forecast.h24, threshold: 75 },
    { hour: '+48h Peak', congestion: activePort.forecast.h48, threshold: 75 },
    { hour: '+72h', congestion: activePort.forecast.h72, threshold: 75 }
  ];

  const inboundVessels = VESSELS.filter(v => v.destPortId === activePort.id);

  const handleClearBerth = () => {
    playIosChime('success');
    setClearedBerth(true);
    addToast({
      type: 'success',
      title: 'Priority Berth Allocated',
      message: `Berth 04 allocated for incoming temperature-controlled cargo. Dwell time reduced to 2.5 hours.`
    });
  };

  return (
    <div className="bg-transparent p-3 sm:p-5 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-black/[0.05] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#FF3B30] flex items-center justify-center border border-rose-100 shadow-2xs">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Port Congestion & Berth Intelligence
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Outer anchorage queue surveillance, predictive dwell modeling, and berth allocation
              </p>
            </div>
          </div>
        </div>

        {/* Port Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-full border border-black/5 overflow-x-auto no-scrollbar shadow-2xs">
          {PORTS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                playIosChime('tap');
                setSelectedPortId(p.id);
                setClearedBerth(false);
                if (onSelectAsset) onSelectAsset({ ...p, assetType: 'port' });
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ios-btn ${
                selectedPortId === p.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{p.shortName}</span>
              <span className={`px-2 py-0.2 rounded-full text-[9.5px] font-extrabold ${
                p.congestion >= 70 ? 'bg-[#FF3B30] text-white' :
                p.congestion >= 50 ? 'bg-[#FF9500] text-white' :
                'bg-[#34C759] text-white'
              }`}>
                {p.congestion}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
        {/* Left Column: Congestion Curve & Berth Allocation */}
        <div className="lg:col-span-7 space-y-4">
          {/* Congestion Forecast Chart Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Congestion Trajectory (72-Hour Horizon)
                </h2>
                <div className="text-xs text-slate-500">
                  {activePort.name} ({activePort.code})
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200 self-start sm:self-auto">
                Peak at +48h ({activePort.forecast.h48}%)
              </span>
            </div>

            {/* Recharts Line Chart */}
            <div className="h-44 sm:h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(val) => [`${val}% Congestion`, 'Forecast']}
                  />
                  <ReferenceLine y={75} stroke="#E11D48" strokeDasharray="3 3" label={{ value: 'Critical Threshold (75%)', position: 'insideTopRight', fill: '#E11D48', fontSize: 10 }} />
                  <Line 
                    type="monotone" 
                    dataKey="congestion" 
                    stroke="#0F172A" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#0F172A' }} 
                    activeDot={{ r: 6, fill: '#E11D48' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Forecast Strip */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">NOW</div>
                <div className="text-sm font-bold text-slate-800">{activePort.forecast.now}%</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">+24H</div>
                <div className="text-sm font-bold text-slate-800">{activePort.forecast.h24}%</div>
              </div>
              <div className="p-2 bg-rose-50 rounded-lg border border-rose-100">
                <div className="text-[10px] text-rose-700 font-bold">+48H PEAK</div>
                <div className="text-sm font-bold text-rose-700">{activePort.forecast.h48}%</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">+72H</div>
                <div className="text-sm font-bold text-slate-800">{activePort.forecast.h72}%</div>
              </div>
            </div>
          </div>

          {/* Finger Pier Berth Occupancy */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1">
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                Berth Occupancy & Terminal Finger Piers
              </h3>
              <span className="text-xs font-semibold text-emerald-700">
                {clearedBerth ? 'Priority Reefer Berth Allocated' : '2 of 18 Berths Available'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(activePort.berthsList || [
                { id: "B-01", name: "Berth 1", occupied: true, vessel: "Bulk Cargo Carrier", dwell: "18h left" },
                { id: "B-02", name: "Berth 2 (VCTPL)", occupied: true, vessel: "MV Eastern Pearl", dwell: "14.5h hold" },
                { id: "B-03", name: "Berth 3", occupied: false, vessel: "AVAILABLE", dwell: "Open" },
                { id: "B-04", name: "Berth 4 (Reefer Pier)", occupied: false, vessel: "AVAILABLE FOR VC-2048", dwell: "CLEAR (PRIORITY)" }
              ]).map(berth => (
                <div 
                  key={berth.id}
                  className={`p-3 rounded-xl border transition-all ${
                    berth.occupied
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-xs">{berth.id}: {berth.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      berth.occupied ? 'bg-slate-200 text-slate-700' : 'bg-emerald-600 text-white'
                    }`}>
                      {berth.occupied ? 'Occupied' : 'Vacant'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 mt-1 font-medium">{berth.vessel}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Dwell Status: {berth.dwell}</div>
                </div>
              ))}
            </div>

            {!clearedBerth && selectedPortId === 'PORT-VTZ' && (
              <button
                onClick={handleClearBerth}
                className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Fast-Track Cold-Chain Dwell: Allocate Priority Berth 04 ➔
              </button>
            )}
            {clearedBerth && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg font-semibold text-emerald-900 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Berth 04 allocated. Estimated container dwell reduced to 2.5 hours.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Affected Downstream Network */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                Affected Downstream Network
              </h3>
              <span className="text-xs text-slate-400">Live Impact</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Ship className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{activePort.waitingVessels}</div>
                  <div className="text-[11px] text-slate-500">Ships at Anchor</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{activePort.affectedTrucks}</div>
                  <div className="text-[11px] text-slate-500">Trucks Staged</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Package className="w-4 h-4 text-slate-700 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{activePort.affectedShipments}</div>
                  <div className="text-[11px] text-slate-500">Active Shipments</div>
                </div>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-rose-700">{activePort.affectedColdChain}</div>
                  <div className="text-[11px] text-rose-700 font-medium">Reefers at Risk</div>
                </div>
              </div>
            </div>

            {/* Inbound Vessel Preview */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>Inbound Vessel Queue:</span>
                <span className="text-[11px] text-slate-400">{inboundVessels.length} Inbound</span>
              </div>
              <div className="space-y-2">
                {inboundVessels.map(vessel => (
                  <div 
                    key={vessel.id}
                    onClick={() => onSelectAsset && onSelectAsset({ ...vessel, assetType: 'vessel' })}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-blue-600" />
                        <span>{vessel.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {vessel.cargoTonnage} • ETA {vessel.eta}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">➔</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Trigger */}
            <button
              onClick={onTriggerImpactView}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Simulate Full Bottleneck Cascade ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
