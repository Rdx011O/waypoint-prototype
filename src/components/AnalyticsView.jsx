import React from 'react';
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
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Corridor Analytics
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Key operational trends across turnaround dwell, deadhead elimination, and SLA precision
          </p>
        </div>

        <div className="apple-card px-3 py-1.5 text-xs text-[#86868B] self-start sm:self-auto">
          Period: <strong className="text-[#1D1D1F]">Past 7 Days</strong>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Average Port Dwell</div>
          <div className="text-xl font-bold text-[#1D1D1F] mt-0.5">14.8 hrs</div>
          <div className="text-[11px] text-[#FF3B30] mt-1 flex items-center gap-0.5 font-medium">
            <TrendingUp className="w-3 h-3" />
            +3.2h vs prior baseline
          </div>
        </div>

        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Backhaul Capture</div>
          <div className="text-xl font-bold text-[#34C759] mt-0.5">73.4% Matched</div>
          <div className="text-[11px] text-[#34C759] mt-1 font-medium">11 of 15 return runs</div>
        </div>

        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Empty Miles Cut</div>
          <div className="text-xl font-bold text-[#1D1D1F] mt-0.5">4,896 km</div>
          <div className="text-[11px] text-[#0071E3] mt-1 font-medium">₹336,000 diesel saved</div>
        </div>

        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Cold-Chain SLA</div>
          <div className="text-xl font-bold text-[#FF9500] mt-0.5">97.2% Precision</div>
          <div className="text-[11px] text-[#86868B] mt-1 font-medium">1 active alert (VC-2048)</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Port Congestion Trajectory */}
        <div className="apple-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Port Congestion Trajectory (%)
            </h3>
            <span className="text-[11px] text-[#86868B]">7-Day Trend</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={corridorTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <Tooltip contentStyle={{ backgroundColor: '#1D1D1F', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" name="Visakhapatnam (INVTZ)" dataKey="vizag" stroke="#FF3B30" strokeWidth={2.5} />
                <Line type="monotone" name="Chennai (INMAA)" dataKey="chennai" stroke="#1D1D1F" strokeWidth={2} />
                <Line type="monotone" name="Paradip (INPRT)" dataKey="paradip" stroke="#0071E3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Empty Miles Avoided */}
        <div className="apple-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Deadhead Avoided by Corridor (KM)
            </h3>
            <span className="text-[11px] text-[#34C759] font-semibold">Saved vs Residual</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadheadData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="corridor" tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <YAxis tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <Tooltip contentStyle={{ backgroundColor: '#1D1D1F', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="emptyAvoidedKm" name="Deadhead Avoided (KM)" fill="#34C759" radius={[6, 6, 0, 0]} />
                <Bar dataKey="deadheadRemainingKm" name="Residual Unassigned (KM)" fill="#E5E5EA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Planned SLA vs Actual Duration */}
        <div className="apple-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Transit Duration: Planned SLA vs Actual (Hours)
            </h3>
            <span className="text-[11px] text-[#0071E3] font-semibold">Active Batches</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cargoSlaData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <YAxis tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <Tooltip contentStyle={{ backgroundColor: '#1D1D1F', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="plannedHours" name="Planned SLA Hours" fill="#1D1D1F" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actualHours" name="Actual / Dynamic Hours" fill="#FF3B30" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ambient vs Reefer Core Excursion */}
        <div className="apple-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Ambient Heat vs Reefer Core (°C)
            </h3>
            <span className="text-[11px] text-[#FF3B30] font-semibold">VC-2048 Excursion</span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={thermalCorrelationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <YAxis domain={[0, 40]} tick={{ fontSize: 11, fill: '#86868B' }} stroke="#E5E5EA" />
                <Tooltip contentStyle={{ backgroundColor: '#1D1D1F', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" name="Ambient Heat (°C)" dataKey="ambient" stroke="#FF9500" fill="#FF9500" fillOpacity={0.15} />
                <Area type="monotone" name="Reefer Core Temp (°C)" dataKey="reeferCore" stroke="#FF3B30" fill="#FF3B30" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

