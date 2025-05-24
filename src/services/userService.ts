import { IGetUsers } from '@/types/users'

const BASE_URL = 'https://couriersync.onrender.com/api';

export async function getUsers(): Promise<IGetUsers[]> {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Error al obtener usuarios')
  }

  return res.json()
}


export async function deleteUser(userId: number): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al eliminar usuario');
  }
}

export async function updateUser(userId: number, data: { name: string; email: string; role_id: number }): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al actualizar usuario');
  }
}