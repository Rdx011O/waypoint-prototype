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
  ExternalLink,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

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
    playIosChime('success');
    addToast({
      type: 'success',
      title: 'Fast-Track Pass Dispatched',
      message: `Priority terminal gate pass staged for ${shipmentId}.`
    });
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 ios-glass border-l border-black/[0.06] flex flex-col h-full z-20 shrink-0 shadow-2xl md:shadow-none animate-in fade-in slide-in-from-right-4 duration-300">
      {/* iOS Sheet Top Grabber Handle */}
      <div className="pt-2.5 pb-1 flex justify-center shrink-0">
        <div className="w-10 h-1.2 rounded-full bg-slate-300"></div>
      </div>

      {/* Header */}
      <div className="px-4 py-2.5 border-b border-black/[0.05] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-white shadow-2xs border border-black/[0.05]">
            {type === 'shipment' && <Package className="w-3.5 h-3.5 text-[#5856D6]" />}
            {type === 'port' && <Anchor className="w-3.5 h-3.5 text-[#FF3B30]" />}
            {type === 'vessel' && <Ship className="w-3.5 h-3.5 text-[#007AFF]" />}
            {type === 'truck' && <Truck className="w-3.5 h-3.5 text-[#34C759]" />}
            {type === 'warehouse' && <Building2 className="w-3.5 h-3.5 text-[#30B0C7]" />}
          </div>
          
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              ASSET INSPECTOR
            </span>
            <span className="text-xs font-extrabold text-slate-900 capitalize">
              {type} Details
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            playIosChime('tap');
            onClose();
          }}
          className="p-1.5 text-slate-400 hover:text-slate-700 bg-white/60 hover:bg-white rounded-full transition-colors cursor-pointer ios-btn border border-black/5"
          title="Close Inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs">
        {/* SHIPMENT CONTEXT */}
        {type === 'shipment' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white border border-black/[0.05] shadow-2xs">
              <span className="text-[9.5px] text-[#007AFF] font-bold uppercase tracking-wider">
                ACTIVE CARGO UNIT
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight mt-0.5">
                {selectedAsset.product || 'Consignment Package'}
              </h2>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                ID: <strong className="font-mono text-slate-800">{selectedAsset.id}</strong> • Container: <strong className="font-mono text-slate-800">{selectedAsset.containerId}</strong>
              </div>
            </div>

            {selectedAsset.hasException ? (
              <div className="p-3.5 bg-rose-50/90 border border-rose-200/80 rounded-2xl text-slate-800 space-y-1.5 shadow-2xs">
                <div className="font-extrabold flex items-center gap-1.5 text-xs text-[#FF3B30]">
                  <AlertTriangle className="w-4 h-4 text-[#FF3B30] shrink-0" />
                  <span>{selectedAsset.statusLabel}</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  {selectedAsset.exceptionReason}
                </p>
                <div className="text-[11px] text-[#FF3B30] font-bold">
                  Cascade Delay: {selectedAsset.delayHours}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50/90 border border-emerald-200/80 rounded-2xl text-emerald-950 flex items-center justify-between shadow-2xs">
                <span className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                  On Schedule
                </span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200">Normal Flow</span>
              </div>
            )}

            <div className="p-3.5 bg-white rounded-2xl border border-black/[0.05] space-y-2 shadow-2xs">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Consignment Profile</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Consignee:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[160px]">{selectedAsset.consignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Cargo Value:</span>
                  <span className="font-bold text-[#007AFF]">{selectedAsset.cargoValue || '₹4.85 Crore'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Customs Clearance:</span>
                  <span className="font-bold text-[#34C759]">{selectedAsset.customsStatus || 'Cleared'}</span>
                </div>
                {selectedAsset.currentTemp && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Reefer Core Temp:</span>
                    <span className={`font-bold font-mono ${selectedAsset.hasException ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                      {selectedAsset.currentTemp}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-white border border-black/[0.05] rounded-2xl shadow-2xs">
                <div className="text-[9.5px] text-slate-400 font-bold uppercase">PLANNED SLA</div>
                <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedAsset.originalEta}</div>
              </div>
              <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl shadow-2xs">
                <div className="text-[9.5px] text-[#007AFF] font-bold uppercase">DYNAMIC ETA</div>
                <div className={`font-bold text-xs mt-0.5 ${selectedAsset.hasException ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                  {selectedAsset.dynamicPredictedEta}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRequestPriority(selectedAsset.id)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs transition-all shadow-sm ios-btn cursor-pointer"
            >
              Request Yard Fast-Track ➔
            </button>

            <button
              onClick={() => {
                playIosChime('tap');
                if (onJumpToTab) onJumpToTab('shipments');
              }}
              className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-xs transition-colors ios-btn cursor-pointer shadow-2xs"
            >
              Open Full Shipment Tracker
            </button>
          </div>
        )}

        {/* PORT CONTEXT */}
        {type === 'port' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white border border-black/[0.05] shadow-2xs">
              <span className="text-[9.5px] text-rose-600 font-bold uppercase tracking-wider">Seaport Terminal</span>
              <h2 className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedAsset.name}</h2>
              <div className="text-[11px] text-slate-500 font-medium">{selectedAsset.code} • {selectedAsset.channelStatus}</div>
            </div>

            <div className="p-3.5 bg-rose-50/80 border border-rose-200/80 rounded-2xl shadow-2xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-[#FF3B30]">Port Congestion:</span>
                <span className="text-base font-extrabold text-[#FF3B30]">{selectedAsset.congestion}%</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2.5 pt-2 border-t border-rose-200/60 text-center text-xs">
                <div>
                  <div className="text-slate-500 text-[9.5px] font-semibold">+24H</div>
                  <div className="font-bold text-slate-800">{selectedAsset.forecast?.h24 || 71}%</div>
                </div>
                <div>
                  <div className="text-[#FF3B30] font-extrabold text-[9.5px]">+48H PEAK</div>
                  <div className="font-extrabold text-[#FF3B30]">{selectedAsset.forecast?.h48 || 81}%</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[9.5px] font-semibold">+72H</div>
                  <div className="font-bold text-slate-800">{selectedAsset.forecast?.h72 || 67}%</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-black/[0.05] space-y-2 shadow-2xs">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Network Cascades</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Ships Waiting:</span>
                  <span className="font-bold text-slate-900">{selectedAsset.waitingVessels || 7} Vessels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Avg Dwell Time:</span>
                  <span className="font-bold text-slate-900">{selectedAsset.expectedDwellHours || 16}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Trucks Staged:</span>
                  <span className="font-bold text-[#FF9500]">{selectedAsset.affectedTrucks || 26} Rigs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Reefers at Risk:</span>
                  <span className="font-bold text-[#FF3B30]">{selectedAsset.affectedColdChain || 3} Units</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playIosChime('alert');
                if (onTriggerImpactView) onTriggerImpactView();
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ios-btn cursor-pointer"
            >
              <span>Simulate Bottleneck Impact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* VESSEL CONTEXT */}
        {type === 'vessel' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white border border-black/[0.05] shadow-2xs">
              <span className="text-[9.5px] text-[#007AFF] font-bold uppercase tracking-wider">AIS Vessel Carrier</span>
              <h2 className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedAsset.name}</h2>
              <div className="text-[11px] text-slate-500 font-medium">{selectedAsset.imo} • {selectedAsset.type}</div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-black/[0.05] space-y-2 text-xs shadow-2xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Destination Seaport:</span>
                <span className="font-bold text-[#007AFF]">{selectedAsset.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">ETA at Pilot Station:</span>
                <span className="font-bold text-slate-900 font-mono">{selectedAsset.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Speed / Heading:</span>
                <span className="font-bold text-slate-900">{selectedAsset.speed} • {selectedAsset.heading}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Capacity:</span>
                <span className="font-bold text-slate-900">{selectedAsset.cargoTonnage}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playIosChime('tap');
                if (onJumpToTab) onJumpToTab('vessels');
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs transition-all shadow-sm ios-btn cursor-pointer"
            >
              View Full Vessel Timing Record ➔
            </button>
          </div>
        )}

        {/* TRUCK CONTEXT */}
        {type === 'truck' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white border border-black/[0.05] shadow-2xs">
              <span className="text-[9.5px] text-[#34C759] font-bold uppercase tracking-wider">Highway Transport Rig</span>
              <h2 className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedAsset.id}</h2>
              <div className="text-[11px] text-slate-500 font-medium">{selectedAsset.type}</div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-black/[0.05] space-y-2 text-xs shadow-2xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Status:</span>
                <span className="font-bold text-slate-900">{selectedAsset.statusLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Driver:</span>
                <span className="font-bold text-slate-900">{selectedAsset.driver} ({selectedAsset.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Location:</span>
                <span className="font-bold text-slate-900">{selectedAsset.currentLocation}</span>
              </div>
            </div>

            {selectedAsset.hasBackhaulMatch && (
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-emerald-950 text-xs space-y-1.5 shadow-2xs">
                <div className="font-extrabold text-[#34C759]">94% Backhaul Match Available</div>
                <div className="text-[11px] text-emerald-800 font-medium">612 KM deadhead eliminated • ₹42,000 revenue recovery</div>
                <button
                  onClick={() => {
                    playIosChime('success');
                    if (onJumpToTab) onJumpToTab('backhaul');
                  }}
                  className="mt-2 w-full py-2 bg-[#34C759] hover:bg-emerald-600 text-white rounded-full font-bold text-xs transition-all shadow-sm ios-btn cursor-pointer"
                >
                  Assign Backhaul Load ➔
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
