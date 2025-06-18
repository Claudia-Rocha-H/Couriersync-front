'use client'
import { useState, useRef, useEffect } from 'react'
import { logout } from '@/features/auth/logout'

interface TopbarProps {
  userName: string,
  role: 'admin' | 'operator' | 'driver';
}

export default function Topbar({ userName, role }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()  
    logout()
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white p-4 pl-64 z-40">
      <div className="max-w-full flex justify-end items-center">
        <div ref={dropdownRef} className="relative">
          <div className="flex items-center gap-4 cursor-pointer" onClick={toggleDropdown}>
            <span>{userName}</span>
            <img src="/img/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md text-gray-800 z-50">
              <a
                href={`/${role}/account`}
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Cuenta
              </a>

              <a
                href="#logout"
                onClick={handleLogout}
                className="block px-4 py-2 text-red-600 hover:bg-red-100 transition-colors"
              >
                Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

