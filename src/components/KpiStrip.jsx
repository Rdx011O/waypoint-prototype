import React from 'react';
import { Ship, Anchor, Truck, Repeat, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';

export function KpiStrip({ onMetricClick, activeMetric }) {
  const metrics = [
    {
      id: 'vessels',
      tab: 'vessels',
      label: 'VESSELS IN CORRIDOR',
      value: '24',
      sub: '3 inbound pilot',
      icon: Ship,
      status: 'normal',
      color: 'text-[#0D3B66]'
    },
    {
      id: 'congestion',
      tab: 'ports',
      label: 'PORT CONGESTION (AVG)',
      value: '62%',
      sub: 'Peak 81% at Vizag (+48h)',
      icon: Anchor,
      status: 'warning',
      badge: '+9% 24h',
      color: 'text-[#D97706]'
    },
    {
      id: 'transit',
      tab: 'fleet',
      label: 'TRUCKS IN TRANSIT',
      value: '184',
      sub: 'Corridors active',
      icon: Truck,
      status: 'normal',
      color: 'text-[#0F172A]'
    },
    {
      id: 'empty',
      tab: 'backhaul',
      label: 'EMPTY BACKHAUL TRUCKS',
      value: '26',
      sub: '11 matches available',
      icon: Repeat,
      status: 'actionable',
      badge: 'ACTIONABLE',
      color: 'text-[#086788]'
    },
    {
      id: 'shipments',
      tab: 'network',
      label: 'CORRIDOR SHIPMENTS',
      value: '312',
      sub: 'Sea-to-warehouse tracked',
      icon: Package,
      status: 'normal',
      color: 'text-[#0F172A]'
    },
    {
      id: 'coldchain',
      tab: 'coldchain',
      label: 'COLD-CHAIN ALERTS',
      value: '3',
      sub: '1 excursion risk (+7.9°C)',
      icon: AlertTriangle,
      status: 'critical',
      badge: 'CRITICAL',
      color: 'text-[#DC2626]',
      pulse: true
    }
  ];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2 shrink-0">
      {/* Context Label */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#0D3B66]"></div>
        <div>
          <span className="text-[11px] font-bold tracking-wider font-mono text-[#0F172A]">
            NETWORK COMMAND CENTER
          </span>
          <span className="hidden lg:inline text-[11px] text-[#64748B] ml-2 font-mono">
            / East Coast Corridor (Live View)
          </span>
        </div>
      </div>

      {/* Operational Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isActive = activeMetric === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onMetricClick && onMetricClick(m.tab, m.id)}
              className={`flex items-center gap-2 px-2.5 py-1 rounded border text-left transition-all shrink-0 ${
                isActive 
                  ? 'bg-[#F1F5F9] border-[#0D3B66] shadow-xs' 
                  : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E2E8F0]'
              } ${m.pulse ? 'border-red-300' : ''}`}
            >
              <Icon className={`w-3.5 h-3.5 ${m.color} shrink-0`} />
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-[13px] font-bold text-[#0F172A]">
                  {m.value}
                </span>
                <span className="text-[10px] uppercase font-medium text-[#64748B]">
                  {m.label.split(' ')[0]}
                </span>
              </div>
              {m.badge && (
                <span className={`text-[9px] font-mono font-semibold px-1 py-0.2 rounded leading-tight ${
                  m.status === 'critical' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                  m.status === 'actionable' ? 'bg-[#E0F2FE] text-[#0369A1]' :
                  'bg-[#FEF3C7] text-[#D97706]'
                }`}>
                  {m.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
