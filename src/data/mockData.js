// WAYPOINT - East Coast Freight Corridor Hyper-Realistic Dataset & Simulation Engine
// SEA (Bay of Bengal AIS) -> HARBOUR/PORT -> LAND TRUCKING (NH Corridor) -> INLAND WAREHOUSES

export const MAP_BASEMAPS = {
  nautical_dark: {
    name: 'Nautical Dark (AIS Radar)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO (Nautical Dark)',
    subdomains: 'abcd'
  },
  satellite_hybrid: {
    name: 'Satellite Coastal Hybrid',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
    subdomains: []
  },
  carto_light: {
    name: 'Industrial Light (Charts)',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO Positron',
    subdomains: 'abcd'
  }
};

export const ANCHORAGE_ZONES = [
  {
    id: 'ANCH-VTZ',
    portId: 'PORT-VTZ',
    name: 'Visakhapatnam Outer Roads & Anchorage Alpha',
    center: [17.6550, 83.3100],
    radiusMeters: 4500,
    depth: '18.5m - 22.0m',
    waitingVesselsCount: 7,
    status: 'SURGE_CONGESTION',
    pilotBoardingLat: 17.6650,
    pilotBoardingLng: 83.2950
  },
  {
    id: 'ANCH-MAA',
    portId: 'PORT-MAA',
    name: 'Chennai Port Outer Anchorage Bravo',
    center: [13.1100, 80.3400],
    radiusMeters: 3800,
    depth: '15.0m - 19.2m',
    waitingVesselsCount: 4,
    status: 'MODERATE_HOLD',
    pilotBoardingLat: 13.0950,
    pilotBoardingLng: 80.3150
  },
  {
    id: 'ANCH-PRT',
    portId: 'PORT-PRT',
    name: 'Paradip Deepwater Roads Anchorage',
    center: [20.2700, 86.6900],
    radiusMeters: 4200,
    depth: '17.0m - 21.0m',
    waitingVesselsCount: 5,
    status: 'MODERATE_HOLD',
    pilotBoardingLat: 20.2900,
    pilotBoardingLng: 86.6600
  }
];

export const CORRIDOR_POLYLINES = {
  // Global East-West Deepwater Shipping Trunk (Malacca Strait -> Dondra Head Sri Lanka -> Suez)
  sea_trunk_malacca_srilanka: [
    [5.80, 95.20],   // Great Channel (Nicobar)
    [6.10, 91.00],   // South Bay of Bengal
    [6.20, 86.50],   // East Indian Ocean Deep
    [5.90, 81.20],   // Off Dondra Head (Sri Lanka)
    [6.95, 79.80]    // Colombo Outer
  ],
  // Singapore to Visakhapatnam Container Trunk
  sea_singapore_vizag: [
    [5.80, 95.20],   // Great Channel (Nicobar)
    [9.10, 91.50],   // Central Andaman Sea
    [12.40, 88.20],  // Bay of Bengal South
    [15.10, 85.80],  // Bay of Bengal Mid
    [16.9200, 84.1500], // MV Eastern Pearl current AIS position
    [17.4500, 83.5200], // Fairway Buoy Approach
    [17.6550, 83.3100], // Outer Anchorage
    [17.6868, 83.2185]  // Vizag Port Berth 02
  ],
  // Colombo to Chennai Container & Automotive Route
  sea_colombo_chennai: [
    [6.95, 79.80],   // Colombo Departure
    [8.40, 81.60],   // Gulf of Mannar East
    [10.80, 81.90],  // Palk Strait Outer
    [12.6000, 81.3000], // CMA CGM Nilgiri AIS
    [12.9800, 80.4500], // Chennai Fairway
    [13.0827, 80.2707]  // Chennai CITPL
  ],
  // Port Klang / Singapore to Paradip Heavy Mineral Route
  sea_klang_paradip: [
    [3.00, 100.00],  // Port Klang
    [6.50, 96.00],   // North Sumatra
    [11.50, 92.00],  // Bay of Bengal East
    [16.00, 89.00],  // Mid Bay
    [19.1000, 87.2000], // Maersk Kaveri AIS
    [20.1500, 86.8500], // Paradip Pilot
    [20.3167, 86.6167]  // Paradip Port
  ],
  // Singapore to Haldia / Kolkata Container Feeder Trunk
  sea_singapore_haldia: [
    [5.80, 95.20],
    [10.50, 92.50],
    [15.80, 90.10],
    [19.80, 88.50],  // Sandheads Pilot Station
    [21.60, 88.10],  // Hooghly River Channel
    [22.02, 88.06]   // Haldia Dock Complex
  ],
  // Indian East Coast Coastal Feeder Trunk (Chennai -> Krishnapatnam -> Vizag -> Paradip)
  sea_coastal_feeder_trunk: [
    [13.0827, 80.2707], // Chennai
    [14.2500, 80.1200], // Krishnapatnam
    [15.8000, 81.2000], // Kakinada Offing
    [17.6868, 83.2185], // Visakhapatnam
    [19.2000, 85.1000], // Gopalpur
    [20.3167, 86.6167]  // Paradip
  ],
  // Andaman Sea Deepwater Security Corridor
  sea_andaman_passage: [
    [11.66, 92.74],  // Port Blair (Andaman)
    [13.50, 93.00],  // Diglipur
    [16.50, 93.80],  // Preparis Channel
    [19.50, 92.20]   // North Bay
  ],
  // Land Arteries (High-Resolution Curvature across Indian Highway Corridors)
  land_vizag_hyderabad: [
    [17.6868, 83.2185], // Vizag Port Gates
    [17.6300, 83.1500], // Gajuwaka Logistics Park
    [17.5100, 82.8500], // Anakapalle Toll Plaza (Holding queue)
    [17.3200, 82.5200], // Tuni
    [17.0200, 81.7800], // Rajahmundry Godavari Bridge
    [16.7800, 81.1200], // Eluru
    [16.5062, 80.6480], // Vijayawada Bypass Hub
    [16.7500, 80.1200], // Nandigama
    [16.9891, 79.5446], // Suryapet
    [17.1500, 79.1000], // Narketpally
    [17.3100, 78.7500], // Hayathnagar (Outer Ring Road)
    [17.3850, 78.4867]  // Hyderabad Genome Valley WH-01
  ],
  land_hyderabad_nagpur: [
    [17.3850, 78.4867], // Hyderabad
    [17.6500, 78.4800], // Medchal NH-44
    [18.3000, 78.3200], // Kamareddy
    [18.6725, 78.0941], // Nizamabad Armoor Bypass
    [19.1000, 78.3500], // Nirmal Ghats
    [19.6641, 78.5320], // Adilabad Border Post
    [20.1000, 78.8500], // Pandharkawada
    [20.5500, 78.9500], // Hinganghat
    [21.1458, 79.0882]  // Nagpur Logistics Hub WH-02
  ],
  land_chennai_bangalore: [
    [13.0827, 80.2707], // Chennai Port
    [12.9800, 79.9500], // Sriperumbudur Industrial Hub
    [12.8300, 79.7000], // Kanchipuram Bypass
    [12.9200, 79.1300], // Vellore
    [12.8000, 78.6000], // Ambur / Vaniyambadi
    [12.7200, 77.8500], // Hosur Border Toll
    [12.8500, 77.6800], // Electronic City
    [12.9716, 77.5946]  // Bangalore Whitefield WH-03
  ],
  land_paradip_raipur: [
    [20.3167, 86.6167], // Paradip Port
    [20.4800, 86.3000], // Cuttack Outer
    [20.2961, 85.8245], // Bhubaneswar ICD
    [20.8500, 85.1500], // Angul Industrial Belt
    [21.4669, 83.9812], // Sambalpur NH-53 Junction
    [21.3000, 83.0500], // Bargarh
    [21.2000, 82.5000], // Saraipali
    [21.2514, 81.6296]  // Raipur WH-04
  ]
};

