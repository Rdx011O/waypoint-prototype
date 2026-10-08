import React from 'react';
import { X, Anchor, Layers, Truck, ThermometerSnowflake, Package, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function RoleWorkspaceModal({ isOpen, onClose, activeRole, onSelectRole }) {
  const { addToast } = useToast();

  if (!isOpen) return null;

  const roles = [
    {
      id: 'all',
      title: 'Unified Control Tower',
      sub: 'See the full panoramic view connecting ships in the Bay of Bengal, seaport berths, highway trucks, and warehouses.',
      icon: Layers,
      color: 'text-[#007AFF] bg-blue-50',
      badge: 'All Corridors',
      highlights: ['Interactive GIS Map', 'Shared Route Graph', 'Bottleneck Cascade Simulation']
    },
    {
      id: 'cargo_owner',
      title: 'Cargo Owner & Importer',
      sub: 'Focus on your active consignments, container dwell times, delivery SLAs, and one-click priority yard passes.',
      icon: Package,
      color: 'text-[#5856D6] bg-indigo-50',
      badge: 'Importer Portal',
      highlight: true,
      highlights: ['Active Consignments (4)', 'Dynamic Predicted ETAs', 'Customs Bill of Entry Records']
    },
    {
      id: 'port',
      title: 'Port Operations & Berths',
      sub: 'Surveil outer anchorage queues, berth capacity (B-01 to B-06), and 72-hour congestion forecasts.',
      icon: Anchor,
      color: 'text-[#FF3B30] bg-rose-50',
      badge: 'Port Ops',
      highlights: ['72h Peak Forecast (81%)', 'Berth Assignment Control', 'Anchorage Vessel Queue']
    },
    {
      id: 'fleet',
      title: 'Fleet Dispatch & Backhaul',
      sub: 'Monitor highway trucks, match empty return legs to new loads, and eliminate costly deadhead miles.',
      icon: Truck,
      color: 'text-[#34C759] bg-emerald-50',
      badge: 'Trucking Engine',
      highlights: ['184 Active Rigs', '11 Backhaul Load Matches', '4,896 KM Empty Miles Saved']
    },
    {
      id: 'coldchain',
      title: 'Cold-Chain Surveillance',
      sub: 'Track real-time temperature telemetry curves for pharma biologics and vaccines, with emergency aux boost controls.',
      icon: ThermometerSnowflake,
      color: 'text-[#30B0C7] bg-teal-50',
      badge: 'Reefer IoT',
      highlights: ['Real-Time Temp Curves [2°-8°C]', 'Compressor Duty Cycle', 'Auxiliary Cooling Boost']
    }
  ];

  const handleRoleClick = (roleId, roleTitle) => {
    playIosChime('success');
    onSelectRole(roleId);
    onClose();
    addToast({
      type: 'info',
      title: 'Workspace Changed',
      message: `Now viewing as ${roleTitle}. Data and views adapted.`
    });
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-2xl border border-black/10 rounded-[28px] max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* iOS Modal Header */}
        <div className="p-5 pb-4 border-b border-black/[0.05] flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Select Corridor Perspective
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Choose your persona to tailor the live screens, metrics, and operations
            </p>
          </div>

          <button
            onClick={() => {
              playIosChime('tap');
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer ios-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-4 space-y-2.5 overflow-y-auto flex-1">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = activeRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => handleRoleClick(role.id, role.title)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ios-btn ${
                  isSelected
                    ? 'bg-blue-50/70 border-[#007AFF] ring-2 ring-[#007AFF]/20 shadow-xs'
                    : 'bg-white/80 hover:bg-white border-black/[0.05] shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-2xl shrink-0 mt-0.5 ${role.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{role.title}</span>
                      <span className="text-[9.5px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                        {role.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                      {role.sub}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {role.highlights.map((h, i) => (
                        <span key={i} className="text-[9.5px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end sm:justify-center">
                  {isSelected ? (
                    <span className="px-3.5 py-1.5 bg-[#007AFF] text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  ) : (
                    <span className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-colors">
                      Switch ➔
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 px-5 bg-slate-50 border-t border-black/[0.05] flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Switch perspective anytime from the top bar</span>
          <button
            onClick={() => {
              playIosChime('tap');
              onClose();
            }}
            className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-slate-800 font-bold hover:bg-slate-100 transition-colors ios-btn"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
