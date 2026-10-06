import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ShieldAlert, 
  ThermometerSnowflake, 
  Ship, 
  Truck, 
  Repeat, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Zap, 
  TrendingUp,
  X,
  Radio,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export function playIosChime(type = 'tap') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else {
      // Tap haptic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
}

export function DynamicIslandHabitBar({
  activeRole,
  onOpenAction,
  onSelectTab,
  onTriggerImpact
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [activeIslandIndex, setActiveIslandIndex] = useState(0);
  const [completedHabits, setCompletedHabits] = useState({
    customs: true,
    reefer_check: false,
    backhaul_dispatch: true,
    dwell_audit: false
  });

  // Cycle through live telemetry alerts in the Dynamic Island
  const liveAlerts = [
    {
      id: 'reefer',
      icon: ThermometerSnowflake,
      iconColor: 'text-rose-400',
      tag: 'CRITICAL TEMP',
      title: 'VC-2048 Oncology Reefer',
      metric: '+7.9°C (Limit +8°C)',
      actionTab: 'coldchain',
      badgeBg: 'bg-rose-500/20 text-rose-300'
    },
    {
      id: 'vessel',
      icon: Ship,
      iconColor: 'text-sky-400',
      tag: 'INBOUND AIS',
      title: 'MV Eastern Pearl (14.2 kts)',
      metric: 'ETA: 23:45 IST • Berth 04',
      actionTab: 'vessels',
      badgeBg: 'bg-sky-500/20 text-sky-300'
    },
    {
      id: 'backhaul',
      icon: Repeat,
      iconColor: 'text-emerald-400',
      tag: 'BACKHAUL ENGINE',
      title: '11 Empty Return Trucks',
      metric: '₹3.36L Revenue Opportunity',
      actionTab: 'backhaul',
      badgeBg: 'bg-emerald-500/20 text-emerald-300'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIslandIndex((prev) => (prev + 1) % liveAlerts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const toggleHabit = (key) => {
    if (isSoundEnabled) playIosChime('success');
    setCompletedHabits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(completedHabits).filter(Boolean).length;
  const habitScore = Math.round((completedCount / 4) * 100);

  const currentAlert = liveAlerts[activeIslandIndex];
  const CurrentIcon = currentAlert.icon;

  return (
    <div className="relative z-30 flex items-center justify-center px-3 sm:px-6 py-1.5 bg-[#F2F4F7]">
      {/* iOS Dynamic Island Capsule */}
      <div 
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? 'w-full max-w-4xl' : 'w-full max-w-2xl'
        }`}
      >
        <div className="ios-glass-dark text-white rounded-full sm:rounded-[24px] px-3.5 py-1.5 sm:py-2 flex items-center justify-between shadow-[0_8px_25px_-4px_rgba(0,0,0,0.35)] border border-white/15 animate-island-pulse">
          {/* Left: Interactive Telemetry Pill */}
          <button
            onClick={() => {
              if (isSoundEnabled) playIosChime('tap');
              if (onSelectTab) onSelectTab(currentAlert.actionTab);
            }}
            className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <div className="relative shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/10">
              <CurrentIcon className={`w-3.5 h-3.5 ${currentAlert.iconColor}`} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            </div>

            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase truncate">
                  {currentAlert.title}
                </span>
                <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full hidden sm:inline-block ${currentAlert.badgeBg}`}>
                  {currentAlert.tag}
                </span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold truncate">
                {currentAlert.metric}
              </div>
            </div>
          </button>

          {/* Center / Right: Habit Streak & Readiness */}
          <div className="flex items-center gap-2 shrink-0">
            {/* 14-Day Streak Pill */}
            <button
              onClick={() => {
                if (isSoundEnabled) playIosChime('tap');
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              title="Daily Corridor Habit Score"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
              <span className="text-[11px] font-bold text-amber-300">14d</span>
              <span className="hidden md:inline text-[10px] text-slate-300">| {habitScore}% Sync</span>
            </button>

            {/* Expand / Close Details Drawer */}
            <button
              onClick={() => {
                if (isSoundEnabled) playIosChime('tap');
                setIsExpanded(!isExpanded);
              }}
              className={`p-1.5 rounded-full hover:bg-white/20 text-slate-300 transition-transform ${isExpanded ? 'rotate-90 bg-white/15 text-white' : ''}`}
              title="Corridor Habit Checklist"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded Habit & Quick Operations Tray */}
        {isExpanded && (
          <div className="mt-2 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-black/5 dark:border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <Flame className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Daily Corridor Operations Protocol
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Habitual checklist to maintain zero-deadhead and 100% SLA corridor throughput
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {completedCount}/4 Completed
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
              {[
                { key: 'customs', label: 'Verify 4 E-Gate Passes & Bills of Entry', role: 'Customs & Port', tab: 'shipments' },
                { key: 'reefer_check', label: 'Acknowledge VC-2048 Reefer Temp (+7.9°C)', role: 'Cold-Chain IoT', tab: 'coldchain', isCritical: true },
                { key: 'backhaul_dispatch', label: 'Confirm 11 Return Loads from Genome Valley', role: 'Fleet Dispatch', tab: 'backhaul' },
                { key: 'dwell_audit', label: 'Simulate Vizag 72h Berth Bottleneck Cascade', role: 'Network Simulation', tab: 'impact' }
              ].map(item => (
                <div
                  key={item.key}
                  onClick={() => toggleHabit(item.key)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    completedHabits[item.key]
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200'
                      : item.isCritical
                        ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      completedHabits[item.key] 
                        ? 'bg-emerald-500 text-white' 
                        : 'border border-slate-300 dark:border-slate-600'
                    }`}>
                      {completedHabits[item.key] && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTab) onSelectTab(item.tab);
                      setIsExpanded(false);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-500"
                    title="Jump to View"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Action Dock */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>One-Tap Corridor Operations:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isSoundEnabled) playIosChime('success');
                    if (onSelectTab) onSelectTab('backhaul');
                    setIsExpanded(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all ios-btn shadow-sm"
                >
                  ⚡ Auto-Dispatch 11 Backhauls
                </button>
                <button
                  onClick={() => {
                    if (isSoundEnabled) playIosChime('alert');
                    if (onSelectTab) onSelectTab('coldchain');
                    setIsExpanded(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all ios-btn shadow-sm"
                >
                  ❄️ Override Reefer Temp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
