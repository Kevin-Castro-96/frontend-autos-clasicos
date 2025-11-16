"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CarFormData = {
  brand: string;
  model: string;
  year: string;
  engine: string;
  image: string;
};

export default function CarForm({
  mode,
  id,
}: {
  mode: "create" | "edit";
  id?: string;
}) {
  const [form, setForm] = useState<CarFormData>({
    brand: "",
    model: "",
    year: "",
    engine: "",
    image: "",
  });

  const fields: Array<keyof CarFormData> = [
    "brand",
    "model",
    "year",
    "engine",
    "image",
  ];

  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`)
        .then((res) => setForm(res.data.data));
    }
  }, [id, mode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "create") {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`, form);
    } else {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`, form);
    }

    window.location.href = "/dashboard/cars";
  };

  return (
    <Card className="max-w-lg mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {mode === "create" ? "Agregar Auto" : "Editar Auto"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field} className="space-y-1">
              <Label className="capitalize">{field}</Label>

              <Input
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
              />
            </div>
          ))}

          <Button className="w-full mt-2" type="submit">
            Guardar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
