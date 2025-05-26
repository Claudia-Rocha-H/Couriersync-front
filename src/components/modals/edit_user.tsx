'use client'

import { useState, useEffect } from 'react'
import { PencilIcon } from 'lucide-react'
import Input from '@/components/inputs/input'
import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button';

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
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Editar usuario"
      icon={<PencilIcon className="w-10 h-10 text-green-500" />}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button variant="success" onClick={handleSubmit}>
            Confirmar cambios
          </Button>
        </>
      }
    >
      <div className="w-full space-y-4">
        <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
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
    </Dialog>
  )
}