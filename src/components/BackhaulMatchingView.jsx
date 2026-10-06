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
      title: 'BACKHAUL LOAD ASSIGNED & DISPATCHED',
      message: `Truck ${match.truckId} assigned to ${match.loadDetails.commodity} (${match.loadDetails.tonnage}). Avoided ${match.emptyAvoidedKm} km of empty deadhead running.`
    });
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-3 sm:p-4 flex flex-col h-full overflow-y-auto font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Repeat className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
              BACKHAUL REVENUE & DEADHEAD ELIMINATION ENGINE
            </h2>
            {activeRole === 'fleet' && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-emerald-300 rounded">
                FLEET DISPATCH VIEW ACTIVE
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time intermodal matching of unassigned return legs with hinterland freight loads
          </p>
        </div>

        {/* Operational KPI Summary Pill */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#F8F9FA] border border-[#CBD5E1] px-3 py-1.5 rounded text-xs overflow-x-auto">
          <div>
            <span className="text-[#64748B]">EMPTY: </span>
            <span className="font-bold text-[#D97706]">26</span>
          </div>
          <div className="text-[#CBD5E1]">|</div>
          <div>
            <span className="text-[#64748B]">LOADS: </span>
            <span className="font-bold text-[#0D3B66]">18</span>
          </div>
          <div className="text-[#CBD5E1]">|</div>
          <div>
            <span className="text-[#64748B]">MATCHES: </span>
            <span className="font-bold text-[#059669]">11</span>
          </div>
        </div>
      </div>

      {/* Main Backhaul Content */}
      <div className="my-3 sm:my-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
        {/* Left: Structured Match Rows */}
        <div className="lg:col-span-8 space-y-3">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>STRUCTURED OPERATIONAL MATCHES (ORDERED BY GRAPH PROXIMITY)</span>
            <span className="text-[#059669]">{Object.keys(confirmedMatches).length} Dispatched</span>
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
                className={`p-3.5 sm:p-4 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F8FAFC] border-[#0D3B66] ring-2 ring-[#0D3B66] shadow-xs'
                    : 'bg-white hover:bg-[#F8F9FA] border-[#CBD5E1]'
                }`}
              >
                {/* Top Row: Truck info + Match Badge */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#0D3B66] text-white text-xs font-bold rounded">
                      {match.truckId}
                    </span>
                    <span className="text-xs text-[#475569] font-medium">
                      {match.truckType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      {match.matchScore}% MATCH
                    </span>
                    {isConfirmed && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 rounded text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        DISPATCHED
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle Row: Visual Connection between Truck Inbound and Outbound Load */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-2 my-3 items-center text-xs">
                  {/* Truck Inbound Leg */}
                  <div className="md:col-span-5 p-2.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded">
                    <div className="text-[10px] text-[#64748B] uppercase font-bold flex items-center gap-1">
                      <Truck className="w-3 h-3 text-[#D97706]" />
                      CURRENT INBOUND / EMPTY LEG
                    </div>
                    <div className="font-bold text-[#0F172A] mt-1">{match.currentLeg}</div>
                    <div className="text-[11px] text-[#475569] mt-0.5">Origin: {match.unassignedOrigin}</div>
                  </div>

                  {/* Operational Link Indicator */}
                  <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                    <div className="w-7 h-7 rounded-full bg-[#0D3B66] text-white flex items-center justify-center font-bold shadow-xs">
                      ➔
                    </div>
                  </div>

                  {/* Matched Outbound Freight Load */}
                  <div className="md:col-span-5 p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded">
                    <div className="text-[10px] text-[#1E40AF] uppercase font-bold flex items-center gap-1">
                      <Package className="w-3 h-3 text-[#0D3B66]" />
                      MATCHED BACKHAUL CONSIGNMENT
                    </div>
                    <div className="font-bold text-[#0F172A] mt-1">
                      {match.loadDetails.origin} ➔ {match.loadDetails.destination}
                    </div>
                    <div className="text-[11px] text-[#475569] mt-0.5">
                      {match.loadDetails.commodity} ({match.loadDetails.tonnage})
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Economic & Environmental Impact */}
                <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-[#E2E8F0] text-xs gap-2">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] text-[#64748B]">DEADHEAD CUT: </span>
                      <span className="font-bold text-[#059669]">{match.emptyAvoidedKm} KM</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#64748B]">EST. REVENUE: </span>
                      <span className="font-bold text-[#0D3B66]">{match.estRevenue}</span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[10px] text-[#64748B]">CO₂ REDUCED: </span>
                      <span className="font-bold text-[#059669]">{match.co2ReductionKg} kg</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmMatch(match);
                    }}
                    disabled={isConfirmed}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all shadow-xs ${
                      isConfirmed
                        ? 'bg-[#E2E8F0] text-[#64748B] cursor-not-allowed'
                        : 'bg-[#0D3B66] hover:bg-[#0A2E50] text-white'
                    }`}
                  >
                    {isConfirmed ? '✓ MATCH LOCKED & DISPATCHED' : 'CONFIRM & ASSIGN BACKHAUL ➔'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Match Details & Shipper SLA Inspector */}
        <div className="lg:col-span-4 bg-[#F8F9FA] border border-[#CBD5E1] rounded-lg p-3.5 sm:p-4 flex flex-col font-mono text-xs">
          <div className="text-[11px] font-bold text-[#0D3B66] uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
            BACKHAUL SLA & CONTRACT SPEC
          </div>

          {selectedMatch && (
            <div className="mt-3 space-y-3 flex-1">
              <div>
                <div className="text-[10px] text-[#64748B]">SHIPPER CONTRACT</div>
                <div className="font-bold text-[#0F172A] text-sm">{selectedMatch.loadDetails.shipper}</div>
                <div className="text-[11px] text-[#475569]">Load ID: {selectedMatch.loadDetails.loadId}</div>
              </div>

              <div className="p-2.5 bg-white border border-[#E2E8F0] rounded space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Ready Time:</span>
                  <span className="font-bold text-[#0F172A]">{selectedMatch.loadDetails.readyTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Delivery SLA:</span>
                  <span className="font-bold text-[#0F172A]">{selectedMatch.loadDetails.deliveryDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Payout Rate:</span>
                  <span className="font-bold text-[#059669]">{selectedMatch.loadDetails.payoutRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Corridor Route:</span>
                  <span className="font-bold text-[#0D3B66]">{selectedMatch.corridorRoute}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-[11px] text-[#065F46]">
                <div className="font-bold mb-0.5">CORRIDOR EFFICIENCY PRINCIPLE:</div>
                <div className="leading-relaxed">
                  Every backhaul captured converts unbillable diesel deadhead miles into profitable freight carriage while reducing corridor carbon footprint.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
