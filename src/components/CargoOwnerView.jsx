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
      title: 'Staging Priority Issued',
      message: `Container ${activeShipment.containerId} expedited for priority berth crane discharge.`
    });
  };

  const handleDownloadDocs = (shipmentId) => {
    playIosChime('tap');
    addToast({
      type: 'info',
      title: 'Documentation Downloaded',
      message: `Exported Customs Bill of Entry and IoT Chain of Custody for ${shipmentId}.`
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto space-y-4 pr-1">
      {/* Top Header & Overview Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Consignments & Tracking
          </h1>
          <p className="text-xs text-[#86868B] mt-0.5">
            Sea-to-warehouse door tracking with predictive variance mitigation
          </p>
        </div>

        {/* iOS Segmented Filter Control */}
        <div className="apple-segmented p-1 self-start sm:self-auto flex items-center overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Units (4)' },
            { id: 'EXCEPTIONS', label: 'Delays (2)' },
            { id: 'ON_SCHEDULE', label: 'On Schedule (2)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                playIosChime('tap');
                setFilterStatus(tab.id);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Active Units</div>
          <div className="text-xl font-bold text-[#1D1D1F] mt-1">4 Containers</div>
          <div className="text-[11px] text-[#34C759] font-medium mt-1">100% Customs Cleared</div>
        </div>

        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">On-Time SLA</div>
          <div className="text-xl font-bold text-[#34C759] mt-1">50% On Schedule</div>
          <div className="text-[11px] text-[#86868B] mt-1">2 shipments meeting SLA</div>
        </div>

        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Action Needed</div>
          <div className="text-xl font-bold text-[#FF3B30] mt-1">2 Delays</div>
          <div className="text-[11px] text-[#FF3B30] font-medium mt-1">Vizag Berth 04 Bottleneck</div>
        </div>

        <div className="apple-card p-4">
          <div className="text-[11px] font-medium text-[#86868B]">Insured Cargo Value</div>
          <div className="text-xl font-bold text-[#0071E3] mt-1">₹15.20 Cr</div>
          <div className="text-[11px] text-[#86868B] mt-1">Active IoT Thermal Shield</div>
        </div>
      </div>

      {/* Main Grid: Shipments List (Left) & Detailed Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Shipment List Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868B] px-1">
            <span className="uppercase tracking-wider text-[10px]">Your Consignments ({filteredShipments.length})</span>
            <span className="text-[11px]">Select to inspect</span>
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
                  className={`apple-card p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0071E3] shadow-md ring-2 ring-[#0071E3]/20'
                      : 'hover:border-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-black/[0.06]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1D1D1F] text-sm">{shp.id}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-black/[0.04] text-[#1D1D1F] rounded-md font-mono font-medium">
                          {shp.containerId}
                        </span>
                      </div>
                      <div className="text-xs text-[#86868B] mt-0.5">
                        {shp.consignee}
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isCritical ? 'bg-[#FF3B30]/10 text-[#FF3B30]' :
                      isWarning ? 'bg-[#FF9500]/10 text-[#FF9500]' :
                      'bg-[#34C759]/10 text-[#34C759]'
                    }`}>
                      {shp.hasException ? 'Delay Alert' : 'On Schedule'}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-semibold text-[#1D1D1F] truncate">
                    {shp.product}
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-black/[0.06] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[9.5px] text-[#86868B] font-semibold uppercase">Estimated Arrival</div>
                      <div className={`font-bold mt-0.5 ${shp.hasException ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                        {shp.dynamicPredictedEta}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[9.5px] text-[#86868B] font-semibold uppercase">Variance</div>
                      <div className={`font-bold mt-0.5 ${shp.hasException ? 'text-[#FF3B30]' : 'text-[#1D1D1F]'}`}>
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
        <div className="lg:col-span-7 space-y-4">
          <div className="apple-card p-5 space-y-4">
            {/* Title & Core Details Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-2">
              <div>
                <span className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-wider">
                  Consignment Detail
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] mt-0.5">
                  {activeShipment.product}
                </h2>
                <div className="text-xs text-[#86868B] mt-1 flex flex-wrap items-center gap-2">
                  <span>Shipment: <strong className="text-[#1D1D1F] font-mono">{activeShipment.id}</strong></span>
                  <span>•</span>
                  <span>Container: <strong className="text-[#1D1D1F] font-mono">{activeShipment.containerId}</strong></span>
                  <span>•</span>
                  <span>Type: <strong className="text-[#1D1D1F]">{activeShipment.containerType}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 bg-black/[0.02] p-2.5 rounded-2xl border border-black/[0.04]">
                <span className="text-[9.5px] text-[#86868B] uppercase font-semibold">Cargo Value</span>
                <div className="text-sm font-bold text-[#1D1D1F]">{activeShipment.cargoValue}</div>
              </div>
            </div>

            {/* Exception Explanation Card (When delayed) */}
            {activeShipment.hasException && (
              <div className="p-4 bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-2xl text-[#1D1D1F] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-[#FF3B30]">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Active Delay: {activeShipment.statusLabel}</span>
                  </div>
                  <span className="text-xs font-bold text-[#FF3B30] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                    Delay: {activeShipment.delayHours}
                  </span>
                </div>

                <p className="text-xs text-[#86868B] leading-relaxed">
                  {activeShipment.exceptionReason}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleRequestMitigation(activeShipment.id)}
                    disabled={mitigationMap[activeShipment.id]}
                    className={`apple-btn-primary text-xs py-1.5 px-3.5 cursor-pointer ${
                      mitigationMap[activeShipment.id]
                        ? 'bg-[#34C759] text-white'
                        : 'bg-[#FF3B30] text-white'
                    }`}
                  >
                    {mitigationMap[activeShipment.id] 
                      ? '✓ Priority Berth Pass Dispatched' 
                      : 'Request Priority Yard Staging ➔'}
                  </button>

                  <button
                    onClick={() => {
                      playIosChime('tap');
                      if (onJumpToColdChain) onJumpToColdChain();
                    }}
                    className="text-xs font-semibold text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Temperature Curve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ETA vs Planned SLA Comparison Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 bg-black/[0.02] rounded-2xl border border-black/[0.04] text-center">
              <div className="p-2.5 bg-white rounded-xl border border-black/[0.04]">
                <div className="text-[9.5px] text-[#86868B] font-semibold uppercase">Planned SLA</div>
                <div className="text-xs sm:text-sm font-bold text-[#1D1D1F] mt-0.5">{activeShipment.originalEta}</div>
              </div>

              <div className="p-2.5 bg-[#0071E3]/5 rounded-xl border border-[#0071E3]/20">
                <div className="text-[9.5px] text-[#0071E3] font-semibold uppercase">Dynamic Predicted ETA</div>
                <div className={`text-xs sm:text-sm font-bold mt-0.5 ${activeShipment.hasException ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                  {activeShipment.dynamicPredictedEta}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-black/[0.04]">
                <div className="text-[9.5px] text-[#86868B] font-semibold uppercase">Customs Status</div>
                <div className="text-xs font-bold text-[#34C759] mt-0.5">{activeShipment.customsStatus}</div>
              </div>
            </div>

            {/* Visual Multi-Modal Milestone Tracker */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.06]">
                <span className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                  Sea-to-Door Chain of Custody
                </span>
                <span className="text-[11px] text-[#86868B]">
                  Current: <strong className="text-[#1D1D1F] font-semibold">{activeShipment.currentMilestone}</strong>
                </span>
              </div>

              <div className="space-y-3 relative pl-5 border-l-2 border-black/[0.08] ml-2 mt-3">
                {activeShipment.chainOfCustody.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      step.done ? 'bg-[#34C759] shadow-xs' : step.current ? 'bg-[#0071E3] ring-4 ring-[#0071E3]/20' : 'bg-black/20'
                    }`} />

                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${step.current ? 'text-[#0071E3] font-bold' : step.done ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                        {step.step}
                      </span>
                      <span className="text-[10.5px] text-[#86868B] font-mono">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleDownloadDocs(activeShipment.id)}
                className="apple-btn-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#86868B]" />
                <span>Export Bill of Entry & IoT Records</span>
              </button>

              <div className="text-xs text-[#86868B]">
                Doc: <strong className="font-mono text-[#1D1D1F]">{activeShipment.customsDoc}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


