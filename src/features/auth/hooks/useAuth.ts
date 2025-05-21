import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login, register } from '@/services/authService';
import { LoginInput, RegisterInput } from '@/types/auth';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (data: LoginInput) => {
  setLoading(true);
  setError('');
  try {
    const res = await login(data);
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('name', res.name);

    switch (res.role) {
      case 'administrator':
        router.push('/admin/users');
        break;
      case 'operator':
        router.push('/operator');
        break;
      case 'driver':
        router.push('/driver');
        break;
      default:
        router.push('/default');
        break;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Error en login');
    }
  } finally {
    setLoading(false);
  }
};


  const handleRegister = async (data: RegisterInput) => {
    setLoading(true);
    setError('');
    try {
      await register(data);
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Error en Registro');
    }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading, error };
}