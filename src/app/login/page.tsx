'use client'

import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Input from '@/components/inputs/input'
import Button from '@/components/buttons/button'
import Image from 'next/image'

export default function LoginPage() {
  const { handleLogin, loading, error } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin(form)
  }

  return (
    <main className="flex h-screen">
      {/* Columna Izquierda */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="mb-6 text-center">
          <Image src="/img/logo.png" alt="Logo" width={120} height={120} className="mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">CourierSync</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'INGRESAR'}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <p className="mt-4 text-sm">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <Image src="/img/background.jpg" alt="Background" fill className="object-cover" />
      </div>
    </main>
  )
}

