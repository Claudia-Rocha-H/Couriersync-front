import { LoginInput, RegisterInput, LoginResponse } from '@/types/auth';

const BASE_URL = 'http://localhost:8080/api';

export async function register(data: RegisterInput): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error al registrar usuario');
}

export async function login(data: LoginInput): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Credenciales inválidas');
  const result = await res.json();

  localStorage.setItem('token', result.token);
  localStorage.setItem('role', result.role);

  return result;
}