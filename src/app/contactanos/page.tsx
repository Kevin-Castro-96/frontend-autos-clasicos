"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  message: z.string().min(5, "El mensaje es obligatorio"),
});

type FormData = z.infer<typeof schema>;

export default function Contactanos() {
  const [isSent, setIsSent] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setIsSent(true);
      reset();
    } else {
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <>
    <Header onOpenLanguage={() => setLangOpen((v) => !v)} />
    <div className="flex-col mt-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
        href="/"
        className="inline-flex items-center gap-2 py-3 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </Link>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Contáctanos</CardTitle>
        </CardHeader>
        <CardContent>
          {isSent && (
            <p className="mb-4 text-green-600">
              ¡Mensaje enviado correctamente!
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <Input placeholder="Tu nombre" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input placeholder="Tu email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Textarea placeholder="Tu mensaje" {...register("message")} />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
