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

export function KpiStrip({ onMetricClick, activeMetric, activeRole = 'all' }) {
  const getMetricsByRole = () => {
    switch (activeRole) {
      case 'cargo_owner':
        return [
          {
            id: 'shipments',
            tab: 'shipments',
            label: 'Total Shipments',
            value: '4 Consignments',
            sub: 'Total Value: ₹15.2 Cr',
            icon: Package,
            status: 'normal',
            color: 'text-blue-600 bg-blue-50'
          },
          {
            id: 'sla',
            tab: 'shipments',
            label: 'On-Time Delivery Rate',
            value: '50%',
            sub: '2 on schedule, 2 delayed',
            icon: TrendingUp,
            status: 'warning',
            badge: '2 Delayed',
            color: 'text-amber-600 bg-amber-50'
          },
          {
            id: 'exceptions',
            tab: 'shipments',
            label: 'Active Delays',
            value: '2 Shipments',
            sub: 'Due to port bottleneck',
            icon: AlertTriangle,
            status: 'critical',
            badge: 'Action Needed',
            color: 'text-rose-600 bg-rose-50'
          },
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'Reefer Temp Alert',
            value: '+7.9°C',
            sub: 'VC-2048 Oncology Batch',
            icon: ThermometerSnowflake,
            status: 'critical',
            badge: 'Near Limit',
            color: 'text-rose-600 bg-rose-50'
          },
          {
            id: 'customs',
            tab: 'shipments',
            label: 'Customs Clearances',
            value: '4 of 4 Ready',
            sub: 'E-Gate passes issued',
            icon: FileCheck,
            status: 'normal',
            badge: 'Cleared',
            color: 'text-emerald-600 bg-emerald-50'
          }
        ];

      case 'port':
        return [
          {
            id: 'congestion',
            tab: 'ports',
            label: 'Port Congestion',
            value: '62%',
            sub: 'Visakhapatnam (Peak 81% at +48h)',
            icon: Anchor,
            status: 'warning',
            badge: '+9% 24h',
            color: 'text-rose-600 bg-rose-50'
          },
          {
            id: 'waiting',
            tab: 'ports',
            label: 'Anchorage Queue',
            value: '7 Vessels',
            sub: 'Outer Roads Alpha',
            icon: Ship,
            status: 'warning',
            color: 'text-amber-600 bg-amber-50'
          },
          {
            id: 'berths',
            tab: 'ports',
            label: 'Berths Available',
            value: '2 of 18',
            sub: 'Berth 04 priority reefer',
            icon: Anchor,
            status: 'normal',
            badge: '2 Open',
            color: 'text-emerald-600 bg-emerald-50'
          },
          {
            id: 'dwell',
            tab: 'ports',
            label: 'Avg Turnaround',
            value: '16.0 hrs',
            sub: '+3.2h vs normal average',
            icon: Activity,
            status: 'warning',
            color: 'text-amber-600 bg-amber-50'
          },
          {
            id: 'trucks',
            tab: 'impact',
            label: 'Trucks Waiting at Gate',
            value: '26 Rigs',
            sub: 'Anakapalle & Gajuwaka',
            icon: Truck,
            status: 'warning',
            color: 'text-blue-600 bg-blue-50'
          }
        ];

      case 'fleet':
        return [
          {
            id: 'transit',
            tab: 'fleet',
            label: 'Rigs on Corridor',
            value: '184 Trucks',
            sub: 'NH-65 / NH-44 routes active',
            icon: Truck,
            status: 'normal',
            color: 'text-slate-700 bg-slate-100'
          },
          {
            id: 'empty',
            tab: 'backhaul',
            label: 'Empty Return Trucks',
            value: '26 Rigs',
            sub: 'Unassigned deadhead runs',
            icon: Repeat,
            status: 'warning',
            badge: 'Unassigned',
            color: 'text-amber-600 bg-amber-50'
          },
          {
            id: 'matches',
            tab: 'backhaul',
            label: 'Backhaul Load Matches',
            value: '11 Matches',
            sub: 'Up to 94% match proximity',
            icon: Repeat,
            status: 'actionable',
            badge: 'Ready to Assign',
            color: 'text-emerald-600 bg-emerald-50'
          },
          {
            id: 'deadhead',
            tab: 'analytics',
            label: 'Empty Miles Saved',
            value: '4,896 KM',
            sub: 'Past 7 days across corridor',
            icon: TrendingUp,
            status: 'normal',
            badge: 'Saved',
            color: 'text-sky-600 bg-sky-50'
          },
          {
            id: 'revenue',
            tab: 'backhaul',
            label: 'Recovered Revenue',
            value: '₹336,000',
            sub: 'Estimated freight yield',
            icon: DollarSign,
            status: 'normal',
            color: 'text-emerald-600 bg-emerald-50'
          }
        ];

      case 'coldchain':
        return [
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'Critical Excursion Alert',
            value: '+7.9°C',
            sub: 'VC-2048 Oncology Batch (Limit: 8°C)',
            icon: AlertTriangle,
            status: 'critical',
            badge: 'Critical',
            color: 'text-rose-600 bg-rose-50'
          },
          {
            id: 'watch',
            tab: 'coldchain',
            label: 'Watch Status',
            value: '+6.8°C',
            sub: 'VC-3019 Vaccine Vials',
            icon: ThermometerSnowflake,
            status: 'warning',
            badge: 'Watch',
            color: 'text-amber-600 bg-amber-50'
          },
          {
            id: 'stable',
            tab: 'coldchain',
            label: 'Stable Reefers',
            value: '2 Reefers',
            sub: 'VC-1044 (-18.4°C Deep Freeze)',
            icon: CheckCircle2,
            status: 'normal',
            badge: 'Normal',
            color: 'text-emerald-600 bg-emerald-50'
          },
          {
            id: 'compressor',
            tab: 'coldchain',
            label: 'Compressor Load',
            value: '82% Avg',
            sub: 'Peak 98% under ambient heat',
            icon: Activity,
            status: 'warning',
            color: 'text-blue-600 bg-blue-50'
          },
          {
            id: 'battery',
            tab: 'coldchain',
            label: 'Aux Battery Reserve',
            value: '6.5 Hours',
            sub: 'Emergency boost ready',
            icon: CheckCircle2,
            status: 'normal',
            color: 'text-emerald-600 bg-emerald-50'
          }
        ];

      case 'all':
      default:
        return [
          {
            id: 'vessels',
            tab: 'vessels',
            label: 'Ships in Corridor',
            value: '24 Vessels',
            sub: '3 inbound to pilot',
            icon: Ship,
            status: 'normal',
            color: 'text-blue-600 bg-blue-50'
          },
          {
            id: 'congestion',
            tab: 'ports',
            label: 'Port Congestion',
            value: '62% Avg',
            sub: 'Peak 81% at Vizag (+48h)',
            icon: Anchor,
            status: 'warning',
            badge: '+9% 24h',
            color: 'text-amber-600 bg-amber-50'
          },
          {
            id: 'transit',
            tab: 'fleet',
            label: 'Trucks in Transit',
            value: '184 Units',
            sub: 'Active road corridors',
            icon: Truck,
            status: 'normal',
            color: 'text-slate-700 bg-slate-100'
          },
          {
            id: 'empty',
            tab: 'backhaul',
            label: 'Empty Return Trucks',
            value: '26 Rigs',
            sub: '11 load matches available',
            icon: Repeat,
            status: 'actionable',
            badge: '11 Matches',
            color: 'text-emerald-600 bg-emerald-50'
          },
          {
            id: 'shipments',
            tab: 'shipments',
            label: 'Tracked Consignments',
            value: '312 Cargoes',
            sub: 'Sea-to-warehouse synced',
            icon: Package,
            status: 'normal',
            color: 'text-slate-700 bg-slate-100'
          },
          {
            id: 'coldchain',
            tab: 'coldchain',
            label: 'Cold-Chain Alerts',
            value: '3 Reefers',
            sub: '1 excursion risk (+7.9°C)',
            icon: AlertTriangle,
            status: 'critical',
            badge: '1 Critical',
            color: 'text-rose-600 bg-rose-50'
          }
        ];
    }
  };

  const metrics = getMetricsByRole();

  return (
    <div className="bg-slate-50/70 border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 shrink-0 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2.5 w-full min-w-max">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isActive = activeMetric === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onMetricClick && onMetricClick(m.tab, m.id)}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                isActive 
                  ? 'bg-white border-slate-400 shadow-xs ring-1 ring-slate-400' 
                  : 'bg-white hover:bg-slate-100/60 border-slate-200'
              }`}
              title={`View ${m.label}`}
            >
              <div className={`p-1.5 rounded-md shrink-0 ${m.color}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">
                    {m.value}
                  </span>
                  {m.badge && (
                    <span className={`text-[9.5px] font-semibold px-1.5 py-0.2 rounded ${
                      m.status === 'critical' ? 'bg-rose-100 text-rose-700' :
                      m.status === 'actionable' ? 'bg-emerald-100 text-emerald-800' :
                      m.status === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {m.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
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
