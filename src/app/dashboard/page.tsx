"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel principal</h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </Link>
    </div>
  );
}
