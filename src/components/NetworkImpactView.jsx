import React, { useState } from 'react';
import { NETWORK_IMPACT_CASCADE } from '../data/mockData';
import { Activity, Anchor, Ship, Truck, Repeat, ThermometerSnowflake, CheckCircle2, Zap, ArrowDown, Play, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';
import { useToast } from './ToastNotification';

export function NetworkImpactView({ onSelectAsset, onJumpToTab, activeRole = 'all' }) {
  const [activeStep, setActiveStep] = useState(0);
  const [mitigationApplied, setMitigationApplied] = useState(false);
  const { addToast } = useToast();

  const chain = NETWORK_IMPACT_CASCADE.cascadeChain;

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const handleApplyMitigation = () => {
    setMitigationApplied(true);
    addToast({
      type: 'success',
      title: 'Waypoint Mitigation Executed',
      message: 'Port berth 04 fast-tracked, 8 backhaul rigs dispatched (₹336k revenue captured), and aux cold-chain boost engaged.'
    });
  };

  const handleReset = () => {
    setMitigationApplied(false);
    setActiveStep(0);
  };

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                  Bottleneck Cascade & Network Impact
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                  81% Peak Surge
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Watch how a single 16-hour port delay ripples through Shipping, Highway Haulage, and Cold-Chain
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {mitigationApplied && (
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleApplyMitigation}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
              mitigationApplied
                ? 'bg-emerald-700 text-white cursor-default'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{mitigationApplied ? '✓ 4-Tier Mitigation Active' : 'Execute Waypoint Mitigation'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
        {/* Left: Cascade Sequence */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
            <span>PROPAGATION SEQUENCE (CLICK ANY STAGE)</span>
            <span className="text-blue-700 font-bold">Step {activeStep + 1} of {chain.length}</span>
          </div>

          <div className="space-y-3 relative pl-5 border-l-2 border-slate-200 ml-2">
            {chain.map((item, index) => {
              const isSelected = activeStep === index;
              const isPast = index < activeStep;

              return (
                <div key={item.level} className="relative">
                  {/* Step Circle */}
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`absolute -left-[27px] top-3.5 w-5 h-5 rounded-full border-2 border-white cursor-pointer transition-all flex items-center justify-center text-[9px] font-bold text-white shadow-xs ${
                      isSelected ? 'bg-rose-600 ring-4 ring-rose-100 scale-110' :
                      isPast ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    {item.level}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-rose-400 shadow-md ring-2 ring-rose-100'
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                            {item.layer}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-xs text-rose-600 font-semibold mt-1">
                          {item.subtext}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 self-start sm:self-auto">
                        {item.primaryMetric}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Synthesis & Solution */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
            Intelligence Synthesis
          </h3>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900">The Problem with Freight Silos:</div>
            <p className="leading-relaxed text-[11px] text-slate-600">
              When a port experiences sudden congestion, shipping lines, highway truckers, and cold storage warehouses usually find out hours too late — leading to spoiled cargo and wasted truck fuel.
            </p>
          </div>

          {/* Mitigation Comparison */}
          {mitigationApplied ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-2.5 text-xs">
              <div className="font-bold flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Waypoint AI Mitigation Active</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Port Dwell Absorbed:</span>
                  <span className="font-bold text-emerald-800">+14.5h scheduled ahead</span>
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
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1.5">
              <div className="font-bold">Without Waypoint:</div>
              <p className="text-[11px] leading-relaxed">
                Trucks arrive blindly at congested gates, spend 16 hours idling, empty trucks return without cargo, and sensitive pharma spoils.
              </p>
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onJumpToTab('graph')}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              Explore Connected Route Graph ➔
            </button>
            <button
              onClick={() => onJumpToTab('backhaul')}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              View Backhaul Matches ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
