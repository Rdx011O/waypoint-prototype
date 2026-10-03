import React, { useState } from 'react';
import { FLEET_TRUCKS } from '../data/mockData';
import { Truck, Navigation, Gauge, Fuel, Phone, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export function FleetView({ onSelectAsset, onTriggerBackhaul }) {
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
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-4 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-base font-bold font-mono text-[#0F172A]">
              FLEET & LAND HAULAGE DISPATCH
            </h2>
          </div>
          <p className="text-xs text-[#64748B] font-mono mt-0.5">
            Intermodal rig telemetry, gate hold surveillance, and real-time corridor position
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {['ALL', 'AVAILABLE', 'TRANSIT', 'DELAYED'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-[#0D3B66] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Compact Fleet List */}
        <div className="lg:col-span-7 space-y-2 font-mono text-xs">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
            ACTIVE CORRIDOR RIGS ({filteredTrucks.length})
          </div>

          <div className="space-y-2">
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
                  className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#F8FAFC] border-[#0D3B66] ring-1 ring-[#0D3B66] shadow-xs'
                      : 'bg-white hover:bg-[#F8F9FA] border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{
                      backgroundColor: isAlert ? '#DC2626' : isEmpty ? '#D97706' : '#059669'
                    }} />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F172A] text-sm">{truck.id}</span>
                        <span className="text-[11px] text-[#64748B]">({truck.type.split(' ')[0]})</span>
                      </div>
                      <div className="text-[11px] text-[#475569] mt-0.5">
                        {truck.currentLocation}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isAlert ? 'bg-red-100 text-red-700' :
                      isEmpty ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {truck.statusLabel}
                    </span>
                    <div className="text-[11px] text-[#64748B] mt-1 font-semibold">
                      {truck.capacityTons}T {truck.currentLoadTons ? `(${truck.currentLoadTons}T loaded)` : 'Capacity'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Rig Telemetry Card */}
        <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#CBD5E1] rounded p-3.5 flex flex-col font-mono text-xs">
          <div className="text-[11px] font-bold text-[#0D3B66] uppercase tracking-wider pb-2 border-b border-[#E2E8F0] flex items-center justify-between">
            <span>RIG TELEMETRY SPEC</span>
            <span className="text-[#0F172A] font-bold">{activeTruck.id}</span>
          </div>

          <div className="mt-3 space-y-3 flex-1">
            {/* Driver & Rig Spec */}
            <div className="p-2.5 bg-white border border-[#E2E8F0] rounded space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Driver:</span>
                <span className="font-bold text-[#0F172A]">{activeTruck.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Driver Contact:</span>
                <span className="font-bold text-[#0D3B66]">{activeTruck.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Rig Class:</span>
                <span className="font-bold text-[#0F172A]">{activeTruck.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Assigned Corridor:</span>
                <span className="font-bold text-[#0F172A]">{activeTruck.assignedCorridor}</span>
              </div>
            </div>

            {/* IoT Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white border border-[#E2E8F0] rounded">
                <div className="text-[10px] text-[#64748B]">ODOMETER</div>
                <div className="font-bold text-[#0F172A] mt-0.5">{activeTruck.telemetry.odometer}</div>
              </div>
              <div className="p-2 bg-white border border-[#E2E8F0] rounded">
                <div className="text-[10px] text-[#64748B]">FUEL LEVEL</div>
                <div className="font-bold text-[#0F172A] mt-0.5">{activeTruck.telemetry.fuel}</div>
              </div>
            </div>

            {/* Hold Reason / Alert */}
            {activeTruck.reason && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded text-red-900">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>CONGESTION HOLD ALERT:</span>
                </div>
                <div className="mt-1 font-semibold">{activeTruck.reason}</div>
                <div className="text-[11px] text-red-700 mt-0.5">
                  Delayed by {activeTruck.delayedByHours} hours. Telemetry indicates: {activeTruck.telemetry.cargoTemp}
                </div>
              </div>
            )}

            {/* Action buttons */}
            {activeTruck.hasBackhaulMatch && (
              <button
                onClick={onTriggerBackhaul}
                className="w-full py-2 bg-[#059669] hover:bg-[#047857] text-white rounded text-xs font-bold transition-colors shadow-xs"
              >
                VIEW BACKHAUL OPPORTUNITY (94% MATCH) ➔
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
