import LayoutDashboard from "@/components/layout/layout-dashboard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutDashboard userName="Carlos Perez" role="admin">
      {children}
    </LayoutDashboard>
  )
}