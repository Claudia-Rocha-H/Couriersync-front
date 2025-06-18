'use client';

import DriverTopbar from '@/components/ui/driver_topbar';

interface LayoutDriverProps {
  children: React.ReactNode;
  userName?: string;
  role?: "admin" | "operator" | "driver"
}

export default function LayoutDriver({
    children,
    userName = "Usuario",
    role = "driver",
}: LayoutDriverProps) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <DriverTopbar userName={userName} role ={role}/>
      <main className="pt-20 p-6">{children}</main>
    </div>
  );
}