export const NETWORK_STATS = {
  corridor: "East Coast Multi-Modal Corridor (Bay of Bengal - Deccan Hinterland)",
  status: "ACTIVE_OPERATIONAL",
  lastUpdated: "2026-10-03 21:40 UTC+05:30",
  metrics: [
    { id: "vessels", label: "VESSELS IN CORRIDOR", value: 24, status: "normal", unit: "active", sub: "3 Inbound Pilot" },
    { id: "congestion", label: "PORT CONGESTION (AVG)", value: "62%", status: "warning", trend: "+9% 24h", alert: true, sub: "Vizag Peak 81%" },
    { id: "transit", label: "TRUCKS IN TRANSIT", value: 184, status: "normal", unit: "units", sub: "Corridors Active" },
    { id: "empty", label: "EMPTY BACKHAUL TRUCKS", value: 26, status: "warning", unit: "unassigned", actionable: true, sub: "11 Matches Ready" },
    { id: "shipments", label: "CORRIDOR SHIPMENTS", value: 312, status: "normal", unit: "tracked", sub: "Sea-to-Door Sync" },
    { id: "coldchain", label: "COLD-CHAIN ALERTS", value: 3, status: "critical", unit: "excursions", alert: true, sub: "1 Critical (+7.9°C)" }
  ]
};

export const PORTS = [
  {
    id: "PORT-VTZ",
    name: "Visakhapatnam Port Trust",
    shortName: "Visakhapatnam",
    code: "INVTZ",
    lat: 17.6868,
    lng: 83.2185,
    congestion: 62,
    forecast: {
      now: 62,
      h24: 71,
      h48: 81,
      h72: 67
    },
    waitingVessels: 7,
    expectedDwellHours: 16.0,
    affectedTrucks: 26,
    affectedShipments: 11,
    affectedColdChain: 3,
    berthsAvailable: 2,
    berthsTotal: 18,
    berthsList: [
      { id: "B-01", name: "General Cargo Berth 1", occupied: true, vessel: "Bulk Carrier MV Star", dwell: "18h left" },
      { id: "B-02", name: "VCTPL Container Berth 2", occupied: true, vessel: "MV Eastern Pearl (Queued)", dwell: "Hold - 14.5h" },
      { id: "B-03", name: "VCTPL Container Berth 3", occupied: true, vessel: "Cosco Shanghai", dwell: "22h left" },
      { id: "B-04", name: "Reefer / Pharma Finger Pier", occupied: false, vessel: "AVAILABLE FOR VC-2048", dwell: "CLEAR (PRIORITY)" },
      { id: "B-05", name: "Liquid Chemical Jetty", occupied: true, vessel: "MT Chem Orchid", dwell: "8h left" },
      { id: "B-06", name: "Multi-Purpose Berth 6", occupied: false, vessel: "AVAILABLE", dwell: "Open" }
    ],
    averageTurnaround: "28.4 hrs",
    status: "warning",
    channelDepthMeters: 18.5,
    channelStatus: "Active - Berth Congestion Warning",
    majorCommodities: ["Pharma Biologics", "Electronics", "Minerals", "Marine Produce"]
  },
  {
    id: "PORT-MAA",
    name: "Chennai Port & CITPL Terminal",
    shortName: "Chennai",
    code: "INMAA",
    lat: 13.0827,
    lng: 80.2707,
    congestion: 48,
    forecast: {
      now: 48,
      h24: 52,
      h48: 55,
      h72: 50
    },
    waitingVessels: 4,
    expectedDwellHours: 9.0,
    affectedTrucks: 14,
    affectedShipments: 8,
    affectedColdChain: 0,
    berthsAvailable: 5,
    berthsTotal: 24,
    averageTurnaround: "18.2 hrs",
    status: "normal",
    channelDepthMeters: 16.5,
    channelStatus: "Normal Flow",
    majorCommodities: ["Automotive Assemblies", "Engineering Goods", "Textiles"]
  },
  {
    id: "PORT-KRI",
    name: "Krishnapatnam Deep Sea Port",
    shortName: "Krishnapatnam",
    code: "INKRI",
    lat: 14.2500,
    lng: 80.1200,
    congestion: 38,
    forecast: {
      now: 38,
      h24: 41,
      h48: 43,
      h72: 39
    },
    waitingVessels: 2,
    expectedDwellHours: 6.0,
    affectedTrucks: 8,
    affectedShipments: 5,
    affectedColdChain: 0,
    berthsAvailable: 6,
    berthsTotal: 14,
    averageTurnaround: "14.5 hrs",
    status: "normal",
    channelDepthMeters: 18.0,
    channelStatus: "Clear Channel",
    majorCommodities: ["Bulk Aggregates", "Fertilizer", "Agri Exports"]
  },
  {
    id: "PORT-PRT",
    name: "Paradip Major Seaport",
    shortName: "Paradip",
    code: "INPRT",
    lat: 20.3167,
    lng: 86.6167,
    congestion: 54,
    forecast: {
      now: 54,
      h24: 59,
      h48: 65,
      h72: 60
    },
    waitingVessels: 5,
    expectedDwellHours: 12.0,
    affectedTrucks: 18,
    affectedShipments: 9,
    affectedColdChain: 1,
    berthsAvailable: 3,
    berthsTotal: 16,
    averageTurnaround: "22.1 hrs",
    status: "normal",
    channelDepthMeters: 17.5,
    channelStatus: "Moderate Traffic",
    majorCommodities: ["Iron Ore", "Clean Coal", "Industrial Steel"]
  }
];

