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
  Info
} from 'lucide-react';
import { useToast } from './ToastNotification';

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
    setMitigationMap(prev => ({ ...prev, [shipmentId]: true }));
    addToast({
      type: 'success',
      title: 'Fast-Track Staging Issued',
      message: `Container ${activeShipment.containerId} marked for expedited berth crane discharge and cold plug-in.`
    });
  };

  const handleDownloadDocs = (shipmentId) => {
    addToast({
      type: 'info',
      title: 'Documentation Downloaded',
      message: `Exported Customs Bill of Entry and IoT Chain of Custody record for ${shipmentId}.`
    });
  };

  return (
    <div className="bg-slate-50/60 p-4 sm:p-6 flex flex-col h-full overflow-y-auto space-y-4">
      {/* Top Header & Overview Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Shipments & Consignment Tracking
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time visibility from port of loading to destination warehouse door
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 self-start md:self-auto shadow-2xs">
          {[
            { id: 'ALL', label: 'All Shipments (4)' },
            { id: 'EXCEPTIONS', label: 'Exceptions & Delays (2)', badge: '2' },
            { id: 'ON_SCHEDULE', label: 'On Schedule (2)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Active Consignments</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">4 Containers</div>
          <div className="text-[11px] text-slate-500 mt-1">100% Customs Cleared</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">On-Time Performance</div>
          <div className="text-lg font-bold text-emerald-600 mt-0.5">50% On Schedule</div>
          <div className="text-[11px] text-slate-500 mt-1">2 shipments meeting SLA</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Action Required</div>
          <div className="text-lg font-bold text-rose-600 mt-0.5">2 Cascade Delays</div>
          <div className="text-[11px] text-rose-600 mt-1 font-medium">Caused by port queue</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Total Cargo Value</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">₹15.20 Crore</div>
          <div className="text-[11px] text-blue-600 mt-1 font-medium">Insured & IoT Monitored</div>
        </div>
      </div>

      {/* Main Grid: Shipments List (Left) & Detailed Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
        {/* Left Column: Shipment List Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
            <span>YOUR CONSIGNMENTS ({filteredShipments.length})</span>
            <span className="text-slate-400 font-normal text-[11px]">Click to inspect</span>
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
                    setSelectedShipmentId(shp.id);
                    if (onSelectAsset) onSelectAsset({ ...shp, assetType: 'shipment' });
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{shp.id}</span>
                        <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono font-medium">
                          {shp.containerId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">
                        {shp.consignee}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      isCritical ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      isWarning ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {shp.hasException ? 'Delay Alert' : 'On Schedule'}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-semibold text-slate-800 line-clamp-1">
                    {shp.product}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">ESTIMATED ARRIVAL</div>
                      <div className={`font-semibold mt-0.5 ${shp.hasException ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {shp.dynamicPredictedEta}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-medium">SCHEDULE VARIANCE</div>
                      <div className={`font-semibold mt-0.5 ${shp.hasException ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
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
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            {/* Title & Core Details Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
                  Consignment Detail
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {activeShipment.product}
                </h2>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                  <span>Shipment: <strong className="text-slate-800">{activeShipment.id}</strong></span>
                  <span>•</span>
                  <span>Container: <strong className="text-slate-800">{activeShipment.containerId}</strong></span>
                  <span>•</span>
                  <span>Type: <strong className="text-slate-800">{activeShipment.containerType}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Cargo Value</span>
                <div className="text-sm font-bold text-slate-900">{activeShipment.cargoValue}</div>
              </div>
            </div>

            {/* Exception Explanation Card (When delayed) */}
            {activeShipment.hasException && (
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl text-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="font-bold flex items-center gap-2 text-xs text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Active Delay: {activeShipment.statusLabel}</span>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                    Delay: {activeShipment.delayHours}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeShipment.exceptionReason}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleRequestMitigation(activeShipment.id)}
                    disabled={mitigationMap[activeShipment.id]}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      mitigationMap[activeShipment.id]
                        ? 'bg-emerald-700 text-white cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    {mitigationMap[activeShipment.id] 
                      ? '✓ Fast-Track Pass Dispatched to Terminal' 
                      : 'Request Priority Yard Staging & Fast-Track ➔'}
                  </button>

                  <button
                    onClick={onJumpToColdChain}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <span>View IoT Temperature Curve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ETA vs Planned SLA Comparison Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">PLANNED SLA ETA</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{activeShipment.originalEta}</div>
              </div>

              <div className="p-2 bg-blue-50/60 rounded-lg border border-blue-200">
                <div className="text-[10px] text-blue-700 font-bold">DYNAMIC PREDICTED ETA</div>
                <div className={`text-xs sm:text-sm font-bold mt-1 ${activeShipment.hasException ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {activeShipment.dynamicPredictedEta}
                </div>
              </div>

              <div className="p-2 bg-white rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">CUSTOMS STATUS</div>
                <div className="text-xs font-bold text-emerald-700 mt-1">{activeShipment.customsStatus}</div>
              </div>
            </div>

            {/* Visual Multi-Modal Milestone Tracker */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Sea-to-Door Chain of Custody
                </span>
                <span className="text-xs text-slate-500">
                  Current Step: <strong className="text-slate-800">{activeShipment.currentMilestone}</strong>
                </span>
              </div>

              <div className="space-y-3 relative pl-5 border-l-2 border-slate-200 ml-2 mt-3">
                {activeShipment.chainOfCustody.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      step.done ? 'bg-emerald-500 shadow-xs' : step.current ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                    }`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-0.5">
                      <span className={`font-semibold ${step.current ? 'text-blue-900 font-bold' : step.done ? 'text-slate-800' : 'text-slate-500'}`}>
                        {step.step}
                      </span>
                      <span className="text-[11px] text-slate-500">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleDownloadDocs(activeShipment.id)}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Bill of Entry & Sensor Logs</span>
              </button>

              <div className="text-xs text-slate-500">
                Customs Doc: <strong className="font-mono text-slate-800">{activeShipment.customsDoc}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
