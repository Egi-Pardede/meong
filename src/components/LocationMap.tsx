import { useEffect, useRef } from "react";

interface FeedingLocation {
  name: string;
  desc: string;
  coords: [number, number];
  cats: number;
  sector: string;
  color: string;
}

const locations: FeedingLocation[] = [
  {
    name: "Telkom University",
    desc: "Kampus Utama — Sektor 1, 2, 3, 9",
    coords: [-6.9733, 107.6297],
    cats: 33,
    sector: "S1-3,9",
    color: "#b44130",
  },
  {
    name: "Ciganitri",
    desc: "Perumahan Ciganitri — Sektor 5",
    coords: [-6.9824, 107.6208],
    cats: 9,
    sector: "S5",
    color: "#1a5c3a",
  },
  {
    name: "PGA",
    desc: "Area PGA — Sektor 7",
    coords: [-6.9780, 107.6345],
    cats: 5,
    sector: "S7",
    color: "#1a5c3a",
  },
  {
    name: "Sukapura",
    desc: "Kawasan Sukapura — Sektor 4",
    coords: [-6.9850, 107.6420],
    cats: 8,
    sector: "S4",
    color: "#1a5c3a",
  },
  {
    name: "Sukabirus",
    desc: "Area Sukabirus — Sektor 11, 12",
    coords: [-6.9805, 107.6318],
    cats: 17,
    sector: "S11-12",
    color: "#b44130",
  },
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (mapInstance.current) return;

    const initMap = () => {
      if (!mapRef.current || mapInstance.current) return;
      const L = window.L;

      const map = L.map(mapRef.current, {
        center: [-6.9770, 107.6300],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      locations.forEach((loc) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            background:${loc.color};
            color:#fff;
            border:2px solid #121212;
            width:44px;height:44px;
            border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            font-weight:700;font-size:11px;font-family:monospace;
            box-shadow:3px 3px 0 #121212;
            cursor:pointer;
            white-space:nowrap;
          ">${loc.cats}</div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const popup = L.popup({ maxWidth: 220, className: "meong-popup" }).setContent(`
          <div style="font-family:monospace;padding:4px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:4px;">${loc.sector}</div>
            <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${loc.name}</div>
            <div style="font-size:11px;color:#555;margin-bottom:8px;">${loc.desc}</div>
            <div style="background:${loc.color};color:#fff;display:inline-block;padding:3px 8px;font-size:11px;font-weight:700;">
              🐱 ${loc.cats} kucing aktif
            </div>
          </div>
        `);

        L.marker(loc.coords, { icon }).addTo(map).bindPopup(popup);
      });

      // Draw a soft polygon covering the Bandung Selatan feeding area
      const areaCoords: [number, number][] = [
        [-6.9610, 107.6130],
        [-6.9640, 107.6450],
        [-6.9900, 107.6480],
        [-6.9880, 107.6160],
        [-6.9610, 107.6130],
      ];
      L.polygon(areaCoords, {
        color: "#b44130",
        weight: 1.5,
        opacity: 0.5,
        fillColor: "#b44130",
        fillOpacity: 0.05,
        dashArray: "6 4",
      }).addTo(map);
    };

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (window.L) {
      initMap();
    } else if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      // Script is loading, poll
      const interval = setInterval(() => {
        if (window.L) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="border-2 border-foreground overflow-hidden">
      <div className="p-4 border-b-2 border-foreground bg-secondary text-secondary-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/60">
            [ Peta Titik Feeding ]
          </p>
          <p className="font-bold uppercase text-sm mt-0.5">Area Operasi MEONG Project — Bandung Selatan</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1.5">
            <span
              className="w-4 h-4 rounded-full inline-block border border-foreground/40"
              style={{ background: "#b44130" }}
            />
            Titik Utama
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-4 h-4 rounded-full inline-block border border-foreground/40"
              style={{ background: "#1a5c3a" }}
            />
            Titik Satelit
          </span>
          <span className="text-secondary-foreground/50">Angka = jumlah kucing</span>
        </div>
      </div>

      <div ref={mapRef} style={{ height: "420px", width: "100%" }} />

      <div className="p-4 border-t-2 border-foreground bg-muted/30 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {locations.map((loc) => (
          <div key={loc.name} className="border border-foreground/20 p-2 text-center hover:bg-muted transition-colors">
            <div
              className="text-xs font-bold mb-0.5"
              style={{ color: loc.color }}
            >
              {loc.cats} 🐱
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground leading-tight">
              {loc.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationMap;
