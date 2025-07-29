'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'



export default function SaveVehicleForm() {
  const [vehicleId, setVehicleId] = useState('')
  const [vehicleName, setVehicleName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('vehicles') // your table name
      .insert([
        { id: vehicleId, name: vehicleName } // replace with actual column names
      ])

    setLoading(false)

    if (error) {
      console.error(error)
      alert('❌ Error saving vehicle: ' + error.message)
    } else {
      alert('✅ Vehicle saved!')
      setVehicleId('')
      setVehicleName('')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Add New Vehicle</h2>

      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Vehicle Name"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Vehicle'}
      </button>
    </div>
  )
}
