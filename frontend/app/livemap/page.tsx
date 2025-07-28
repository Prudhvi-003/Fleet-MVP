"use client"; // ⬅️ Make the whole page a Client Component

import dynamic from "next/dynamic";

// Dynamically import MapView with SSR disabled
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function LiveMapPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Live Map</h1>
      <MapView />
    </div>
  );
}
