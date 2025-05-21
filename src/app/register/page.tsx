'use client'

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Input from '@/components/inputs/input'
import Button from '@/components/buttons/button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { RegisterInput } from '@/types/auth'

export default function RegisterPage() {
  const { handleRegister, loading, error } = useAuth()

  // Estado local para los inputs
  const [form, setForm] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
    role_id: 2, // Por ejemplo, 2 para operador, o ajusta según tu lógica
  })

  // Función para actualizar campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    })
  }

  // Función submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleRegister(form)
  }

  return (
    <main className="flex h-screen">
      {/* Columna izquierda: formulario de registro */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="mb-6 text-center">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto mb-2"
          />
          <h1 className="text-3xl font-bold text-gray-800">CourierSync</h1>
        </div>

        <form className="w-full max-w-sm space-y-4" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'REGISTRAR'}
          </Button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-sm">
            {error}
          </p>
        )}

        <p className="mt-4 text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>

      {/* Columna derecha: imagen de fondo */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/img/background.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
    </main>
  )
}