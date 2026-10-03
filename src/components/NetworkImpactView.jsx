import React, { useState } from 'react';
import { NETWORK_IMPACT_CASCADE } from '../data/mockData';
import { Activity, Anchor, Ship, Truck, Repeat, ThermometerSnowflake, CheckCircle2, Zap, ArrowDown, Play, ShieldAlert, Sparkles } from 'lucide-react';

export function NetworkImpactView({ onSelectAsset, onJumpToTab }) {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [mitigationApplied, setMitigationApplied] = useState(false);

  const chain = NETWORK_IMPACT_CASCADE.cascadeChain;

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const handleApplyMitigation = () => {
    setMitigationApplied(true);
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto">
      {/* Signature Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-base font-bold font-mono text-[#0F172A] tracking-tight">
              SIGNATURE DEMONSTRATION • CORRIDOR IMPACT CASCADE
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-red-100 text-red-700 rounded border border-red-200">
              81% BOTTLENECK SURGE
            </span>
          </div>
          <p className="text-xs text-[#64748B] font-mono mt-0.5">
            Single root bottleneck at Visakhapatnam propagating through Sea, Land Fleet, Backhaul, and Cold-Chain
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyMitigation}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              mitigationApplied
                ? 'bg-emerald-700 text-white'
                : 'bg-[#0D3B66] hover:bg-[#0A2E50] text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{mitigationApplied ? '✓ 4-LAYER MITIGATION ENGAGED' : 'EXECUTE WAYPOINT MITIGATION'}</span>
          </button>
        </div>
      </div>

      {/* Main Cascade Visualization */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: The Multi-Layer Cascade Chain */}
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>UPSTREAM ➔ DOWNSTREAM PROPAGATION SEQUENCE</span>
            <span className="text-[#0D3B66]">STEP {activeStep + 1} OF {chain.length}</span>
          </div>

          <div className="space-y-3 relative pl-3 border-l-2 border-[#CBD5E1] ml-3">
            {chain.map((item, index) => {
              const isSelected = activeStep === index;
              const isPast = index < activeStep;

              return (
                <div key={item.level} className="relative">
                  {/* Step Pin */}
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`absolute -left-[21px] top-3 w-4 h-4 rounded-full border-2 border-white cursor-pointer transition-all flex items-center justify-center font-mono text-[8px] font-bold text-white ${
                      isSelected ? 'bg-[#DC2626] ring-4 ring-red-100 scale-125' :
                      isPast ? 'bg-[#0D3B66]' : 'bg-[#94A3B8]'
                    }`}
                  >
                    {item.level}
                  </div>

                  {/* Cascade Card */}
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`p-3.5 rounded border transition-all cursor-pointer font-mono ${
                      isSelected
                        ? 'bg-[#FEF2F2] border-red-300 ring-1 ring-red-300 shadow-xs'
                        : 'bg-white hover:bg-[#F8F9FA] border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#F1F5F9] text-[#475569] rounded border border-[#E2E8F0]">
                            {item.layer}
                          </span>
                          <span className="text-xs font-bold text-[#0F172A]">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#DC2626] font-semibold mt-0.5">
                          {item.subtext}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-[#CBD5E1] shadow-xs">
                          {item.primaryMetric}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-[#475569] leading-relaxed">
                      {item.details}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Root Cause Analysis & Mitigation Impact Card */}
        <div className="lg:col-span-4 bg-[#F8F9FA] border border-[#CBD5E1] rounded p-4 font-mono text-xs flex flex-col space-y-4">
          <div className="text-[11px] font-bold text-[#0D3B66] uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
            INTELLIGENCE SYNTHESIS
          </div>

          <div className="p-3 bg-white border border-[#CBD5E1] rounded space-y-2">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">WHY WAYPOINT EXISTS:</div>
            <div className="text-xs text-[#0F172A] leading-normal font-semibold">
              Traditional freight software treats Ports, Shipping lines, Road Fleets, and Cold Stores as 4 disconnected silos.
            </div>
            <div className="text-[11px] text-[#475569] leading-normal">
              WAYPOINT unites them on a <strong>single shared route graph</strong>. When a vessel slows down, the entire hinterland truck schedule and cold chain automatically re-calibrates in real time.
            </div>
          </div>

          {/* Mitigation Results comparison */}
          {mitigationApplied ? (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded space-y-2 text-emerald-900">
              <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>WAYPOINT MITIGATION ACTIVE:</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Port Dwell Absorbed:</span>
                  <span className="font-bold">+14.5h scheduled ahead</span>
                </div>
                <div className="flex justify-between">
                  <span>Backhaul Revenue Captured:</span>
                  <span className="font-bold text-emerald-700">₹336,000 (8 Rigs)</span>
                </div>
                <div className="flex justify-between">
                  <span>Cold-Chain Saved:</span>
                  <span className="font-bold text-emerald-700">VC-2048 Aux Boost Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadhead Mileage Cut:</span>
                  <span className="font-bold text-emerald-700">4,896 KM</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[11px]">
              <div className="font-bold mb-1">WITHOUT WAYPOINT:</div>
              <div>
                Rigs arrive blindly at congested gates, spend 16 hours idling, empty trucks return deadhead with zero revenue, and sensitive cold pharma spoil without prior notification.
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
            <button
              onClick={() => onJumpToTab('graph')}
              className="w-full py-2 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0D3B66] rounded font-bold text-xs transition-colors"
            >
              EXPLORE SHARED GRAPH NODES ➔
            </button>
            <button
              onClick={() => onJumpToTab('backhaul')}
              className="w-full py-2 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#059669] rounded font-bold text-xs transition-colors"
            >
              DISPATCH BACKHAUL MATCHES ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
