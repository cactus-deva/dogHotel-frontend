// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <header className="bg-[#2b2b2b] p-4 text-xl font-bold text-center shadow-md">
        🛠️ Admin Panel
      </header>
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Dog Hotel Admin. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminLayout;
