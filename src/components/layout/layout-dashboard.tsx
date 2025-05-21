import Sidebar from "@/components/ui/sidebar"
import Topbar from "@/components/ui/topbar"

export default function LayoutDashboard({
  children,
  userName = "Usuario",
  role = "admin",
}: {
  children: React.ReactNode
  userName?: string
  role?: "admin" | "operator" | "driver"
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 ml-64">
        <Topbar userName={userName} />
        <main className="pt-16 p-6">{children}</main>
      </div>
    </div>
  )
}