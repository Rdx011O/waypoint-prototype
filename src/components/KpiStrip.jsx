import React from 'react';
import { 
  Ship, 
  Anchor, 
  Truck, 
  Repeat, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  ThermometerSnowflake, 
  Activity, 
  DollarSign,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export function KpiStrip({ onMetricClick, activeMetric, activeRole = 'all' }) {
  // Define role-specific KPI metrics
  const getMetricsByRole = () => {
    switch (activeRole) {
      case 'cargo_owner':
        return [
          {
            id: 'shipments',
            tab: 'shipments',
            label: 'MY CONSIGNMENTS',
            value: '4 UNITS',
            sub: 'Total Value: ₹15.2 Cr',
            icon: Package,
            status: 'normal',
            color: 'text-[#0D3B66]'
          },
          {
            id: 'sla',
            tab: 'shipments',
            label: 'ON-TIME SLA RATE',
            value: '50%',
            sub: '2 on schedule, 2 delayed',
            icon: TrendingUp,
            status: 'warning',
            badge: '2 DELAYED',
            color: 'text-[#D97706]'
          },
          {
            id: 'exceptions',
            tab: 'shipments',
            label: 'ACTIVE EXCEPTIONS',
            value: '2 RISKS',
            sub: 'SHP-8821 (+13h) • SHP-6612 (+8.5h)',
            icon: AlertTriangle,
            status: 'critical',
            badge: 'ACTION REQ',
            color: 'text-[#DC2626]',
            pulse: true
          },
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'COLD REEFER SENSOR',
            value: '+7.9°C',
            sub: 'Safe: [2°C - 8°C] • VC-2048',
            icon: ThermometerSnowflake,
            status: 'critical',
            badge: 'EXCURSION',
            color: 'text-[#DC2626]',
            pulse: true
          },
          {
            id: 'customs',
            tab: 'shipments',
            label: 'CUSTOMS CLEARED',
            value: '4 / 4',
            sub: 'E-Gate passes active',
            icon: FileCheck,
            status: 'normal',
            badge: 'CLEARED',
            color: 'text-[#059669]'
          }
        ];

      case 'port':
        return [
          {
            id: 'congestion',
            tab: 'ports',
            label: 'PORT CONGESTION',
            value: '62%',
            sub: 'Peak 81% at Vizag (+48h)',
            icon: Anchor,
            status: 'warning',
            badge: '+9% 24H',
            color: 'text-[#DC2626]',
            pulse: true
          },
          {
            id: 'waiting',
            tab: 'ports',
            label: 'ANCHORAGE QUEUE',
            value: '7 SHIPS',
            sub: 'Outer Roads Alpha',
            icon: Ship,
            status: 'warning',
            color: 'text-[#D97706]'
          },
          {
            id: 'berths',
            tab: 'ports',
            label: 'BERTHS AVAILABLE',
            value: '2 / 18',
            sub: 'Berth 04 priority reefer',
            icon: Anchor,
            status: 'normal',
            badge: '2 OPEN',
            color: 'text-[#059669]'
          },
          {
            id: 'dwell',
            tab: 'ports',
            label: 'AVG TURNAROUND DWELL',
            value: '16.0 HRS',
            sub: '+3.2h above norm',
            icon: Activity,
            status: 'warning',
            color: 'text-[#D97706]'
          },
          {
            id: 'trucks',
            tab: 'impact',
            label: 'TRUCKS STAGED',
            value: '26 RIGS',
            sub: 'Anakapalle & Gajuwaka',
            icon: Truck,
            status: 'warning',
            color: 'text-[#0D3B66]'
          }
        ];

      case 'fleet':
        return [
          {
            id: 'transit',
            tab: 'fleet',
            label: 'TRUCKS IN TRANSIT',
            value: '184',
            sub: 'Active highway rigs',
            icon: Truck,
            status: 'normal',
            color: 'text-[#0F172A]'
          },
          {
            id: 'empty',
            tab: 'backhaul',
            label: 'EMPTY BACKHAUL TRUCKS',
            value: '26',
            sub: 'Unassigned return legs',
            icon: Repeat,
            status: 'warning',
            badge: 'UNASSIGNED',
            color: 'text-[#D97706]'
          },
          {
            id: 'matches',
            tab: 'backhaul',
            label: 'BACKHAUL MATCHES',
            value: '11 LOADS',
            sub: 'Up to 94% match rate',
            icon: Repeat,
            status: 'actionable',
            badge: 'ACTIONABLE',
            color: 'text-[#059669]'
          },
          {
            id: 'deadhead',
            tab: 'analytics',
            label: 'DEADHEAD AVOIDED',
            value: '4,896 KM',
            sub: 'Past 7 days corridor',
            icon: TrendingUp,
            status: 'normal',
            badge: 'SAVED',
            color: 'text-[#086788]'
          },
          {
            id: 'revenue',
            tab: 'backhaul',
            label: 'POTENTIAL REVENUE',
            value: '₹336,000',
            sub: 'Diesel yield recovered',
            icon: DollarSign,
            status: 'normal',
            color: 'text-[#059669]'
          }
        ];

      case 'coldchain':
        return [
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'CRITICAL EXCURSION',
            value: '+7.9°C',
            sub: 'VC-2048 Oncology Batch',
            icon: AlertTriangle,
            status: 'critical',
            badge: 'CRITICAL',
            color: 'text-[#DC2626]',
            pulse: true
          },
          {
            id: 'watch',
            tab: 'coldchain',
            label: 'WATCH STATUS',
            value: '+6.8°C',
            sub: 'VC-3019 Vaccine Vials',
            icon: ThermometerSnowflake,
            status: 'warning',
            badge: 'WATCH',
            color: 'text-[#D97706]'
          },
          {
            id: 'stable',
            tab: 'coldchain',
            label: 'STABLE REEFERS',
            value: '2 REEFERS',
            sub: 'VC-1044 (-18.4°C Frozen)',
            icon: CheckCircle2,
            status: 'normal',
            badge: 'STABLE',
            color: 'text-[#059669]'
          },
          {
            id: 'compressor',
            tab: 'coldchain',
            label: 'AVG COMPRESSOR DUTY',
            value: '82%',
            sub: 'Peak 98% under high ambient',
            icon: Activity,
            status: 'warning',
            color: 'text-[#0D3B66]'
          },
          {
            id: 'battery',
            tab: 'coldchain',
            label: 'AUX BATTERY RESERVE',
            value: '6.5 HRS',
            sub: 'Emergency boost ready',
            icon: ShieldCheck,
            status: 'warning',
            color: 'text-[#D97706]'
          }
        ];

      case 'all':
      default:
        return [
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
            tab: 'shipments', // Fixed: was previously 'network' which broke navigation
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
    }
  };

  const metrics = getMetricsByRole();

  const roleTitles = {
    all: 'CONTROL TOWER KPI FEED',
    cargo_owner: 'CARGO OWNER KPI FEED',
    port: 'HARBOUR & PORT KPI FEED',
    fleet: 'FLEET & HAULAGE KPI FEED',
    coldchain: 'COLD-CHAIN TELEMETRY FEED'
  };

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] px-3 sm:px-4 py-1.5 flex flex-col md:flex-row md:items-center justify-between gap-2 shrink-0">
      {/* Context Label */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="w-2 h-2 rounded-full bg-[#0D3B66] animate-pulse"></span>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#0F172A]">
            {roleTitles[activeRole] || 'NETWORK COMMAND CENTER'}
          </span>
          <span className="hidden xl:inline text-[10px] text-[#64748B]">
            / Live Synchronized Telemetry
          </span>
        </div>
      </div>

      {/* Operational Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isActive = activeMetric === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onMetricClick && onMetricClick(m.tab, m.id)}
              className={`flex items-center gap-2 px-2.5 py-1 rounded border text-left transition-all shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-[#F1F5F9] border-[#0D3B66] shadow-xs ring-1 ring-[#0D3B66]' 
                  : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] border-[#E2E8F0]'
              } ${m.pulse ? 'border-red-300 bg-red-50/40' : ''}`}
              title={`Click to open ${m.label}`}
            >
              <Icon className={`w-3.5 h-3.5 ${m.color} shrink-0`} />
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                  {m.value}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-medium text-[#64748B] hidden sm:inline">
                  {m.label.split(' ')[0]}
                </span>
              </div>
              {m.badge && (
                <span className={`text-[8.5px] sm:text-[9px] font-mono font-bold px-1 py-0.2 rounded leading-tight ${
                  m.status === 'critical' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                  m.status === 'actionable' ? 'bg-[#E0F2FE] text-[#0369A1]' :
                  m.status === 'warning' ? 'bg-[#FEF3C7] text-[#D97706]' :
                  'bg-[#DCFCE7] text-[#15803D]'
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
