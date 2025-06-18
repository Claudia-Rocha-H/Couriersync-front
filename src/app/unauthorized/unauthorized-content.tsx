'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; 

const errorContent = {
  '401': {
    title: 'No autorizado',
    message: 'No has iniciado sesión. Por favor, inicia sesión para continuar.',
    imgSrc: '/img/401.svg',
  },
  '403': {
    title: 'Acceso denegado',
    message: 'No tienes permisos para acceder a esta página.',
    imgSrc: '/img/403.svg',
  },
  '404': {
    title: 'No encontrado',
    message: 'El recurso solicitado no ha sido encontrado.',
    imgSrc: '/img/404.svg',
  },
};

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '403';
  const { title, message, imgSrc } = errorContent[code] || errorContent['403'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="flex flex-col items-center" style={{ width: '80vw', maxHeight: '80vh' }}>
        <div className="relative w-full max-w-xl h-[60vh] mb-6">
          <Image
            src={imgSrc}
            alt={title}
            fill 
            style={{ objectFit: 'contain' }}
            priority 
          />
        </div>

        <h1 className="text-5xl font-bold text-blue-900 mb-2">{code}</h1>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 max-w-md mb-8">{message}</p>
      </div>

      <Link
        href="/login"
        className="bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-700 transition mt-6"
      >
        Iniciar sesión
      </Link>
    </div>
  );
}

