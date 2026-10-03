# WAYPOINT — Corridor Intelligence for Freight

> **Corridor intelligence for freight — sea to warehouse door.**

WAYPOINT connects **SEA ➔ PORT ➔ LAND ➔ WAREHOUSE** through a shared route graph to provide unified operational visibility.

---

## ⚓ Core Intelligence Layers

1. **Vessel Timing & AIS Radar** — Live Bay of Bengal traffic, speed over ground (SOG), heading vectors, and predictive berth arrival modeling.
2. **Port Congestion & Dwell Forecasting** — 72-hour predictive congestion curves (e.g. Visakhapatnam +48h 81% peak), harbor berth finger pier allocation, and downstream impact breakdown.
3. **Backhaul Matching Engine** — Real-time matching connecting unassigned empty legs with hinterland freight loads to eliminate deadhead kilometers and recover diesel yield.
4. **Cold-Chain Surveillance** — IoT core temperature telemetry with [2°C – 8°C] safe threshold bands, compressor duty monitoring, and auxiliary reefer boost overrides.
5. **Network Impact Cascade (Signature Demo)** — Single root cause bottleneck propagation simulator from port surge to reefer risk.
6. **Cargo Owner / Importer Portal** — "My Shipments" container tracking, dynamic ETAs, and active exception surveillance.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production Build
npm run build
```

Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (Modern industrial control-room design system)
- **GIS Mapping:** Leaflet.js (Nautical Radar, Coastal Satellite, and Paper Chart basemaps)
- **Analytics & Graphs:** Recharts
- **Icons:** Lucide React
