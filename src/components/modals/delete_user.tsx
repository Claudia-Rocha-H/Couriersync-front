import Dialog from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import Button from '@/components/ui/button';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}
export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, message }: ConfirmDeleteModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title || 'Eliminar usuario'}
      icon={<Trash2 className="h-10 w-10 text-red-600" />}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </>
      }
    >
      <p className="text-gray-700 text-center">{message || '¿Estás seguro de que deseas eliminar este usuario?'}</p>
    </Dialog>
  );
}