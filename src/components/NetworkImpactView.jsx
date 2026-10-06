import React, { useState } from 'react';
import { NETWORK_IMPACT_CASCADE } from '../data/mockData';
import { Activity, Anchor, Ship, Truck, Repeat, ThermometerSnowflake, CheckCircle2, Zap, ArrowDown, Play, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function NetworkImpactView({ onSelectAsset, onJumpToTab, activeRole = 'all' }) {
  const [activeStep, setActiveStep] = useState(0);
  const [mitigationApplied, setMitigationApplied] = useState(false);
  const { addToast } = useToast();

  const chain = NETWORK_IMPACT_CASCADE.cascadeChain;

  const handleStepClick = (index) => {
    playIosChime('tap');
    setActiveStep(index);
  };

  const handleApplyMitigation = () => {
    playIosChime('success');
    setMitigationApplied(true);
    addToast({
      type: 'success',
      title: 'Mitigation Executed',
      message: 'Port berth 04 fast-tracked, 8 backhaul rigs dispatched (₹336k captured), and reefer boost engaged.'
    });
  };

  const handleReset = () => {
    playIosChime('tap');
    setMitigationApplied(false);
    setActiveStep(0);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
              Bottleneck Simulation
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#FF3B30]/10 text-[#FF3B30] rounded-full">
              81% Peak Surge
            </span>
          </div>
          <p className="text-xs text-[#86868B] mt-0.5">
            16-hour port delay propagation through Sea, Highway Haulage, and Cold-Chain
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {mitigationApplied && (
            <button
              onClick={handleReset}
              className="apple-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleApplyMitigation}
            className={`apple-btn-primary text-xs py-2 px-4 flex items-center gap-2 cursor-pointer ${
              mitigationApplied
                ? 'bg-[#34C759] text-white'
                : 'bg-[#1D1D1F] text-white hover:bg-black'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{mitigationApplied ? '✓ Mitigation Active' : 'Execute Mitigation Protocol'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Cascade Sequence */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868B] px-1">
            <span className="uppercase tracking-wider text-[10px]">Propagation Sequence</span>
            <span className="text-[#0071E3] font-bold">Stage {activeStep + 1} of {chain.length}</span>
          </div>

          <div className="space-y-3 relative pl-5 border-l-2 border-black/[0.08] ml-2">
            {chain.map((item, index) => {
              const isSelected = activeStep === index;
              const isPast = index < activeStep;

              return (
                <div key={item.level} className="relative">
                  {/* Step Circle */}
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`absolute -left-[27px] top-3.5 w-5 h-5 rounded-full border-2 border-white cursor-pointer transition-all flex items-center justify-center text-[9px] font-bold text-white shadow-xs ${
                      isSelected ? 'bg-[#FF3B30] ring-4 ring-[#FF3B30]/20 scale-110' :
                      isPast ? 'bg-[#1D1D1F]' : 'bg-black/20'
                    }`}
                  >
                    {item.level}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`apple-card p-4 sm:p-5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FF3B30] shadow-md ring-2 ring-[#FF3B30]/20'
                        : 'hover:border-black/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-black/[0.05] text-[#1D1D1F] rounded-md">
                            {item.layer}
                          </span>
                          <span className="text-sm font-bold text-[#1D1D1F]">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-xs text-[#FF3B30] font-semibold mt-1">
                          {item.subtext}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#1D1D1F] bg-black/[0.03] px-2.5 py-1 rounded-full border border-black/[0.05] self-start sm:self-auto">
                        {item.primaryMetric}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs text-[#86868B] leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Synthesis & Solution */}
        <div className="lg:col-span-4 apple-card p-5 space-y-4">
          <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider pb-2 border-b border-black/[0.06]">
            Impact Synthesis
          </h3>

          <div className="p-3.5 bg-black/[0.02] rounded-2xl border border-black/[0.04] text-xs text-[#1D1D1F] space-y-1.5">
            <div className="font-bold text-[#1D1D1F]">Disconnected Supply Chains</div>
            <p className="leading-relaxed text-[11px] text-[#86868B]">
              Without a synchronized corridor, a single 16h port delay results in blind detention charges, missed factory appointments, and spoiled pharmaceuticals.
            </p>
          </div>

          {/* Mitigation Comparison */}
          {mitigationApplied ? (
            <div className="p-4 bg-[#34C759]/5 border border-[#34C759]/20 rounded-2xl text-[#1D1D1F] space-y-2.5 text-xs">
              <div className="font-bold flex items-center gap-2 text-[#34C759]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Synchronized Mitigation Active</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#86868B]">Port Dwell Absorbed:</span>
                  <span className="font-bold text-[#34C759]">+14.5h scheduled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868B]">Backhaul Revenue:</span>
                  <span className="font-bold text-[#34C759]">₹336,000 (8 Rigs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868B]">Cold-Chain Protected:</span>
                  <span className="font-bold text-[#34C759]">VC-2048 Aux Boost Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868B]">Deadhead Mileage Cut:</span>
                  <span className="font-bold text-[#34C759]">4,896 km</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#FF9500]/5 border border-[#FF9500]/20 rounded-2xl text-[#1D1D1F] text-xs space-y-1">
              <div className="font-bold text-[#FF9500]">Uncoordinated Cost</div>
              <p className="text-[11px] text-[#86868B] leading-relaxed">
                Trucks idle for 16h, return without load matches, and perishables risk thermal excursion.
              </p>
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-black/[0.06]">
            <button
              onClick={() => {
                playIosChime('tap');
                onJumpToTab('graph');
              }}
              className="w-full py-2 apple-btn-secondary text-xs flex items-center justify-center cursor-pointer"
            >
              Explore Route Graph ➔
            </button>
            <button
              onClick={() => {
                playIosChime('tap');
                onJumpToTab('backhaul');
              }}
              className="w-full py-2 apple-btn-secondary text-xs flex items-center justify-center cursor-pointer"
            >
              View Backhaul Matches ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

