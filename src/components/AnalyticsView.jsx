import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Leaf, ShieldAlert, Clock, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';

export function AnalyticsView() {
  const corridorTrendData = [
    { day: 'Mon', vizag: 52, chennai: 44, paradip: 48 },
    { day: 'Tue', vizag: 55, chennai: 46, paradip: 50 },
    { day: 'Wed', vizag: 59, chennai: 45, paradip: 52 },
    { day: 'Thu', vizag: 62, chennai: 48, paradip: 54 },
    { day: 'Fri (Est)', vizag: 71, chennai: 52, paradip: 59 },
    { day: 'Sat (Peak)', vizag: 81, chennai: 55, paradip: 65 },
    { day: 'Sun (Rec)', vizag: 67, chennai: 50, paradip: 60 },
  ];

  const deadheadData = [
    { corridor: 'Vizag-Hyd', emptyAvoidedKm: 612, deadheadRemainingKm: 140 },
    { corridor: 'Chn-Blr', emptyAvoidedKm: 420, deadheadRemainingKm: 90 },
    { corridor: 'Prd-Rpr', emptyAvoidedKm: 540, deadheadRemainingKm: 110 },
    { corridor: 'Kri-Hyd', emptyAvoidedKm: 380, deadheadRemainingKm: 85 },
  ];

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-base font-bold text-[#0F172A]">
              CORRIDOR PERFORMANCE & FREIGHT EFFICIENCY
            </h2>
          </div>
          <p className="text-[#64748B] mt-0.5">
            Operational indices answering corridor bottlenecking, empty deadhead ratio, and thermal excursion rate
          </p>
        </div>

        <div className="px-2.5 py-1 bg-[#F8F9FA] border border-[#CBD5E1] rounded text-[11px] text-[#475569]">
          Reporting Period: Past 7 Days (East Coast Corridor)
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
          <div className="text-[10px] text-[#64748B]">AVG PORT DWELL TIME</div>
          <div className="text-base font-bold text-[#0F172A] mt-0.5">14.8 hrs</div>
          <div className="text-[10px] text-red-600 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +3.2h vs prior week
          </div>
        </div>

        <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
          <div className="text-[10px] text-[#64748B]">BACKHAUL CAPTURE RATE</div>
          <div className="text-base font-bold text-[#059669] mt-0.5">73.4%</div>
          <div className="text-[10px] text-[#059669] mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            11 / 15 unassigned matched
          </div>
        </div>

        <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
          <div className="text-[10px] text-[#64748B]">DEADHEAD RUNNING CUT</div>
          <div className="text-base font-bold text-[#0D3B66] mt-0.5">4,896 KM</div>
          <div className="text-[10px] text-[#0D3B66] mt-1">₹336,000 diesel yield</div>
        </div>

        <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
          <div className="text-[10px] text-[#64748B]">COLD-CHAIN SLA INTEGRITY</div>
          <div className="text-base font-bold text-[#D97706] mt-0.5">97.2%</div>
          <div className="text-[10px] text-red-600 mt-1">1 active alert (VC-2048)</div>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Port Congestion Trend */}
        <div className="p-3.5 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
          <div className="text-xs font-bold text-[#0F172A] mb-2 flex items-center justify-between">
            <span>PORT CONGESTION TRAJECTORY (% CONGESTION)</span>
            <span className="text-[10px] text-[#64748B]">7-DAY PROFILE</span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={corridorTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', fontSize: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" name="Visakhapatnam (INVTZ)" dataKey="vizag" stroke="#DC2626" strokeWidth={2.5} />
                <Line type="monotone" name="Chennai (INMAA)" dataKey="chennai" stroke="#0D3B66" strokeWidth={2} />
                <Line type="monotone" name="Paradip (INPRT)" dataKey="paradip" stroke="#086788" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deadhead Mileage Avoided vs Residual */}
        <div className="p-3.5 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
          <div className="text-xs font-bold text-[#0F172A] mb-2 flex items-center justify-between">
            <span>EMPTY DISTANCE ELIMINATED BY CORRIDOR (KM)</span>
            <span className="text-[10px] text-[#059669] font-bold">SAVED VS RESIDUAL</span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadheadData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="corridor" tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                <YAxis tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', fontSize: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="emptyAvoidedKm" name="Deadhead Avoided (KM)" fill="#059669" />
                <Bar dataKey="deadheadRemainingKm" name="Residual Unassigned (KM)" fill="#CBD5E1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
