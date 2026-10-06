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
  Check
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
      title: 'PRIORITY YARD STAGING DISPATCHED',
      message: `Fast-track pass issued for Container ${activeShipment.containerId}. Port plug-in prioritized at Berth 04.`
    });
  };

  const handleDownloadManifest = (shipmentId) => {
    addToast({
      type: 'info',
      title: 'MANIFEST DOWNLOADED',
      message: `Exported official Customs Bill of Entry & Sensor Audit Log for ${shipmentId}.`
    });
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded shadow-xs p-3 sm:p-4 flex flex-col h-full overflow-y-auto font-mono text-xs">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Package className="w-5 h-5 text-[#0D3B66]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
              CARGO OWNER & IMPORTER CONSIGNMENT TRACKER
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1] rounded">
              MY SHIPMENTS (4)
            </span>
          </div>
          <p className="text-[#64748B] text-[11px] sm:text-xs mt-0.5">
            End-to-end container tracking, dynamic predictive ETA, and active exception surveillance
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Shipments (4)' },
            { id: 'EXCEPTIONS', label: 'Exceptions (2)', alert: true },
            { id: 'ON_SCHEDULE', label: 'On Schedule (2)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === tab.id
                  ? 'bg-[#0D3B66] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="my-3 sm:my-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
        {/* Left Column: Shipment List Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>MY ACTIVE CONSIGNMENTS ({filteredShipments.length})</span>
            <span className="text-[9.5px] text-[#0D3B66]">SELECT TO INSPECT</span>
          </div>

          <div className="space-y-2">
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
                  className={`p-3 sm:p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F8FAFC] border-[#0D3B66] ring-2 ring-[#0D3B66] shadow-xs'
                      : 'bg-white hover:bg-[#F8F9FA] border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#E2E8F0]">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{shp.id}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#F1F5F9] text-[#475569] rounded font-semibold">
                          {shp.containerId}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#475569] font-medium mt-0.5 truncate max-w-[200px]">
                        {shp.consignee}
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9.5px] sm:text-[10px] font-bold shrink-0 ${
                      isCritical ? 'bg-red-100 text-red-700 border border-red-200' :
                      isWarning ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {shp.statusLabel.split('(')[0]}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-[#334155] font-semibold line-clamp-2">
                    {shp.product}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-[10px] text-[#64748B]">
                    <div>
                      <span>DYNAMIC ETA: </span>
                      <span className={`font-bold ${shp.hasException ? 'text-red-600' : 'text-[#059669]'}`}>
                        {shp.dynamicPredictedEta}
                      </span>
                    </div>
                    <div className="text-right">
                      <span>DELAY: </span>
                      <span className={`font-bold ${shp.hasException ? 'text-red-600' : 'text-[#0F172A]'}`}>
                        {shp.delayHours}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Shipment Deep Detail & Multi-Modal Chain */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          {/* Main Inspection Card */}
          <div className="bg-[#F8F9FA] border border-[#CBD5E1] rounded-lg p-3.5 sm:p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase">CONTAINER TRACKING SPEC</span>
                <div className="text-sm sm:text-base font-bold text-[#0F172A] mt-0.5">{activeShipment.product}</div>
                <div className="text-[11px] text-[#475569] mt-0.5">
                  ID: <strong>{activeShipment.id}</strong> • Container: <strong>{activeShipment.containerId}</strong> ({activeShipment.containerType})
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] text-[#64748B]">CARGO VALUE</span>
                <div className="text-xs sm:text-sm font-bold text-[#0D3B66]">{activeShipment.cargoValue}</div>
              </div>
            </div>

            {/* Exception Banner if present */}
            {activeShipment.hasException && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-900 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-red-700">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>ACTIVE EXCEPTION: {activeShipment.statusLabel}</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-700">
                    CASCADE DELAY: {activeShipment.delayHours}
                  </span>
                </div>

                <div className="text-[11px] text-red-800 leading-relaxed">
                  {activeShipment.exceptionReason}
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => handleRequestMitigation(activeShipment.id)}
                    disabled={mitigationMap[activeShipment.id]}
                    className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all shadow-xs ${
                      mitigationMap[activeShipment.id]
                        ? 'bg-[#059669] text-white cursor-not-allowed'
                        : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
                    }`}
                  >
                    {mitigationMap[activeShipment.id] ? '✓ OPERATOR OVERRIDE DISPATCHED' : 'REQUEST PRIORITY YARD STAGING / FAST-TRACK ➔'}
                  </button>

                  <button
                    onClick={onJumpToColdChain}
                    className="text-[11px] font-bold text-[#0D3B66] hover:underline"
                  >
                    View IoT Sensor Curve ➔
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic ETA vs Original SLA */}
            <div className="grid grid-cols-3 gap-2 p-2.5 sm:p-3 bg-white border border-[#E2E8F0] rounded text-center">
              <div>
                <div className="text-[9.5px] sm:text-[10px] text-[#64748B]">ORIGINAL SLA ETA</div>
                <div className="font-bold text-[#0F172A] text-xs sm:text-sm mt-0.5">{activeShipment.originalEta}</div>
              </div>
              <div className="bg-[#F0F7FF] py-1 rounded border border-[#BFDBFE]">
                <div className="text-[9.5px] sm:text-[10px] text-[#1E40AF] font-bold">DYNAMIC PREDICTED ETA</div>
                <div className={`font-bold text-xs sm:text-sm mt-0.5 ${activeShipment.hasException ? 'text-red-700' : 'text-[#059669]'}`}>
                  {activeShipment.dynamicPredictedEta}
                </div>
              </div>
              <div>
                <div className="text-[9.5px] sm:text-[10px] text-[#64748B]">CUSTOMS FILING</div>
                <div className="font-bold text-[#059669] text-[10px] sm:text-xs mt-0.5">{activeShipment.customsStatus}</div>
              </div>
            </div>

            {/* Multi-Modal Chain of Custody Milestones */}
            <div className="p-3 bg-white border border-[#CBD5E1] rounded space-y-2">
              <div className="text-[11px] font-bold text-[#0F172A] uppercase flex flex-col sm:flex-row sm:items-center justify-between pb-1 border-b border-[#F1F5F9] gap-1">
                <span>SEA-TO-DOOR CHAIN OF CUSTODY</span>
                <span className="text-[10px] text-[#64748B]">CURRENT: {activeShipment.currentMilestone}</span>
              </div>

              <div className="space-y-2.5 relative pl-4 border-l-2 border-[#CBD5E1] ml-2 mt-3">
                {activeShipment.chainOfCustody.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                      step.done ? 'bg-[#059669]' : step.current ? 'bg-[#0D3B66] ring-2 ring-blue-300' : 'bg-[#94A3B8]'
                    }`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-0.5">
                      <span className={`font-bold ${step.current ? 'text-[#0D3B66]' : 'text-[#0F172A]'}`}>
                        {step.step}
                      </span>
                      <span className="text-[10px] text-[#64748B]">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => handleDownloadManifest(activeShipment.id)}
                className="px-3 py-1.5 bg-white hover:bg-[#F8F9FA] border border-[#CBD5E1] text-[#0F172A] rounded font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#64748B]" />
                <span>DOWNLOAD BILL OF ENTRY & AUDIT LOG</span>
              </button>

              <div className="text-[10px] text-[#64748B]">
                Doc: <strong>{activeShipment.customsDoc}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
