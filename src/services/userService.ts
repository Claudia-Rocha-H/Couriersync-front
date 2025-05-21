import { IGetUsers } from '@/types/users'

const BASE_URL = '/api'

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
