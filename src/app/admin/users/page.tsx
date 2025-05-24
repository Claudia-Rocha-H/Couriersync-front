"use client"

import { useUsers } from '@/features/users/hooks/useUsers'
import { useState } from 'react'
import ConfirmDeleteModal from '@/components/modals/delete_user'
import EditUserModal from '@/components/modals/edit_user'
import { IGetUsers } from '@/types/users' 
import { deleteUser, updateUser } from '@/services/userService'

export default function AdminUsersPage() {
  const { users, loading, error, refetch } = useUsers() 
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IGetUsers | null>(null)

  type EditUserData = {
    name: string
    email: string
    password: string
    role: string
  }

  const handleConfirmEdit = async (updatedData: EditUserData) => {
  if (!selectedUser) return;

  try {
    const roleMap: Record<string, number> = {
      administrator: 1,
      operator: 2,
      driver: 3,
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
  } catch (error: any) {
    alert(`Error al actualizar: ${error.message}`);
  }
};


  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
  if (userToDelete !== null) {
    try {
      await deleteUser(userToDelete);
      alert('Usuario eliminado correctamente');
      if (refetch) await refetch();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setModalOpen(false);
      setUserToDelete(null);
    }
  }
}


  const filteredUsers = users?.filter(user => {
    const matchesRole = filter === 'todos' || user.role === filter
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesRole && matchesSearch
  })

  if (loading) return <p className="p-6">Cargando usuarios...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

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

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Rol</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map(user => (
                <tr key={user.user_id} className="text-gray-700">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.user_id}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-red-500 mr-2"
                      onClick={() => handleDeleteClick(user.user_id)}
                    >
                      Borrar
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsEditModalOpen(true)
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers?.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
            setIsEditModalOpen(false)
            setSelectedUser(null)
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
  )
}
