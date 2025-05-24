import { useState, useEffect } from 'react'
import { getUsers } from '@/services/userService'
import { IGetUsers } from '@/types/users'

export const useUsers = () => {
  const [users, setUsers] = useState<IGetUsers[]>([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await getUsers()
      setUsers(response) // 
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, loading, error, refetch: fetchUsers }
}
