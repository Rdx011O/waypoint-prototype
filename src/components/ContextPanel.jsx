import React from 'react';
import { 
  X, 
  Anchor, 
  Ship, 
  Truck, 
  Building2, 
  AlertTriangle, 
  Repeat, 
  Package, 
  ArrowRight, 
  ExternalLink, 
  ShieldAlert,
  ThermometerSnowflake,
  FileText,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useToast } from './ToastNotification';

export function ContextPanel({ selectedAsset, onClose, onTriggerImpactView, onJumpToTab }) {
  const { addToast } = useToast();

  if (!selectedAsset) return null;

  const type = selectedAsset.assetType || (
    selectedAsset.containerId || selectedAsset.product ? 'shipment' :
    selectedAsset.imo ? 'vessel' : 
    selectedAsset.congestion !== undefined ? 'port' : 
    selectedAsset.capacityTons ? 'truck' : 
    selectedAsset.coldStorageZones ? 'warehouse' : 
    'generic'
  );

  const handleRequestPriority = (shipmentId) => {
    addToast({
      type: 'success',
      title: 'FAST-TRACK DISPATCHED',
      message: `Priority terminal gate pass & reefer plug-in staged for ${shipmentId}.`
    });
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-l border-[#CBD5E1] flex flex-col h-full z-20 shrink-0 shadow-lg md:shadow-none font-mono">
      {/* Drawer Header */}
      <div className="p-3 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {type === 'shipment' && <Package className="w-4 h-4 text-[#0284C7]" />}
          {type === 'port' && <Anchor className="w-4 h-4 text-[#DC2626]" />}
          {type === 'vessel' && <Ship className="w-4 h-4 text-[#086788]" />}
          {type === 'truck' && <Truck className="w-4 h-4 text-[#D97706]" />}
          {type === 'warehouse' && <Building2 className="w-4 h-4 text-[#059669]" />}
          
          <span className="text-[11px] font-bold text-[#0F172A] uppercase">
            INSPECTOR • {type}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded transition-colors"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Body Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
        {/* SHIPMENT CONTEXT */}
        {type === 'shipment' && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#64748B] uppercase">CARGO CONSIGNMENT</div>
              <div className="text-base font-bold text-[#0F172A] leading-tight mt-0.5">
                {selectedAsset.product || 'Consignment Package'}
              </div>
              <div className="text-[11px] text-[#475569] mt-1">
                ID: <strong>{selectedAsset.id}</strong> • Container: <strong>{selectedAsset.containerId}</strong>
              </div>
            </div>

            {/* Status / Exception Pill */}
            {selectedAsset.hasException ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-xs text-red-700">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{selectedAsset.statusLabel || 'ACTIVE EXCEPTION'}</span>
                </div>
                <div className="text-[11px] text-red-800 leading-normal">
                  {selectedAsset.exceptionReason || 'Cascade delay due to corridor congestion.'}
                </div>
                <div className="text-[10px] text-red-700 font-bold">
                  CASCADE DELAY: {selectedAsset.delayHours || '+13.0h'}
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ON SCHEDULE
                </span>
                <span className="text-[10px] font-bold text-emerald-700">NORMAL FLOW</span>
              </div>
            )}

            {/* Telemetry & Route Details */}
            <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded space-y-2">
              <div className="text-[10px] font-bold text-[#0D3B66] uppercase">CONSIGNMENT PROFILE:</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Consignee:</span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[170px]">{selectedAsset.consignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Cargo Value:</span>
                  <span className="font-bold text-[#0D3B66]">{selectedAsset.cargoValue || '₹4.85 Crore'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Current Milestone:</span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[160px]">{selectedAsset.currentMilestone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Customs Filing:</span>
                  <span className="font-bold text-[#059669]">{selectedAsset.customsStatus || 'CLEARED'}</span>
                </div>
                {selectedAsset.currentTemp && (
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Reefer Core Temp:</span>
                    <span className={`font-bold ${selectedAsset.hasException ? 'text-red-600' : 'text-[#059669]'}`}>
                      {selectedAsset.currentTemp}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ETA Comparison */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-white border border-[#CBD5E1] rounded">
                <div className="text-[9.5px] text-[#64748B]">ORIGINAL SLA</div>
                <div className="font-bold text-[#0F172A] text-xs mt-0.5">{selectedAsset.originalEta}</div>
              </div>
              <div className="p-2 bg-[#F0F7FF] border border-[#BFDBFE] rounded">
                <div className="text-[9.5px] text-[#1E40AF] font-bold">DYNAMIC ETA</div>
                <div className={`font-bold text-xs mt-0.5 ${selectedAsset.hasException ? 'text-red-700' : 'text-[#059669]'}`}>
                  {selectedAsset.dynamicPredictedEta}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleRequestPriority(selectedAsset.id)}
                className="w-full py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs transition-colors shadow-xs"
              >
                REQUEST FAST-TRACK YARD STAGING ➔
              </button>

              <button
                onClick={() => onJumpToTab && onJumpToTab('shipments')}
                className="w-full py-2 bg-white hover:bg-[#F8F9FA] border border-[#CBD5E1] text-[#0F172A] rounded font-bold text-xs transition-colors"
              >
                OPEN FULL CARGO OWNER DASHBOARD
              </button>
            </div>
          </div>
        )}

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
              <div className="space-y-1.5 text-[11px]">
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
              <span>VIEW BOTTLENECK IMPACT CASCADE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onJumpToTab && onJumpToTab('ports')}
              className="w-full py-2 bg-white hover:bg-[#F8F9FA] border border-[#CBD5E1] text-[#0F172A] rounded font-bold text-xs transition-colors"
            >
              OPEN PORT BERTH INTELLIGENCE ➔
            </button>
          </div>
        )}

        {/* VESSEL CONTEXT */}
        {type === 'vessel' && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#64748B]">AIS VESSEL CARRIER</div>
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
                <span className="text-[#64748B]">Draught / LOA:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.draftMeters || 14.5}m / {selectedAsset.lengthMeters || 366}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Cargo Tonnage:</span>
                <span className="font-bold text-[#0F172A]">{selectedAsset.cargoTonnage}</span>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900">
              <div className="font-bold">BERTH QUEUE PREDICTION:</div>
              <div className="mt-0.5">{selectedAsset.predictedBerth || 'Berth 02 Queue (+14.5h delay)'}</div>
            </div>

            <button
              onClick={() => onJumpToTab && onJumpToTab('vessels')}
              className="w-full py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs transition-colors shadow-xs"
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

            <button
              onClick={() => onJumpToTab && onJumpToTab('fleet')}
              className="w-full py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs transition-colors"
            >
              OPEN FLEET DISPATCH BOARD ➔
            </button>
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

            <button
              onClick={() => onJumpToTab && onJumpToTab('graph')}
              className="w-full py-2 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs transition-colors"
            >
              VIEW CORRIDOR ROUTE GRAPH ➔
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
