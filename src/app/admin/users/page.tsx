'use client';

import { useUsers } from '@/features/users/hooks/useUsers';
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/modals/delete_user';
import EditUserModal from '@/components/modals/edit_user';
import { IGetUsers } from '@/types/users';
import { deleteUser, updateUser } from '@/services/userService';
import UserTable from '@/components/tables/userTable';

export default function AdminUsersPage() {
  const { users, loading, error, refetch } = useUsers();
  const [filter, setFilter] = useState('todos');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IGetUsers | null>(null);

  type EditUserData = {
    name: string;
    email: string;
    password: string;
    role: string;
  };

  const handleConfirmEdit = async (updatedData: EditUserData) => {
    if (!selectedUser) return;

    try {
      const roleMap: Record<string, number> = {
        administrator: 1,
        driver: 2,
        operator: 3,
      };

      const role_id = roleMap[updatedData.role];
      if (!role_id) throw new Error('Rol inválido');

      await updateUser(selectedUser.user_id, {
        name: updatedData.name,
        email: updatedData.email,
        role_id,
      });

      alert('Usuario actualizado correctamente');
      if (refetch) await refetch();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error al actualizar: ${error.message}`);
      } else {
        alert('Error desconocido al actualizar el usuario');
      }
    }
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete !== null) {
      try {
        await deleteUser(userToDelete);
        alert('Usuario eliminado correctamente');
        if (refetch) await refetch();
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Error: ${error.message}`);
        } else {
          alert('Error desconocido al eliminar el usuario');
        }
      } finally {
        setModalOpen(false);
        setUserToDelete(null);
      }
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesRole = filter === 'todos' || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading) return <p className="p-6">Cargando usuarios...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <>
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <select
            className="border border-gray-300 rounded p-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="todos">Ver todos</option>
            <option value="administrator">Administrador</option>
            <option value="operator">Operador</option>
            <option value="driver">Conductor</option>
          </select>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </div>

        <UserTable
          users={filteredUsers ?? []}
          onDelete={handleDeleteClick}
          onEdit={(user: IGetUsers) => {
            setSelectedUser(user);
            setIsEditModalOpen(true);
          }}
        />
      </section>

      <ConfirmDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={handleConfirmEdit}
          initialData={{
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role,
          }}
        />
      )}
    </>
  );
}
