'use client';
import Image from 'next/image';

import {
  Home,
  Users,
  MapPin,
  Route,
  Settings,
  ChevronLeft,
  ChevronRight,
  Truck
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Inicio: <Home className="w-5 h-5" />,
  Usuarios: <Users className="w-5 h-5" />,
  Ciudades: <MapPin className="w-5 h-5" />,
  Rutas: <Route className="w-5 h-5" />,
  Asignaciones: <Settings className="w-5 h-5" />,
  Roles: <Settings className="w-5 h-5" />,
  Conductores: <Truck className= "w-5 h-5"/>
};

interface SidebarProps {
  role: 'admin' | 'operator' | 'driver';
  collapsed: boolean;
  toggleSidebar: () => void;
}

const linksByRole = {
  admin: [
    { label: 'Inicio', href: '/admin/home', icon: <Home size={20} /> },
    { label: 'Usuarios', href: '/admin/users', icon: <Users size={20} /> },
    { label: 'Ciudades', href: '/admin/cities', icon: <MapPin size={20} /> },
    { label: 'Rutas', href: '/admin/routes', icon: <Route size={20} /> },
    { label: 'Asignaciones', href: '#', icon: <Settings size={20} /> },
    { label: 'Roles', href: '#', icon: <Settings size={20} /> },
  ],
  operator: [
    { label: 'Inicio', href: '/operator/home', icon: <Home size={20} /> },
    { label: 'Conductores', href: '#', icon: <Truck size={20} /> },
    { label: 'Rutas', href: '/operator/routes', icon: <Route size={20} /> },
    { label: 'Asignaciones', href: '#', icon: <Settings size={20} /> },
  ],
  driver: [],
};

export default function Sidebar({ role, collapsed, toggleSidebar }: SidebarProps) {
  const links = linksByRole[role];

  return (
    <aside
      className={`bg-blue-900 text-white h-screen pt-6 fixed top-0 left-0 z-50 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{ overflow: 'visible' }} 
    >
      <div className="relative px-4 mb-6">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={10} height={10} />
          {!collapsed && (
            <h1 className="text-xl font-bold ml-2 whitespace-nowrap">
              CourierSync
            </h1>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className={`
            absolute -right-3 top-1/2 transform -translate-y-1/2 
            bg-blue-800 w-6 h-6 rounded-r-full 
            flex items-center justify-center shadow hover:bg-blue-700 transition
            z-50
          `}
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}

        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="mt-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`flex items-center gap-2 py-2 px-4 hover:bg-blue-700 rounded transition ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            {iconMap[link.label]}
            {!collapsed && <span>{link.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
