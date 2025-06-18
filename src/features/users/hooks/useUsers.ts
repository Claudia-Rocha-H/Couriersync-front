import { useEffect, useState, useCallback } from 'react'
import { getUsers } from '@/services/userService'
import { IGetUsers } from '@/types/users'

export function useUsers(sessionToken: string | null) {
  const [users, setUsers] = useState<IGetUsers[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUsers = useCallback(async () => {
    if (!sessionToken) return;

    setLoading(true)
    setError('')
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error al obtener usuarios')
      }
    } finally {
      setLoading(false)
    }
  }, [sessionToken])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return { users, loading, error, refetch: fetchUsers }
}
