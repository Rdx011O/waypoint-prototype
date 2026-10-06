import React, { useState } from 'react';
import { X, Ship, Anchor, Truck, Building2, Repeat, ThermometerSnowflake, Activity, HelpCircle, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export function GuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('how-it-works');

  if (!isOpen) return null;

  const glossaryTerms = [
    {
      term: 'Shared Route Graph',
      def: 'A single connected timeline combining all 4 legs of freight (Sea ➔ Port ➔ Highway ➔ Warehouse). When any delay occurs upstream, downstream steps automatically recalibrate.'
    },
    {
      term: 'AIS (Automatic Identification System)',
      def: 'Live satellite and coastal radio transponders reporting ship coordinates, nautical speed (knots), and heading.'
    },
    {
      term: 'Port Dwell Time',
      def: 'The hours a ship spends waiting at anchorage or a container spends in the port terminal yard before being loaded onto trucks.'
    },
    {
      term: 'Deadhead Mileage',
      def: 'Miles driven by empty trucks returning after delivery without cargo. Waypoint matches these empty return legs with new loads to eliminate waste.'
    },
    {
      term: 'Backhaul Matching',
      def: 'Algorithmically pairing empty returning trucks with shippers needing freight transport, generating extra revenue and reducing carbon emissions.'
    },
    {
      term: 'Reefer Telemetry',
      def: 'Continuous IoT temperature sensors inside refrigerated containers safeguarding pharma vaccines and frozen produce.'
    },
    {
      term: 'Cascade Impact',
      def: 'The ripple effect of how a single 16-hour port delay cascades across 7 ships, 26 highway trucks, 11 backhauls, and 3 cold-chain consignments.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                How Waypoint Works
              </h2>
              <p className="text-xs text-slate-500">
                Corridor intelligence for freight — sea to warehouse door
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center border-b border-slate-100 bg-slate-50/50 px-5 pt-2 gap-3 text-xs">
          {[
            { id: 'how-it-works', label: '1. The Core Idea' },
            { id: 'personas', label: '2. Who Uses It?' },
            { id: 'glossary', label: '3. Freight Glossary' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {activeTab === 'how-it-works' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-slate-800">
                <div className="font-bold text-sm text-blue-900 mb-1">
                  Why Waypoint is Different
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Traditional logistics software manages Shipping, Seaports, Trucking, and Warehouses as 4 disconnected silos. When a container vessel is delayed at sea, nobody notifies the inland trucking dispatch or the destination cold storage warehouse.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed mt-2 font-medium">
                  <strong>Waypoint connects the entire multi-modal chain on a single shared route graph</strong> so that any delay upstream automatically recalculates downstream schedules, avoids empty truck runs, and protects cold-chain perishables.
                </p>
              </div>

              {/* 4 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <Ship className="w-4 h-4 text-blue-600" />
                    <span>1. Sea Transit</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Live tracking of container ships via AIS telemetry, arrival ETAs, and speed over ground.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <Anchor className="w-4 h-4 text-rose-600" />
                    <span>2. Seaport & Berths</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Predictive queue dwell forecasting (e.g. Vizag peak 81%) and crane discharge prioritization.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>3. Highway Haulage</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Road dispatch on key corridors with instant backhaul matching for empty returning trucks.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>4. Warehouse Door</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Automatic receiving dock reservations and pre-conditioned cold storage chambers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personas' && (
            <div className="space-y-3">
              <p className="text-slate-600 text-xs">
                Waypoint is customized for every stakeholder in the freight corridor:
              </p>

              <div className="space-y-2.5">
                {[
                  { title: 'Cargo Owners & Importers', desc: 'Track your shipments, view dynamic delivery ETAs, customs documents, and issue one-click priority yard staging passes.', icon: Package, color: 'text-blue-600 bg-blue-50' },
                  { title: 'Port Operations Managers', desc: 'Monitor outer anchorage queues, berth capacity (B-01 to B-06), and 72-hour congestion forecast curves.', icon: Anchor, color: 'text-rose-600 bg-rose-50' },
                  { title: 'Fleet & Haulage Dispatchers', desc: 'Manage road rigs, eliminate costly empty deadhead runs, and capture revenue through instant load matches.', icon: Truck, color: 'text-emerald-600 bg-emerald-50' },
                  { title: 'Cold-Chain Surveillance Teams', desc: 'Surveil live temperature curves for sensitive vaccines and biologics, with auxiliary cooling overrides.', icon: ThermometerSnowflake, color: 'text-teal-600 bg-teal-50' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{item.title}</div>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'glossary' && (
            <div className="space-y-2.5">
              {glossaryTerms.map((gt, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 text-xs">{gt.term}</div>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{gt.def}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Waypoint Prototype • East Coast Freight Corridor</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
