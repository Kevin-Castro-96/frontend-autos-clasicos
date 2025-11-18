"use client";

import { Menu } from "lucide-react";

export default function Navbar({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="h-14 bg-white shadow flex items-center px-4 gap-3">
      <button className="md:hidden" onClick={() => setOpen(prev => !prev)}>
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="font-semibold">Panel de control</h1>
    </header>
  );
}
