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
  CheckCircle2,
  ThermometerSnowflake,
  ExternalLink
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
      title: 'Fast-Track Pass Dispatched',
      message: `Priority terminal gate pass staged for ${shipmentId}.`
    });
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-l border-slate-200 flex flex-col h-full z-20 shrink-0 shadow-lg md:shadow-none">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {type === 'shipment' && <Package className="w-4 h-4 text-blue-600" />}
          {type === 'port' && <Anchor className="w-4 h-4 text-rose-600" />}
          {type === 'vessel' && <Ship className="w-4 h-4 text-sky-600" />}
          {type === 'truck' && <Truck className="w-4 h-4 text-emerald-600" />}
          {type === 'warehouse' && <Building2 className="w-4 h-4 text-teal-600" />}
          
          <span className="text-xs font-bold text-slate-900 uppercase">
            Inspector: {type}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Close Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
        {/* SHIPMENT CONTEXT */}
        {type === 'shipment' && (
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Cargo Consignment</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight mt-0.5">
                {selectedAsset.product || 'Consignment Package'}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                ID: <strong>{selectedAsset.id}</strong> • Container: <strong>{selectedAsset.containerId}</strong>
              </div>
            </div>

            {selectedAsset.hasException ? (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-slate-800 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-xs text-rose-700">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{selectedAsset.statusLabel}</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {selectedAsset.exceptionReason}
                </p>
                <div className="text-[11px] text-rose-700 font-bold">
                  Cascade Delay: {selectedAsset.delayHours}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  On Schedule
                </span>
                <span className="text-[10px] font-bold text-emerald-700">Normal Flow</span>
              </div>
            )}

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Consignment Profile</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Consignee:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[160px]">{selectedAsset.consignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cargo Value:</span>
                  <span className="font-bold text-blue-700">{selectedAsset.cargoValue || '₹4.85 Crore'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customs Clearance:</span>
                  <span className="font-bold text-emerald-700">{selectedAsset.customsStatus || 'Cleared'}</span>
                </div>
                {selectedAsset.currentTemp && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reefer Core Temp:</span>
                    <span className={`font-bold ${selectedAsset.hasException ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {selectedAsset.currentTemp}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                <div className="text-[10px] text-slate-400 font-medium">PLANNED SLA</div>
                <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedAsset.originalEta}</div>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="text-[10px] text-blue-700 font-bold">DYNAMIC ETA</div>
                <div className={`font-bold text-xs mt-0.5 ${selectedAsset.hasException ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {selectedAsset.dynamicPredictedEta}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRequestPriority(selectedAsset.id)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Request Priority Yard Fast-Track ➔
            </button>

            <button
              onClick={() => onJumpToTab && onJumpToTab('shipments')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              Open Full Shipment Tracker
            </button>
          </div>
        )}

        {/* PORT CONTEXT */}
        {type === 'port' && (
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Seaport Terminal</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{selectedAsset.name}</h2>
              <div className="text-xs text-slate-500">{selectedAsset.code} • {selectedAsset.channelStatus}</div>
            </div>

            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-rose-800">Current Congestion:</span>
                <span className="text-base font-bold text-rose-700">{selectedAsset.congestion}%</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2.5 pt-2 border-t border-rose-100 text-center text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">+24H</div>
                  <div className="font-bold text-slate-800">{selectedAsset.forecast?.h24 || 71}%</div>
                </div>
                <div>
                  <div className="text-rose-700 font-bold text-[10px]">+48H PEAK</div>
                  <div className="font-bold text-rose-700">{selectedAsset.forecast?.h48 || 81}%</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">+72H</div>
                  <div className="font-bold text-slate-800">{selectedAsset.forecast?.h72 || 67}%</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Impact on Network</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ships Waiting:</span>
                  <span className="font-bold text-slate-900">{selectedAsset.waitingVessels || 7}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Avg Dwell Time:</span>
                  <span className="font-bold text-slate-900">{selectedAsset.expectedDwellHours || 16}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trucks Staged:</span>
                  <span className="font-bold text-amber-600">{selectedAsset.affectedTrucks || 26}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reefers at Risk:</span>
                  <span className="font-bold text-rose-600">{selectedAsset.affectedColdChain || 3}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onTriggerImpactView) onTriggerImpactView();
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span>Simulate Bottleneck Impact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* VESSEL CONTEXT */}
        {type === 'vessel' && (
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">AIS Container Carrier</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{selectedAsset.name}</h2>
              <div className="text-xs text-slate-500">{selectedAsset.imo} • {selectedAsset.type}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination Seaport:</span>
                <span className="font-bold text-blue-700">{selectedAsset.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ETA at Pilot Station:</span>
                <span className="font-bold text-slate-900">{selectedAsset.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Speed / Heading:</span>
                <span className="font-bold text-slate-900">{selectedAsset.speed} • {selectedAsset.heading}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capacity:</span>
                <span className="font-bold text-slate-900">{selectedAsset.cargoTonnage}</span>
              </div>
            </div>

            <button
              onClick={() => onJumpToTab && onJumpToTab('vessels')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              View Full Vessel Timing Record ➔
            </button>
          </div>
        )}

        {/* TRUCK CONTEXT */}
        {type === 'truck' && (
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Highway Transport Rig</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{selectedAsset.id}</h2>
              <div className="text-xs text-slate-500">{selectedAsset.type}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-slate-900">{selectedAsset.statusLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Driver:</span>
                <span className="font-bold text-slate-900">{selectedAsset.driver} ({selectedAsset.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Location:</span>
                <span className="font-bold text-slate-900">{selectedAsset.currentLocation}</span>
              </div>
            </div>

            {selectedAsset.hasBackhaulMatch && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs space-y-1.5">
                <div className="font-bold">94% Backhaul Match Available</div>
                <div className="text-[11px] text-emerald-800">612 KM deadhead eliminated • ₹42,000 revenue recovery</div>
                <button
                  onClick={() => onJumpToTab && onJumpToTab('backhaul')}
                  className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Assign Backhaul Freight ➔
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
