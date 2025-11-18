"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col flex-1">
        <Navbar setOpen={setOpen} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
