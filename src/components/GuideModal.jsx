import React, { useState } from 'react';
import { X, Compass, Ship, Anchor, Truck, Building2, Repeat, ThermometerSnowflake, Activity, HelpCircle, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export function GuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('how-it-works');

  if (!isOpen) return null;

  const glossaryTerms = [
    {
      term: 'Shared Route Graph',
      def: 'A unified digital network representing the full physical journey (Sea ➔ Port ➔ Land ➔ Warehouse) so a delay at any node automatically cascades and updates all downstream schedules.'
    },
    {
      term: 'AIS (Automatic Identification System)',
      def: 'Real-time satellite and coastal radio transponder data reporting ship position, speed over ground (SOG), and course over ground (COG).'
    },
    {
      term: 'Dwell Time',
      def: 'The total duration cargo or a vessel spends waiting at anchorage, port berths, or gate plazas before processing.'
    },
    {
      term: 'Deadhead Mileage',
      def: 'Miles driven by empty trucks returning after delivery without cargo. Waypoint matches these empty return legs with new loads to recover revenue.'
    },
    {
      term: 'Backhaul Matching',
      def: 'Algorithmically pairing empty returning rigs with regional shippers to eliminate empty runs and reduce diesel emissions.'
    },
    {
      term: 'Reefer Telemetry',
      def: 'Continuous temperature and compressor sensors inside refrigerated containers safeguarding pharma and frozen perishable shipments.'
    },
    {
      term: 'Cascade Impact',
      def: 'A simulation demonstrating how a single 16-hour port delay affects 7 ships, 26 trucks, 11 backhauls, and 3 cold-chain consignments.'
    }
  ];

  const roleGuides = [
    {
      role: 'Cargo Owner / Importer',
      icon: Ship,
      desc: 'Track individual containers, monitor live temperature curves, compare original SLA vs dynamic predicted ETA, and request fast-track yard staging.'
    },
    {
      role: 'Port Operations',
      icon: Anchor,
      desc: 'Surveil outer anchorage queues, monitor berth occupancy (B-01 through B-06), and examine 72-hour congestion forecasts to allocate pilot windows.'
    },
    {
      role: 'Fleet & Haulage Dispatch',
      icon: Truck,
      desc: 'Monitor highway rigs, avoid empty deadhead miles by accepting high-match backhaul loads, and track driver status.'
    },
    {
      role: 'Cold-Chain Surveillance',
      icon: ThermometerSnowflake,
      desc: 'Protect temperature-sensitive biologics and vaccines with real-time IoT alerts, compressor duty cycles, and auxiliary cooling boost overrides.'
    },
    {
      role: 'Control Tower (All Corridors)',
      icon: Layers,
      desc: 'Unified panoramic view across all East Coast corridor layers with interactive GIS nautical radar map and network impact simulation.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-mono">
      <div className="bg-white border border-[#CBD5E1] rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#0D3B66] text-[#38BDF8] border border-[#38BDF8]/40 flex items-center justify-center font-bold text-sm">
              WP
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                <span>WAYPOINT CORRIDOR GUIDE</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/30 rounded">
                  USER MANUAL
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Understand how Waypoint unifies Sea, Port, Land, and Warehouse nodes
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center border-b border-[#E2E8F0] bg-[#F8F9FA] px-4 pt-2 gap-2 text-xs">
          {[
            { id: 'how-it-works', label: '1. How Waypoint Works' },
            { id: 'personas', label: '2. Role Personas' },
            { id: 'glossary', label: '3. Freight Glossary' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 border-b-2 font-bold transition-all ${
                activeTab === tab.id
                  ? 'border-[#0D3B66] text-[#0D3B66] bg-white rounded-t'
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {activeTab === 'how-it-works' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded text-[#1E40AF]">
                <div className="font-bold text-sm mb-1 text-[#0D3B66]">
                  The Core Breakthrough: The Shared Route Graph
                </div>
                <div className="text-[11px] leading-relaxed text-[#334155]">
                  Conventional supply chains operate in isolated silos — shipping lines don't know truck schedules, and warehouses only find out about delays when goods fail to arrive. <strong>WAYPOINT connects all 4 physical tiers on a single live graph</strong> so when an event happens at sea, the entire corridor automatically adapts.
                </div>
              </div>

              {/* Step Sequence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
                  <div className="flex items-center gap-2 text-[#0D3B66] font-bold mb-1">
                    <Ship className="w-4 h-4 text-[#0284C7]" />
                    <span>1. SEA (Bay of Bengal AIS)</span>
                  </div>
                  <p className="text-[#64748B] text-[11px]">
                    Continuous tracking of container vessels, nautical speeds, and outer anchorage arrival times.
                  </p>
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
                  <div className="flex items-center gap-2 text-[#0D3B66] font-bold mb-1">
                    <Anchor className="w-4 h-4 text-[#EF4444]" />
                    <span>2. PORT (Harbour & Berths)</span>
                  </div>
                  <p className="text-[#64748B] text-[11px]">
                    Predictive queue dwell modeling (e.g. Vizag peak 81% at +48h) and berth crane allocation.
                  </p>
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
                  <div className="flex items-center gap-2 text-[#0D3B66] font-bold mb-1">
                    <Truck className="w-4 h-4 text-[#F59E0B]" />
                    <span>3. LAND (Corridor Trucking)</span>
                  </div>
                  <p className="text-[#64748B] text-[11px]">
                    Highway dispatch (NH-65/NH-44), gate staging queues, and instant empty backhaul load matching.
                  </p>
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded">
                  <div className="flex items-center gap-2 text-[#0D3B66] font-bold mb-1">
                    <Building2 className="w-4 h-4 text-[#10B981]" />
                    <span>4. WAREHOUSE (Receiving Door)</span>
                  </div>
                  <p className="text-[#64748B] text-[11px]">
                    Pre-conditioning cold storage chambers and synchronizing dock doors for arrival.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personas' && (
            <div className="space-y-3">
              <div className="text-[#64748B] text-[11px]">
                Click the <strong>Role Switcher</strong> in the top header or navigation bar anytime to filter data specifically for each role:
              </div>

              <div className="space-y-2.5">
                {roleGuides.map((rg, idx) => {
                  const Icon = rg.icon;
                  return (
                    <div key={idx} className="p-3 bg-[#F8F9FA] border border-[#CBD5E1] rounded flex items-start gap-3">
                      <div className="p-2 bg-white rounded border border-[#E2E8F0] shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#0D3B66]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A] text-xs">{rg.role}</div>
                        <div className="text-[#475569] text-[11px] mt-0.5 leading-relaxed">{rg.desc}</div>
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
                <div key={idx} className="p-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded">
                  <div className="font-bold text-[#0D3B66] text-xs">{gt.term}</div>
                  <div className="text-[#475569] text-[11px] mt-0.5 leading-relaxed">{gt.def}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F8F9FA] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Waypoint Prototype v2.4 • East Coast Corridor</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0D3B66] hover:bg-[#0A2E50] text-white rounded font-bold text-xs transition-colors"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
