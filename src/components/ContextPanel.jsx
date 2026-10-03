import React from 'react';
import { X, Anchor, Ship, Truck, Building2, AlertTriangle, Repeat, Package, ArrowRight, ExternalLink, ShieldAlert } from 'lucide-react';

export function ContextPanel({ selectedAsset, onClose, onTriggerImpactView, onJumpToTab }) {
  if (!selectedAsset) return null;

  const type = selectedAsset.assetType || (selectedAsset.imo ? 'vessel' : selectedAsset.congestion !== undefined ? 'port' : selectedAsset.capacityTons ? 'truck' : 'generic');

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-l border-[#CBD5E1] flex flex-col h-full z-20 shrink-0 shadow-lg md:shadow-none animate-in slide-in-from-right-2 duration-200">
      {/* Drawer Header */}
      <div className="p-3 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'port' && <Anchor className="w-4 h-4 text-[#0D3B66]" />}
          {type === 'vessel' && <Ship className="w-4 h-4 text-[#086788]" />}
          {type === 'truck' && <Truck className="w-4 h-4 text-[#D97706]" />}
          {type === 'warehouse' && <Building2 className="w-4 h-4 text-[#059669]" />}
          
          <span className="text-[11px] font-mono font-bold text-[#0F172A] uppercase">
            CONTEXT PANEL • {type}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded transition-colors"
          title="Close Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Body Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 font-mono text-xs">
        {/* PORT CONTEXT */}
        {type === 'port' && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#64748B]">PORT TERMINAL</div>
              <div className="text-base font-bold text-[#0F172A]">{selectedAsset.name}</div>
              <div className="text-[11px] text-[#475569]">{selectedAsset.code} • {selectedAsset.channelStatus}</div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-red-800">CURRENT CONGESTION:</span>
                <span className="text-sm font-bold text-red-700">{selectedAsset.congestion}%</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2 text-center text-[10px] pt-2 border-t border-red-200/60">
                <div>
                  <div className="text-[#64748B]">+24H</div>
                  <div className="font-bold text-[#0F172A]">{selectedAsset.forecast?.h24 || 71}%</div>
                </div>
                <div>
                  <div className="text-red-700 font-bold">+48H PEAK</div>
                  <div className="font-bold text-red-700">{selectedAsset.forecast?.h48 || 81}%</div>
                </div>
                <div>
                  <div className="text-[#64748B]">+72H</div>
                  <div className="font-bold text-[#0F172A]">{selectedAsset.forecast?.h72 || 67}%</div>
                </div>
              </div>
            </div>

            {/* Operational Impact Breakdown */}
            <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded space-y-2">
              <div className="text-[10px] font-bold text-[#0D3B66] uppercase">AFFECTED NETWORK:</div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Waiting Vessels:</span>
                  <span className="font-bold text-[#0F172A]">{selectedAsset.waitingVessels || 7}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Expected Turnaround Dwell:</span>
                  <span className="font-bold text-[#0F172A]">{selectedAsset.expectedDwellHours || 16}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Affected Land Trucks:</span>
                  <span className="font-bold text-[#D97706]">{selectedAsset.affectedTrucks || 26}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Affected Shipments:</span>
                  <span className="font-bold text-[#0F172A]">{selectedAsset.affectedShipments || 11}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-bold">Affected Cold-Chain:</span>
                  <span className="font-bold text-red-700">{selectedAsset.affectedColdChain || 3}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onTriggerImpactView) onTriggerImpactView();
              }}
              className="w-full py-2.5 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>VIEW NETWORK IMPACT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* VESSEL CONTEXT */}
        {type === 'vessel' && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#64748B]">VESSEL CARRIER</div>
              <div className="text-base font-bold text-[#0F172A]">{selectedAsset.name}</div>
              <div className="text-[11px] text-[#475569]">{selectedAsset.imo} • {selectedAsset.type}</div>
            </div>

            <div className="p-2.5 bg-[#F8F9FA] border border-[#CBD5E1] rounded space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Destination Port:</span>
                <span className="font-bold text-[#0D3B66]">{selectedAsset.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">ETA at Pilot:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Speed / Heading:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.speed} • {selectedAsset.heading}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Capacity:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.cargoTonnage}</span>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900">
              <div className="font-bold">BERTH QUEUE PREDICTION:</div>
              <div className="mt-0.5">{selectedAsset.predictedBerth}</div>
            </div>

            <button
              onClick={() => onJumpToTab && onJumpToTab('vessels')}
              className="w-full py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs transition-colors"
            >
              OPEN FULL VESSEL TIMING RECORD ➔
            </button>
          </div>
        )}

        {/* TRUCK CONTEXT */}
        {type === 'truck' && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#64748B]">HAULAGE RIG</div>
              <div className="text-base font-bold text-[#0F172A]">{selectedAsset.id}</div>
              <div className="text-[11px] text-[#475569]">{selectedAsset.type}</div>
            </div>

            <div className="p-2.5 bg-[#F8F9FA] border border-[#CBD5E1] rounded space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Status:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.statusLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Current Location:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.currentLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Driver:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.driver} ({selectedAsset.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Capacity:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.capacityTons} MT</span>
              </div>
            </div>

            {selectedAsset.hasBackhaulMatch && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-900">
                <div className="font-bold">BACKHAUL MATCH AVAILABLE:</div>
                <div className="mt-0.5">94% Match • 612 KM Deadhead Avoided • ₹42,000 Rev</div>
                <button
                  onClick={() => onJumpToTab && onJumpToTab('backhaul')}
                  className="mt-2 w-full py-1.5 bg-[#059669] hover:bg-[#047857] text-white rounded font-bold text-[11px] transition-colors"
                >
                  ASSIGN BACKHAUL LOAD ➔
                </button>
              </div>
            )}
          </div>
        )}

        {/* WAREHOUSE CONTEXT */}
        {type === 'warehouse' && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#64748B]">INLAND LOGISTICS HUB</div>
              <div className="text-base font-bold text-[#0F172A]">{selectedAsset.name}</div>
              <div className="text-[11px] text-[#475569]">{selectedAsset.type}</div>
            </div>

            <div className="p-2.5 bg-[#F8F9FA] border border-[#CBD5E1] rounded space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Capacity Utilized:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.capacityUtilized}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Active Inbound:</span>
                <span className="font-bold text-[#0D3B66]">{selectedAsset.activeInbound} Rigs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Active Outbound:</span>
                <span className="font-bold text-[#059669]">{selectedAsset.activeOutbound} Rigs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Cold Chambers:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.coldStorageZones}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
