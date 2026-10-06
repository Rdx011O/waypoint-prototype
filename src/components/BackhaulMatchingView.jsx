import React, { useState } from 'react';
import { BACKHAUL_MATCHES, FLEET_TRUCKS } from '../data/mockData';
import { Repeat, ArrowRight, CheckCircle2, ShieldCheck, Truck, Package, DollarSign, Leaf, Zap, ChevronRight } from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function BackhaulMatchingView({ onSelectAsset, onAssignBackhaul, activeRole = 'all' }) {
  const [confirmedMatches, setConfirmedMatches] = useState({});
  const [selectedMatch, setSelectedMatch] = useState(BACKHAUL_MATCHES[0]);
  const { addToast } = useToast();

  const handleConfirmMatch = (match) => {
    playIosChime('success');
    setConfirmedMatches(prev => ({ ...prev, [match.id]: true }));
    if (onAssignBackhaul) onAssignBackhaul(match);
    addToast({
      type: 'success',
      title: 'Backhaul Assigned',
      message: `Truck ${match.truckId} assigned to ${match.loadDetails.commodity}. Avoided ${match.emptyAvoidedKm} km deadhead.`
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Backhaul Engine
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Automated deadhead elimination matching returning corridor trucks with shippers
          </p>
        </div>

        {/* Operational Pill */}
        <div className="apple-card px-4 py-2 text-xs flex items-center gap-3">
          <div>
            <span className="text-[#86868B]">Empty: </span>
            <span className="font-bold text-[#FF9500]">26</span>
          </div>
          <div className="text-black/10">|</div>
          <div>
            <span className="text-[#86868B]">Loads: </span>
            <span className="font-bold text-[#1D1D1F]">18</span>
          </div>
          <div className="text-black/10">|</div>
          <div>
            <span className="text-[#86868B]">Matched: </span>
            <span className="font-bold text-[#34C759]">11</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Structured Match Rows */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868B] px-1">
            <span className="uppercase tracking-wider text-[10px]">Backhaul Matches ({BACKHAUL_MATCHES.length})</span>
            <span className="text-[#34C759] font-bold">
              {Object.keys(confirmedMatches).length} Dispatched Today
            </span>
          </div>

          {BACKHAUL_MATCHES.map((match) => {
            const isConfirmed = confirmedMatches[match.id];
            const isSelected = selectedMatch && selectedMatch.id === match.id;

            return (
              <div
                key={match.id}
                onClick={() => {
                  playIosChime('tap');
                  setSelectedMatch(match);
                  if (onSelectAsset) onSelectAsset({ ...match, assetType: 'truck' });
                }}
                className={`apple-card p-4 sm:p-5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#34C759] shadow-md ring-2 ring-[#34C759]/20'
                    : 'hover:border-black/20'
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#1D1D1F] text-white text-xs font-bold rounded-md font-mono">
                      {match.truckId}
                    </span>
                    <span className="text-xs text-[#86868B] font-medium">
                      {match.truckType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#34C759]/10 text-[#34C759] rounded-full text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {match.matchScore}% Match
                    </span>
                    {isConfirmed && (
                      <span className="px-2.5 py-0.5 bg-[#0071E3]/10 text-[#0071E3] rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Dispatched
                      </span>
                    )}
                  </div>
                </div>

                {/* Connection Box */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-2.5 my-3 items-center text-xs">
                  {/* Empty leg */}
                  <div className="md:col-span-5 p-3 bg-black/[0.02] rounded-xl border border-black/[0.04]">
                    <div className="text-[10px] text-[#86868B] font-semibold uppercase flex items-center gap-1">
                      <Truck className="w-3 h-3 text-[#FF9500]" />
                      Empty Inbound Leg
                    </div>
                    <div className="font-bold text-[#1D1D1F] mt-1">{match.currentLeg}</div>
                    <div className="text-[#86868B] text-[11px] mt-0.5">Origin: {match.unassignedOrigin}</div>
                  </div>

                  {/* Arrow Link */}
                  <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                    <div className="w-6 h-6 rounded-full bg-black/[0.05] text-[#86868B] flex items-center justify-center font-bold text-xs">
                      ➔
                    </div>
                  </div>

                  {/* Matched Load */}
                  <div className="md:col-span-5 p-3 bg-[#0071E3]/5 rounded-xl border border-[#0071E3]/15">
                    <div className="text-[10px] text-[#0071E3] font-semibold uppercase flex items-center gap-1">
                      <Package className="w-3 h-3 text-[#0071E3]" />
                      Matched Return Load
                    </div>
                    <div className="font-bold text-[#1D1D1F] mt-1">
                      {match.loadDetails.origin} ➔ {match.loadDetails.destination}
                    </div>
                    <div className="text-[#86868B] text-[11px] mt-0.5">
                      {match.loadDetails.commodity} ({match.loadDetails.tonnage})
                    </div>
                  </div>
                </div>

                {/* Impact Row */}
                <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-black/[0.06] text-xs gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[11px] text-[#86868B]">Miles Saved: </span>
                      <span className="font-bold text-[#34C759]">{match.emptyAvoidedKm} km</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#86868B]">Est Revenue: </span>
                      <span className="font-bold text-[#1D1D1F]">{match.estRevenue}</span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[11px] text-[#86868B]">CO₂ Cut: </span>
                      <span className="font-bold text-[#34C759]">{match.co2ReductionKg} kg</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmMatch(match);
                    }}
                    disabled={isConfirmed}
                    className={`apple-btn-primary text-xs py-1.5 px-3.5 whitespace-nowrap cursor-pointer ${
                      isConfirmed
                        ? 'bg-black/10 text-[#86868B] cursor-not-allowed opacity-70'
                        : 'bg-[#1D1D1F] text-white hover:bg-black'
                    }`}
                  >
                    {isConfirmed ? '✓ Match Dispatched' : 'Confirm & Dispatch ➔'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: SLA Spec */}
        <div className="lg:col-span-4 apple-card p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider pb-2 border-b border-black/[0.06]">
            Shipper Contract & Dispatch Spec
          </h3>

          {selectedMatch && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Shipper Account</div>
                <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">{selectedMatch.loadDetails.shipper}</div>
                <div className="text-[#86868B] text-[11px]">Load ID: {selectedMatch.loadDetails.loadId}</div>
              </div>

              <div className="apple-group text-xs">
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Ready Time</span>
                  <span className="font-semibold text-[#1D1D1F]">{selectedMatch.loadDetails.readyTime}</span>
                </div>
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Delivery Deadline</span>
                  <span className="font-semibold text-[#1D1D1F]">{selectedMatch.loadDetails.deliveryDeadline}</span>
                </div>
                <div className="p-3 flex justify-between border-b border-black/[0.06]">
                  <span className="text-[#86868B]">Payout Rate</span>
                  <span className="font-semibold text-[#34C759]">{selectedMatch.loadDetails.payoutRate}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-[#86868B]">Corridor Highway</span>
                  <span className="font-semibold text-[#1D1D1F]">{selectedMatch.corridorRoute}</span>
                </div>
              </div>

              <div className="p-3 bg-[#34C759]/5 border border-[#34C759]/20 rounded-2xl text-[#1D1D1F] text-xs leading-relaxed">
                <strong>Fleet Profitability:</strong> Eliminates unbillable return miles and recaptures ₹42,000+ per run in haulage margin.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

