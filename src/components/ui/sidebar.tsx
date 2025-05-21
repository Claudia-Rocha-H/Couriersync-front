interface SidebarProps {
  role: "admin" | "operator" | "driver"
}

const linksByRole = {
  admin: [
    { label: "Inicio", href: "#" },
    { label: "Usuarios", href: "#" },
    { label: "Ciudades", href: "#" },
    { label: "Rutas", href: "#" },
    { label: "Asignaciones", href: "#" },
    { label: "Roles", href: "#" },
  ],
  operator: [
    { label: "Inicio", href: "#" },
    { label: "Conductores", href: "#" },
    { label: "Rutas", href: "#" },
    { label: "Asignaciones", href: "#" },
  ],
  driver: [], // Puedes definir más adelante
}

export default function Sidebar({ role }: SidebarProps) {
  const links = linksByRole[role]

  return (
    <aside className="w-64 bg-blue-900 text-white h-screen p-4 fixed top-0 left-0 z-50">
      <div className="flex items-center">
        <img src="/img/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold">CourierSync</h1>
      </div>
      <nav className="mt-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block py-2 px-4 hover:bg-blue-700"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}