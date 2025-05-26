"use client"

import LayoutDashboard from "@/components/layout/layout-dashboard"
import AccountInfo from '@/components/account/accountInfo'
import AccountSettings from '@/components/account/accountSettings'
import { useState } from "react";

export default function AccountPage() {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => setCollapsed(!collapsed);
  const user = {
    name: 'Daniel Herrera',
    role: 'Administrador',
    email: 'daniel.herrera@example.com',
    phone: '+57 315 678 9090',
  }

  return (
    <LayoutDashboard
      userName="Carlos Perez"
      role="admin"
      collapsed={collapsed}
      toggleSidebar={toggleSidebar}
    >
        <div className="bg-gray-100 min-h-screen">
        
        <main className="flex pt-16 ml-64 p-6 flex-col gap-6">
            <section className="bg-white shadow rounded-lg p-6 text-center">
            <img src="/img/avatar.png" alt="Perfil" className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
            <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded">Editar Perfil</button>
            </section>

            <AccountInfo user={user} />
            <AccountSettings />
        </main>
        </div>
    </LayoutDashboard>
    
  )
}
