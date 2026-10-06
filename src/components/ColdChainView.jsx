import React, { useState } from 'react';
import { COLD_CHAIN_MONITORING } from '../data/mockData';
import { ThermometerSnowflake, AlertTriangle, ShieldCheck, BatteryCharging, Zap, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useToast } from './ToastNotification';

export function ColdChainView({ onSelectAsset, activeRole = 'all' }) {
  const [selectedId, setSelectedId] = useState('VC-2048');
  const [overrideTriggered, setOverrideTriggered] = useState(false);
  const { addToast } = useToast();

  const activeReefer = COLD_CHAIN_MONITORING.find(r => r.id === selectedId) || COLD_CHAIN_MONITORING[0];

  const handleOverrideAux = () => {
    setOverrideTriggered(true);
    addToast({
      type: 'success',
      title: 'Auxiliary Cooling Override Engaged',
      message: `Reefer ${activeReefer.id} genset set to maximum cooling boost. Temperature returning to safe zone.`
    });
  };

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Cold-Chain Surveillance & Reefer IoT
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time thermal telemetry curves, compressor duty cycles, and emergency cooling overrides
              </p>
            </div>
          </div>
        </div>

        {/* Reefer Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar shadow-2xs">
          {COLD_CHAIN_MONITORING.map(r => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedId(r.id);
                setOverrideTriggered(false);
                if (onSelectAsset) onSelectAsset({ ...r, assetType: 'coldchain' });
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedId === r.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{r.id}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                r.riskLevel === 'CRITICAL' ? 'bg-rose-500 text-white' :
                r.riskLevel === 'WARNING' ? 'bg-amber-500 text-white' :
                'bg-emerald-600 text-white'
              }`}>
                {r.currentTemp > 0 ? `+${r.currentTemp}°C` : `${r.currentTemp}°C`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
        {/* Left Column: Temperature Graph & Override Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-1">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Sensor Temperature Curve (Past 6 Hours)
                </h2>
                <div className="text-xs text-slate-500">
                  Safe Threshold Range: [{activeReefer.safeRangeMin}°C — {activeReefer.safeRangeMax}°C]
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                activeReefer.riskLevel === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                activeReefer.riskLevel === 'WARNING' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {activeReefer.statusLabel}
              </span>
            </div>

            {/* Recharts Curve */}
            <div className="h-48 sm:h-52 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeReefer.temperatureHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis 
                    domain={[activeReefer.safeRangeMin - 2, activeReefer.safeRangeMax + 2]} 
                    tick={{ fontSize: 11, fill: '#64748B' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(val) => [`${val}°C`, 'Core Temp']}
                  />
                  <ReferenceLine y={activeReefer.safeRangeMax} stroke="#E11D48" strokeDasharray="3 3" label={{ value: `Max Safe (${activeReefer.safeRangeMax}°C)`, position: 'insideTopRight', fill: '#E11D48', fontSize: 10 }} />
                  <ReferenceLine y={activeReefer.safeRangeMin} stroke="#059669" strokeDasharray="3 3" label={{ value: `Min Safe (${activeReefer.safeRangeMin}°C)`, position: 'insideBottomRight', fill: '#059669', fontSize: 10 }} />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke={activeReefer.riskLevel === 'CRITICAL' ? '#E11D48' : '#0284C7'} 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: activeReefer.riskLevel === 'CRITICAL' ? '#E11D48' : '#0284C7' }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Telemetry Readout */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">CORE SENSOR TEMP</div>
                <div className={`text-base font-bold mt-0.5 ${activeReefer.riskLevel === 'CRITICAL' ? 'text-rose-600' : 'text-slate-900'}`}>
                  {activeReefer.currentTemp > 0 ? `+${activeReefer.currentTemp}°C` : `${activeReefer.currentTemp}°C`}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">OUTSIDE AMBIENT HEAT</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{activeReefer.ambientTemp}°C</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">COMPRESSOR DUTY</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{activeReefer.compressorDuty}</div>
              </div>
            </div>
          </div>

          {/* Action Alert */}
          {activeReefer.riskLevel === 'CRITICAL' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold flex items-center gap-2 text-xs text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Thermal Excursion Risk: {activeReefer.id}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    {activeReefer.recommendedAction}
                  </p>
                </div>

                <button
                  onClick={handleOverrideAux}
                  disabled={overrideTriggered}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all shrink-0 cursor-pointer shadow-xs ${
                    overrideTriggered 
                      ? 'bg-emerald-700 text-white cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {overrideTriggered ? '✓ Aux Cooling Boost Active' : 'Engage Emergency Aux Boost ➔'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Cargo Spec */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
              Reefer Cargo Manifest & Route
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Product Description</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{activeReefer.product}</div>
                <div className="text-slate-500 text-[11px]">Client: {activeReefer.client}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Container ID:</span>
                  <span className="font-bold text-slate-900">{activeReefer.containerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Inbound Carrier Vessel:</span>
                  <span className="font-bold text-slate-900">{activeReefer.vesselOrigin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Road Rig:</span>
                  <span className="font-bold text-slate-900">{activeReefer.assignedTruck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Corridor Highway Route:</span>
                  <span className="font-bold text-slate-900">{activeReefer.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Aux Battery Life:</span>
                  <span className="font-bold text-amber-600">{activeReefer.batteryBackup}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                <strong>Corridor Protection:</strong> When port delays are detected upstream, Waypoint triggers early warehouse pre-conditioning to ensure cold rooms are ready before the truck arrives.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
