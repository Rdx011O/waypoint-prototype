import React, { useState } from 'react';
import { FLEET_TRUCKS } from '../data/mockData';
import { Truck, Navigation, Gauge, Fuel, Phone, AlertTriangle, CheckCircle, ArrowRight, Filter } from 'lucide-react';

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
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Fleet Dispatch & Highway Haulage
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Intermodal rig telemetry, gate hold surveillance, and real-time corridor position
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar shadow-2xs">
          {['ALL', 'AVAILABLE', 'TRANSIT', 'DELAYED'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {status === 'ALL' ? 'All Trucks' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
        {/* Left: Truck List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
            <span>ACTIVE CORRIDOR RIGS ({filteredTrucks.length})</span>
            <span className="text-slate-400 font-normal text-[11px]">Click to inspect</span>
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
                    setSelectedTruckId(truck.id);
                    if (onSelectAsset) onSelectAsset({ ...truck, assetType: 'truck' });
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{
                      backgroundColor: isAlert ? '#E11D48' : isEmpty ? '#D97706' : '#059669'
                    }} />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{truck.id}</span>
                        <span className="text-xs text-slate-500 font-medium">({truck.type.split(' ')[0]})</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {truck.currentLocation}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isAlert ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      isEmpty ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {truck.statusLabel}
                    </span>
                    <div className="text-xs text-slate-500 mt-1 font-medium">
                      {truck.capacityTons}T {truck.currentLoadTons ? `(${truck.currentLoadTons}T load)` : 'Capacity'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Rig Detail */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Rig Telemetry & Driver Spec
            </h3>
            <span className="font-bold text-slate-900 text-sm">{activeTruck.id}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Driver Name:</span>
                <span className="font-bold text-slate-900">{activeTruck.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone Contact:</span>
                <span className="font-bold text-blue-700">{activeTruck.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle Class:</span>
                <span className="font-bold text-slate-900">{activeTruck.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Corridor Route:</span>
                <span className="font-bold text-slate-900">{activeTruck.assignedCorridor}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Odometer</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{activeTruck.telemetry.odometer}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Fuel Level</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{activeTruck.telemetry.fuel}</div>
              </div>
            </div>

            {activeTruck.reason && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-slate-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Congestion Hold Notice</span>
                </div>
                <div className="font-medium text-xs mt-0.5">{activeTruck.reason}</div>
                <div className="text-[11px] text-slate-600">
                  Delayed by {activeTruck.delayedByHours} hours. Telemetry cargo temp: {activeTruck.telemetry.cargoTemp}
                </div>
              </div>
            )}

            {activeTruck.hasBackhaulMatch && (
              <button
                onClick={onTriggerBackhaul}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                View 94% Backhaul Match (₹42,000 Payout) ➔
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
