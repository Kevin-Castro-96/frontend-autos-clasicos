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

export default function CarForm({ mode, id }: { mode: "create" | "edit"; id?: string }) {
  const [form, setForm] = useState<CarFormData>({
    brand: "",
    model: "",
    year: "",
    engine: "",
    image: "",
  });

  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false); // 🟢 Estado para "Guardando..."

  const fields: Array<keyof CarFormData> = ["brand", "model", "year", "engine"];

  useEffect(() => {
    if (mode === "edit" && id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`).then((res) => {
        setForm(res.data.data);
        setPreview(res.data.data.image);
      });
    }
  }, [id, mode]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const upload = await axios.post("/api/upload", formData);
    return upload.data.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // 🟢 Empieza el "Guardando..."

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado");
      setLoading(false);
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      if (mode === "create") {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`, form, config);
      } else {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`, form, config);
      }

      window.location.href = "/dashboard/cars";
    } finally {
      setLoading(false); // 🟢 Se asegura que vuelva a false
    }
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
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}

          <div className="space-y-1">
            <Label>Imagen</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setPreview(URL.createObjectURL(file));
                const url = await uploadImage(file);
                setForm({ ...form, image: url });
              }}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Previsualización"
              className="w-full h-48 object-cover rounded-md border"
            />
          )}

          {/* Botón con loading */}
          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
