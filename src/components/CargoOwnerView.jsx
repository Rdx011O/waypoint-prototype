import React, { useState } from 'react';
import { CARGO_OWNER_SHIPMENTS } from '../data/mockData';
import { 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Ship, 
  Truck, 
  Building2, 
  FileText, 
  ThermometerSnowflake, 
  ShieldCheck, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Download,
  Filter,
  Check,
  Calendar,
  MapPin,
  TrendingUp,
  Info,
  Zap
} from 'lucide-react';
import { useToast } from './ToastNotification';
import { playIosChime } from './DynamicIslandHabitBar';

export function CargoOwnerView({ onSelectAsset, onJumpToColdChain }) {
  const [selectedShipmentId, setSelectedShipmentId] = useState('SHP-8821');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [mitigationMap, setMitigationMap] = useState({});
  const { addToast } = useToast();

  const filteredShipments = CARGO_OWNER_SHIPMENTS.filter(s => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'EXCEPTIONS') return s.hasException;
    if (filterStatus === 'ON_SCHEDULE') return !s.hasException;
    return true;
  });

  const activeShipment = CARGO_OWNER_SHIPMENTS.find(s => s.id === selectedShipmentId) || CARGO_OWNER_SHIPMENTS[0];

  const handleRequestMitigation = (shipmentId) => {
    playIosChime('success');
    setMitigationMap(prev => ({ ...prev, [shipmentId]: true }));
    addToast({
      type: 'success',
      title: 'Fast-Track Staging Issued',
      message: `Container ${activeShipment.containerId} marked for expedited berth crane discharge and cold plug-in.`
    });
  };

  const handleDownloadDocs = (shipmentId) => {
    playIosChime('tap');
    addToast({
      type: 'info',
      title: 'Documentation Downloaded',
      message: `Exported Customs Bill of Entry and IoT Chain of Custody record for ${shipmentId}.`
    });
  };

  return (
    <div className="bg-transparent p-3 sm:p-5 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Top Header & Overview Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5856D6] shadow-2xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Shipments & Consignment Tracking
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Live sea-to-warehouse door tracking with predictive delay prevention
              </p>
            </div>
          </div>
        </div>

        {/* iOS Segmented Filter Control */}
        <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-full border border-black/5 self-start md:self-auto shadow-2xs">
          {[
            { id: 'ALL', label: 'All Units (4)' },
            { id: 'EXCEPTIONS', label: 'Delays (2)', alert: true },
            { id: 'ON_SCHEDULE', label: 'On Schedule (2)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                playIosChime('tap');
                setFilterStatus(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ios-btn ${
                filterStatus === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white border border-black/[0.05] rounded-3xl shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Units</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">4 Containers</div>
          <div className="text-[11px] text-[#34C759] font-bold mt-1">100% Customs Cleared</div>
        </div>

        <div className="p-4 bg-white border border-black/[0.05] rounded-3xl shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">On-Time SLA</div>
          <div className="text-xl font-extrabold text-[#34C759] mt-1">50% On Schedule</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">2 shipments meeting SLA</div>
        </div>

        <div className="p-4 bg-white border border-black/[0.05] rounded-3xl shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action Needed</div>
          <div className="text-xl font-extrabold text-[#FF3B30] mt-1">2 Delays</div>
          <div className="text-[11px] text-[#FF3B30] font-bold mt-1">Vizag Berth 04 Bottleneck</div>
        </div>

        <div className="p-4 bg-white border border-black/[0.05] rounded-3xl shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Insured Cargo Value</div>
          <div className="text-xl font-extrabold text-[#007AFF] mt-1">₹15.20 Cr</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Active IoT Thermal Shield</div>
        </div>
      </div>

      {/* Main Grid: Shipments List (Left) & Detailed Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
        {/* Left Column: Shipment List Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span className="uppercase tracking-wider text-[11px] text-slate-400">YOUR CONSIGNMENTS ({filteredShipments.length})</span>
            <span className="text-slate-400 font-medium text-[11px]">Tap to inspect</span>
          </div>

          <div className="space-y-2.5">
            {filteredShipments.map(shp => {
              const isSelected = selectedShipmentId === shp.id;
              const isCritical = shp.status === 'EXCEPTION_CRITICAL';
              const isWarning = shp.status === 'EXCEPTION_WARNING';

              return (
                <div
                  key={shp.id}
                  onClick={() => {
                    playIosChime('tap');
                    setSelectedShipmentId(shp.id);
                    if (onSelectAsset) onSelectAsset({ ...shp, assetType: 'shipment' });
                  }}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer ios-btn ${
                    isSelected
                      ? 'bg-white border-[#007AFF] shadow-md ring-2 ring-[#007AFF]/20'
                      : 'bg-white/80 hover:bg-white border-black/[0.05] shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-black/[0.05]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm tracking-tight">{shp.id}</span>
                        <span className="text-[10.5px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-mono font-bold">
                          {shp.containerId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-semibold mt-0.5">
                        {shp.consignee}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[9.5px] font-extrabold ${
                      isCritical ? 'bg-[#FF3B30]/15 text-[#FF3B30]' :
                      isWarning ? 'bg-[#FF9500]/15 text-[#FF9500]' :
                      'bg-[#34C759]/15 text-[#34C759]'
                    }`}>
                      {shp.hasException ? 'Delay Alert' : 'On Schedule'}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-bold text-slate-800 line-clamp-1">
                    {shp.product}
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-black/[0.05] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[9.5px] text-slate-400 font-bold uppercase">ESTIMATED ARRIVAL</div>
                      <div className={`font-extrabold mt-0.5 ${shp.hasException ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                        {shp.dynamicPredictedEta}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[9.5px] text-slate-400 font-bold uppercase">SCHEDULE VARIANCE</div>
                      <div className={`font-extrabold mt-0.5 ${shp.hasException ? 'text-[#FF3B30]' : 'text-slate-700'}`}>
                        {shp.delayHours}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Shipment Inspection Card */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="bg-white border border-black/[0.05] rounded-3xl p-5 shadow-xs space-y-4">
            {/* Title & Core Details Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/[0.05] gap-2">
              <div>
                <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider">
                  CONSIGNMENT DETAIL
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
                  {activeShipment.product}
                </h2>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2 font-medium">
                  <span>Shipment: <strong className="text-slate-800 font-mono">{activeShipment.id}</strong></span>
                  <span>•</span>
                  <span>Container: <strong className="text-slate-800 font-mono">{activeShipment.containerId}</strong></span>
                  <span>•</span>
                  <span>Type: <strong className="text-slate-800">{activeShipment.containerType}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 bg-slate-50 p-2.5 rounded-2xl border border-black/[0.05]">
                <span className="text-[9.5px] text-slate-400 uppercase font-bold">Cargo Value</span>
                <div className="text-sm font-extrabold text-slate-900">{activeShipment.cargoValue}</div>
              </div>
            </div>

            {/* Exception Explanation Card (When delayed) */}
            {activeShipment.hasException && (
              <div className="p-4 bg-rose-50/80 border border-rose-200/80 rounded-2xl text-slate-800 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold flex items-center gap-2 text-xs text-[#FF3B30]">
                    <AlertTriangle className="w-4 h-4 text-[#FF3B30] shrink-0" />
                    <span>Active Delay: {activeShipment.statusLabel}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF3B30] bg-white px-2.5 py-0.5 rounded-full border border-rose-200">
                    Delay: {activeShipment.delayHours}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeShipment.exceptionReason}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleRequestMitigation(activeShipment.id)}
                    disabled={mitigationMap[activeShipment.id]}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ios-btn ${
                      mitigationMap[activeShipment.id]
                        ? 'bg-emerald-600 text-white cursor-not-allowed'
                        : 'bg-[#FF3B30] hover:bg-rose-700 text-white'
                    }`}
                  >
                    {mitigationMap[activeShipment.id] 
                      ? '✓ Fast-Track Pass Dispatched to Terminal' 
                      : 'Request Yard Staging & Fast-Track ➔'}
                  </button>

                  <button
                    onClick={() => {
                      playIosChime('tap');
                      onJumpToColdChain();
                    }}
                    className="text-xs font-bold text-[#007AFF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View IoT Temperature Curve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ETA vs Planned SLA Comparison Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 bg-slate-50/80 rounded-2xl border border-black/[0.05] text-center">
              <div className="p-2.5 bg-white rounded-xl border border-black/[0.05]">
                <div className="text-[9.5px] text-slate-400 font-bold uppercase">PLANNED SLA</div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5">{activeShipment.originalEta}</div>
              </div>

              <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200/80">
                <div className="text-[9.5px] text-[#007AFF] font-bold uppercase">DYNAMIC PREDICTED ETA</div>
                <div className={`text-xs sm:text-sm font-extrabold mt-0.5 ${activeShipment.hasException ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                  {activeShipment.dynamicPredictedEta}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-black/[0.05]">
                <div className="text-[9.5px] text-slate-400 font-bold uppercase">CUSTOMS STATUS</div>
                <div className="text-xs font-extrabold text-[#34C759] mt-0.5">{activeShipment.customsStatus}</div>
              </div>
            </div>

            {/* Visual Multi-Modal Milestone Tracker */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.05]">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Sea-to-Door Chain of Custody
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Current Step: <strong className="text-slate-800 font-bold">{activeShipment.currentMilestone}</strong>
                </span>
              </div>

              <div className="space-y-3 relative pl-5 border-l-2 border-slate-200 ml-2 mt-3">
                {activeShipment.chainOfCustody.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      step.done ? 'bg-[#34C759] shadow-xs' : step.current ? 'bg-[#007AFF] ring-4 ring-blue-100' : 'bg-slate-300'
                    }`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-0.5">
                      <span className={`font-bold ${step.current ? 'text-[#007AFF]' : step.done ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.step}
                      </span>
                      <span className="text-[10.5px] text-slate-500 font-mono">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleDownloadDocs(activeShipment.id)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ios-btn shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Bill of Entry & Sensor Logs</span>
              </button>

              <div className="text-xs text-slate-500">
                Customs Doc: <strong className="font-mono text-slate-800 font-bold">{activeShipment.customsDoc}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