export const VESSELS = [
  {
    id: "VES-9481",
    imo: "IMO 9481022",
    mmsi: "563012900",
    callSign: "9V8841",
    name: "MV EASTERN PEARL",
    flag: "SG (Singapore)",
    type: "Container Carrier (Post-Panamax)",
    category: "Container",
    lengthMeters: 366,
    beamMeters: 48.2,
    draftMeters: 14.5,
    lat: 16.9200,
    lng: 84.1500,
    heading: 310,
    cog: "312.4°",
    sog: "14.2 kts",
    speed: "14.2 kts",
    origin: "Port of Singapore (SGSIN)",
    destination: "Visakhapatnam (INVTZ)",
    destPortId: "PORT-VTZ",
    eta: "Today, 23:45 IST",
    predictedBerth: "Tomorrow, 14:30 IST (+14.75h dwell forecast)",
    congestionRisk: "HIGH (81% peak at arrival)",
    cargoTonnage: "14,800 TEU / 42,000 MT",
    keyShipments: ["SHP-8821 (Pharma - VC-2048)", "SHP-7734 (Semiconductors)", "SHP-6612 (Vaccines - VC-3301)"],
    status: "delayed",
    statusDetail: "Awaiting Pilot / Congestion Surge",
    connectedTrucks: ["TK-204", "TK-307", "TK-512"],
    routeTimeline: [
      { step: "SINGAPORE DEPARTURE (PSA TERMINAL)", time: "Sep 28, 08:00 IST", done: true },
      { step: "MALACCA / GREAT CHANNEL PASSAGE", time: "Sep 30, 02:30 IST", done: true },
      { step: "BAY OF BENGAL APPROACH CORRIDOR", time: "Oct 01, 14:00 IST", done: true },
      { step: "VIZAG OUTER PILOT ANCHORAGE", time: "Oct 03, 23:45 IST", current: true },
      { step: "BERTH 02 ALLOCATION (VCTPL)", time: "Oct 04, 14:30 IST (Est)", predicted: true },
      { step: "LAND GATEWAY DISPATCH TO NH-65", time: "Oct 04, 21:00 IST (Est)", predicted: true }
    ]
  },
  {
    id: "VES-8820",
    imo: "IMO 8820491",
    mmsi: "228394000",
    callSign: "FNAL",
    name: "CMA CGM NILGIRI",
    flag: "FR (France)",
    type: "Container Carrier (Neopanamax)",
    category: "Container",
    lengthMeters: 300,
    beamMeters: 42.0,
    draftMeters: 13.0,
    lat: 12.6000,
    lng: 81.3000,
    heading: 335,
    cog: "336.1°",
    sog: "16.8 kts",
    speed: "16.8 kts",
    origin: "Colombo (LKCMB)",
    destination: "Chennai (INMAA)",
    destPortId: "PORT-MAA",
    eta: "Tomorrow, 06:15 IST",
    predictedBerth: "Tomorrow, 11:00 IST",
    congestionRisk: "LOW (48% normal)",
    cargoTonnage: "9,200 TEU / 28,500 MT",
    keyShipments: ["SHP-4401 (Automotive Kits - TK-119)", "SHP-3329 (Solar PV Cells)"],
    status: "normal",
    statusDetail: "Underway Using Engine",
    connectedTrucks: ["TK-119", "TK-402"],
    routeTimeline: [
      { step: "COLOMBO DEPARTURE", time: "Oct 01, 22:00 IST", done: true },
      { step: "COROMANDEL APPROACH", time: "Oct 03, 19:30 IST", done: true },
      { step: "CHENNAI OUTER ANCHORAGE", time: "Oct 04, 06:15 IST", current: true },
      { step: "BERTH CITPL TERMINAL", time: "Oct 04, 11:00 IST", predicted: true }
    ]
  },
  {
    id: "VES-7104",
    imo: "IMO 7104883",
    mmsi: "219001200",
    callSign: "OZKV",
    name: "MAERSK KAVERI",
    flag: "DK (Denmark)",
    type: "Reefer & Container Specialized Feeder",
    category: "Reefer",
    lengthMeters: 220,
    beamMeters: 32.2,
    draftMeters: 11.2,
    lat: 19.1000,
    lng: 87.2000,
    heading: 295,
    cog: "294.8°",
    sog: "12.0 kts",
    speed: "12.0 kts",
    origin: "Port Klang (MYPKG)",
    destination: "Paradip (INPRT)",
    destPortId: "PORT-PRT",
    eta: "Oct 04, 18:00 IST",
    predictedBerth: "Oct 05, 04:00 IST",
    congestionRisk: "MEDIUM (59%)",
    cargoTonnage: "4,500 TEU (800 Reefer Plugs)",
    keyShipments: ["SHP-9901 (Cold Chain Marine Produce - VC-1092)"],
    status: "normal",
    statusDetail: "Underway Using Engine",
    connectedTrucks: ["TK-881"],
    routeTimeline: [
      { step: "PORT KLANG DEPARTURE", time: "Sep 30, 11:00 IST", done: true },
      { step: "NORTH BAY TRANSIT", time: "Oct 03, 18:00 IST", done: true },
      { step: "PARADIP HARBOUR PILOT", time: "Oct 04, 18:00 IST", predicted: true },
      { step: "BERTHING & CRANE DISCHARGE", time: "Oct 05, 04:00 IST", predicted: true }
    ]
  },
  {
    id: "VES-9912",
    imo: "IMO 9912804",
    mmsi: "352001190",
    callSign: "3FGL",
    name: "MSC MEDITERRANEAN",
    flag: "PA (Panama)",
    type: "Ultra-Large Container Vessel (ULCV)",
    category: "Container",
    lengthMeters: 400,
    beamMeters: 61.5,
    draftMeters: 16.0,
    lat: 6.1000,
    lng: 88.5000,
    heading: 268,
    cog: "268.0°",
    sog: "19.5 kts",
    speed: "19.5 kts",
    origin: "Port of Shanghai (CNSHA)",
    destination: "Colombo (LKCMB)",
    destPortId: "PORT-MAA",
    eta: "Oct 04, 02:00 IST",
    predictedBerth: "Oct 04, 08:00 IST",
    congestionRisk: "LOW",
    cargoTonnage: "24,000 TEU / 88,000 MT",
    keyShipments: ["Global Transshipment High-Value Cargo"],
    status: "normal",
    statusDetail: "Global East-West Trunk Transit",
    connectedTrucks: [],
    routeTimeline: [
      { step: "SINGAPORE TRANSIT", time: "Oct 02, 04:00 IST", done: true },
      { step: "DEEPWATER TRUNK", time: "Oct 03, 20:00 IST", current: true },
      { step: "COLOMBO DEEP BERTH", time: "Oct 04, 08:00 IST", predicted: true }
    ]
  },
  {
    id: "VES-4421",
    imo: "IMO 9442109",
    mmsi: "419001450",
    callSign: "AVBK",
    name: "BHARAT RATNA (VLCC)",
    flag: "IN (India)",
    type: "Very Large Crude Carrier (VLCC)",
    category: "Tanker",
    lengthMeters: 333,
    beamMeters: 60.0,
    draftMeters: 21.5,
    lat: 19.8500,
    lng: 86.9500,
    heading: 320,
    cog: "318.5°",
    sog: "11.2 kts",
    speed: "11.2 kts",
    origin: "Ras Tanura (SARST)",
    destination: "Paradip SBM Crude Terminal (INPRT)",
    destPortId: "PORT-PRT",
    eta: "Today, 22:30 IST",
    predictedBerth: "Tomorrow, 02:00 IST (Single Buoy Mooring)",
    congestionRisk: "LOW",
    cargoTonnage: "300,000 DWT Crude Oil",
    keyShipments: ["IOCL Refinery Feedstock"],
    status: "normal",
    statusDetail: "Approaching Offshore SBM",
    connectedTrucks: [],
    routeTimeline: [
      { step: "ARABIAN SEA CROSSING", time: "Sep 29, 12:00 IST", done: true },
      { step: "PARADIP SBM PILOT", time: "Oct 03, 22:30 IST", current: true },
      { step: "MOORING HOSE CONNECT", time: "Oct 04, 02:00 IST", predicted: true }
    ]
  },
  {
    id: "VES-6603",
    imo: "IMO 9660321",
    mmsi: "477890120",
    callSign: "VRGL",
    name: "EVER GLORY",
    flag: "HK (Hong Kong)",
    type: "Post-Panamax Container Carrier",
    category: "Container",
    lengthMeters: 334,
    beamMeters: 45.8,
    draftMeters: 13.8,
    lat: 14.8000,
    lng: 85.2000,
    heading: 305,
    cog: "304.2°",
    sog: "17.4 kts",
    speed: "17.4 kts",
    origin: "Port of Tanjung Pelepas (MYTPP)",
    destination: "Visakhapatnam (INVTZ)",
    destPortId: "PORT-VTZ",
    eta: "Tomorrow, 08:00 IST",
    predictedBerth: "Tomorrow, 22:00 IST (+14h delay)",
    congestionRisk: "HIGH (81%)",
    cargoTonnage: "12,200 TEU",
    keyShipments: ["High-Tech Components", "Chemical Raw Materials"],
    status: "delayed",
    statusDetail: "En Route to Congested Anchorage",
    connectedTrucks: [],
    routeTimeline: [
      { step: "MALACCA PASSAGE", time: "Oct 01, 10:00 IST", done: true },
      { step: "BAY OF BENGAL CROSSING", time: "Oct 03, 21:00 IST", current: true },
      { step: "VIZAG PILOT STATION", time: "Oct 04, 08:00 IST", predicted: true }
    ]
  },
  {
    id: "VES-3310",
    imo: "IMO 9331045",
    mmsi: "354112000",
    callSign: "3EZT",
    name: "GAS PRODIGY",
    flag: "PA (Panama)",
    type: "Liquefied Natural Gas Carrier (LNG)",
    category: "Gas Carrier",
    lengthMeters: 288,
    beamMeters: 44.0,
    draftMeters: 11.5,
    lat: 13.9000,
    lng: 80.6000,
    heading: 350,
    cog: "349.1°",
    sog: "15.8 kts",
    speed: "15.8 kts",
    origin: "Ras Laffan (QARLF)",
    destination: "Krishnapatnam LNG Hub (INKRI)",
    destPortId: "PORT-KRI",
    eta: "Tomorrow, 04:00 IST",
    predictedBerth: "Tomorrow, 07:30 IST",
    congestionRisk: "LOW",
    cargoTonnage: "160,000 CBM Cryogenic Methane",
    keyShipments: ["City Gas Distribution Feedstock"],
    status: "normal",
    statusDetail: "Underway Using Dual-Fuel Engine",
    connectedTrucks: [],
    routeTimeline: [
      { step: "SRI LANKA OFFING", time: "Oct 02, 18:00 IST", done: true },
      { step: "KRISHNAPATNAM APPROACH", time: "Oct 03, 21:30 IST", current: true },
      { step: "CRYOGENIC JETTY ALLOCATION", time: "Oct 04, 07:30 IST", predicted: true }
    ]
  },
  {
    id: "VES-5519",
    imo: "IMO 9551980",
    mmsi: "412330900",
    callSign: "BOSA",
    name: "DONG FANG HONG",
    flag: "CN (China)",
    type: "Capesize Bulk Iron Ore Carrier",
    category: "Bulk Carrier",
    lengthMeters: 292,
    beamMeters: 45.0,
    draftMeters: 17.8,
    lat: 17.6520,
    lng: 83.3250,
    heading: 120,
    cog: "118.0°",
    sog: "0.2 kts",
    speed: "0.2 kts (At Anchor)",
    origin: "Port Hedland (AUPHE)",
    destination: "Visakhapatnam Outer Anchorage (INVTZ)",
    destPortId: "PORT-VTZ",
    eta: "Arrived",
    predictedBerth: "Oct 05, 10:00 IST (+38h queue wait)",
    congestionRisk: "CRITICAL",
    cargoTonnage: "180,000 DWT Iron Ore Pellets",
    keyShipments: ["Blast Furnace Grade Pellets"],
    status: "delayed",
    statusDetail: "At Anchor in Alpha Roads (Dwell Queue)",
    connectedTrucks: [],
    routeTimeline: [
      { step: "ARRIVED VIZAG ROADS", time: "Oct 02, 14:00 IST", done: true },
      { step: "ANCHORAGE HOLDING", time: "Oct 03, 21:00 IST", current: true },
      { step: "ORE BERTH 01 DISCHARGE", time: "Oct 05, 10:00 IST", predicted: true }
    ]
  },
  {
    id: "VES-1142",
    imo: "IMO 9114201",
    mmsi: "419900210",
    callSign: "ATSV",
    name: "TUG SAGAR VIKRAM",
    flag: "IN (India)",
    type: "Azimuth Stern Drive Escort Tug (65T Bollard Pull)",
    category: "Harbour Craft",
    lengthMeters: 32,
    beamMeters: 11.5,
    draftMeters: 4.8,
    lat: 17.6780,
    lng: 83.2550,
    heading: 240,
    cog: "241.0°",
    sog: "8.5 kts",
    speed: "8.5 kts",
    origin: "Vizag Outer Fairway",
    destination: "Inner Harbour Berth 02",
    destPortId: "PORT-VTZ",
    eta: "On Station",
    predictedBerth: "Pilot Station Operations",
    congestionRisk: "NORMAL",
    cargoTonnage: "Harbour Escort & Pilot Push",
    keyShipments: ["Pilotage & Channel Safety"],
    status: "normal",
    statusDetail: "Escorting Inbound Feeder",
    connectedTrucks: [],
    routeTimeline: [
      { step: "PATROL FAIRWAY", time: "Oct 03, 20:00 IST", done: true },
      { step: "PILOT RENDESVOUS", time: "Oct 03, 21:40 IST", current: true }
    ]
  }
];

