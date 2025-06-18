'use client'

import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="flex flex-col items-center" style={{ width: '80vw', maxHeight: '80vh' }}>
        <img
          src="/img/404.svg"
          alt="Página no encontrada"
          style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
          className="mb-6"
        />
        <h1 className="text-5xl font-bold text-blue-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-700 max-w-md mb-8">
          La ruta que intentaste visitar no existe o fue eliminada.
        </p>
        <Link
          href="/"
          className="bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
