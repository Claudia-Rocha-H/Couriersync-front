'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { logout } from '@/features/auth/logout';

interface DriverTopbarProps {
  userName: string;
  role: 'admin' | 'operator' | 'driver';
}

export default function DriverTopbar({ userName }: DriverTopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white flex items-center justify-between px-6 py-3 z-40">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image
            src="/img/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="font-bold text-lg">CourierSync</span>
      </div>

      <div className="flex gap-6">
        <a href="/driver/home" className="hover:underline">Inicio</a>
        <a href="/driver/assignments" className="hover:underline">Asignaciones</a>
        <a href="/driver/report" className="hover:underline">Reportar</a>
      </div>

      <div ref={dropdownRef} className="relative">
        <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer">
          <span>{userName}</span>
          <div className="relative w-10 h-10">
            <Image
              src="/img/avatar.png"
              alt="Avatar"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md text-sm text-gray-900">
            <a href="/driver/account" className="block px-4 py-2 hover:bg-gray-100">Cuenta</a>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="block px-4 py-2 text-red-600 hover:bg-gray-100 flex justify-between"
            >
              Cerrar sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