export const FLEET_TRUCKS = [
  {
    id: "TK-204",
    driver: "Ramesh Sharma",
    phone: "+91 98490 12849",
    type: "Heavy Multi-Axle (Container Rig)",
    capacityTons: 18,
    status: "AVAILABLE_EMPTY",
    statusLabel: "AVAILABLE (EMPTY)",
    badgeColor: "amber",
    lat: 17.6300,
    lng: 83.1500,
    currentLocation: "Gajuwaka Logistics Yard (Vizag Port Area)",
    assignedCorridor: "Vizag → Hyderabad Corridor (NH-65)",
    emptySinceHours: 4.5,
    targetDestination: "Hyderabad Inland Hub",
    hasBackhaulMatch: true,
    matchedLoadId: "LOAD-HYD-NAG-01",
    telemetry: {
      odometer: "142,890 km",
      fuel: "78%",
      speed: "0 km/h (Parked Staging)",
      engineTemp: "Normal (88°C)",
      tirePressure: "110 PSI",
      rpm: "0 (Idling Cut)"
    }
  },
  {
    id: "TK-119",
    driver: "M. Anbazhagan",
    phone: "+91 94441 98210",
    type: "Dedicated Reefer Truck (Carrier Transicold)",
    capacityTons: 16,
    currentLoadTons: 12,
    status: "IN_TRANSIT",
    statusLabel: "IN TRANSIT (ON SCHEDULE)",
    badgeColor: "green",
    lat: 12.9200,
    lng: 79.1300,
    currentLocation: "Vellore Bypass (NH-48 Corridor)",
    assignedCorridor: "Chennai → Bangalore Tech Corridor",
    etaDestination: "Today, 23:30 IST",
    targetDestination: "Bangalore Whitefield Cold Hub",
    hasBackhaulMatch: false,
    shipmentId: "SHP-4401",
    telemetry: {
      odometer: "88,410 km",
      fuel: "64%",
      speed: "62 km/h",
      engineTemp: "91°C",
      cargoTemp: "4.2°C (Stable)",
      tirePressure: "112 PSI"
    }
  },
  {
    id: "TK-307",
    driver: "G. Sudhakar",
    phone: "+91 97012 44321",
    type: "Heavy Multi-Axle Reefer (ThermoKing Super II)",
    capacityTons: 16,
    currentLoadTons: 14,
    status: "DELAYED_HOLD",
    statusLabel: "DELAYED / CONGESTION HOLD",
    badgeColor: "red",
    lat: 17.5100,
    lng: 82.8500,
    currentLocation: "Anakapalle Toll Plaza (Vizag Corridor Hold)",
    assignedCorridor: "Visakhapatnam → Hyderabad (NH-65)",
    targetDestination: "Hyderabad Genome Valley WH-01",
    delayedByHours: 6.2,
    reason: "Port Berth Gate Queue Congestion",
    shipmentId: "SHP-8821",
    reeferId: "VC-2048",
    hasBackhaulMatch: false,
    telemetry: {
      odometer: "210,500 km",
      fuel: "42%",
      speed: "4 km/h (Crawling Queue)",
      engineTemp: "99°C (High Ambient)",
      cargoTemp: "7.9°C (CRITICAL EXCURSION!)",
      tirePressure: "108 PSI"
    }
  },
  {
    id: "TK-402",
    driver: "K. Venkatesh",
    phone: "+91 98850 77123",
    type: "Dry Box Trailer 22T",
    capacityTons: 22,
    currentLoadTons: 20,
    status: "IN_TRANSIT",
    statusLabel: "IN TRANSIT",
    badgeColor: "green",
    lat: 16.7800,
    lng: 81.1200,
    currentLocation: "Eluru Industrial Strip (NH-16)",
    assignedCorridor: "Krishnapatnam → Hyderabad",
    etaDestination: "Tomorrow, 04:00 IST",
    targetDestination: "Hyderabad Patancheru Hub",
    hasBackhaulMatch: true,
    matchedLoadId: "LOAD-HYD-VIZ-09",
    telemetry: {
      odometer: "164,120 km",
      fuel: "82%",
      speed: "58 km/h",
      engineTemp: "89°C"
    }
  },
  {
    id: "TK-881",
    driver: "B. Pradhan",
    phone: "+91 94370 55102",
    type: "Multi-Axle Flatbed (Heavy Spec)",
    capacityTons: 24,
    status: "AVAILABLE_EMPTY",
    statusLabel: "AVAILABLE (EMPTY)",
    badgeColor: "amber",
    lat: 20.2961,
    lng: 85.8245,
    currentLocation: "Bhubaneswar ICD Hub (NH-53)",
    assignedCorridor: "Paradip → Raipur Industrial Line",
    emptySinceHours: 8.0,
    targetDestination: "Raipur Iron & Steel Zone",
    hasBackhaulMatch: true,
    matchedLoadId: "LOAD-RAI-PRT-02",
    telemetry: {
      odometer: "95,300 km",
      fuel: "90%",
      speed: "0 km/h (Staging)",
      engineTemp: "Ambient"
    }
  }
];

