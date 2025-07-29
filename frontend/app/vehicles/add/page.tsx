'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'


const supabase = createClient('https://supabase.com/dashboard/project/pwjajsjlzeaamajjeyyw/settings/api-keys', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3amFqc2psemVhYW1hampleXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MDU5MDMsImV4cCI6MjA2OTM4MTkwM30.9D6R2E8CiwUo-0q_nVei2Bpb4EDmf0PKy8L9ZP1SfJs')

export default function AddVehiclePage() {
  const [vehicleId, setVehicleId] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [driverName, setDriverName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('vehicles').insert([
      {
        vehicle_id: vehicleId,
        plate_number: plateNumber,
        driver_name: driverName,
        status: 'inactive',
      },
    ])

    if (error) {
      alert('Error saving vehicle: ' + error.message)
    } else {
      router.push('/vehicles')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-black">Add New Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Vehicle ID"
          className="border p-2 w-full text-black"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Plate Number"
          className="border p-2 w-full text-black"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Driver Name"
          className="border p-2 w-full text-black"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Vehicle
        </button>
      </form>
    </div>
  )
}
