import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  Leaf, 
  Ship, 
  Anchor, 
  Truck, 
  ThermometerSnowflake,
  Sparkles
} from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function ExecutiveBriefingModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const briefingData = {
    reportId: 'WP-BRIEF-2026-10-08',
    corridor: 'Bay of Bengal to Hyderabad / Inland East Coast Trunk',
    stabilityScore: '88 / 100 (Nominal with Isolated Surge)',
    activeVesselsSurveilled: 14,
    portsMonitored: 4,
    activeTrucksCorridor: 184,
    backhaulRevenueCapturedToday: '₹3,36,000',
    carbonAvoidedKg: '14,200 kg CO2e',
    coldchainIntegrityScore: '99.4% compliant',
    criticalBottlenecks: [
      {
        asset: 'Visakhapatnam Port (VPA)',
        issue: 'Berth 04 Gantry Crane Maintenance (+16.5h queue)',
        status: 'Surge 81% Congestion',
        mitigation: 'KPCT Coastal Reroute option ready / Priority Pass issued'
      },
      {
        asset: 'Reefer Container VC-2048 (Oncology Pharma)',
        issue: 'Core temp drifted to +7.9°C (Safe Ceiling: +8.0°C)',
        status: 'High Alert',
        mitigation: 'Auxiliary Genset Boost engaged / NH-65 Fast-Track staged'
      }
    ],
    backhaulMatchesSummary: '11 unassigned return legs matched with Hyderabad Pharma & Vizag Steel cargo, eliminating 4,820 deadhead km.'
  };

  const handleCopyMarkdown = () => {
    playIosChime('success');
    const md = `
# WAYPOINT — Executive Corridor Intelligence Briefing
**Report ID:** ${briefingData.reportId}
**Corridor:** ${briefingData.corridor}
**Network Stability Score:** ${briefingData.stabilityScore}

## 📊 High-Level Metrics
- Active AIS Vessels Tracked: ${briefingData.activeVesselsSurveilled}
- Ports Surveilled: ${briefingData.portsMonitored}
- Active Freight Haulage Fleet: ${briefingData.activeTrucksCorridor} units
- Backhaul Revenue Recovered: ${briefingData.backhaulRevenueCapturedToday}
- Scope 3 Carbon Avoided: ${briefingData.carbonAvoidedKg}
- Cold-Chain Compliance: ${briefingData.coldchainIntegrityScore}

## 🚨 Active Exceptions & Bottlenecks
${briefingData.criticalBottlenecks.map(b => `- **${b.asset}**: ${b.issue} [${b.status}] ➔ *Mitigation:* ${b.mitigation}`).join('\n')}

## 🔄 Backhaul Matching Engine
${briefingData.backhaulMatchesSummary}

*Generated automatically via WAYPOINT Freight Intelligence Engine.*
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Markdown Copied',
      message: 'Briefing text copied to clipboard ready for email or Slack report.'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    playIosChime('tap');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FBFBFD] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#0071E3] flex items-center justify-center border border-blue-100">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Executive Corridor Briefing
                </h2>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {briefingData.reportId}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-modal operations summary for executive leadership & dispatch teams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="apple-btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="apple-btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => {
                playIosChime('tap');
                onClose();
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-white border border-black/5 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 printable-briefing">
          {/* Executive KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-black/[0.05]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Network Health</span>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5">88 / 100</div>
              <span className="text-[10.5px] text-emerald-600 font-semibold mt-0.5 block">✓ High Resilience</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Yield Recovered</span>
              <div className="text-lg font-extrabold text-emerald-950 mt-0.5">{briefingData.backhaulRevenueCapturedToday}</div>
              <span className="text-[10.5px] text-emerald-700 font-semibold mt-0.5 block">11 Backhaul Rigs</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span className="text-[10px] text-[#0071E3] font-bold uppercase tracking-wider block">Carbon Avoided</span>
              <div className="text-lg font-extrabold text-blue-950 mt-0.5">14.2 Tonnes</div>
              <span className="text-[10.5px] text-[#0071E3] font-semibold mt-0.5 block">4,820 Deadhead km</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200">
              <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider block">Cold-Chain SLA</span>
              <div className="text-lg font-extrabold text-teal-950 mt-0.5">99.4%</div>
              <span className="text-[10.5px] text-teal-700 font-semibold mt-0.5 block">Safe Temp Band</span>
            </div>
          </div>

          {/* Critical Bottlenecks Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                Active High-Priority Operational Bottlenecks
              </h3>
              <span className="text-[10.5px] font-mono text-rose-600 font-bold">2 Incidents Monitored</span>
            </div>

            <div className="space-y-2.5">
              {briefingData.criticalBottlenecks.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.asset}</span>
                    <span className="px-2 py-0.5 text-[9.5px] font-bold bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-600">{item.issue}</p>
                  <div className="pt-1 text-[11px] text-[#0071E3] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span><strong>Active Mitigation:</strong> {item.mitigation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Backhaul & Fleet Optimization */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.05] space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              Hinterland Dispatch & Backhaul Performance
            </h3>
            <p className="text-[11.5px] text-slate-600 leading-relaxed">
              {briefingData.backhaulMatchesSummary} Fleet utilization rate currently operating at <strong>91.2%</strong> across the NH-16 Coastal and NH-65 Hyderabad inland corridors.
            </p>
          </div>

          {/* Corridor Map Snapshot Note */}
          <div className="text-[10.5px] text-slate-400 font-mono border-t border-black/[0.05] pt-3 flex items-center justify-between">
            <span>BAY OF BENGAL TO HYDERABAD MULTI-MODAL GRAPH</span>
            <span>WAYPOINT FREIGHT INTELLIGENCE SYSTEM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