export const WAREHOUSES = [
  {
    id: "WH-HYD-01",
    name: "Hyderabad Genome Valley Central Pharma Hub",
    shortName: "Hyderabad (WH-HYD-01)",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.3850,
    lng: 78.4867,
    type: "Pharma Cold Chain & Biologics Gateway",
    capacityUtilized: "74%",
    activeInbound: 18,
    activeOutbound: 24,
    coldStorageZones: "4 Chambers (2°C - 8°C & -20°C Ultra-Deep)",
    gateTurnaroundAvg: "42 mins",
    handlingEquipment: "Automated AGVs + Reefer Docks",
    telemetrySensors: "32 Core Temp Loggers Online"
  },
  {
    id: "WH-NAG-02",
    name: "Nagpur Multi-Modal Logistics Hub",
    shortName: "Nagpur (WH-NAG-02)",
    city: "Nagpur",
    state: "Maharashtra",
    lat: 21.1458,
    lng: 79.0882,
    type: "Central India Transshipment Hub",
    capacityUtilized: "68%",
    activeInbound: 32,
    activeOutbound: 40,
    coldStorageZones: "2 Chambers (-20°C / 4°C)",
    gateTurnaroundAvg: "35 mins",
    handlingEquipment: "Overhead Cranes & Heavy Ramps",
    telemetrySensors: "Active RFID Gates"
  },
  {
    id: "WH-BLR-03",
    name: "Bangalore Whitefield Cargo Terminal",
    shortName: "Bangalore (WH-BLR-03)",
    city: "Bengaluru",
    state: "Karnataka",
    lat: 12.9716,
    lng: 77.5946,
    type: "Electronics & Tech Fulfillment Center",
    capacityUtilized: "82%",
    activeInbound: 28,
    activeOutbound: 30,
    coldStorageZones: "Specialized Class 100 Clean Rooms",
    gateTurnaroundAvg: "50 mins",
    handlingEquipment: "High-Bay Automated Racking",
    telemetrySensors: "IoT Telemetry Grid"
  },
  {
    id: "WH-RAI-04",
    name: "Raipur Industrial Cargo Hub",
    shortName: "Raipur (WH-RAI-04)",
    city: "Raipur",
    state: "Chhattisgarh",
    lat: 21.2514,
    lng: 81.6296,
    type: "Heavy Cargo & Industrial Metal Yard",
    capacityUtilized: "61%",
    activeInbound: 14,
    activeOutbound: 22,
    coldStorageZones: "Dry Freight Only",
    gateTurnaroundAvg: "28 mins",
    handlingEquipment: "50-Ton Gantry Cranes",
    telemetrySensors: "Weighbridge Sync"
  }
];

export const BACKHAUL_MATCHES = [
  {
    id: "MATCH-101",
    truckId: "TK-204",
    truckType: "Heavy Multi-Axle (18T Capacity)",
    currentLeg: "Visakhapatnam → Hyderabad (NH-65)",
    unassignedOrigin: "Hyderabad Inland Depot",
    emptyAvoidedKm: 612,
    matchScore: 94,
    estRevenue: "₹42,000",
    estDieselSavedLiters: 168,
    co2ReductionKg: 448,
    loadDetails: {
      loadId: "LOAD-HYD-NAG-01",
      shipper: "Bharat Heavy Equipments Ltd",
      origin: "Hyderabad (Patancheru Industrial Zone)",
      destination: "Nagpur Transshipment Depot",
      tonnage: "16.0 MT",
      commodity: "Precision Machine Spares & Submersible Pumps",
      readyTime: "Tomorrow, 08:30 IST",
      deliveryDeadline: "Tomorrow, 21:00 IST",
      offeredPayout: "₹42,000",
      payoutRate: "₹68.6 / km"
    },
    corridorRoute: "Hyderabad (NH-44) → Adilabad → Nagpur",
    status: "READY_FOR_CONFIRMATION"
  },
  {
    id: "MATCH-102",
    truckId: "TK-881",
    truckType: "Multi-Axle Flatbed (24T Capacity)",
    currentLeg: "Paradip → Bhubaneswar",
    unassignedOrigin: "Bhubaneswar ICD Hub",
    emptyAvoidedKm: 540,
    matchScore: 91,
    estRevenue: "₹38,500",
    estDieselSavedLiters: 152,
    co2ReductionKg: 405,
    loadDetails: {
      loadId: "LOAD-RAI-PRT-02",
      shipper: "Kalinga Steel & Alloys",
      origin: "Bhubaneswar Industrial Zone",
      destination: "Raipur Steel Yard",
      tonnage: "22.5 MT",
      commodity: "Structural Alloy Billets",
      readyTime: "Tomorrow, 11:00 IST",
      deliveryDeadline: "Oct 05, 14:00 IST",
      offeredPayout: "₹38,500",
      payoutRate: "₹71.3 / km"
    },
    corridorRoute: "Bhubaneswar (NH-53) → Sambalpur → Raipur",
    status: "READY_FOR_CONFIRMATION"
  },
  {
    id: "MATCH-103",
    truckId: "TK-402",
    truckType: "Dry Box Trailer 22T",
    currentLeg: "Eluru → Hyderabad",
    unassignedOrigin: "Hyderabad Patancheru",
    emptyAvoidedKm: 380,
    matchScore: 89,
    estRevenue: "₹29,000",
    estDieselSavedLiters: 98,
    co2ReductionKg: 260,
    loadDetails: {
      loadId: "LOAD-HYD-VIZ-09",
      shipper: "Deccan Consumer Packaged Goods",
      origin: "Hyderabad Outer Ring Logistics Park",
      destination: "Visakhapatnam Autonagar",
      tonnage: "19.2 MT",
      commodity: "Processed FMCG Packaging",
      readyTime: "Oct 04, 14:00 IST",
      deliveryDeadline: "Oct 05, 08:00 IST",
      offeredPayout: "₹29,000",
      payoutRate: "₹76.3 / km"
    },
    corridorRoute: "Hyderabad (NH-65) → Suryapet → Vijayawada → Vizag",
    status: "READY_FOR_CONFIRMATION"
  }
];

