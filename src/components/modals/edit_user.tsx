'use client'

import { useState, useEffect } from 'react'
import { PencilIcon } from 'lucide-react'
import Input from '@/components/inputs/input'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { name: string; email: string; password: string; role: string }) => void
  initialData: {
    name: string
    email: string
    role: string
  }
}

export default function EditUserModal({ isOpen, onClose, onConfirm, initialData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'operator',
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        password: '',
        role: initialData.role,
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onConfirm(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <PencilIcon className="w-10 h-10 text-green-500 mb-2" />
          <h2 className="text-xl font-bold mb-4 text-center">Editar usuario</h2>

          <div className="w-full space-y-4">
            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-700">Rol</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="administrator">Administrador</option>
                <option value="operator">Operador</option>
                <option value="driver">Conductor</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Confirmar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}