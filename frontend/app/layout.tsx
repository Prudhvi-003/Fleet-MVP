// frontend/app/layout.tsx

import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Fleet Safety Dashboard",
  description: "Monitor your vehicles and drivers in real-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-8">FleetGuard</h1>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-blue-300">Home</Link>
            <Link href="/vehicles" className="hover:text-blue-300">Vehicles</Link>
            <Link href="/drivers" className="hover:text-blue-300">Drivers</Link>
            <Link href="/livemap" className="hover:text-blue-300">Live Map</Link>
            <Link href="/incidents" className="hover:text-blue-300">Incidents</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