export const COLD_CHAIN_MONITORING = [
  {
    id: "VC-2048",
    shipmentId: "SHP-8821",
    client: "Biocon Biologicals Ltd",
    product: "Temperature-Sensitive Oncology Biologics (Batch #B29-TX)",
    containerId: "REEF-99410",
    assignedTruck: "TK-307",
    vesselOrigin: "MV EASTERN PEARL",
    route: "Singapore → Visakhapatnam Port → Hyderabad Genome Valley",
    safeRangeMin: 2.0,
    safeRangeMax: 8.0,
    currentTemp: 7.9,
    ambientTemp: 33.4,
    status: "CRITICAL_EXCURSION_RISK",
    statusLabel: "TEMPERATURE EXCURSION RISK (+7.9°C)",
    riskLevel: "CRITICAL",
    dwellDelayHours: 6.2,
    batteryBackup: "6.5 hrs remaining",
    compressorDuty: "98% (Max Continuous Duty)",
    doorOpenCount: 0,
    temperatureHistory: [
      { time: "15:00", temp: 4.1, safeMax: 8.0, safeMin: 2.0 },
      { time: "16:00", temp: 4.3, safeMax: 8.0, safeMin: 2.0 },
      { time: "17:00", temp: 5.2, safeMax: 8.0, safeMin: 2.0 },
      { time: "18:00", temp: 6.4, safeMax: 8.0, safeMin: 2.0 },
      { time: "19:00", temp: 7.1, safeMax: 8.0, safeMin: 2.0 },
      { time: "20:00", temp: 7.6, safeMax: 8.0, safeMin: 2.0 },
      { time: "21:00", temp: 7.9, safeMax: 8.0, safeMin: 2.0 }
    ],
    recommendedAction: "Reroute to Anakapalle Cold Dock staging point or trigger Aux generator override immediately."
  },
  {
    id: "VC-1092",
    shipmentId: "SHP-9901",
    client: "Falcon Marine Frozen Exports",
    product: "Deep Frozen Marine Produce (-18°C Standard)",
    containerId: "REEF-11042",
    assignedTruck: "TK-119",
    vesselOrigin: "MAERSK KAVERI",
    route: "Port Klang → Paradip Port → Bhubaneswar CFS",
    safeRangeMin: -22.0,
    safeRangeMax: -16.0,
    currentTemp: -18.4,
    ambientTemp: 29.8,
    status: "STABLE",
    statusLabel: "STABLE (-18.4°C)",
    riskLevel: "NORMAL",
    dwellDelayHours: 0,
    batteryBackup: "18.0 hrs remaining",
    compressorDuty: "44%",
    doorOpenCount: 0,
    temperatureHistory: [
      { time: "15:00", temp: -18.2, safeMax: -16.0, safeMin: -22.0 },
      { time: "16:00", temp: -18.5, safeMax: -16.0, safeMin: -22.0 },
      { time: "17:00", temp: -18.3, safeMax: -16.0, safeMin: -22.0 },
      { time: "18:00", temp: -18.6, safeMax: -16.0, safeMin: -22.0 },
      { time: "19:00", temp: -18.4, safeMax: -16.0, safeMin: -22.0 },
      { time: "20:00", temp: -18.5, safeMax: -16.0, safeMin: -22.0 },
      { time: "21:00", temp: -18.4, safeMax: -16.0, safeMin: -22.0 }
    ],
    recommendedAction: "Continuous monitoring active. Nominal parameters."
  },
  {
    id: "VC-3301",
    shipmentId: "SHP-6612",
    client: "Serum Specialty Vaccines",
    product: "Paediatric Vaccine Vials (2°C - 8°C)",
    containerId: "REEF-77421",
    assignedTruck: "TK-204 (Scheduled)",
    vesselOrigin: "MV EASTERN PEARL",
    route: "Singapore → Visakhapatnam Port → Nagpur Central Depot",
    safeRangeMin: 2.0,
    safeRangeMax: 8.0,
    currentTemp: 6.8,
    ambientTemp: 32.1,
    status: "WATCH",
    statusLabel: "WATCH STATUS (+6.8°C)",
    riskLevel: "WARNING",
    dwellDelayHours: 4.8,
    batteryBackup: "9.2 hrs remaining",
    compressorDuty: "82%",
    doorOpenCount: 0,
    temperatureHistory: [
      { time: "15:00", temp: 3.8, safeMax: 8.0, safeMin: 2.0 },
      { time: "16:00", temp: 4.2, safeMax: 8.0, safeMin: 2.0 },
      { time: "17:00", temp: 4.9, safeMax: 8.0, safeMin: 2.0 },
      { time: "18:00", temp: 5.8, safeMax: 8.0, safeMin: 2.0 },
      { time: "19:00", temp: 6.2, safeMax: 8.0, safeMin: 2.0 },
      { time: "20:00", temp: 6.5, safeMax: 8.0, safeMin: 2.0 },
      { time: "21:00", temp: 6.8, safeMax: 8.0, safeMin: 2.0 }
    ],
    recommendedAction: "Port gate dwell delaying Reefer plug-in at Yard 3. Prioritize terminal gate pass."
  }
];

