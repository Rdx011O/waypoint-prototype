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
  TrendingUp, 
  FileCheck 
} from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function KpiStrip({ onMetricClick, activeMetric, activeRole = 'all' }) {
  const getMetricsByRole = () => {
    switch (activeRole) {
      case 'cargo_owner':
        return [
          {
            id: 'shipments',
            tab: 'shipments',
            label: 'Total Shipments',
            value: '4 Units',
            sub: '₹15.2 Cr Total Value',
            icon: Package,
            status: 'normal',
            color: 'text-[#007AFF] bg-blue-50'
          },
          {
            id: 'sla',
            tab: 'shipments',
            label: 'On-Time SLA',
            value: '50%',
            sub: '2 On Time, 2 Delayed',
            icon: TrendingUp,
            status: 'warning',
            badge: '2 Delayed',
            color: 'text-[#FF9500] bg-amber-50'
          },
          {
            id: 'exceptions',
            tab: 'shipments',
            label: 'Port Cascades',
            value: '2 Delays',
            sub: 'Berth 04 Queue',
            icon: AlertTriangle,
            status: 'critical',
            badge: 'Urgent',
            color: 'text-[#FF3B30] bg-rose-50'
          },
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'Reefer Temp',
            value: '+7.9°C',
            sub: 'VC-2048 Oncology',
            icon: ThermometerSnowflake,
            status: 'critical',
            badge: 'Near Limit',
            color: 'text-[#FF3B30] bg-rose-50'
          },
          {
            id: 'customs',
            tab: 'shipments',
            label: 'E-Gate Clearances',
            value: '4 of 4 Ready',
            sub: 'All Passes Issued',
            icon: FileCheck,
            status: 'normal',
            badge: '100% Cleared',
            color: 'text-[#34C759] bg-emerald-50'
          }
        ];

      case 'port':
        return [
          {
            id: 'congestion',
            tab: 'ports',
            label: 'Port Congestion',
            value: '62%',
            sub: 'Vizag (Peak 81% at +48h)',
            icon: Anchor,
            status: 'warning',
            badge: '+9% 24h',
            color: 'text-[#FF3B30] bg-rose-50'
          },
          {
            id: 'waiting',
            tab: 'ports',
            label: 'Anchorage Queue',
            value: '7 Ships',
            sub: 'Roads Alpha Area',
            icon: Ship,
            status: 'warning',
            color: 'text-[#FF9500] bg-amber-50'
          },
          {
            id: 'berths',
            tab: 'ports',
            label: 'Available Berths',
            value: '2 of 18',
            sub: 'Berth 04 Reefer Ready',
            icon: Anchor,
            status: 'normal',
            badge: '2 Free',
            color: 'text-[#34C759] bg-emerald-50'
          },
          {
            id: 'dwell',
            tab: 'ports',
            label: 'Avg Turnaround',
            value: '16.0 hrs',
            sub: '+3.2h vs standard',
            icon: Activity,
            status: 'warning',
            color: 'text-[#FF9500] bg-amber-50'
          },
          {
            id: 'trucks',
            tab: 'impact',
            label: 'Waiting at Gate',
            value: '26 Rigs',
            sub: 'Anakapalle Staging',
            icon: Truck,
            status: 'warning',
            color: 'text-[#007AFF] bg-blue-50'
          }
        ];

      case 'fleet':
        return [
          {
            id: 'transit',
            tab: 'fleet',
            label: 'Corridor Rigs',
            value: '184 Units',
            sub: 'NH-65 Active Highway',
            icon: Truck,
            status: 'normal',
            color: 'text-slate-700 bg-slate-100'
          },
          {
            id: 'empty',
            tab: 'backhaul',
            label: 'Empty Return Rigs',
            value: '26 Deadheads',
            sub: 'Unassigned return runs',
            icon: Repeat,
            status: 'warning',
            badge: 'Deadheads',
            color: 'text-[#FF9500] bg-amber-50'
          },
          {
            id: 'matches',
            tab: 'backhaul',
            label: 'Backhaul Matches',
            value: '11 Matches',
            sub: '94% Proximity Score',
            icon: Repeat,
            status: 'actionable',
            badge: 'Ready to Book',
            color: 'text-[#34C759] bg-emerald-50'
          },
          {
            id: 'deadhead',
            tab: 'analytics',
            label: 'Empty KM Saved',
            value: '4,896 KM',
            sub: 'Past 7 Days Saved',
            icon: TrendingUp,
            status: 'normal',
            badge: 'Saved',
            color: 'text-[#007AFF] bg-sky-50'
          },
          {
            id: 'revenue',
            tab: 'backhaul',
            label: 'Recovered Yield',
            value: '₹336,000',
            sub: 'Net Freight Gain',
            icon: DollarSign,
            status: 'normal',
            color: 'text-[#34C759] bg-emerald-50'
          }
        ];

      case 'coldchain':
        return [
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'Thermal Excursion',
            value: '+7.9°C',
            sub: 'VC-2048 (Limit +8°C)',
            icon: AlertTriangle,
            status: 'critical',
            badge: 'Critical',
            color: 'text-[#FF3B30] bg-rose-50'
          },
          {
            id: 'watch',
            tab: 'coldchain',
            label: 'Watch Telemetry',
            value: '+6.8°C',
            sub: 'VC-3019 Vaccine Vials',
            icon: ThermometerSnowflake,
            status: 'warning',
            badge: 'Watch',
            color: 'text-[#FF9500] bg-amber-50'
          },
          {
            id: 'stable',
            tab: 'coldchain',
            label: 'Stable Cold Units',
            value: '2 Reefers',
            sub: 'VC-1044 (-18.4°C)',
            icon: CheckCircle2,
            status: 'normal',
            badge: 'Normal',
            color: 'text-[#34C759] bg-emerald-50'
          },
          {
            id: 'compressor',
            tab: 'coldchain',
            label: 'Compressor Load',
            value: '82% Avg',
            sub: 'Peak 98% under sun',
            icon: Activity,
            status: 'warning',
            color: 'text-[#007AFF] bg-blue-50'
          },
          {
            id: 'battery',
            tab: 'coldchain',
            label: 'Aux Battery Reserve',
            value: '6.5 Hours',
            sub: 'Emergency Boost',
            icon: CheckCircle2,
            status: 'normal',
            color: 'text-[#34C759] bg-emerald-50'
          }
        ];

      case 'all':
      default:
        return [
          {
            id: 'vessels',
            tab: 'vessels',
            label: 'Corridor Vessels',
            value: '24 Ships',
            sub: '3 inbound to pilot',
            icon: Ship,
            status: 'normal',
            color: 'text-[#007AFF] bg-blue-50'
          },
          {
            id: 'congestion',
            tab: 'ports',
            label: 'Port Congestion',
            value: '62% Avg',
            sub: 'Peak 81% Vizag (+48h)',
            icon: Anchor,
            status: 'warning',
            badge: '+9% 24h',
            color: 'text-[#FF9500] bg-amber-50'
          },
          {
            id: 'transit',
            tab: 'fleet',
            label: 'Highway Trucks',
            value: '184 Units',
            sub: 'NH-65 Active Rigs',
            icon: Truck,
            status: 'normal',
            color: 'text-slate-700 bg-slate-100'
          },
          {
            id: 'empty',
            tab: 'backhaul',
            label: 'Empty Return Rigs',
            value: '26 Trucks',
            sub: '11 load matches ready',
            icon: Repeat,
            status: 'actionable',
            badge: '11 Matches',
            color: 'text-[#34C759] bg-emerald-50'
          },
          {
            id: 'shipments',
            tab: 'shipments',
            label: 'Active Cargoes',
            value: '312 Cargoes',
            sub: 'Sea-to-Door Synced',
            icon: Package,
            status: 'normal',
            color: 'text-slate-700 bg-slate-100'
          },
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'Thermal Alerts',
            value: '3 Reefers',
            sub: '1 excursion risk (+7.9°C)',
            icon: AlertTriangle,
            status: 'critical',
            badge: '1 Critical',
            color: 'text-[#FF3B30] bg-rose-50'
          }
        ];
    }
  };

  const metrics = getMetricsByRole();

  const handleCardClick = (m) => {
    playIosChime('tap');
    if (onMetricClick) onMetricClick(m.tab, m.id);
  };

  return (
    <div className="bg-[#F2F4F7] px-3 sm:px-6 py-1.5 flex items-center justify-between gap-2.5 shrink-0 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2.5 w-full min-w-max">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isActive = activeMetric === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleCardClick(m)}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl border text-left transition-all cursor-pointer ios-btn ${
                isActive 
                  ? 'bg-white border-[#007AFF]/40 shadow-sm ring-2 ring-[#007AFF]/20' 
                  : 'bg-white/80 hover:bg-white border-black/[0.05] shadow-2xs hover:shadow-xs'
              }`}
              title={`View ${m.label}`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${m.color}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900 tracking-tight">
                    {m.value}
                  </span>
                  {m.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      m.status === 'critical' ? 'bg-[#FF3B30]/15 text-[#FF3B30]' :
                      m.status === 'actionable' ? 'bg-[#34C759]/15 text-[#34C759]' :
                      m.status === 'warning' ? 'bg-[#FF9500]/15 text-[#FF9500]' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {m.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold tracking-tight">
                  {m.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
