"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Car = {
  id: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  image?: string;
};

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`)
      .then((res) => setCars(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-2 py-3 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </Link>

      <Card className="shadow-md border-none">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-bold">Vehículos</CardTitle>

          <Link href="/dashboard/cars/new">
            <Button>Agregar vehículo</Button>
          </Link>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>Motor</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cars.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.brand}</TableCell>
                  <TableCell>{c.model}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>{c.engine}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/cars/${c.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
