import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { PORTS, VESSELS, FLEET_TRUCKS, WAREHOUSES, ANCHORAGE_ZONES, CORRIDOR_POLYLINES, MAP_BASEMAPS } from '../data/mockData';
import { 
  Layers, 
  Eye, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Satellite, 
  Sun, 
  Moon, 
  Play, 
  Pause, 
  Crosshair,
  Ship,
  Navigation,
  Anchor,
  Filter,
  Truck,
  Building2,
  Package,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function MapView({ selectedAsset, onSelectAsset, highlightedCorridor, activeRole = 'all' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const layersRef = useRef({
    anchorage: null,
    routes: null,
    shippingTrunks: null,
    ports: null,
    vessels: null,
    trucks: null,
    warehouses: null
  });

  const [activeBasemap, setActiveBasemap] = useState('nautical_dark');
  const [isSimulating, setIsSimulating] = useState(true);
  const [simTick, setSimTick] = useState(0);
  const [cursorCoords, setCursorCoords] = useState({ lat: 17.6868, lng: 83.2185 });
  const [vesselTypeFilter, setVesselTypeFilter] = useState('ALL');
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState(false);
  const [activeLayerFilters, setActiveLayerFilters] = useState({
    ports: true,
    vessels: true,
    shippingTrunks: true,
    trucks: true,
    warehouses: true,
    routes: true,
    anchorage: true
  });

  // Real-time simulated AIS movements
  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setSimTick(t => (t + 1) % 1000);
    }, 2000);
    return () => clearInterval(timer);
  }, [isSimulating]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [15.2, 84.5],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      minZoom: 4,
      maxZoom: 17
    });

    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    });

    const basemapConfig = MAP_BASEMAPS[activeBasemap] || MAP_BASEMAPS.nautical_dark;
    const tileLayer = L.tileLayer(basemapConfig.url, {
      maxZoom: 18,
      subdomains: basemapConfig.subdomains
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // Trigger map invalidation on window resize for responsive canvas
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Basemap Tiles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const basemapConfig = MAP_BASEMAPS[activeBasemap] || MAP_BASEMAPS.nautical_dark;
    const newTileLayer = L.tileLayer(basemapConfig.url, {
      maxZoom: 18,
      subdomains: basemapConfig.subdomains
    }).addTo(map);

    currentTileLayerRef.current = newTileLayer;
  }, [activeBasemap]);

  // Render High-Density Ship Traffic & Corridor Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(layersRef.current).forEach((lg) => {
      if (lg) map.removeLayer(lg);
    });

    const isDark = activeBasemap === 'nautical_dark';

    // 1. Outer Anchorage Zones & Pilot Stations
    if (activeLayerFilters.anchorage) {
      const anchorageGroup = L.layerGroup();

      ANCHORAGE_ZONES.forEach(zone => {
        L.circle(zone.center, {
          radius: zone.radiusMeters,
          color: zone.status === 'SURGE_CONGESTION' ? '#EF4444' : '#0284C7',
          weight: 1.5,
          dashArray: '6, 6',
          fillColor: zone.status === 'SURGE_CONGESTION' ? '#EF4444' : '#0284C7',
          fillOpacity: isDark ? 0.12 : 0.08
        }).bindTooltip(`
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px;">
            <strong>${zone.name}</strong><br/>
            Depth: ${zone.depth}<br/>
            Anchorage Queue: <span style="color:#DC2626; font-weight:bold;">${zone.waitingVesselsCount} Vessels</span>
          </div>
        `, { sticky: true }).addTo(anchorageGroup);

        const pilotIcon = L.divIcon({
          className: 'pilot-marker',
          html: `
            <div style="
              background: ${isDark ? '#0284C7' : '#0D3B66'}; 
              color: white; 
              font-family: 'IBM Plex Mono', monospace;
              font-size: 8px; 
              padding: 1px 4px; 
              border-radius: 2px;
              border: 1px solid rgba(255,255,255,0.7);
              white-space: nowrap;
            ">
              ⚑ PILOT STATION
            </div>
          `,
          iconSize: [80, 16],
          iconAnchor: [40, 8]
        });

        L.marker([zone.pilotBoardingLat, zone.pilotBoardingLng], { icon: pilotIcon }).addTo(anchorageGroup);
      });

      anchorageGroup.addTo(map);
      layersRef.current.anchorage = anchorageGroup;
    }

    // 2. Global Shipping Trunks & Traffic Separation Schemes (TSS)
    if (activeLayerFilters.shippingTrunks) {
      const trunkGroup = L.layerGroup();

      // East-West Global Trunk Line
      L.polyline(CORRIDOR_POLYLINES.sea_trunk_malacca_srilanka, {
        color: isDark ? '#A78BFA' : '#7C3AED',
        weight: 3,
        dashArray: '8, 8',
        opacity: isDark ? 0.85 : 0.75
      }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'><strong>GLOBAL EAST-WEST TRUNK ROUTE</strong><br/>Malacca Strait ➔ Colombo ➔ Suez</div>", { sticky: true }).addTo(trunkGroup);

      // Singapore to Haldia Northern Route
      L.polyline(CORRIDOR_POLYLINES.sea_singapore_haldia, {
        color: isDark ? '#38BDF8' : '#0284C7',
        weight: 2,
        dashArray: '5, 8',
        opacity: isDark ? 0.75 : 0.65
      }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'>Singapore ➔ Sandheads / Haldia Port</div>", { sticky: true }).addTo(trunkGroup);

      // East Coast Coastal Feeder Trunk
      L.polyline(CORRIDOR_POLYLINES.sea_coastal_feeder_trunk, {
        color: isDark ? '#34D399' : '#059669',
        weight: 2,
        dashArray: '4, 6',
        opacity: isDark ? 0.8 : 0.7
      }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'>East Coast Coastal Feeder (Chennai-Vizag-Paradip)</div>", { sticky: true }).addTo(trunkGroup);

      // Andaman Sea Security Route
      L.polyline(CORRIDOR_POLYLINES.sea_andaman_passage, {
        color: isDark ? '#94A3B8' : '#64748B',
        weight: 1.5,
        dashArray: '3, 6',
        opacity: 0.6
      }).addTo(trunkGroup);

      trunkGroup.addTo(map);
      layersRef.current.shippingTrunks = trunkGroup;
    }

    // 3. Multi-Modal Corridors (Sea & Highway Lines)
    if (activeLayerFilters.routes) {
      const routeGroup = L.layerGroup();

      // Primary Sea Lane: Singapore -> Vizag
      L.polyline(CORRIDOR_POLYLINES.sea_singapore_vizag, {
        color: highlightedCorridor === 'CORRIDOR-VIZAG-HYD' || !highlightedCorridor ? (isDark ? '#38BDF8' : '#086788') : '#64748B',
        weight: highlightedCorridor === 'CORRIDOR-VIZAG-HYD' ? 3.5 : 2,
        dashArray: '6, 10',
        opacity: 0.9
      }).addTo(routeGroup);

      // Sea Lane: Colombo -> Chennai
      L.polyline(CORRIDOR_POLYLINES.sea_colombo_chennai, {
        color: isDark ? '#38BDF8' : '#086788',
        weight: 2,
        dashArray: '6, 10',
        opacity: 0.8
      }).addTo(routeGroup);

      // Sea Lane: Klang -> Paradip
      L.polyline(CORRIDOR_POLYLINES.sea_klang_paradip, {
        color: isDark ? '#38BDF8' : '#086788',
        weight: 2,
        dashArray: '6, 10',
        opacity: 0.8
      }).addTo(routeGroup);

      // Land Highways (NH-65, NH-44, NH-48, NH-53)
      L.polyline(CORRIDOR_POLYLINES.land_vizag_hyderabad, {
        color: highlightedCorridor === 'CORRIDOR-VIZAG-HYD' || !highlightedCorridor ? (isDark ? '#F59E0B' : '#0D3B66') : '#64748B',
        weight: highlightedCorridor === 'CORRIDOR-VIZAG-HYD' ? 4 : 2.5,
        opacity: 0.95
      }).addTo(routeGroup);

      L.polyline(CORRIDOR_POLYLINES.land_hyderabad_nagpur, {
        color: isDark ? '#10B981' : '#059669',
        weight: 3,
        dashArray: '4, 6',
        opacity: 0.9
      }).addTo(routeGroup);

      L.polyline(CORRIDOR_POLYLINES.land_chennai_bangalore, {
        color: isDark ? '#F59E0B' : '#0D3B66',
        weight: 2,
        opacity: 0.8
      }).addTo(routeGroup);

      L.polyline(CORRIDOR_POLYLINES.land_paradip_raipur, {
        color: isDark ? '#F59E0B' : '#0D3B66',
        weight: 2,
        opacity: 0.8
      }).addTo(routeGroup);

      routeGroup.addTo(map);
      layersRef.current.routes = routeGroup;
    }

    // 4. Ports with Congestion Indicators
    if (activeLayerFilters.ports) {
      const portGroup = L.layerGroup();

      PORTS.forEach(port => {
        const isSelected = selectedAsset && selectedAsset.id === port.id;
        const isHighCongestion = port.congestion > 60;
        const badgeColor = isHighCongestion ? '#EF4444' : isDark ? '#0284C7' : '#0D3B66';

        const customPortIcon = L.divIcon({
          className: 'realistic-port-marker',
          html: `
            <div style="
              background: ${isDark ? '#0F172A' : '#FFFFFF'};
              color: ${isDark ? '#F8FAFC' : '#0F172A'};
              padding: 3px 7px;
              border-radius: 4px;
              border: 1.5px solid ${badgeColor};
              box-shadow: 0 4px 12px rgba(0,0,0,${isDark ? '0.6' : '0.2'});
              font-family: 'IBM Plex Mono', monospace;
              display: flex;
              align-items: center;
              gap: 5px;
              white-space: nowrap;
              transform: ${isSelected ? 'scale(1.18)' : 'scale(1)'};
              transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            ">
              <span style="color: ${badgeColor}; font-weight: bold;">⚓</span>
              <div style="display: flex; flex-direction: column; line-height: 1;">
                <span style="font-size: 10px; font-weight: 700; letter-spacing: 0.5px;">${port.shortName.toUpperCase()}</span>
                <span style="font-size: 8px; color: ${isDark ? '#94A3B8' : '#64748B'};">${port.code} • ${port.waitingVessels} Vess</span>
              </div>
              <span style="
                background: ${badgeColor}; 
                color: #FFFFFF; 
                font-size: 9px; 
                font-weight: 700; 
                padding: 1px 4px; 
                border-radius: 2px;
                margin-left: 2px;
              ">
                ${port.congestion}%
              </span>
            </div>
          `,
          iconSize: [130, 28],
          iconAnchor: [65, 14]
        });

        const marker = L.marker([port.lat, port.lng], { icon: customPortIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...port, assetType: 'port' }));
        marker.addTo(portGroup);
      });

      portGroup.addTo(map);
      layersRef.current.ports = portGroup;
    }

    // 5. Dense Vessel Fleet AIS Markers
    if (activeLayerFilters.vessels) {
      const vesselGroup = L.layerGroup();

      const filteredVessels = VESSELS.filter(v => {
        if (vesselTypeFilter === 'ALL') return true;
        return v.category === vesselTypeFilter;
      });

      filteredVessels.forEach((vessel, vIdx) => {
        const isSelected = selectedAsset && selectedAsset.id === vessel.id;
        const isDelayed = vessel.status === 'delayed';

        // Animated position offset
        const latOffset = isSimulating ? Math.sin((simTick + vIdx * 35) * 0.05) * 0.008 : 0;
        const lngOffset = isSimulating ? Math.cos((simTick + vIdx * 35) * 0.05) * 0.008 : 0;
        const currentLat = vessel.lat + latOffset;
        const currentLng = vessel.lng + lngOffset;

        // Color coding by vessel category
        let color = '#0284C7';
        if (vessel.category === 'Tanker') color = '#E11D48';
        else if (vessel.category === 'Gas Carrier') color = '#8B5CF6';
        else if (vessel.category === 'Bulk Carrier') color = '#D97706';
        else if (vessel.category === 'Harbour Craft') color = '#059669';
        else if (vessel.category === 'Reefer') color = '#06B6D4';

        if (isDelayed) color = '#EF4444';

        const vesselIcon = L.divIcon({
          className: 'realistic-vessel-marker',
          html: `
            <div style="
              background: ${isDark ? '#0F172A' : '#FFFFFF'};
              color: ${isDark ? '#F8FAFC' : '#0F172A'};
              padding: 2.5px 6px;
              border-radius: 3px;
              border: 1.5px solid ${color};
              box-shadow: 0 4px 10px rgba(0,0,0,${isDark ? '0.6' : '0.2'});
              font-family: 'IBM Plex Mono', monospace;
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'};
              transition: transform 0.2s ease;
            ">
              <span style="font-size: 10px; transform: rotate(${vessel.heading}deg); display: inline-block; color: ${color};">▲</span>
              <div style="display: flex; flex-direction: column; line-height: 1;">
                <span style="font-size: 9px; font-weight: 700;">${vessel.name}</span>
                <span style="font-size: 7.5px; color: ${isDark ? '#94A3B8' : '#64748B'};">${vessel.speed} • ${vessel.category}</span>
              </div>
              ${isDelayed ? '<span style="background:#EF4444; color:#FFF; font-size:7px; font-weight:bold; padding:0 2px; border-radius:1px;">DELAY</span>' : ''}
            </div>
          `,
          iconSize: [140, 26],
          iconAnchor: [70, 13]
        });

        const marker = L.marker([currentLat, currentLng], { icon: vesselIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...vessel, assetType: 'vessel' }));

        marker.bindTooltip(`
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; line-height: 1.4;">
            <strong style="color:${color}; font-size:11px;">${vessel.name}</strong> (${vessel.imo})<br/>
            Type: ${vessel.type}<br/>
            Speed/Course: ${vessel.speed} • ${vessel.cog}<br/>
            Draught: ${vessel.draftMeters}m • LOA: ${vessel.lengthMeters}m<br/>
            Destination: <strong>${vessel.destination}</strong><br/>
            ETA: ${vessel.eta}<br/>
            Status: <span style="font-weight:bold;">${vessel.statusDetail || vessel.status}</span>
          </div>
        `, { sticky: true });

        marker.addTo(vesselGroup);
      });

      vesselGroup.addTo(map);
      layersRef.current.vessels = vesselGroup;
    }

    // 6. Trucks & Warehouses
    if (activeLayerFilters.trucks) {
      const truckGroup = L.layerGroup();
      FLEET_TRUCKS.forEach(truck => {
        const isSelected = selectedAsset && selectedAsset.id === truck.id;
        const isHold = truck.status === 'DELAYED_HOLD';
        const isEmpty = truck.status === 'AVAILABLE_EMPTY';
        const color = isHold ? '#EF4444' : isEmpty ? '#F59E0B' : '#10B981';

        const truckIcon = L.divIcon({
          className: 'realistic-truck-marker',
          html: `
            <div style="
              background: ${isDark ? '#0F172A' : '#FFFFFF'};
              color: ${isDark ? '#F8FAFC' : '#0F172A'};
              padding: 2px 5px;
              border-radius: 3px;
              border: 1.5px solid ${color};
              box-shadow: 0 3px 8px rgba(0,0,0,${isDark ? '0.5' : '0.15'});
              font-family: 'IBM Plex Mono', monospace;
              display: flex;
              align-items: center;
              gap: 3px;
              white-space: nowrap;
              transform: ${isSelected ? 'scale(1.22)' : 'scale(1)'};
            ">
              <span style="font-size: 10px;">🚛</span>
              <span style="font-size: 9px; font-weight: 700;">${truck.id}</span>
              ${isHold ? '<span style="background:#EF4444; color:#FFF; font-size:7px; font-weight:bold; padding:0 2px; border-radius:1px;">HOLD</span>' : ''}
              ${isEmpty ? '<span style="background:#F59E0B; color:#000; font-size:7px; font-weight:bold; padding:0 2px; border-radius:1px;">EMPTY</span>' : ''}
            </div>
          `,
          iconSize: [90, 22],
          iconAnchor: [45, 11]
        });

        const marker = L.marker([truck.lat, truck.lng], { icon: truckIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...truck, assetType: 'truck' }));
        marker.addTo(truckGroup);
      });
      truckGroup.addTo(map);
      layersRef.current.trucks = truckGroup;
    }

    if (activeLayerFilters.warehouses) {
      const whGroup = L.layerGroup();
      WAREHOUSES.forEach(wh => {
        const isSelected = selectedAsset && selectedAsset.id === wh.id;
        const whIcon = L.divIcon({
          className: 'realistic-wh-marker',
          html: `
            <div style="
              background: ${isDark ? '#0F172A' : '#FFFFFF'};
              color: ${isDark ? '#F8FAFC' : '#0F172A'};
              padding: 2px 6px;
              border-radius: 3px;
              border: 1.5px solid #10B981;
              box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              font-family: 'IBM Plex Mono', monospace;
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            ">
              <span style="color:#10B981; font-weight:bold;">🏢</span>
              <span style="font-size: 9px; font-weight: 700;">${wh.city.toUpperCase()} WH</span>
            </div>
          `,
          iconSize: [105, 22],
          iconAnchor: [52, 11]
        });

        const marker = L.marker([wh.lat, wh.lng], { icon: whIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...wh, assetType: 'warehouse' }));
        marker.addTo(whGroup);
      });
      whGroup.addTo(map);
      layersRef.current.warehouses = whGroup;
    }

  }, [activeLayerFilters, activeBasemap, selectedAsset, highlightedCorridor, simTick, isSimulating, vesselTypeFilter]);

  const toggleLayer = (key) => {
    setActiveLayerFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([15.2, 84.5], 6);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#0F172A] overflow-hidden select-none font-mono">
      {/* Leaflet map canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Left: GIS Basemap Mode Switcher */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-[400] flex items-center gap-1 bg-[#0F172A]/90 backdrop-blur-md p-1 rounded border border-[#334155] shadow-lg text-[10px] sm:text-xs">
        <button
          onClick={() => setActiveBasemap('nautical_dark')}
          className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded transition-colors ${
            activeBasemap === 'nautical_dark' 
              ? 'bg-[#0284C7] text-white font-bold' 
              : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
          }`}
          title="Nautical Dark (AIS Radar Mode)"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden md:inline">NAUTICAL RADAR</span>
        </button>

        <button
          onClick={() => setActiveBasemap('satellite_hybrid')}
          className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded transition-colors ${
            activeBasemap === 'satellite_hybrid' 
              ? 'bg-[#0284C7] text-white font-bold' 
              : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
          }`}
          title="Satellite Coastal Hybrid Imagery"
        >
          <Satellite className="w-3.5 h-3.5" />
          <span className="hidden md:inline">SATELLITE</span>
        </button>

        <button
          onClick={() => setActiveBasemap('carto_light')}
          className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded transition-colors ${
            activeBasemap === 'carto_light' 
              ? 'bg-[#0284C7] text-white font-bold' 
              : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
          }`}
          title="Industrial Paper Chart Style"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden md:inline">CHARTS</span>
        </button>
      </div>

      {/* Top Center: Vessel Type Quick Filter Chips (Desktop) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] hidden lg:flex items-center gap-1 bg-[#0F172A]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#334155] shadow-lg text-[10px] text-white">
        <span className="text-[#94A3B8] font-bold mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3 text-[#38BDF8]" /> AIS FLEET:
        </span>
        {[
          { id: 'ALL', label: 'All Ships (10)' },
          { id: 'Container', label: 'Container (4)' },
          { id: 'Tanker', label: 'Tankers (1)' },
          { id: 'Gas Carrier', label: 'LNG/Gas (1)' },
          { id: 'Bulk Carrier', label: 'Bulk (1)' },
          { id: 'Reefer', label: 'Reefer (1)' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setVesselTypeFilter(cat.id)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              vesselTypeFilter === cat.id
                ? 'bg-[#0284C7] text-white font-bold'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Top Right: Layer Visibility & Simulation Controls */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-[400] flex flex-col gap-1.5 sm:gap-2">
        {/* Live AIS Telemetry Stream Control */}
        <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded p-1.5 sm:p-2 text-xs text-[#F8FAFC] shadow-lg flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-[#10B981] animate-ping' : 'bg-[#64748B]'}`}></span>
            <span className="text-[10px] sm:text-[11px] font-bold hidden sm:inline">
              {isSimulating ? 'LIVE AIS SIM' : 'SIM PAUSED'}
            </span>
          </div>

          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="p-1 rounded hover:bg-[#1E293B] text-[#38BDF8] transition-colors"
            title={isSimulating ? "Pause live simulation" : "Resume live simulation"}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mobile Layers Toggle Button */}
        <button
          onClick={() => setIsLayersPanelOpen(!isLayersPanelOpen)}
          className="md:hidden bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded p-1.5 text-[#38BDF8] flex items-center justify-center self-end shadow-md"
          title="Toggle Layer Filters"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Layer Filters Box (Desktop or Expanded on Mobile) */}
        <div className={`bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded shadow-lg p-2 sm:p-2.5 text-xs text-[#F8FAFC] ${
          isLayersPanelOpen ? 'block' : 'hidden md:block'
        }`}>
          <div className="text-[10px] text-[#94A3B8] font-bold uppercase mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#38BDF8]" />
              CORRIDOR GIS LAYERS
            </span>
          </div>

          <div className="space-y-1">
            {[
              { key: 'vessels', label: 'AIS Ship Traffic (10)', color: 'bg-[#38BDF8]' },
              { key: 'shippingTrunks', label: 'Shipping Trunks (TSS)', color: 'bg-[#A78BFA]' },
              { key: 'ports', label: 'Seaports & Berths (4)', color: 'bg-[#EF4444]' },
              { key: 'anchorage', label: 'Anchorage Zones (3)', color: 'bg-[#0284C7]' },
              { key: 'routes', label: 'Corridor Corridors', color: 'bg-[#F59E0B]' },
              { key: 'trucks', label: 'Highway Fleet (5)', color: 'bg-[#10B981]' }
            ].map(item => (
              <label 
                key={item.key} 
                className="flex items-center gap-2 cursor-pointer hover:bg-[#1E293B] px-1 py-0.5 rounded text-[10px] sm:text-[11px] text-[#E2E8F0]"
              >
                <input
                  type="checkbox"
                  checked={activeLayerFilters[item.key]}
                  onChange={() => toggleLayer(item.key)}
                  className="rounded bg-[#1E293B] border-[#475569] text-[#0284C7] focus:ring-0 w-3 h-3 cursor-pointer"
                />
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="truncate max-w-[130px]">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded shadow-lg flex flex-col divide-y divide-[#334155] overflow-hidden self-end">
          <button
            onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomIn()}
            className="p-1.5 sm:p-2 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomOut()}
            className="p-1.5 sm:p-2 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 sm:p-2 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
            title="Recenter East Coast Corridor"
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Center: Live Cursor Coordinate Radar Readout */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-[400] bg-[#0F172A]/90 backdrop-blur-md border border-[#334155] rounded px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] text-[#E2E8F0] shadow-lg flex items-center gap-2 sm:gap-3 max-w-[95%] truncate">
        <Crosshair className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
        <span>
          LAT: <strong className="text-white">{cursorCoords.lat.toFixed(4)}°N</strong> | LON: <strong className="text-white">{cursorCoords.lng.toFixed(4)}°E</strong>
        </span>
        <span className="hidden md:inline text-[#64748B]">|</span>
        <span className="hidden md:inline text-[#94A3B8]">
          BAY OF BENGAL TSS ACTIVE • 10 AIS TARGETS
        </span>
      </div>
    </div>
  );
}
