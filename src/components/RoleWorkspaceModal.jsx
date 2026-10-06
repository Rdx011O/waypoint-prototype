import React from 'react';
import { X, Anchor, Layers, Truck, ThermometerSnowflake, Package, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useToast } from './ToastNotification';

export function RoleWorkspaceModal({ isOpen, onClose, activeRole, onSelectRole }) {
  const { addToast } = useToast();

  if (!isOpen) return null;

  const roles = [
    {
      id: 'all',
      title: 'CONTROL TOWER (ALL CORRIDORS)',
      sub: 'Panoramic multi-modal view across Sea Passage, Seaports, Highway Rigs, and Receiving Hubs.',
      icon: Layers,
      color: '#0D3B66',
      badge: 'UNIFIED VIEW',
      features: ['Full GIS Nautical Radar', 'Shared Route Graph', 'Bottleneck Cascade Simulation', 'Cross-Corridor KPIs']
    },
    {
      id: 'cargo_owner',
      title: 'CARGO OWNER / IMPORTER',
      sub: 'My Shipments, container dwell surveillance, dynamic predicted ETA, and active exception alerts.',
      icon: Package,
      color: '#0284C7',
      badge: 'CONTAINER TRACKING',
      highlight: true,
      features: ['Active Consignments Feed', 'Dynamic ETA vs SLA', 'Customs Gate Pass Clearance', 'One-Click Fast-Track']
    },
    {
      id: 'port',
      title: 'PORT OPERATIONS & BERTH INTELLIGENCE',
      sub: 'Outer anchorage queues, berth utilization (B-01 to B-06), 72-hour congestion forecasts.',
      icon: Anchor,
      color: '#DC2626',
      badge: '81% PEAK SURGE',
      features: ['Anchorage Dwell Radar', 'Berth Assignment Control', '72h Congestion Curve', 'Downstream Truck Queue']
    },
    {
      id: 'fleet',
      title: 'FLEET DISPATCH & BACKHAUL ENGINE',
      sub: 'Empty truck turnaround, deadhead elimination, load matching, and highway driver telemetry.',
      icon: Truck,
      color: '#059669',
      badge: '11 ACTIVE MATCHES',
      features: ['Highway Rig Telemetry', 'Deadhead Elimination (KM)', 'Revenue Recovery Payouts', 'Driver Status Feed']
    },
    {
      id: 'coldchain',
      title: 'COLD-CHAIN SURVEILLANCE & REEFER CONTROL',
      sub: 'Sensitive biologics & vaccines, real-time IoT temperature graphs, compressor alarms.',
      icon: ThermometerSnowflake,
      color: '#086788',
      badge: '1 CRITICAL EXCURSION',
      features: ['Live Sensor Telemetry Curve', 'Safe Temp Range [2°-8°C]', 'Compressor Duty Cycle', 'Aux Emergency Boost']
    }
  ];

  const handleRoleClick = (roleId, roleTitle) => {
    onSelectRole(roleId);
    onClose();
    addToast({
      type: 'info',
      title: 'WORKSPACE SWITCHED',
      message: `Active persona changed to ${roleTitle}. Data and KPIs filtered accordingly.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-mono">
      <div className="bg-white border border-[#CBD5E1] rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#0F172A] text-white border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#0D3B66] text-[#38BDF8] border border-[#38BDF8]/40 flex items-center justify-center font-bold text-xs">
              WP
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>SELECT OPERATIONAL ROLE PERSONA</span>
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Customizes navigation, metrics, and data displays for each stakeholder
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corridor Signature Ribbon */}
        <div className="px-4 py-2.5 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between text-xs">
          <span className="text-[#64748B] text-[11px]">Active Corridor: <strong>East Coast Multi-Modal Spine</strong></span>
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#475569]">
            <span className="px-1.5 py-0.5 bg-white rounded border border-[#CBD5E1]">SEA</span>
            <span>➔</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-[#CBD5E1]">PORT</span>
            <span>➔</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-[#CBD5E1]">LAND</span>
            <span>➔</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-[#CBD5E1]">WAREHOUSE</span>
          </div>
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
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#F0F7FF] border-[#0D3B66] ring-2 ring-[#0D3B66] shadow-sm'
                    : role.highlight ? 'bg-[#FAFCFF] hover:bg-[#F0F7FF] border-[#BFDBFE]' : 'bg-white hover:bg-[#F8F9FA] border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#F1F5F9] border border-[#E2E8F0] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#0D3B66]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#0F172A]">{role.title}</span>
                      {role.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          role.id === 'coldchain' ? 'bg-red-100 text-red-700 border border-red-200' :
                          role.id === 'port' ? 'bg-red-100 text-red-700 border border-red-200' :
                          role.id === 'fleet' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                          'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
                        }`}>
                          {role.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      {role.sub}
                    </div>

                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {role.features.map((feat, fIdx) => (
                        <span key={fIdx} className="text-[9.5px] px-1.5 py-0.2 bg-white text-[#475569] border border-[#E2E8F0] rounded">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  {isSelected ? (
                    <span className="px-2.5 py-1 rounded bg-[#0D3B66] text-white flex items-center gap-1 text-xs font-bold shadow-2xs">
                      <Check className="w-3.5 h-3.5" /> ACTIVE
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-[#F1F5F9] hover:bg-[#0D3B66] hover:text-white text-[#475569] text-xs font-bold transition-colors">
                      SWITCH ➔
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FA] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Select any role to explore specialized corridor intelligence</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] rounded text-xs font-bold transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
