import React, { useState } from 'react';
import { FLEET_TRUCKS } from '../data/mockData';
import { Truck, Navigation, Gauge, Fuel, Phone, AlertTriangle, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function FleetView({ onSelectAsset, onTriggerBackhaul, activeRole = 'all' }) {
  const [selectedTruckId, setSelectedTruckId] = useState('TK-307');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredTrucks = FLEET_TRUCKS.filter(t => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'AVAILABLE') return t.status.includes('AVAILABLE');
    if (filterStatus === 'TRANSIT') return t.status.includes('TRANSIT');
    if (filterStatus === 'DELAYED') return t.status.includes('DELAYED');
    return true;
  });

  const activeTruck = FLEET_TRUCKS.find(t => t.id === selectedTruckId) || FLEET_TRUCKS[0];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Apple Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Fleet & Haulage
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Intermodal rig telemetry, gate hold surveillance, and highway positioning
          </p>
        </div>

        {/* Apple Segmented Filter */}
        <div className="apple-segmented p-1 self-start sm:self-auto flex items-center overflow-x-auto no-scrollbar">
          {['ALL', 'AVAILABLE', 'TRANSIT', 'DELAYED'].map(status => (
            <button
              key={status}
              onClick={() => {
                playIosChime('tap');
                setFilterStatus(status);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              {status === 'ALL' ? 'All Trucks' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Truck List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868B] px-1">
            <span className="uppercase tracking-wider text-[10px]">Corridor Rigs ({filteredTrucks.length})</span>
            <span className="text-[11px]">Select to inspect telemetry</span>
          </div>

          <div className="space-y-2.5">
            {filteredTrucks.map(truck => {
              const isSelected = selectedTruckId === truck.id;
              const isAlert = truck.status === 'DELAYED_HOLD';
              const isEmpty = truck.status === 'AVAILABLE_EMPTY';

              return (
                <div
                  key={truck.id}
                  onClick={() => {
                    playIosChime('tap');
                    setSelectedTruckId(truck.id);
                    if (onSelectAsset) onSelectAsset({ ...truck, assetType: 'truck' });
                  }}
                  className={`apple-card p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#0071E3] shadow-md ring-2 ring-[#0071E3]/20'
                      : 'hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{
                      backgroundColor: isAlert ? '#FF3B30' : isEmpty ? '#FF9500' : '#34C759'
                    }} />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1D1D1F] text-sm">{truck.id}</span>
                        <span className="text-xs text-[#86868B]">({truck.type.split(' ')[0]})</span>
                      </div>
                      <div className="text-xs text-[#86868B] mt-0.5">
                        {truck.currentLocation}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isAlert ? 'bg-[#FF3B30]/10 text-[#FF3B30]' :
                      isEmpty ? 'bg-[#FF9500]/10 text-[#FF9500]' :
                      'bg-[#34C759]/10 text-[#34C759]'
                    }`}>
                      {truck.statusLabel}
                    </span>
                    <div className="text-xs text-[#86868B] mt-1">
                      {truck.capacityTons}T {truck.currentLoadTons ? `(${truck.currentLoadTons}T load)` : 'Capacity'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Rig Detail */}
        <div className="lg:col-span-5 apple-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Rig Telemetry & Driver Spec
            </h3>
            <span className="font-bold text-[#1D1D1F] text-sm">{activeTruck.id}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="apple-group text-xs">
              <div className="p-3 flex justify-between border-b border-black/[0.06]">
                <span className="text-[#86868B]">Driver</span>
                <span className="font-semibold text-[#1D1D1F]">{activeTruck.driver}</span>
              </div>
              <div className="p-3 flex justify-between border-b border-black/[0.06]">
                <span className="text-[#86868B]">Contact</span>
                <span className="font-semibold text-[#0071E3]">{activeTruck.phone}</span>
              </div>
              <div className="p-3 flex justify-between border-b border-black/[0.06]">
                <span className="text-[#86868B]">Class</span>
                <span className="font-semibold text-[#1D1D1F]">{activeTruck.type}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#86868B]">Corridor</span>
                <span className="font-semibold text-[#1D1D1F]">{activeTruck.assignedCorridor}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-black/[0.02] rounded-2xl text-center">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Odometer</div>
                <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">{activeTruck.telemetry.odometer}</div>
              </div>
              <div className="p-3 bg-black/[0.02] rounded-2xl text-center">
                <div className="text-[10px] text-[#86868B] font-semibold uppercase">Fuel Reserve</div>
                <div className="font-bold text-[#1D1D1F] text-sm mt-0.5">{activeTruck.telemetry.fuel}</div>
              </div>
            </div>

            {activeTruck.reason && (
              <div className="p-3.5 bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-2xl text-[#1D1D1F] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs text-[#FF3B30]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Congestion Hold Notice</span>
                </div>
                <div className="font-medium text-xs mt-0.5">{activeTruck.reason}</div>
                <div className="text-[11px] text-[#86868B]">
                  Delayed by {activeTruck.delayedByHours} hours. Telemetry cargo temp: {activeTruck.telemetry.cargoTemp}
                </div>
              </div>
            )}

            {activeTruck.hasBackhaulMatch && (
              <button
                onClick={() => {
                  playIosChime('tap');
                  if (onTriggerBackhaul) onTriggerBackhaul();
                }}
                className="w-full py-2.5 apple-btn-primary text-xs flex items-center justify-center gap-1.5 cursor-pointer bg-[#34C759] text-white hover:bg-emerald-600"
              >
                <span>View 94% Backhaul Match (₹42,000 Payout) ➔</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