export const ALERTS = [
  {
    id: "ALT-904",
    time: "21:38 IST",
    timestamp: "2m ago",
    severity: "CRITICAL",
    category: "COLD_CHAIN",
    entity: "VC-2048 (SHP-8821)",
    title: "Cold-chain reefer approaching critical ceiling (+7.9°C / Max 8.0°C)",
    details: "Container delayed at Anakapalle queue due to Vizag terminal gate hold. High ambient temperature (33.4°C) driving compressor duty to 98%.",
    action: "VIEW SHIPMENT",
    targetTab: "coldchain",
    targetEntityId: "VC-2048"
  },
  {
    id: "ALT-903",
    time: "21:15 IST",
    timestamp: "25m ago",
    severity: "HIGH",
    category: "PORT_CONGESTION",
    entity: "Visakhapatnam Port (INVTZ)",
    title: "Visakhapatnam congestion forecast crosses 80% peak at +48h",
    details: "7 inbound vessels delayed; expected average dwell time increased to 16.0 hours. 26 connecting trucks awaiting berth discharge.",
    action: "VIEW IMPACT",
    targetTab: "impact",
    targetEntityId: "PORT-VTZ"
  },
  {
    id: "ALT-902",
    time: "20:05 IST",
    timestamp: "1.5h ago",
    severity: "MEDIUM",
    category: "BACKHAUL",
    entity: "TK-204 (Visakhapatnam)",
    title: "Unassigned empty truck available — 94% match identified on Hyderabad → Nagpur",
    details: "TK-204 finishes unloading at Vizag in 3.5h. Backhaul match saves 612 km of deadhead mileage and ₹42,000 estimated revenue.",
    action: "VIEW MATCHES",
    targetTab: "backhaul",
    targetEntityId: "MATCH-101"
  },
  {
    id: "ALT-901",
    time: "18:40 IST",
    timestamp: "3h ago",
    severity: "INFO",
    category: "VESSEL_TIMING",
    entity: "MV EASTERN PEARL (IMO 9481022)",
    title: "Vessel arrival ETA adjusted to 23:45 IST due to Bay of Bengal swell",
    details: "Pilot boarding rescheduled from Berth 04 to Berth 02 at Visakhapatnam Container Terminal.",
    action: "VIEW VESSEL",
    targetTab: "vessels",
    targetEntityId: "VES-9481"
  }
];

export const NETWORK_IMPACT_CASCADE = {
  triggerEvent: "VISAKHAPATNAM PORT CONGESTION SURGE",
  predictedPeak: "81% Peak at +48 Hours (+19% above baseline)",
  cascadeChain: [
    {
      level: 1,
      layer: "PORT",
      icon: "Anchor",
      title: "PORT BOTTLENECK",
      primaryMetric: "81% Congestion",
      subtext: "Visakhapatnam Berth 02-06 Queue",
      details: "Outer anchorage dwell time extends from 5.2h to 16.0h. Channel pilots throttled to 2 vessels/window."
    },
    {
      level: 2,
      layer: "SEA",
      icon: "Ship",
      title: "7 VESSELS AFFECTED",
      primaryMetric: "+14.5h Delay Avg",
      subtext: "MV EASTERN PEARL + 6 others",
      details: "Total cumulative vessel waiting cost estimated at ₹1.82M/day. Bunker fuel consumption surge at anchorage."
    },
    {
      level: 3,
      layer: "LAND",
      icon: "Truck",
      title: "26 TRUCKS STAGED & HELD",
      primaryMetric: "26 Idle Rigs",
      subtext: "Anakapalle & Gajuwaka Gates",
      details: "Driver turnaround times impacted; turnback buffer exceeded for Hyderabad NH-65 time slots."
    },
    {
      level: 4,
      layer: "LAND_MATCH",
      icon: "Repeat",
      title: "11 AVAILABLE LOADS & 8 BACKHAULS",
      primaryMetric: "8 Backhaul Optimizations",
      subtext: "₹336,000 Potential Revenue Saved",
      details: "WAYPOINT Backhaul Engine matches delayed empty return legs with Hyderabad/Nagpur outbound consignments."
    },
    {
      level: 5,
      layer: "COLD_CHAIN",
      icon: "ThermometerSnowflake",
      title: "3 COLD-CHAIN CARGOES IN QUEUE",
      primaryMetric: "1 Temperature Excursion Alert",
      subtext: "VC-2048 Oncology Biologics at 7.9°C",
      details: "Auxiliary genset battery life remaining: 6.5 hours. Operator intervention dispatched to prioritize terminal cold plug-in."
    }
  ]
};

export const SHARED_CORRIDOR_GRAPH = {
  id: "CORRIDOR-VIZAG-HYD",
  name: "East Coast Primary Multi-Modal Corridor",
  nodes: [
    {
      id: "node-vessel",
      layer: "SEA",
      name: "MV EASTERN PEARL",
      code: "IMO 9481022",
      type: "Vessel",
      status: "In Approach",
      statusColor: "amber",
      eta: "23:45 IST",
      dwell: "+14h dwell risk",
      location: "Bay of Bengal (Outer Pilot Station)"
    },
    {
      id: "node-port",
      layer: "PORT",
      name: "VISAKHAPATNAM PORT",
      code: "INVTZ - Berth 02",
      type: "Port Terminal",
      status: "81% Peak Congestion (+48h)",
      statusColor: "red",
      dwell: "16h Avg Turnaround",
      location: "Visakhapatnam, AP"
    },
    {
      id: "node-truck",
      layer: "LAND",
      name: "TRUCK TK-204 / TK-307",
      code: "18T Multi-Axle Reefer",
      type: "Land Transport",
      status: "Gate Staging / Anakapalle Hold",
      statusColor: "amber",
      dwell: "612 km avoided via Backhaul",
      location: "NH-65 Vizag-Vijayawada-Hyd Corridor"
    },
    {
      id: "node-warehouse",
      layer: "WAREHOUSE",
      name: "HYDERABAD GENOME VALLEY",
      code: "WH-HYD-01 (Pharma Cold Hub)",
      type: "Warehouse Destination",
      status: "Ready for Inbound Receiving",
      statusColor: "green",
      dwell: "Chamber 2 (2°C - 8°C)",
      location: "Genome Valley, Hyderabad"
    }
  ]
};

