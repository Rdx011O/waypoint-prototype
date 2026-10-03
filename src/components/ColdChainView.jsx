import React, { useState } from 'react';
import { COLD_CHAIN_MONITORING } from '../data/mockData';
import { ThermometerSnowflake, AlertTriangle, ShieldCheck, BatteryCharging, Zap, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';

export function ColdChainView({ onSelectAsset }) {
  const [selectedId, setSelectedId] = useState('VC-2048');
  const [overrideTriggered, setOverrideTriggered] = useState(false);

  const activeReefer = COLD_CHAIN_MONITORING.find(r => r.id === selectedId) || COLD_CHAIN_MONITORING[0];

  const handleOverrideAux = () => {
    setOverrideTriggered(true);
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-[#086788]" />
            <h2 className="text-base font-bold font-mono text-[#0F172A]">
              COLD-CHAIN SURVEILLANCE & THERMAL EXCURSION CONTROL
            </h2>
          </div>
          <p className="text-xs text-[#64748B] font-mono mt-0.5">
            Real-time IoT temperature curves, compressor duty cycles, and corridor dwell degradation
          </p>
        </div>

        {/* Reefer Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {COLD_CHAIN_MONITORING.map(r => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedId(r.id);
                setOverrideTriggered(false);
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                selectedId === r.id
                  ? 'bg-[#0D3B66] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              <span>{r.id}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                r.riskLevel === 'CRITICAL' ? 'bg-red-500 text-white animate-pulse' :
                r.riskLevel === 'WARNING' ? 'bg-amber-500 text-white' :
                'bg-emerald-600 text-white'
              }`}>
                {r.currentTemp > 0 ? `+${r.currentTemp}°C` : `${r.currentTemp}°C`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Cold Chain Grid */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Temperature Curve & Threshold Analysis */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-3.5 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-bold text-[#0F172A]">
                  THERMAL TELEMETRY CURVE (PAST 6 HOURS)
                </span>
                <span className="text-[11px] text-[#64748B] ml-2">
                  Safe Range: [{activeReefer.safeRangeMin}°C — {activeReefer.safeRangeMax}°C]
                </span>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeReefer.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' :
                activeReefer.riskLevel === 'WARNING' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {activeReefer.statusLabel}
              </span>
            </div>

            {/* Temperature Recharts Graph */}
            <div className="h-52 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeReefer.temperatureHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
                  <YAxis 
                    domain={[activeReefer.safeRangeMin - 2, activeReefer.safeRangeMax + 2]} 
                    tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '4px', fontSize: '11px', fontFamily: 'IBM Plex Mono' }}
                    formatter={(val) => [`${val}°C`, 'Sensor Temp']}
                  />
                  {/* Safe Range Area */}
                  <ReferenceLine y={activeReefer.safeRangeMax} stroke="#DC2626" strokeDasharray="4 4" label={{ value: `MAX LIMIT (${activeReefer.safeRangeMax}°C)`, position: 'insideTopRight', fill: '#DC2626', fontSize: 9, fontFamily: 'IBM Plex Mono' }} />
                  <ReferenceLine y={activeReefer.safeRangeMin} stroke="#059669" strokeDasharray="4 4" label={{ value: `MIN LIMIT (${activeReefer.safeRangeMin}°C)`, position: 'insideBottomRight', fill: '#059669', fontSize: 9, fontFamily: 'IBM Plex Mono' }} />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke={activeReefer.riskLevel === 'CRITICAL' ? '#DC2626' : '#086788'} 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: activeReefer.riskLevel === 'CRITICAL' ? '#DC2626' : '#086788' }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Current Telemetry Readout */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#E2E8F0] text-center">
              <div>
                <div className="text-[10px] text-[#64748B]">CURRENT CORE TEMP</div>
                <div className={`text-base font-bold ${activeReefer.riskLevel === 'CRITICAL' ? 'text-red-700 font-extrabold' : 'text-[#0F172A]'}`}>
                  {activeReefer.currentTemp > 0 ? `+${activeReefer.currentTemp}°C` : `${activeReefer.currentTemp}°C`}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">AMBIENT OUTSIDE TEMP</div>
                <div className="text-base font-bold text-[#0F172A]">{activeReefer.ambientTemp}°C</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B]">COMPRESSOR DUTY</div>
                <div className="text-base font-bold text-[#0D3B66]">{activeReefer.compressorDuty}</div>
              </div>
            </div>
          </div>

          {/* Reefer Aux Action Panel */}
          {activeReefer.riskLevel === 'CRITICAL' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded font-mono text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-red-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>EMERGENCY OPERATOR ACTION REQUIRED</span>
                  </div>
                  <div className="text-red-800 text-[11px] mt-1">
                    {activeReefer.recommendedAction}
                  </div>
                </div>

                <button
                  onClick={handleOverrideAux}
                  disabled={overrideTriggered}
                  className={`px-3 py-1.5 rounded font-bold transition-all shrink-0 ${
                    overrideTriggered 
                      ? 'bg-[#059669] text-white cursor-not-allowed'
                      : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-xs'
                  }`}
                >
                  {overrideTriggered ? '✓ AUX OVERRIDE ENGAGED' : 'ENGAGE AUX REEFER BOOST ➔'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Cargo Journey & SLA Integrity */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded p-3.5">
            <div className="text-[11px] font-bold text-[#0D3B66] uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
              CARGO & MULTI-MODAL MANIFEST
            </div>

            <div className="mt-3 space-y-2.5">
              <div>
                <div className="text-[10px] text-[#64748B]">CONSIGNMENT / BATCH</div>
                <div className="font-bold text-[#0F172A]">{activeReefer.product}</div>
                <div className="text-[11px] text-[#475569]">Client: {activeReefer.client}</div>
              </div>

              <div className="p-2.5 bg-white border border-[#E2E8F0] rounded space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Container ID:</span>
                  <span className="font-bold text-[#0F172A]">{activeReefer.containerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Origin Vessel:</span>
                  <span className="font-bold text-[#0D3B66]">{activeReefer.vesselOrigin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Assigned Haulage Rig:</span>
                  <span className="font-bold text-[#0F172A]">{activeReefer.assignedTruck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Corridor Leg:</span>
                  <span className="font-bold text-[#0F172A]">{activeReefer.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Battery Remaining:</span>
                  <span className="font-bold text-amber-700">{activeReefer.batteryBackup}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded text-[11px] text-[#166534]">
                <div className="font-bold mb-0.5">COLD-CHAIN ASSURANCE PRINCIPLE:</div>
                <div>
                  By tracking the shared corridor graph, port queue dwell times automatically alert destination warehouse receiving teams to hold cold chambers open.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
