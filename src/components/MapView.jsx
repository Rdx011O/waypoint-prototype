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
  ChevronUp,
  CloudRain,
  Wind,
  Waves,
  Clock,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { playIosChime } from './DynamicIslandHabitBar';

export function MapView({ selectedAsset, onSelectAsset, highlightedCorridor, activeReroute, activeRole = 'all' }) {
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
    warehouses: null,
    weather: null
  });

  const [activeBasemap, setActiveBasemap] = useState('nautical_dark');
  const [isSimulating, setIsSimulating] = useState(true);
  const [simTick, setSimTick] = useState(0);
  const [timeOffsetHours, setTimeOffsetHours] = useState(0); // -24 to +72
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({ lat: 17.6868, lng: 83.2185 });
  const [vesselTypeFilter, setVesselTypeFilter] = useState('ALL');
  const [activeLayerFilters, setActiveLayerFilters] = useState({
    ports: true,
    vessels: true,
    shippingTrunks: true,
    trucks: true,
    warehouses: true,
    routes: true,
    anchorage: true,
    weather: true
  });

  // Real-time simulated AIS movements
  useEffect(() => {
    if (!isSimulating && !isTimelinePlaying) return;
    const timer = setInterval(() => {
      setSimTick(t => (t + 1) % 1000);
      if (isTimelinePlaying) {
        setTimeOffsetHours(prev => (prev < 72 ? prev + 1 : -24));
      }
    }, isTimelinePlaying ? 600 : 2000);
    return () => clearInterval(timer);
  }, [isSimulating, isTimelinePlaying]);

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

    // 0. Weather & Monsoon Sea State Overlay
    if (activeLayerFilters.weather) {
      const weatherGroup = L.layerGroup();

      // Cyclonic low-pressure depression zone in Central Bay of Bengal
      L.circle([16.4, 86.8], {
        radius: 140000,
        color: '#F59E0B',
        weight: 1.5,
        dashArray: '4, 8',
        fillColor: '#F59E0B',
        fillOpacity: isDark ? 0.08 : 0.05
      }).bindTooltip(`
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px;">
          <strong style="color: #D97706;">⛈️ CYCLONIC DEPRESSION BOB-04</strong><br/>
          Sustained Wind: 32 Knots (Beaufort 7)<br/>
          Wave Swell: <span style="color:#DC2626; font-weight:bold;">3.8m Rough</span><br/>
          Corridor Impact: Minor vessel SOG drag (-1.2 kn)
        </div>
      `, { sticky: true }).addTo(weatherGroup);

      // Monsoon Swell Vector Marker
      const weatherIcon = L.divIcon({
        className: 'weather-indicator-marker',
        html: `
          <div style="
            background: ${isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)'};
            color: ${isDark ? '#38BDF8' : '#0284C7'};
            border: 1px solid #38BDF8;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 9px;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            white-space: nowrap;
          ">
            <span>🌊 Swell: 3.4m</span>
            <span style="color:#86868B;">•</span>
            <span>💨 28 kn SW</span>
          </div>
        `,
        iconSize: [130, 24],
        iconAnchor: [65, 12]
      });

      L.marker([16.1, 85.5], { icon: weatherIcon }).addTo(weatherGroup);

      weatherGroup.addTo(map);
      layersRef.current.weather = weatherGroup;
    }

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

      L.polyline(CORRIDOR_POLYLINES.sea_trunk_malacca_srilanka, {
        color: isDark ? '#A78BFA' : '#7C3AED',
        weight: 3,
        dashArray: '8, 8',
        opacity: isDark ? 0.85 : 0.75
      }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'><strong>GLOBAL EAST-WEST TRUNK ROUTE</strong><br/>Malacca Strait ➔ Colombo ➔ Suez</div>", { sticky: true }).addTo(trunkGroup);

      L.polyline(CORRIDOR_POLYLINES.sea_singapore_haldia, {
        color: isDark ? '#38BDF8' : '#0284C7',
        weight: 2,
        dashArray: '5, 8',
        opacity: isDark ? 0.75 : 0.65
      }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'>Singapore ➔ Sandheads / Haldia Port</div>", { sticky: true }).addTo(trunkGroup);

      L.polyline(CORRIDOR_POLYLINES.sea_coastal_feeder_trunk, {
        color: isDark ? '#34D399' : '#059669',
        weight: 2,
        dashArray: '4, 6',
        opacity: isDark ? 0.8 : 0.7
      }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'>East Coast Coastal Feeder (Chennai-Vizag-Paradip)</div>", { sticky: true }).addTo(trunkGroup);

      trunkGroup.addTo(map);
      layersRef.current.shippingTrunks = trunkGroup;
    }

    // 3. Multi-Modal Corridors
    if (activeLayerFilters.routes) {
      const routeGroup = L.layerGroup();

            const isKpctRerouteActive = activeReroute === 'KPCT' || highlightedCorridor === 'CORRIDOR-KPCT-HYD';

      // Singapore to Vizag Sea Trunk
      L.polyline(CORRIDOR_POLYLINES.sea_singapore_vizag, {
        color: isKpctRerouteActive ? (isDark ? '#475569' : '#94A3B8') : (isDark ? '#38BDF8' : '#086788'),
        weight: isKpctRerouteActive ? 2 : 3.5,
        dashArray: isKpctRerouteActive ? '4, 8' : '6, 10',
        opacity: isKpctRerouteActive ? 0.45 : 0.9
      }).addTo(routeGroup);

      // Vizag to Hyderabad Land Trunk
      L.polyline(CORRIDOR_POLYLINES.land_vizag_hyderabad, {
        color: isKpctRerouteActive ? (isDark ? '#475569' : '#94A3B8') : (isDark ? '#F59E0B' : '#0D3B66'),
        weight: isKpctRerouteActive ? 2 : 4,
        opacity: isKpctRerouteActive ? 0.45 : 0.95
      }).addTo(routeGroup);

      // KPCT Sea Diversion Trunk (Dynamic)
      if (CORRIDOR_POLYLINES.sea_singapore_kpct) {
        L.polyline(CORRIDOR_POLYLINES.sea_singapore_kpct, {
          color: isKpctRerouteActive ? '#10B981' : (isDark ? '#334155' : '#CBD5E1'),
          weight: isKpctRerouteActive ? 4 : 1.5,
          dashArray: isKpctRerouteActive ? '5, 8' : '3, 6',
          opacity: isKpctRerouteActive ? 1 : 0.35
        }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'>⚡ KPCT Sea Diversion Leg (+145 NM)</div>", { sticky: true }).addTo(routeGroup);
      }

      // KPCT Land Fast-Track Corridor (Dynamic)
      if (CORRIDOR_POLYLINES.land_kpct_hyderabad) {
        L.polyline(CORRIDOR_POLYLINES.land_kpct_hyderabad, {
          color: isKpctRerouteActive ? '#10B981' : (isDark ? '#334155' : '#CBD5E1'),
          weight: isKpctRerouteActive ? 4.5 : 1.5,
          opacity: isKpctRerouteActive ? 1 : 0.35
        }).bindTooltip("<div style='font-family:IBM Plex Mono; font-size:10px;'>⚡ KPCT ➔ Hyderabad NH-16/NH-765 (-170 KM Express)</div>", { sticky: true }).addTo(routeGroup);
      }

      // Dynamic Diversion Callout Marker on Map
      if (isKpctRerouteActive) {
        const rerouteCalloutIcon = L.divIcon({
          className: 'kpct-reroute-pill',
          html: `
            <div style="
              background: #10B981;
              color: #FFFFFF;
              padding: 3px 8px;
              border-radius: 9999px;
              font-family: 'IBM Plex Mono', monospace;
              font-size: 9px;
              font-weight: 800;
              letter-spacing: 0.3px;
              white-space: nowrap;
              box-shadow: 0 4px 14px rgba(16, 185, 129, 0.45);
              border: 1.5px solid #FFFFFF;
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span>⚡</span>
              <span>DIVERSION ACTIVE: KPCT EXPRESS (-170 KM)</span>
            </div>
          `,
          iconSize: [210, 24],
          iconAnchor: [105, 12]
        });
        L.marker([15.4000, 81.6000], { icon: rerouteCalloutIcon }).addTo(routeGroup);
      }

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

    // 4. Ports with Dynamic Time-Scrubbed Congestion
    if (activeLayerFilters.ports) {
      const portGroup = L.layerGroup();

      PORTS.forEach(port => {
        const isSelected = selectedAsset && selectedAsset.id === port.id;
        
        // Calculate dynamic congestion delta based on time scrubber
        let dynamicCongestion = port.congestion;
        if (port.id === 'PORT-VTZ') {
          if (timeOffsetHours > 0) dynamicCongestion = Math.min(94, Math.round(port.congestion + (timeOffsetHours * 0.4)));
          else if (timeOffsetHours < 0) dynamicCongestion = Math.max(52, Math.round(port.congestion + (timeOffsetHours * 0.8)));
        }

        const isHighCongestion = dynamicCongestion > 60;
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
              transition: transform 0.2s ease;
            ">
              <span style="color: ${badgeColor}; font-weight: bold; font-size: 11px;">⚓</span>
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
                ${dynamicCongestion}%
              </span>
            </div>
          `,
          iconSize: [118, 26],
          iconAnchor: [59, 13]
        });

        const marker = L.marker([port.lat, port.lng], { icon: customPortIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...port, assetType: 'port' }));
        marker.addTo(portGroup);
      });

      portGroup.addTo(map);
      layersRef.current.ports = portGroup;
    }

    // 5. Vessels with Time-Interpolated Positions
    if (activeLayerFilters.vessels) {
      const vesselGroup = L.layerGroup();

      const filteredVessels = VESSELS.filter(v => {
        if (vesselTypeFilter === 'ALL') return true;
        return v.category === vesselTypeFilter;
      });

      filteredVessels.forEach((vessel, vIdx) => {
        const isSelected = selectedAsset && selectedAsset.id === vessel.id;
        const isDelayed = vessel.status === 'delayed';

        // Time scrubber progression interpolation
        const timeFraction = timeOffsetHours / 72;
        const latTimeProgression = (vessel.destinationLat ? (vessel.destinationLat - vessel.lat) * timeFraction * 0.6 : 0);
        const lngTimeProgression = (vessel.destinationLng ? (vessel.destinationLng - vessel.lng) * timeFraction * 0.6 : 0);

        const latOffset = isSimulating ? Math.sin((simTick + vIdx * 35) * 0.05) * 0.008 : 0;
        const lngOffset = isSimulating ? Math.cos((simTick + vIdx * 35) * 0.05) * 0.008 : 0;
        
        const currentLat = vessel.lat + latOffset + latTimeProgression;
        const currentLng = vessel.lng + lngOffset + lngTimeProgression;

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
          iconSize: [126, 24],
          iconAnchor: [63, 12]
        });

        const marker = L.marker([currentLat, currentLng], { icon: vesselIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...vessel, assetType: 'vessel' }));

        marker.bindTooltip(`
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; line-height: 1.4;">
            <strong style="color:${color}; font-size:11px;">${vessel.name}</strong> (${vessel.imo})<br/>
            Type: ${vessel.type}<br/>
            Speed: ${vessel.speed} • Course: ${vessel.cog}<br/>
            Destination: <strong>${vessel.destination}</strong><br/>
            ETA: ${vessel.eta}<br/>
            ${timeOffsetHours !== 0 ? `<span style="color:#38BDF8; font-weight:bold;">Forecast Timeline: ${timeOffsetHours > 0 ? `+${timeOffsetHours}h` : `${timeOffsetHours}h`}</span><br/>` : ''}
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
              transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            ">
              <span style="color: ${color}; font-size: 9px;">🚛</span>
              <span style="font-size: 8.5px; font-weight: bold;">${truck.id}</span>
            </div>
          `,
          iconSize: [82, 18],
          iconAnchor: [41, 9]
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
              border-radius: 4px;
              border: 1.5px solid #30B0C7;
              font-family: 'IBM Plex Mono', monospace;
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 9px;
              box-shadow: 0 3px 8px rgba(0,0,0,${isDark ? '0.5' : '0.15'});
              transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            ">
              <span style="color: #30B0C7;">🏭</span>
              <span style="font-weight: 700;">${wh.shortName}</span>
            </div>
          `,
          iconSize: [110, 22],
          iconAnchor: [55, 11]
        });

        const marker = L.marker([wh.lat, wh.lng], { icon: whIcon })
          .on('click', () => onSelectAsset && onSelectAsset({ ...wh, assetType: 'warehouse' }));
        marker.addTo(whGroup);
      });
      whGroup.addTo(map);
      layersRef.current.warehouses = whGroup;
    }

  }, [activeLayerFilters, activeBasemap, selectedAsset, highlightedCorridor, activeReroute, simTick, isSimulating, vesselTypeFilter, timeOffsetHours]);

  const toggleLayer = (key) => {
    setActiveLayerFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([15.2, 84.5], 6);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#E5E5EA] overflow-hidden select-none font-sans">
      {/* Leaflet map canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Left: Basemap Segmented Picker */}
      <div className="absolute top-3 left-3 z-[400] apple-segmented p-1 shadow-md text-xs">
        <button
          onClick={() => setActiveBasemap('nautical_dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeBasemap === 'nautical_dark' 
              ? 'bg-white text-[#1D1D1F] shadow-xs' 
              : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
          title="Nautical Dark Radar"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dark Radar</span>
        </button>

        <button
          onClick={() => setActiveBasemap('satellite_hybrid')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeBasemap === 'satellite_hybrid' 
              ? 'bg-white text-[#1D1D1F] shadow-xs' 
              : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
          title="Satellite Imagery"
        >
          <Satellite className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Satellite</span>
        </button>

        <button
          onClick={() => setActiveBasemap('carto_light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeBasemap === 'carto_light' 
              ? 'bg-white text-[#1D1D1F] shadow-xs' 
              : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
          title="Light Map"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Map</span>
        </button>
      </div>

      {/* Top Center: Vessel Category Filter (Desktop) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] hidden lg:flex items-center gap-1 apple-glass px-2 py-1 rounded-full shadow-md text-xs">
        {[
          { id: 'ALL', label: 'All Fleet' },
          { id: 'Container', label: 'Container' },
          { id: 'Tanker', label: 'Tanker' },
          { id: 'Gas Carrier', label: 'LNG' },
          { id: 'Bulk Carrier', label: 'Bulk' },
          { id: 'Reefer', label: 'Reefer' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setVesselTypeFilter(cat.id)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              vesselTypeFilter === cat.id
                ? 'bg-[#0071E3] text-white shadow-xs font-semibold'
                : 'text-[#1D1D1F] hover:bg-black/[0.04]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Top Right: Layer Visibility & Zoom Controls */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2 items-end">
        {/* Live Simulation Pulse Pill */}
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className="apple-glass px-3 py-1.5 rounded-full text-xs font-semibold text-[#1D1D1F] shadow-md flex items-center gap-2 hover:bg-white/90 cursor-pointer"
        >
          <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-[#34C759] animate-pulse' : 'bg-[#86868B]'}`}></span>
          <span className="text-[11px] font-mono">{isSimulating ? 'Live AIS' : 'Paused'}</span>
          {isSimulating ? <Pause className="w-3 h-3 text-[#86868B]" /> : <Play className="w-3 h-3 text-[#86868B]" />}
        </button>

        {/* Layer Controls Dropdown/Panel */}
        <div className="apple-card p-2.5 shadow-md text-xs space-y-1 w-44">
          <div className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1 px-1 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            <span>Map Layers</span>
          </div>

          {[
            { key: 'vessels', label: 'AIS Vessels', color: 'bg-[#0071E3]' },
            { key: 'weather', label: 'Weather / Swells', color: 'bg-[#F59E0B]' },
            { key: 'shippingTrunks', label: 'Shipping Trunks', color: 'bg-[#5E5CE6]' },
            { key: 'ports', label: 'Major Ports', color: 'bg-[#FF3B30]' },
            { key: 'anchorage', label: 'Anchorages', color: 'bg-[#30B0C7]' },
            { key: 'routes', label: 'Corridor Roads', color: 'bg-[#FF9500]' },
            { key: 'trucks', label: 'Active Trucks', color: 'bg-[#34C759]' }
          ].map(item => (
            <label 
              key={item.key} 
              className="flex items-center justify-between px-1.5 py-1 rounded-lg hover:bg-black/[0.04] cursor-pointer text-[11px] text-[#1D1D1F]"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span>{item.label}</span>
              </div>
              <input
                type="checkbox"
                checked={activeLayerFilters[item.key]}
                onChange={() => toggleLayer(item.key)}
                className="w-3.5 h-3.5 rounded text-[#0071E3] accent-[#0071E3] cursor-pointer"
              />
            </label>
          ))}
        </div>

        {/* Vertical Floating Zoom Control */}
        <div className="apple-card shadow-md flex flex-col divide-y divide-black/[0.06] overflow-hidden">
          <button
            onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomIn()}
            className="p-2 text-[#1D1D1F] hover:bg-black/[0.04] transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomOut()}
            className="p-2 text-[#1D1D1F] hover:bg-black/[0.04] transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 text-[#1D1D1F] hover:bg-black/[0.04] transition-colors cursor-pointer"
            title="Center Corridor"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating 72-Hour Time Scrubber Bar (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[400] apple-glass p-2.5 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl border border-black/[0.08] flex flex-col sm:flex-row items-center gap-2 sm:gap-4 max-w-[94%] sm:max-w-2xl w-full">
        {/* Play/Pause & Reset Controls */}
        <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => {
              playIosChime('tap');
              setIsTimelinePlaying(!isTimelinePlaying);
            }}
            className="p-1.5 rounded-lg bg-white shadow-2xs border border-black/5 text-[#0071E3] hover:bg-blue-50 transition-colors cursor-pointer"
            title={isTimelinePlaying ? 'Pause Timeline' : 'Play 72h Forecast Replay'}
          >
            {isTimelinePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              playIosChime('tap');
              setTimeOffsetHours(0);
              setIsTimelinePlaying(false);
            }}
            className="p-1.5 rounded-lg bg-white shadow-2xs border border-black/5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-[10px] font-mono font-bold flex items-center gap-1"
            title="Reset to LIVE Current Time"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">LIVE</span>
          </button>
        </div>

        {/* Time Slider */}
        <div className="flex-1 w-full flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10.5px] font-mono">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#0071E3]" />
              <span>TIME MACHINE:</span>
            </span>
            <span className={`font-bold px-2 py-0.5 rounded-md ${
              timeOffsetHours === 0 
                ? 'bg-emerald-100 text-emerald-800' 
                : timeOffsetHours > 0 
                ? 'bg-blue-100 text-[#0071E3]' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {timeOffsetHours === 0 ? '● NOW (Live Synchronized)' : timeOffsetHours > 0 ? `+${timeOffsetHours}h Predictive Forecast` : `${timeOffsetHours}h Historical Replay`}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="-24"
              max="72"
              step="1"
              value={timeOffsetHours}
              onChange={(e) => {
                setTimeOffsetHours(Number(e.target.value));
                if (isTimelinePlaying) setIsTimelinePlaying(false);
              }}
              className="w-full accent-[#0071E3] cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="flex justify-between text-[9px] font-mono text-slate-400">
            <span>-24h Replay</span>
            <span className="font-bold text-slate-700">0h (Now)</span>
            <span>+24h</span>
            <span>+48h Surge</span>
            <span>+72h Forecast</span>
          </div>
        </div>
      </div>
    </div>
  );
}
