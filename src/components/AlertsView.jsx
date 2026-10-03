import React, { useState } from 'react';
import { ALERTS } from '../data/mockData';
import { Bell, AlertTriangle, AlertCircle, Info, ArrowRight, Check, Filter } from 'lucide-react';

export function AlertsView({ onSelectAsset, onJumpToTab }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState({});

  const filteredAlerts = ALERTS.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  const handleAcknowledge = (id, e) => {
    e.stopPropagation();
    setAcknowledgedAlerts(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-base font-bold font-mono text-[#0F172A]">
              OPERATIONAL ALERTS & REAL-TIME EVENT STREAM
            </h2>
          </div>
          <p className="text-xs text-[#64748B] font-mono mt-0.5">
            Synchronized high-priority alarms generated across Sea, Port, Land and Cold-Chain nodes
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                filterSeverity === sev
                  ? 'bg-[#0D3B66] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="my-4 space-y-3 font-mono text-xs max-w-4xl">
        {filteredAlerts.map(alert => {
          const isAcked = acknowledgedAlerts[alert.id];
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';

          return (
            <div
              key={alert.id}
              className={`p-3.5 rounded border transition-all ${
                isAcked 
                  ? 'opacity-60 bg-[#F8FAFC] border-[#E2E8F0]' 
                  : isCritical ? 'bg-red-50/70 border-red-200' :
                    isHigh ? 'bg-amber-50/60 border-amber-200' :
                    'bg-white border-[#CBD5E1]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-[#E2E8F0]/60">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isCritical ? 'bg-red-600 text-white' :
                    isHigh ? 'bg-amber-600 text-white' :
                    alert.severity === 'MEDIUM' ? 'bg-blue-600 text-white' :
                    'bg-slate-600 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="font-bold text-[#0F172A]">{alert.entity}</span>
                  <span className="text-[11px] text-[#64748B]">({alert.time})</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[#64748B]">
                  <span>{alert.timestamp}</span>
                  <span>•</span>
                  <span>ID: {alert.id}</span>
                </div>
              </div>

              <div className="mt-2 text-xs font-semibold text-[#0F172A]">
                {alert.title}
              </div>

              <div className="mt-1 text-[11px] text-[#475569] leading-relaxed">
                {alert.details}
              </div>

              <div className="mt-3 pt-2 border-t border-[#E2E8F0]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => onJumpToTab && onJumpToTab(alert.targetTab)}
                  className="px-2.5 py-1 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>{alert.action}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={(e) => handleAcknowledge(alert.id, e)}
                  disabled={isAcked}
                  className="px-2.5 py-1 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#475569] rounded text-[11px] transition-colors"
                >
                  {isAcked ? '✓ ACKNOWLEDGED' : 'ACKNOWLEDGE'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
