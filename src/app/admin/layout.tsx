// app/admin/layout.tsx
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar/page";
import { Header } from "./Header/page";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:flex-row">
    {/* Sidebar nằm trên ở mobile, bên trái ở desktop */}
    <aside className="w-full md:w-64">
        <Sidebar />
    </aside>

    {/* Phần còn lại */}
    <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 sm:p-6">{children}
            <Toaster position="top-right" />
        </main>
    </div>
    </div>
  );
}
