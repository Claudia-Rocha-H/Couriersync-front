'use client'

import { useState, useEffect } from 'react'
import { PlusCircle } from 'lucide-react'

import Dialog from '@/components/ui/dialog'
import Input from '@/components/inputs/input'
import Button from '@/components/ui/button'

interface AddCityModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { name: string; department: string; latitude: string; longitude: string }) => void
}

export default function AddCityModal({
  isOpen,
  onClose,
  onConfirm,
}: AddCityModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    latitude: '',
    longitude: '',
  })

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        department: '',
        latitude: '',
        longitude: '',
      })
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onConfirm(formData)
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar ciudad"
      icon={<PlusCircle className="h-10 w-10 text-blue-600" />}
      footer={
        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Agregar ciudad
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Departamento"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        <Input
          label="Latitud"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
        <Input
          label="Longitud"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
      </div>
    </Dialog>
  )
}
