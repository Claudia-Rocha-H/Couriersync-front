import { Trash2 } from 'lucide-react'

import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button'

interface DeleteCityModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

export default function DeleteCityModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Eliminar ciudad',
  message = '¿Estás seguro de que deseas eliminar esta ciudad?',
}: DeleteCityModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<Trash2 className="h-10 w-10 text-red-600" />}
      footer={
        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      }
    >
      <p className="text-gray-700 text-center">{message}</p>
    </Dialog>
  )
}
