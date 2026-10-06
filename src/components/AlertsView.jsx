import React, { useState } from 'react';
import { ALERTS } from '../data/mockData';
import { Bell, AlertTriangle, AlertCircle, Info, ArrowRight, Check, Filter, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastNotification';

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
    setAcknowledgedAlerts(prev => ({ ...prev, [id]: true }));
    addToast({
      type: 'info',
      title: 'Alert Acknowledged',
      message: `Alert ${id} marked as reviewed.`
    });
  };

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Operational Alerts & Exception Feed
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time synchronized alarms across Sea, Port, Highway, and Cold-Chain nodes
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar shadow-2xs">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <div className="font-bold text-slate-900 text-base">All Clear</div>
            <p className="text-xs text-slate-500 mt-1">No active exceptions or delays found for this category.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isAcked = acknowledgedAlerts[alert.id];
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isAcked 
                    ? 'opacity-60 bg-slate-50 border-slate-200' 
                    : isCritical ? 'bg-white border-rose-300 shadow-xs ring-1 ring-rose-100' :
                      isHigh ? 'bg-white border-amber-300 shadow-xs' :
                      'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isCritical ? 'bg-rose-100 text-rose-700' :
                      isHigh ? 'bg-amber-100 text-amber-800' :
                      alert.severity === 'MEDIUM' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{alert.entity}</span>
                    <span className="text-xs text-slate-400">({alert.time})</span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    ID: {alert.id}
                  </span>
                </div>

                <div className="mt-2.5 text-xs sm:text-sm font-semibold text-slate-900">
                  {alert.title}
                </div>

                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {alert.details}
                </p>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => onJumpToTab && onJumpToTab(alert.targetTab)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>{alert.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleAcknowledge(alert.id, e)}
                    disabled={isAcked}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
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
