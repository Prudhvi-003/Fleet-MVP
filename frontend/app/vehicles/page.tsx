'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Vehicle {
  id: number
  number_plate: string
  vehicle_model: string
  dashcam_id: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [vehicleData, setVehicleData] = useState({
    number_plate: '',
    vehicle_model: '',
    dashcam_id: ''
  })

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase.from('vehicles').select('*')
      if (error) {
        console.error('Error fetching vehicles:', error)
      } else if (data) {
        setVehicles(data)
      }
    }

    fetchVehicles()
  }, [])

  const handleAddVehicle = async () => {
    if (!vehicleData.number_plate || !vehicleData.vehicle_model || !vehicleData.dashcam_id) return

    const { data, error } = await supabase.from('vehicles').insert([vehicleData]).select()
    if (error) {
      console.error('Error inserting vehicle:', error)
    } else if (data && data.length > 0) {
      setVehicles(prev => [...prev, data[0]])
      setVehicleData({ number_plate: '', vehicle_model: '', dashcam_id: '' })
      setShowForm(false)
    }
  }

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-6 space-y-3">
          <input
            className="border p-2 w-full text-black"
            placeholder="Number Plate"
            value={vehicleData.number_plate}
            onChange={e => setVehicleData({ ...vehicleData, number_plate: e.target.value })}
          />
          <input
            className="border p-2 w-full text-black"
            placeholder="Vehicle Model"
            value={vehicleData.vehicle_model}
            onChange={e => setVehicleData({ ...vehicleData, vehicle_model: e.target.value })}
          />
          <input
            className="border p-2 w-full text-black"
            placeholder="Dashcam ID"
            value={vehicleData.dashcam_id}
            onChange={e => setVehicleData({ ...vehicleData, dashcam_id: e.target.value })}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAddVehicle}
            disabled={
              !vehicleData.number_plate ||
              !vehicleData.vehicle_model ||
              !vehicleData.dashcam_id
            }
          >
            Save
          </button>
        </div>
      )}

      <div>
        {vehicles.length === 0 ? (
          <p>No vehicles yet.</p>
        ) : (
          <ul className="space-y-2">
            {vehicles.map(v => (
              <li key={v.id} className="p-4 border rounded">
                <div><strong>Plate:</strong> {v.number_plate}</div>
                <div><strong>Model:</strong> {v.vehicle_model}</div>
                <div><strong>Dashcam ID:</strong> {v.dashcam_id}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
