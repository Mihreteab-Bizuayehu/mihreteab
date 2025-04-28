import SideMenu from "@/components/dashboard/SideMenu";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div className="flex dark:bg-gray-950 dark:text-white">
        <SideMenu />
        <main className="flex-grow">{children}</main>
      </div>
    );
}