import React, { useState } from 'react';
import { PORTS, VESSELS, FLEET_TRUCKS } from '../data/mockData';
import { Anchor, Clock, Ship, Truck, AlertTriangle, Package, Activity, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
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
      message: `Berth 04 allocated for incoming cold-chain cargo. Dwell time reduced to 2.5 hours.`
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Port Operations & Berths
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Anchorage queue monitoring, 72h predictive dwell modeling, and berth optimization
          </p>
        </div>

        {/* Apple Segmented Port Selector */}
        <div className="apple-segmented p-1 self-start sm:self-auto flex items-center overflow-x-auto no-scrollbar">
          {PORTS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                playIosChime('tap');
                setSelectedPortId(p.id);
                setClearedBerth(false);
                if (onSelectAsset) onSelectAsset({ ...p, assetType: 'port' });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedPortId === p.id
                  ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <span>{p.shortName}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Congestion Curve & Berth Allocation */}
        <div className="lg:col-span-7 space-y-4">
          {/* Congestion Forecast Chart Card */}
          <div className="apple-card p-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div>
                <h2 className="text-sm font-bold text-[#1D1D1F]">
                  Congestion Trajectory (72h Forecast)
                </h2>
                <div className="text-[11px] text-[#86868B] mt-0.5">
                  {activePort.name} ({activePort.code})
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-[#FF3B30]/10 text-[#FF3B30] rounded-full">
                Peak at +48h ({activePort.forecast.h48}%)
              </span>
            </div>

            {/* Recharts Line Chart */}
            <div className="h-44 sm:h-48 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1D1D1F', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                    formatter={(val) => [`${val}% Congestion`, 'Forecast']}
                  />
                  <ReferenceLine y={75} stroke="#FF3B30" strokeDasharray="3 3" label={{ value: 'Threshold (75%)', position: 'insideTopRight', fill: '#FF3B30', fontSize: 10 }} />
                  <Line 
                    type="monotone" 
                    dataKey="congestion" 
                    stroke="#1D1D1F" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#1D1D1F' }} 
                    activeDot={{ r: 6, fill: '#FF3B30' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Forecast Strip */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-black/[0.06] text-center">
              <div className="p-2.5 bg-black/[0.02] rounded-2xl">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Now</div>
                <div className="text-sm font-bold text-[#1D1D1F] mt-0.5">{activePort.forecast.now}%</div>
              </div>
              <div className="p-2.5 bg-black/[0.02] rounded-2xl">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">+24h</div>
                <div className="text-sm font-bold text-[#1D1D1F] mt-0.5">{activePort.forecast.h24}%</div>
              </div>
              <div className="p-2.5 bg-[#FF3B30]/5 rounded-2xl border border-[#FF3B30]/20">
                <div className="text-[10px] text-[#FF3B30] font-bold uppercase">+48h Peak</div>
                <div className="text-sm font-bold text-[#FF3B30] mt-0.5">{activePort.forecast.h48}%</div>
              </div>
              <div className="p-2.5 bg-black/[0.02] rounded-2xl">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">+72h</div>
                <div className="text-sm font-bold text-[#1D1D1F] mt-0.5">{activePort.forecast.h72}%</div>
              </div>
            </div>
          </div>

          {/* Finger Pier Berth Occupancy */}
          <div className="apple-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                Berth Staging & Piers
              </h3>
              <span className="text-xs font-semibold text-[#34C759]">
                {clearedBerth ? 'Priority Berth Allocated' : '2 of 18 Berths Open'}
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
                  className={`p-3 rounded-2xl border transition-all ${
                    berth.occupied
                      ? 'bg-black/[0.02] border-black/[0.05]'
                      : 'bg-[#34C759]/5 border-[#34C759]/30 ring-1 ring-[#34C759]/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1D1D1F] text-xs">{berth.id}: {berth.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      berth.occupied ? 'bg-black/10 text-[#1D1D1F]' : 'bg-[#34C759] text-white'
                    }`}>
                      {berth.occupied ? 'Occupied' : 'Vacant'}
                    </span>
                  </div>
                  <div className="text-xs text-[#1D1D1F] mt-1 font-medium">{berth.vessel}</div>
                  <div className="text-[11px] text-[#86868B] mt-0.5">Dwell: {berth.dwell}</div>
                </div>
              ))}
            </div>

            {!clearedBerth && selectedPortId === 'PORT-VTZ' && (
              <button
                onClick={handleClearBerth}
                className="w-full mt-2 py-2.5 apple-btn-primary text-xs cursor-pointer"
              >
                Fast-Track Cold-Chain: Allocate Priority Berth 04 ➔
              </button>
            )}
            {clearedBerth && (
              <div className="p-3 bg-[#34C759]/10 border border-[#34C759]/30 rounded-2xl font-semibold text-[#1D1D1F] text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                <span>Berth 04 allocated. Container dwell reduced to 2.5 hours.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Affected Downstream Network */}
        <div className="lg:col-span-5 space-y-4">
          <div className="apple-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                Downstream Impact
              </h3>
              <span className="text-xs text-[#86868B]">Live Correlation</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04] flex items-center gap-2.5">
                <Ship className="w-4 h-4 text-[#0071E3] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#1D1D1F]">{activePort.waitingVessels}</div>
                  <div className="text-[11px] text-[#86868B]">Anchorage Queue</div>
                </div>
              </div>

              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04] flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#FF9500] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#1D1D1F]">{activePort.affectedTrucks}</div>
                  <div className="text-[11px] text-[#86868B]">Trucks Staged</div>
                </div>
              </div>

              <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.04] flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#5E5CE6] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#1D1D1F]">{activePort.affectedShipments}</div>
                  <div className="text-[11px] text-[#86868B]">Active Shipments</div>
                </div>
              </div>

              <div className="p-3 bg-[#FF3B30]/5 rounded-2xl border border-[#FF3B30]/20 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#FF3B30] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#FF3B30]">{activePort.affectedColdChain}</div>
                  <div className="text-[11px] text-[#FF3B30] font-medium">Reefers at Risk</div>
                </div>
              </div>
            </div>

            {/* Inbound Vessel Preview */}
            <div className="pt-2 border-t border-black/[0.06]">
              <div className="text-xs font-bold text-[#1D1D1F] mb-2 flex items-center justify-between">
                <span>Inbound Vessel Queue</span>
                <span className="text-[11px] text-[#86868B]">{inboundVessels.length} Inbound</span>
              </div>
              <div className="space-y-2">
                {inboundVessels.map(vessel => (
                  <div 
                    key={vessel.id}
                    onClick={() => {
                      playIosChime('tap');
                      if (onSelectAsset) onSelectAsset({ ...vessel, assetType: 'vessel' });
                    }}
                    className="p-3 bg-black/[0.02] hover:bg-black/[0.05] rounded-2xl border border-black/[0.04] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1D1D1F] text-xs flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-[#0071E3]" />
                        <span>{vessel.name}</span>
                      </div>
                      <div className="text-[11px] text-[#86868B] mt-0.5">
                        {vessel.cargoTonnage} • ETA {vessel.eta}
                      </div>
                    </div>
                    <span className="text-xs text-[#86868B]">➔</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Trigger */}
            <button
              onClick={() => {
                playIosChime('tap');
                if (onTriggerImpactView) onTriggerImpactView();
              }}
              className="w-full py-2.5 apple-btn-secondary text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Simulate Cascade Bottleneck ➔</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

