import React from 'react';
import { X, Anchor, Layers, Truck, ThermometerSnowflake, Package, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useToast } from './ToastNotification';

export function RoleWorkspaceModal({ isOpen, onClose, activeRole, onSelectRole }) {
  const { addToast } = useToast();

  if (!isOpen) return null;

  const roles = [
    {
      id: 'all',
      title: 'Unified Control Tower',
      sub: 'See the full panoramic view connecting ships in the Bay of Bengal, seaport berths, highway trucks, and warehouses.',
      icon: Layers,
      color: 'text-sky-600 bg-sky-50',
      badge: 'All Corridors',
      highlights: ['Interactive GIS Map', 'Shared Route Graph', 'Bottleneck Cascade Simulation']
    },
    {
      id: 'cargo_owner',
      title: 'Cargo Owner & Importer',
      sub: 'Focus on your active consignments, container dwell times, delivery SLAs, and one-click priority yard passes.',
      icon: Package,
      color: 'text-blue-600 bg-blue-50',
      badge: 'Importer Portal',
      highlight: true,
      highlights: ['Active Consignments (4)', 'Dynamic Predicted ETAs', 'Customs Bill of Entry Records']
    },
    {
      id: 'port',
      title: 'Port Operations & Berths',
      sub: 'Surveil outer anchorage queues, berth capacity (B-01 to B-06), and 72-hour congestion forecasts.',
      icon: Anchor,
      color: 'text-rose-600 bg-rose-50',
      badge: 'Port Ops',
      highlights: ['72h Peak Forecast (81%)', 'Berth Assignment Control', 'Anchorage Vessel Queue']
    },
    {
      id: 'fleet',
      title: 'Fleet Dispatch & Backhaul',
      sub: 'Monitor highway trucks, match empty return legs to new loads, and eliminate costly deadhead miles.',
      icon: Truck,
      color: 'text-emerald-600 bg-emerald-50',
      badge: 'Trucking Engine',
      highlights: ['184 Active Rigs', '11 Backhaul Load Matches', '4,896 KM Empty Miles Saved']
    },
    {
      id: 'coldchain',
      title: 'Cold-Chain Surveillance',
      sub: 'Track real-time temperature telemetry curves for pharma biologics and vaccines, with emergency aux boost controls.',
      icon: ThermometerSnowflake,
      color: 'text-teal-600 bg-teal-50',
      badge: 'Reefer IoT',
      highlights: ['Real-Time Temp Curves [2°-8°C]', 'Compressor Duty Cycle', 'Auxiliary Cooling Boost']
    }
  ];

  const handleRoleClick = (roleId, roleTitle) => {
    onSelectRole(roleId);
    onClose();
    addToast({
      type: 'info',
      title: 'Workspace Changed',
      message: `Now viewing as ${roleTitle}. Data and views adapted.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Select Your Role Workspace
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose your perspective to tailor the screens, metrics, and alerts
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = activeRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => handleRoleClick(role.id, role.title)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-100 shadow-xs'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${role.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{role.title}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        {role.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {role.sub}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {role.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] text-slate-500 bg-slate-100/70 px-2 py-0.5 rounded">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end sm:justify-center">
                  {isSelected ? (
                    <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                      Switch ➔
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>You can change your role anytime from the header</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
