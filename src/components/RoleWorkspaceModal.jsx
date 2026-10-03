import React from 'react';
import { X, Anchor, Layers, Truck, ThermometerSnowflake, Package, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export function RoleWorkspaceModal({ isOpen, onClose, activeRole, onSelectRole }) {
  if (!isOpen) return null;

  const roles = [
    {
      id: 'all',
      title: 'CONTROL TOWER (ALL CORRIDORS)',
      sub: 'Unified corridor operations across Sea, Harbour, Road, and Destination nodes.',
      icon: Layers,
      color: '#0D3B66',
      badge: 'DEFAULT'
    },
    {
      id: 'cargo_owner',
      title: 'CARGO OWNER / IMPORTER',
      sub: 'My Shipments, Container Tracking, Dynamic ETA predictions, and Active Exception alerts.',
      icon: Package,
      color: '#0D3B66',
      badge: 'CONTAINER TRACKING',
      highlight: true
    },
    {
      id: 'port',
      title: 'PORT OPERATIONS & BERTH INTELLIGENCE',
      sub: 'Anchorage dwell times, berth queues, and pilot scheduling.',
      icon: Anchor,
      color: '#DC2626',
      badge: '81% PEAK SURGE'
    },
    {
      id: 'fleet',
      title: 'FLEET DISPATCH & BACKHAUL MATCHING',
      sub: 'Empty truck turnaround, deadhead avoidance, and intermodal loads.',
      icon: Truck,
      color: '#059669',
      badge: '11 ACTIVE MATCHES'
    },
    {
      id: 'coldchain',
      title: 'COLD-CHAIN SURVEILLANCE & REEFER CONTROL',
      sub: 'Sensitive biologics, real-time IoT temperature curves & alarms.',
      icon: ThermometerSnowflake,
      color: '#086788',
      badge: '1 CRITICAL RISK'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#CBD5E1] rounded max-w-xl w-full shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="p-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#0D3B66] text-white flex items-center justify-center font-bold text-xs">
              WP
            </div>
            <div>
              <div className="font-bold text-sm text-[#0F172A]">WAYPOINT</div>
              <div className="text-[10px] text-[#64748B]">OPERATIONAL WORKSPACE ROLE SELECTOR</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#64748B] hover:text-[#0F172A] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corridor Signature Ribbon */}
        <div className="p-4 bg-white border-b border-[#E2E8F0] text-center">
          <div className="text-xs font-bold text-[#0D3B66] tracking-tight">
            CORRIDOR INTELLIGENCE FOR FREIGHT
          </div>
          <div className="text-[11px] text-[#64748B] italic mt-0.5">
            "Select your persona to unlock role-specific freight intelligence."
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 text-[10px] font-bold text-[#475569]">
            <span className="px-2 py-0.5 bg-[#F1F5F9] rounded border border-[#CBD5E1]">SEA</span>
            <span>─────</span>
            <span className="px-2 py-0.5 bg-[#F1F5F9] rounded border border-[#CBD5E1]">PORT</span>
            <span>─────</span>
            <span className="px-2 py-0.5 bg-[#F1F5F9] rounded border border-[#CBD5E1]">LAND</span>
            <span>─────</span>
            <span className="px-2 py-0.5 bg-[#F1F5F9] rounded border border-[#CBD5E1]">WAREHOUSE</span>
          </div>
        </div>

        {/* Roles List */}
        <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = activeRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id);
                  onClose();
                }}
                className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#F0F7FF] border-[#0D3B66] ring-1 ring-[#0D3B66]'
                    : role.highlight ? 'bg-[#FAFCFF] border-[#BFDBFE]' : 'bg-white hover:bg-[#F8F9FA] border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#F1F5F9] shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#0D3B66]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#0F172A]">{role.title}</span>
                      {role.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] rounded font-bold">
                          {role.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      {role.sub}
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-[#0D3B66] text-white flex items-center justify-center text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-xs text-[#94A3B8]">➔</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FA] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Role filters visible screens and alerts automatically</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#0D3B66] text-white rounded text-xs font-bold hover:bg-[#0A2E50] transition-colors"
          >
            ENTER WORKSPACE
          </button>
        </div>
      </div>
    </div>
  );
}
