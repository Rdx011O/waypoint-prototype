import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Leaf, ShieldAlert, Clock, ArrowUpRight, DollarSign, Package, Anchor, Truck, ThermometerSnowflake } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend, AreaChart, Area } from 'recharts';

export function AnalyticsView({ activeRole = 'all' }) {
  const corridorTrendData = [
    { day: 'Mon', vizag: 52, chennai: 44, paradip: 48 },
    { day: 'Tue', vizag: 55, chennai: 46, paradip: 50 },
    { day: 'Wed', vizag: 59, chennai: 45, paradip: 52 },
    { day: 'Thu', vizag: 62, chennai: 48, paradip: 54 },
    { day: 'Fri', vizag: 71, chennai: 52, paradip: 59 },
    { day: 'Sat', vizag: 81, chennai: 55, paradip: 65 },
    { day: 'Sun', vizag: 67, chennai: 50, paradip: 60 },
  ];

  const deadheadData = [
    { corridor: 'Vizag-Hyd', emptyAvoidedKm: 612, deadheadRemainingKm: 140 },
    { corridor: 'Chn-Blr', emptyAvoidedKm: 420, deadheadRemainingKm: 90 },
    { corridor: 'Prd-Rpr', emptyAvoidedKm: 540, deadheadRemainingKm: 110 },
    { corridor: 'Kri-Hyd', emptyAvoidedKm: 380, deadheadRemainingKm: 85 },
  ];

  const cargoSlaData = [
    { batch: 'Biocon #B29', plannedHours: 36, actualHours: 49 },
    { batch: 'Hyundai EV', plannedHours: 24, actualHours: 23.5 },
    { batch: 'Falcon Frozen', plannedHours: 48, actualHours: 47 },
    { batch: 'Serum Vaccine', plannedHours: 40, actualHours: 48.5 },
  ];

  const thermalCorrelationData = [
    { hour: '15:00', ambient: 31.2, reeferCore: 3.8 },
    { hour: '16:00', ambient: 32.5, reeferCore: 4.2 },
    { hour: '17:00', ambient: 33.8, reeferCore: 4.9 },
    { hour: '18:00', ambient: 34.2, reeferCore: 5.8 },
    { hour: '19:00', ambient: 33.4, reeferCore: 6.2 },
    { hour: '20:00', ambient: 32.8, reeferCore: 6.5 },
    { hour: '21:00', ambient: 32.1, reeferCore: 7.9 },
  ];

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Corridor Performance & Efficiency Analytics
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Key trends across port turnaround dwell, deadhead elimination, and SLA precision
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 shadow-2xs self-start md:self-auto">
          Reporting Period: <strong>Past 7 Days</strong>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Average Port Dwell</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">14.8 hrs</div>
          <div className="text-[11px] text-rose-600 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +3.2h vs prior baseline
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Backhaul Capture</div>
          <div className="text-lg font-bold text-emerald-600 mt-0.5">73.4% Matched</div>
          <div className="text-[11px] text-emerald-700 mt-1">11 of 15 return runs</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Empty Miles Cut</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">4,896 KM</div>
          <div className="text-[11px] text-blue-700 mt-1">₹336,000 diesel saved</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Cold-Chain SLA</div>
          <div className="text-lg font-bold text-amber-600 mt-0.5">97.2% Precision</div>
          <div className="text-[11px] text-slate-500 mt-1">1 active alert (VC-2048)</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        {/* Port Congestion Trajectory */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Port Congestion Trajectory (% Congestion)
            </h3>
            <span className="text-[11px] text-slate-400">7-Day Curve</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={corridorTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" name="Visakhapatnam (INVTZ)" dataKey="vizag" stroke="#E11D48" strokeWidth={2.5} />
                <Line type="monotone" name="Chennai (INMAA)" dataKey="chennai" stroke="#0F172A" strokeWidth={2} />
                <Line type="monotone" name="Paradip (INPRT)" dataKey="paradip" stroke="#0284C7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Empty Miles Avoided */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Deadhead Mileage Eliminated by Highway Corridor (KM)
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold">Saved vs Residual</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadheadData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="corridor" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="emptyAvoidedKm" name="Deadhead Avoided (KM)" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deadheadRemainingKm" name="Residual Unassigned (KM)" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Planned SLA vs Actual Duration */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Transit Duration: Planned SLA vs Dynamic Predicted (Hours)
            </h3>
            <span className="text-[11px] text-blue-700 font-semibold">Active Consignments</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cargoSlaData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="plannedHours" name="Planned SLA Hours" fill="#0F172A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actualHours" name="Actual / Dynamic Hours" fill="#E11D48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ambient vs Reefer Core Excursion */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Ambient Heat vs Reefer Core Temperature (°C)
            </h3>
            <span className="text-[11px] text-rose-600 font-semibold">VC-2048 Excursion</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={thermalCorrelationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[0, 40]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" name="Ambient Heat (°C)" dataKey="ambient" stroke="#F59E0B" fill="#FEF3C7" />
                <Area type="monotone" name="Reefer Core Temp (°C)" dataKey="reeferCore" stroke="#E11D48" fill="#FEE2E2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
