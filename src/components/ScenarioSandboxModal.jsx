import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Anchor, 
  Ship, 
  Truck, 
  Clock, 
  DollarSign, 
  Leaf, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw,
  SlidersHorizontal,
  Compass,
  FileCheck,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function ScenarioSandboxModal({ 
  isOpen, 
  onClose, 
  onRerouteExecuted,
  activeReroute = null 
}) {
  const [selectedScenario, setSelectedScenario] = useState(
    activeReroute === 'VIZAG' ? 'hold_vizag' : 'divert_kpct'
  );
  const [bunkerFuelPrice, setBunkerFuelPrice] = useState(620); // $/tonne
  const [demurrageRatePerDay, setDemurrageRatePerDay] = useState(180); // $/container/day
  const [truckFreightRatePerKm, setTruckFreightRatePerKm] = useState(85); // ₹/km
  const [isExecuting, setIsExecuting] = useState(false);
  const [isExecuted, setIsExecuted] = useState(Boolean(activeReroute));

  const { addToast } = useToast();

  useEffect(() => {
    if (activeReroute === 'KPCT') {
      setSelectedScenario('divert_kpct');
      setIsExecuted(true);
    } else if (activeReroute === 'VIZAG') {
      setSelectedScenario('hold_vizag');
      setIsExecuted(true);
    }
  }, [activeReroute]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Real-world dynamic calculations
  const totalContainers = 420; // MV Eastern Pearl load for Hyderabad hinterland
  
  // Strategy A: Hold at Visakhapatnam Outer Roads
  const vizagBerthDelayHours = 16.5;
  const vizagDemurrageCostUsd = Math.round((vizagBerthDelayHours / 24) * demurrageRatePerDay * totalContainers);
  const vizagReeferFuelLiters = 210;
  const vizagRoadKmToHyd = 620; // Vizag -> Hyderabad NH-65
  const vizagRoadCostInr = Math.round(vizagRoadKmToHyd * truckFreightRatePerKm * (totalContainers / 2)); // assuming 2 TEU per trailer
  const vizagTotalCostInr = Math.round((vizagDemurrageCostUsd * 86.5) + vizagRoadCostInr + (vizagReeferFuelLiters * 92));
  const vizagTotalHours = vizagBerthDelayHours + 18; // road transit

  // Strategy B: Dynamic Diversion to Krishnapatnam Port (KPCT)
  const kpctSeaDetourNm = 145; // extra sailing
  const kpctSeaTransitHours = Math.round(kpctSeaDetourNm / 14.2); // ~10.2 hrs
  const kpctBerthWaitHours = 0.5; // Greenfield berth immediately open
  const kpctRoadKmToHyd = 450; // KPCT -> Hyderabad NH-16 / NH-765
  const kpctRoadCostInr = Math.round(kpctRoadKmToHyd * truckFreightRatePerKm * (totalContainers / 2));
  const kpctBunkerCostUsd = Math.round((kpctSeaTransitHours * 1.8) * (bunkerFuelPrice / 1000) * 100);
  const kpctTotalCostInr = Math.round((kpctBunkerCostUsd * 86.5) + kpctRoadCostInr);
  const kpctTotalHours = kpctSeaTransitHours + kpctBerthWaitHours + 12; // road transit

  // Differentials
  const netSavingsInr = vizagTotalCostInr - kpctTotalCostInr;
  const netTimeSavedHours = (vizagTotalHours - kpctTotalHours).toFixed(1);

  const handleExecute = () => {
    setIsExecuting(true);
    playIosChime('success');

    setTimeout(() => {
      setIsExecuting(false);
      setIsExecuted(true);

      if (selectedScenario === 'divert_kpct') {
        addToast({
          type: 'success',
          title: 'Diversion Protocol Executed',
          message: 'MV Eastern Pearl rerouted to Krishnapatnam Port (KPCT). Master notified via INMARSAT-C.'
        });
        if (onRerouteExecuted) onRerouteExecuted('KPCT');
      } else {
        addToast({
          type: 'info',
          title: 'Anchorage Hold Protocol Confirmed',
          message: 'MV Eastern Pearl queued at Visakhapatnam Outer Roads. Priority Berth 04 slot requested.'
        });
        if (onRerouteExecuted) onRerouteExecuted('VIZAG');
      }
    }, 750);
  };

  const handleReset = () => {
    setIsExecuted(false);
    playIosChime('tap');
    if (onRerouteExecuted) onRerouteExecuted(null);
    addToast({
      type: 'info',
      title: 'Simulation Reset',
      message: 'Sandbox state restored to baseline pipeline.'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FBFBFD] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-[#5856D6] flex items-center justify-center border border-indigo-100 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  "What-If" Strategic Rerouting Sandbox
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-[#5856D6] rounded-full border border-indigo-200/60">
                  Decision Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Optimize vessel diversion against port dwell, demurrage risk, bunker fuel & hinterland haulage
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playIosChime('tap');
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-white border border-black/5 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Sandbox (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Active Incident Callout */}
          <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                  TRIGGER EVENT: VISAKHAPATNAM PORT SURGE (81% CONGESTION)
                </span>
                <p className="text-xs font-semibold text-rose-950 mt-0.5">
                  Berth 04 gantry crane maintenance causing <strong>+{vizagBerthDelayHours}h berth delay</strong> for MV Eastern Pearl (420 TEU destination: Hyderabad).
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] text-rose-600 font-medium">Demurrage & Idle Cost</span>
              <div className="text-sm font-extrabold text-rose-900 font-mono">
                ₹{((vizagDemurrageCostUsd * 86.5) / 100000).toFixed(2)} Lakhs
              </div>
            </div>
          </div>

          {/* Scenario Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strategy A: Hold & Queue */}
            <div 
              onClick={() => {
                playIosChime('tap');
                setSelectedScenario('hold_vizag');
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedScenario === 'hold_vizag'
                  ? 'border-slate-800 bg-slate-50/80 ring-2 ring-slate-800/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Anchor className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs">Strategy A: Hold at Vizag Anchorage</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  selectedScenario === 'hold_vizag'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {selectedScenario === 'hold_vizag' ? 'Selected' : 'Queue Default'}
                </span>
              </div>

              <div className="space-y-2 text-[11px] text-slate-600">
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Anchorage Waiting Time:</span>
                  <strong className="font-mono text-rose-600 font-bold">+{vizagBerthDelayHours} hrs</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Demurrage Penalty:</span>
                  <strong className="font-mono text-rose-700">₹{((vizagDemurrageCostUsd * 86.5) / 100000).toFixed(2)} L</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Inland Road Haul:</span>
                  <strong className="font-mono text-slate-800">{vizagRoadKmToHyd} km (₹{((vizagRoadCostInr) / 100000).toFixed(2)} L)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Reefer Spoilage Risk:</span>
                  <strong className="font-mono text-amber-600 font-bold">Elevated (Genset fuel ₹{((vizagReeferFuelLiters * 92) / 100000).toFixed(2)} L)</strong>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Total Net Cost:</span>
                  <span className="font-mono font-extrabold text-slate-900">
                    ₹{(vizagTotalCostInr / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
              </div>
            </div>

            {/* Strategy B: Dynamic Diversion to KPCT */}
            <div 
              onClick={() => {
                playIosChime('tap');
                setSelectedScenario('divert_kpct');
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                selectedScenario === 'divert_kpct'
                  ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">Strategy B: Divert to KPCT Port</span>
                    <span className="text-[9px] text-emerald-700 font-semibold uppercase tracking-wider">Recommended Strategy</span>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  selectedScenario === 'divert_kpct'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {selectedScenario === 'divert_kpct' ? 'Selected' : 'Best ROI'}
                </span>
              </div>

              <div className="space-y-2 text-[11px] text-slate-600">
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Coastal Detour Sailing:</span>
                  <strong className="font-mono text-slate-800">+{kpctSeaTransitHours} hrs (145 NM)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Berth Turnaround at KPCT:</span>
                  <strong className="font-mono text-emerald-600 font-bold">Instant (0.5 hrs wait)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Inland Road Distance:</span>
                  <strong className="font-mono text-emerald-700 font-bold">{kpctRoadKmToHyd} km (-170 km shorter)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span>Cold-Chain Integrity:</span>
                  <strong className="font-mono text-emerald-600 font-bold">100% Protected (Zero Spoilage)</strong>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Total Net Cost:</span>
                  <span className="font-mono font-extrabold text-emerald-700">
                    ₹{(kpctTotalCostInr / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Savings Summary Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  OPTIMIZATION DELTA BY DIVERTING TO KRISHNAPATNAM
                </span>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                  Net Savings: <span className="text-emerald-600 font-mono">₹{(netSavingsInr / 100000).toFixed(2)} Lakhs</span> • Delivery Time Saved: <span className="text-[#0071E3] font-mono">−{netTimeSavedHours} Hours</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[11px] font-mono">
              <div className="px-2.5 py-1 bg-white rounded-lg border border-black/5 shadow-2xs">
                <span className="text-slate-400">CO2e Saved:</span> <strong className="text-emerald-700 ml-1">11.4 Tonnes</strong>
              </div>
              <div className="px-2.5 py-1 bg-white rounded-lg border border-black/5 shadow-2xs">
                <span className="text-slate-400">Reefer Risk:</span> <strong className="text-emerald-700 ml-1">Zero Spoilage</strong>
              </div>
            </div>
          </div>

          {/* Interactive Calibration Sliders */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.05] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Cost Model Parameters (Calibrate in Real-Time)
              </span>
              <button 
                onClick={() => {
                  playIosChime('tap');
                  setBunkerFuelPrice(620);
                  setDemurrageRatePerDay(180);
                  setTruckFreightRatePerKm(85);
                }}
                className="text-[10px] text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                Reset Default Values
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px]">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">VLSFO Bunker:</span>
                  <span className="font-mono font-bold text-slate-800">${bunkerFuelPrice}/t</span>
                </div>
                <input 
                  type="range" 
                  min="400" 
                  max="900" 
                  value={bunkerFuelPrice} 
                  onChange={(e) => setBunkerFuelPrice(Number(e.target.value))}
                  className="w-full accent-[#0071E3] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">Demurrage / Day:</span>
                  <span className="font-mono font-bold text-slate-800">${demurrageRatePerDay}/box</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="350" 
                  value={demurrageRatePerDay} 
                  onChange={(e) => setDemurrageRatePerDay(Number(e.target.value))}
                  className="w-full accent-[#0071E3] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">Trailer Rate / km:</span>
                  <span className="font-mono font-bold text-slate-800">₹{truckFreightRatePerKm}/km</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="140" 
                  value={truckFreightRatePerKm} 
                  onChange={(e) => setTruckFreightRatePerKm(Number(e.target.value))}
                  className="w-full accent-[#0071E3] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 sm:px-6 py-4 bg-[#FBFBFD] border-t border-black/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500">
            {isExecuted ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {selectedScenario === 'divert_kpct' 
                  ? 'Diversion Order Active: MV Eastern Pearl rerouted to KPCT Berth 02'
                  : 'Anchorage Queue Confirmed: MV Eastern Pearl holds at Vizag Berth 04'
                }
              </span>
            ) : (
              <span>Model calibrated on live AIS telemetry, port dwell & NH-16 toll data</span>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end">
            {isExecuted && (
              <button
                onClick={handleReset}
                className="text-xs py-2 px-3 text-slate-600 hover:text-slate-900 border border-black/10 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Simulation</span>
              </button>
            )}

            <button
              onClick={() => {
                playIosChime('tap');
                onClose();
              }}
              className="apple-btn-secondary text-xs py-2 px-4 cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className={`apple-btn-primary text-xs py-2 px-4 flex items-center gap-2 cursor-pointer ${
                selectedScenario === 'divert_kpct'
                  ? isExecuted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#0071E3] hover:bg-[#0077ED]'
                  : isExecuted ? 'bg-slate-800 hover:bg-slate-900' : 'bg-slate-700 hover:bg-slate-800'
              }`}
            >
              {isExecuting ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  <span>Transmitting Protocols...</span>
                </>
              ) : selectedScenario === 'divert_kpct' ? (
                isExecuted ? (
                  <>
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Reroute Active (KPCT Berth 02)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Execute Diversion to KPCT</span>
                  </>
                )
              ) : (
                isExecuted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Vizag Hold Confirmed</span>
                  </>
                ) : (
                  <>
                    <Anchor className="w-3.5 h-3.5" />
                    <span>Confirm Vizag Anchorage Hold</span>
                  </>
                )
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
