import React, { useState } from 'react';
import { ALERTS } from '../data/mockData';
import { Bell, AlertTriangle, AlertCircle, Info, ArrowRight, Check, Filter, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function AlertsView({ onSelectAsset, onJumpToTab, activeRole = 'all' }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState({});
  const { addToast } = useToast();

  const roleCategories = {
    cargo_owner: ['COLD_CHAIN', 'VESSEL_TIMING'],
    port: ['PORT_CONGESTION', 'VESSEL_TIMING'],
    fleet: ['BACKHAUL', 'PORT_CONGESTION'],
    coldchain: ['COLD_CHAIN'],
    all: ['COLD_CHAIN', 'PORT_CONGESTION', 'BACKHAUL', 'VESSEL_TIMING']
  };

  const allowedCategories = roleCategories[activeRole] || roleCategories.all;

  const roleFilteredAlerts = ALERTS.filter(a => {
    if (activeRole === 'all') return true;
    return allowedCategories.includes(a.category);
  });

  const filteredAlerts = roleFilteredAlerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  const handleAcknowledge = (id, e) => {
    e.stopPropagation();
    playIosChime('tap');
    setAcknowledgedAlerts(prev => ({ ...prev, [id]: true }));
    addToast({
      type: 'info',
      title: 'Alert Acknowledged',
      message: `Alert ${id} marked as reviewed.`
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Alerts & Exceptions
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Synchronized alarm feed across Sea, Port, Highway, and Cold-Chain nodes
          </p>
        </div>

        {/* Apple Segmented Severity Filter */}
        <div className="apple-segmented p-1 self-start sm:self-auto flex items-center overflow-x-auto no-scrollbar">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map(sev => (
            <button
              key={sev}
              onClick={() => {
                playIosChime('tap');
                setFilterSeverity(sev);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              {sev === 'ALL' ? 'All Alerts' : sev.charAt(0) + sev.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3 max-w-4xl">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-[#86868B] apple-card">
            <CheckCircle2 className="w-10 h-10 text-[#34C759] mx-auto mb-2" />
            <div className="font-bold text-[#1D1D1F] text-base">All Clear</div>
            <p className="text-xs text-[#86868B] mt-1">No active exceptions or delays found for this category.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isAcked = acknowledgedAlerts[alert.id];
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`apple-card p-4 sm:p-5 transition-all ${
                  isAcked 
                    ? 'opacity-60 bg-black/[0.02]' 
                    : isCritical ? 'border-[#FF3B30]/40' :
                      isHigh ? 'border-[#FF9500]/40' :
                      ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-black/[0.06]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isCritical ? 'bg-[#FF3B30]/10 text-[#FF3B30]' :
                      isHigh ? 'bg-[#FF9500]/10 text-[#FF9500]' :
                      alert.severity === 'MEDIUM' ? 'bg-[#0071E3]/10 text-[#0071E3]' :
                      'bg-black/10 text-[#86868B]'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="font-bold text-[#1D1D1F] text-sm">{alert.entity}</span>
                    <span className="text-xs text-[#86868B]">({alert.time})</span>
                  </div>

                  <span className="text-xs text-[#86868B] font-mono">
                    ID: {alert.id}
                  </span>
                </div>

                <div className="mt-2.5 text-xs sm:text-sm font-semibold text-[#1D1D1F]">
                  {alert.title}
                </div>

                <p className="mt-1 text-xs text-[#86868B] leading-relaxed">
                  {alert.details}
                </p>

                <div className="mt-3.5 pt-2.5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      playIosChime('tap');
                      if (onJumpToTab) onJumpToTab(alert.targetTab);
                    }}
                    className="apple-btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5 cursor-pointer bg-[#1D1D1F] text-white hover:bg-black"
                  >
                    <span>{alert.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleAcknowledge(alert.id, e)}
                    disabled={isAcked}
                    className="apple-btn-secondary text-xs py-1.5 px-3 cursor-pointer"
                  >
                    {isAcked ? '✓ Acknowledged' : 'Mark as Read'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