export const CARGO_OWNER_SHIPMENTS = [
  {
    id: "SHP-8821",
    consignee: "Biocon Biologicals Ltd",
    clientCode: "CL-BIO-HYD",
    product: "Temperature-Sensitive Oncology Biologics (Batch #B29-TX)",
    containerId: "REEF-99410",
    containerType: "40ft High-Cube Active Reefer",
    origin: "Port of Singapore (SGSIN)",
    destination: "Hyderabad Genome Valley WH-01",
    carrierVessel: "MV EASTERN PEARL (IMO 9481022)",
    portOfEntry: "Visakhapatnam Port (INVTZ)",
    assignedTruck: "TK-307 (G. Sudhakar / 16T)",
    currentMilestone: "Anakapalle Queue (Congestion Hold)",
    originalEta: "Oct 04, 08:00 IST",
    dynamicPredictedEta: "Oct 04, 21:00 IST",
    delayHours: "+13.0h",
    status: "EXCEPTION_CRITICAL",
    statusLabel: "CRITICAL THERMAL EXCEPTION (+7.9°C)",
    safeRange: "2.0°C — 8.0°C",
    currentTemp: "+7.9°C",
    ambientTemp: "33.4°C",
    customsStatus: "CLEARED / E-GATE PASS GENERATED",
    customsDoc: "BOE-2026-981244",
    cargoValue: "₹4.85 Crore",
    hasException: true,
    exceptionReason: "Port berth congestion delaying reef plug-in, elevated ambient heat pushing core temp to 7.9°C ceiling.",
    chainOfCustody: [
      { step: "SINGAPORE PSA TERMINAL LOAD", time: "Sep 28, 08:00 IST", done: true, location: "Singapore" },
      { step: "BAY OF BENGAL MARITIME TRANSIT", time: "Oct 01, 14:00 IST", done: true, location: "Bay of Bengal" },
      { step: "VIZAG ANCHORAGE PILOT BOARDING", time: "Oct 03, 23:45 IST", current: true, location: "Vizag Roads" },
      { step: "BERTH 02 CRANE DISCHARGE & GATEWAY", time: "Oct 04, 14:30 IST (Est)", predicted: true, location: "VCTPL Vizag" },
      { step: "NH-65 EXPRESSWAY HAULAGE (TK-307)", time: "Oct 04, 16:30 IST (Est)", predicted: true, location: "NH-65 Transit" },
      { step: "HYDERABAD WH-01 DOCK RECEIVING", time: "Oct 04, 21:00 IST (Est)", predicted: true, location: "Genome Valley" }
    ]
  },
  {
    id: "SHP-4401",
    consignee: "Hyundai Mobis India Ltd",
    clientCode: "CL-HYU-BLR",
    product: "EV Powertrain Inverters & Cell Modules",
    containerId: "DRY-44018",
    containerType: "40ft High-Cube Dry Container",
    origin: "Colombo Port (LKCMB)",
    destination: "Bangalore Whitefield Terminal WH-03",
    carrierVessel: "CMA CGM NILGIRI (IMO 8820491)",
    portOfEntry: "Chennai Port (INMAA)",
    assignedTruck: "TK-119 (M. Anbazhagan / 16T)",
    currentMilestone: "Coromandel Sea Approach",
    originalEta: "Oct 04, 19:00 IST",
    dynamicPredictedEta: "Oct 04, 18:30 IST",
    delayHours: "0h (On Schedule)",
    status: "ON_SCHEDULE",
    statusLabel: "IN TRANSIT (ON TIME)",
    safeRange: "Ambient Dry Freight",
    currentTemp: "28.5°C (Dry)",
    ambientTemp: "31.0°C",
    customsStatus: "PRE-ARRIVAL FILING APPROVED",
    customsDoc: "BOE-2026-441098",
    cargoValue: "₹2.40 Crore",
    hasException: false,
    chainOfCustody: [
      { step: "COLOMBO DEPARTURE", time: "Oct 01, 22:00 IST", done: true, location: "Colombo" },
      { step: "COROMANDEL APPROACH", time: "Oct 03, 19:30 IST", done: true, location: "East Coast" },
      { step: "CHENNAI OUTER ANCHORAGE", time: "Oct 04, 06:15 IST", current: true, location: "Chennai Harbour" },
      { step: "CITPL BERTH DISCHARGE", time: "Oct 04, 11:00 IST (Est)", predicted: true, location: "Chennai Port" },
      { step: "NH-48 ROAD HAULAGE (TK-119)", time: "Oct 04, 13:30 IST (Est)", predicted: true, location: "NH-48 Corridor" },
      { step: "BANGALORE WHITEFIELD UNLOADING", time: "Oct 04, 18:30 IST (Est)", predicted: true, location: "Whitefield WH-03" }
    ]
  },
  {
    id: "SHP-9901",
    consignee: "Falcon Marine Frozen Exports",
    clientCode: "CL-FAL-BBI",
    product: "Deep Frozen Marine Produce (-18°C Standard)",
    containerId: "REEF-11042",
    containerType: "40ft Deep Freeze Reefer",
    origin: "Port Klang (MYPKG)",
    destination: "Bhubaneswar ICD Cold Hub",
    carrierVessel: "MAERSK KAVERI (IMO 7104883)",
    portOfEntry: "Paradip Port (INPRT)",
    assignedTruck: "TK-881 (B. Pradhan / 24T)",
    currentMilestone: "North Bay Passage",
    originalEta: "Oct 05, 12:00 IST",
    dynamicPredictedEta: "Oct 05, 11:00 IST",
    delayHours: "0h (On Schedule)",
    status: "ON_SCHEDULE",
    statusLabel: "STABLE (-18.4°C)",
    safeRange: "-22.0°C — -16.0°C",
    currentTemp: "-18.4°C",
    ambientTemp: "29.8°C",
    customsStatus: "QUARANTINE / EIA CLEARED",
    customsDoc: "BOE-2026-990123",
    cargoValue: "₹1.75 Crore",
    hasException: false,
    chainOfCustody: [
      { step: "PORT KLANG DEPARTURE", time: "Sep 30, 11:00 IST", done: true, location: "Port Klang" },
      { step: "NORTH BAY TRANSIT", time: "Oct 03, 18:00 IST", done: true, location: "Bay of Bengal" },
      { step: "PARADIP HARBOUR PILOT", time: "Oct 04, 18:00 IST", predicted: true, location: "Paradip Roads" },
      { step: "BERTH 03 DISCHARGE", time: "Oct 05, 04:00 IST", predicted: true, location: "Paradip Port" },
      { step: "NH-53 REEFER TRANSIT (TK-881)", time: "Oct 05, 07:00 IST", predicted: true, location: "NH-53 Corridor" },
      { step: "BHUBANESWAR ICD RECEIVING", time: "Oct 05, 11:00 IST", predicted: true, location: "Bhubaneswar" }
    ]
  },
  {
    id: "SHP-6612",
    consignee: "Serum Specialty Vaccines Ltd",
    clientCode: "CL-SER-NAG",
    product: "Paediatric Vaccine Vials (2°C - 8°C Cold Chain)",
    containerId: "REEF-77421",
    containerType: "20ft Certified Medical Reefer",
    origin: "Port of Singapore (SGSIN)",
    destination: "Nagpur Central Logistics Depot WH-02",
    carrierVessel: "MV EASTERN PEARL (IMO 9481022)",
    portOfEntry: "Visakhapatnam Port (INVTZ)",
    assignedTruck: "TK-204 (Ramesh Sharma / 18T)",
    currentMilestone: "Vizag Anchorage Queue",
    originalEta: "Oct 05, 08:00 IST",
    dynamicPredictedEta: "Oct 05, 16:30 IST",
    delayHours: "+8.5h",
    status: "EXCEPTION_WARNING",
    statusLabel: "WATCH STATUS (+6.8°C)",
    safeRange: "2.0°C — 8.0°C",
    currentTemp: "+6.8°C",
    ambientTemp: "32.1°C",
    customsStatus: "SPECIAL DRUG CONTROLLER PERMIT CLEARED",
    customsDoc: "BOE-2026-661209",
    cargoValue: "₹6.20 Crore",
    hasException: true,
    exceptionReason: "Berth allocation delay at Vizag Terminal 2, port cold plug scheduled for fast-track.",
    chainOfCustody: [
      { step: "SINGAPORE PSA LOAD", time: "Sep 28, 08:00 IST", done: true, location: "Singapore" },
      { step: "BAY OF BENGAL TRANSIT", time: "Oct 01, 14:00 IST", done: true, location: "Bay of Bengal" },
      { step: "VIZAG ANCHORAGE QUEUE", time: "Oct 03, 23:45 IST", current: true, location: "Vizag Roads" },
      { step: "BERTHING & PLUG-IN", time: "Oct 04, 15:00 IST", predicted: true, location: "VCTPL Vizag" },
      { step: "NH-44 TRANSIT TO NAGPUR", time: "Oct 05, 04:00 IST", predicted: true, location: "NH-44 Corridor" },
      { step: "NAGPUR DEPOT RECEIVING", time: "Oct 05, 16:30 IST", predicted: true, location: "Nagpur WH-02" }
    ]
  }
];


