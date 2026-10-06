import React, { useState } from 'react';
import { BACKHAUL_MATCHES, FLEET_TRUCKS } from '../data/mockData';
import { Repeat, ArrowRight, CheckCircle2, ShieldCheck, Truck, Package, DollarSign, Leaf, Zap, Sparkles } from 'lucide-react';
import { useToast } from './ToastNotification';

export function BackhaulMatchingView({ onSelectAsset, onAssignBackhaul, activeRole = 'all' }) {
  const [confirmedMatches, setConfirmedMatches] = useState({});
  const [selectedMatch, setSelectedMatch] = useState(BACKHAUL_MATCHES[0]);
  const { addToast } = useToast();

  const handleConfirmMatch = (match) => {
    setConfirmedMatches(prev => ({ ...prev, [match.id]: true }));
    if (onAssignBackhaul) onAssignBackhaul(match);
    addToast({
      type: 'success',
      title: 'Backhaul Load Dispatched',
      message: `Truck ${match.truckId} assigned to ${match.loadDetails.commodity}. Avoided ${match.emptyAvoidedKm} km of empty deadhead running.`
    });
  };

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Backhaul Revenue & Deadhead Elimination
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically pair empty returning trucks with regional freight loads
              </p>
            </div>
          </div>
        </div>

        {/* Operational Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs shadow-2xs">
          <div>
            <span className="text-slate-400">Empty Trucks: </span>
            <span className="font-bold text-amber-600">26</span>
          </div>
          <div className="text-slate-200">|</div>
          <div>
            <span className="text-slate-400">Loads Available: </span>
            <span className="font-bold text-slate-800">18</span>
          </div>
          <div className="text-slate-200">|</div>
          <div>
            <span className="text-slate-400">Matches Ready: </span>
            <span className="font-bold text-emerald-600">11</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
        {/* Left: Structured Match Rows */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
            <span>AUTOMATED BACKHAUL OPPORTUNITIES ({BACKHAUL_MATCHES.length})</span>
            <span className="text-emerald-700 font-medium">
              {Object.keys(confirmedMatches).length} Dispatched
            </span>
          </div>

          {BACKHAUL_MATCHES.map((match) => {
            const isConfirmed = confirmedMatches[match.id];
            const isSelected = selectedMatch && selectedMatch.id === match.id;

            return (
              <div
                key={match.id}
                onClick={() => {
                  setSelectedMatch(match);
                  if (onSelectAsset) onSelectAsset({ ...match, assetType: 'truck' });
                }}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs'
                }`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-900 text-white text-xs font-bold rounded">
                      {match.truckId}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {match.truckType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      {match.matchScore}% Match
                    </span>
                    {isConfirmed && (
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        Dispatched
                      </span>
                    )}
                  </div>
                </div>

                {/* Connection Box */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-2.5 my-3.5 items-center text-xs">
                  {/* Empty leg */}
                  <div className="md:col-span-5 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <Truck className="w-3 h-3 text-amber-600" />
                      Empty Inbound Return
                    </div>
                    <div className="font-bold text-slate-900 mt-1">{match.currentLeg}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Origin: {match.unassignedOrigin}</div>
                  </div>

                  {/* Arrow Link */}
                  <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                      ➔
                    </div>
                  </div>

                  {/* Matched Load */}
                  <div className="md:col-span-5 p-3 bg-blue-50/60 border border-blue-100 rounded-lg">
                    <div className="text-[10px] text-blue-700 font-semibold uppercase flex items-center gap-1">
                      <Package className="w-3 h-3 text-blue-600" />
                      Matched Backhaul Load
                    </div>
                    <div className="font-bold text-slate-900 mt-1">
                      {match.loadDetails.origin} ➔ {match.loadDetails.destination}
                    </div>
                    <div className="text-slate-600 text-[11px] mt-0.5">
                      {match.loadDetails.commodity} ({match.loadDetails.tonnage})
                    </div>
                  </div>
                </div>

                {/* Impact Row */}
                <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-slate-100 text-xs gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[11px] text-slate-400">Empty Miles Cut: </span>
                      <span className="font-bold text-emerald-700">{match.emptyAvoidedKm} KM</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400">Estimated Revenue: </span>
                      <span className="font-bold text-slate-900">{match.estRevenue}</span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[11px] text-slate-400">CO₂ Saved: </span>
                      <span className="font-bold text-emerald-700">{match.co2ReductionKg} kg</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmMatch(match);
                    }}
                    disabled={isConfirmed}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isConfirmed
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isConfirmed ? '✓ Match Locked & Dispatched' : 'Confirm & Assign Load ➔'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: SLA Spec */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
            Shipper Contract & Load Specification
          </h3>

          {selectedMatch && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Shipper Company</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedMatch.loadDetails.shipper}</div>
                <div className="text-slate-500 text-[11px]">Load ID: {selectedMatch.loadDetails.loadId}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ready Time:</span>
                  <span className="font-bold text-slate-900">{selectedMatch.loadDetails.readyTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Deadline:</span>
                  <span className="font-bold text-slate-900">{selectedMatch.loadDetails.deliveryDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payout Rate:</span>
                  <span className="font-bold text-emerald-700">{selectedMatch.loadDetails.payoutRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Corridor Highway:</span>
                  <span className="font-bold text-slate-900">{selectedMatch.corridorRoute}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-emerald-900 text-xs leading-relaxed">
                <strong>Why Backhaul Matters:</strong> Eliminates unbillable return miles and puts ₹42,000+ directly back into fleet profitability while saving diesel fuel.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
