import Sidebar from "@/components/ui/sidebar";
import Topbar from "@/components/ui/topbar";

interface LayoutDashboardProps {
  children: React.ReactNode;
  userName?: string;
  role?: "admin" | "operator" | "driver";
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function LayoutDashboard({
  children,
  userName = "Usuario",
  role = "admin",
  collapsed,
  toggleSidebar,
}: LayoutDashboardProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div

        className={`flex-1 pt-16 p-6 transition-all duration-300 ${
          collapsed ? "ml-[64px]" : "ml-[256px]"
        }`}
      >
        <Topbar userName={userName} role ={role} />
        <main>{children}</main>
      </div>
    </div>
  );
}
