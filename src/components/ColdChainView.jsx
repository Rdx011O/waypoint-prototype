import React, { useState } from 'react';
import { COLD_CHAIN_MONITORING } from '../data/mockData';
import { ThermometerSnowflake, AlertTriangle, ShieldCheck, BatteryCharging, Zap, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function ColdChainView({ onSelectAsset, activeRole = 'all' }) {
  const [selectedId, setSelectedId] = useState('VC-2048');
  const [overrideTriggered, setOverrideTriggered] = useState(false);
  const { addToast } = useToast();

  const activeReefer = COLD_CHAIN_MONITORING.find(r => r.id === selectedId) || COLD_CHAIN_MONITORING[0];

  const handleOverrideAux = () => {
    playIosChime('alert');
    setOverrideTriggered(true);
    addToast({
      type: 'success',
      title: 'Auxiliary Boost Engaged',
      message: `Reefer ${activeReefer.id} genset set to maximum cooling boost.`
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Cold-Chain Telemetry
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Continuous core thermal telemetry and remote genset override controls
          </p>
        </div>

        {/* Apple Segmented Reefer Selector */}
        <div className="apple-segmented p-1 self-start sm:self-auto flex items-center overflow-x-auto no-scrollbar">
          {COLD_CHAIN_MONITORING.map(r => (
            <button
              key={r.id}
              onClick={() => {
                playIosChime('tap');
                setSelectedId(r.id);
                setOverrideTriggered(false);
                if (onSelectAsset) onSelectAsset({ ...r, assetType: 'coldchain' });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedId === r.id
                  ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <span>{r.id}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                r.riskLevel === 'CRITICAL' ? 'bg-[#FF3B30] text-white' :
                r.riskLevel === 'WARNING' ? 'bg-[#FF9500] text-white' :
                'bg-[#34C759] text-white'
              }`}>
                {r.currentTemp > 0 ? `+${r.currentTemp}°C` : `${r.currentTemp}°C`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Temperature Graph & Override Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="apple-card p-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div>
                <h2 className="text-sm font-bold text-[#1D1D1F]">
                  Core Temperature History (6h)
                </h2>
                <div className="text-[11px] text-[#86868B] mt-0.5">
                  Safe Operating Range: [{activeReefer.safeRangeMin}°C to {activeReefer.safeRangeMax}°C]
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                activeReefer.riskLevel === 'CRITICAL' ? 'bg-[#FF3B30]/10 text-[#FF3B30]' :
                activeReefer.riskLevel === 'WARNING' ? 'bg-[#FF9500]/10 text-[#FF9500]' :
                'bg-[#34C759]/10 text-[#34C759]'
              }`}>
                {activeReefer.statusLabel}
              </span>
            </div>

            {/* Recharts Curve */}
            <div className="h-48 sm:h-56 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeReefer.temperatureHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                  <YAxis 
                    domain={[activeReefer.safeRangeMin - 2, activeReefer.safeRangeMax + 2]} 
                    tick={{ fontSize: 11, fill: '#86868B' }}
                    stroke="#E5E5EA"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1D1D1F', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                    formatter={(val) => [`${val}°C`, 'Core Temp']}
                  />
                  <ReferenceLine y={activeReefer.safeRangeMax} stroke="#FF3B30" strokeDasharray="3 3" label={{ value: `Max (${activeReefer.safeRangeMax}°C)`, position: 'insideTopRight', fill: '#FF3B30', fontSize: 10 }} />
                  <ReferenceLine y={activeReefer.safeRangeMin} stroke="#34C759" strokeDasharray="3 3" label={{ value: `Min (${activeReefer.safeRangeMin}°C)`, position: 'insideBottomRight', fill: '#34C759', fontSize: 10 }} />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke={activeReefer.riskLevel === 'CRITICAL' ? '#FF3B30' : '#0071E3'} 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: activeReefer.riskLevel === 'CRITICAL' ? '#FF3B30' : '#0071E3' }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Telemetry Readout */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-black/[0.06] text-center">
              <div className="p-3 bg-black/[0.02] rounded-2xl">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Core Sensor</div>
                <div className={`text-base font-bold mt-0.5 ${activeReefer.riskLevel === 'CRITICAL' ? 'text-[#FF3B30]' : 'text-[#1D1D1F]'}`}>
                  {activeReefer.currentTemp > 0 ? `+${activeReefer.currentTemp}°C` : `${activeReefer.currentTemp}°C`}
                </div>
              </div>
              <div className="p-3 bg-black/[0.02] rounded-2xl">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Ambient Heat</div>
                <div className="text-base font-bold text-[#1D1D1F] mt-0.5">{activeReefer.ambientTemp}°C</div>
              </div>
              <div className="p-3 bg-black/[0.02] rounded-2xl">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Duty Cycle</div>
                <div className="text-base font-bold text-[#1D1D1F] mt-0.5">{activeReefer.compressorDuty}</div>
              </div>
            </div>
          </div>

          {/* Action Alert */}
          {activeReefer.riskLevel === 'CRITICAL' && (
            <div className="p-4 bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-2xl text-[#1D1D1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold flex items-center gap-1.5 text-xs text-[#FF3B30]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Thermal Excursion Risk: {activeReefer.id}</span>
                </div>
                <p className="text-xs text-[#86868B] mt-1">
                  {activeReefer.recommendedAction}
                </p>
              </div>

              <button
                onClick={handleOverrideAux}
                disabled={overrideTriggered}
                className={`apple-btn-primary self-start sm:self-auto text-xs py-2 px-3.5 whitespace-nowrap cursor-pointer ${
                  overrideTriggered ? 'bg-[#34C759] text-white opacity-90' : 'bg-[#FF3B30] text-white'
                }`}
              >
                {overrideTriggered ? '✓ Aux Boost Active' : 'Engage Boost ➔'}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Cargo Spec */}
        <div className="lg:col-span-5 space-y-4">
          <div className="apple-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider pb-2 border-b border-black/[0.06]">
              Consignment & Manifest
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Product Description</div>
                <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">{activeReefer.product}</div>
                <div className="text-[#86868B] text-[11px]">Consignee: {activeReefer.client}</div>
              </div>

              <div className="apple-group text-xs">
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Container ID</span>
                  <span className="font-semibold text-[#1D1D1F]">{activeReefer.containerId}</span>
                </div>
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Origin Vessel</span>
                  <span className="font-semibold text-[#1D1D1F]">{activeReefer.vesselOrigin}</span>
                </div>
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Assigned Hauler</span>
                  <span className="font-semibold text-[#1D1D1F]">{activeReefer.assignedTruck}</span>
                </div>
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Corridor Highway</span>
                  <span className="font-semibold text-[#1D1D1F]">{activeReefer.route}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-[#86868B]">Aux Battery Reserve</span>
                  <span className="font-semibold text-[#FF9500]">{activeReefer.batteryBackup}</span>
                </div>
              </div>

              <div className="p-3 bg-[#0071E3]/5 border border-[#0071E3]/20 rounded-2xl text-xs text-[#1D1D1F] leading-relaxed">
                <strong>Corridor Protection:</strong> When port delays occur upstream, Waypoint automatically signals receiving chambers to pre-cool prior to container arrival.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

