"use client";
import Header from "@/components/header";
import { useState } from "react";

export default function ApiDocumentation() {
  const [langOpen, setLangOpen] = useState(false);
  return (
    <>
      <Header onOpenLanguage={() => setLangOpen((v) => !v)} />
      <div className="max-w-5xl mx-auto p-6 space-y-10">
        <h1 className="text-4xl font-bold">
          Documentación de la API - Autos Clásicos
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Introducción</h2>
          <p>
            Esta API permite gestionar autos clásicos, incluyendo registro de
            usuarios, autenticación y manejo de vehículos. Las respuestas y
            solicitudes utilizan formato <strong>JSON</strong>.
          </p>
          <p>
            <strong>Base URL:</strong> https://back-autos-clasicos.vercel.app
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Autenticación</h2>
          <p>
            Esta API utiliza <strong>JWT</strong>. Para acceder a los endpoints
            protegidos, agrega:
          </p>
          <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
            {`Authorization: Bearer <TOKEN>`}
          </pre>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Endpoints</h2>

          {/* AUTH SECTION */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Auth</h3>

            <div className="border p-4 rounded-xl">
              <h4 className="font-semibold">POST /api/auth/register</h4>
              <p>Registrar un nuevo usuario.</p>
              <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
                {`{
  "username": "string",
  "email": "string",
  "password": "string"
}`}
              </pre>
            </div>

            <div className="border p-4 rounded-xl">
              <h4 className="font-semibold">POST /api/auth/login</h4>
              <p>Obtener token JWT.</p>
              <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
                {`{
  "email": "string",
  "password": "string"
}`}
              </pre>
            </div>
          </div>

          {/* CARS SECTION */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Autos</h3>

            <div className="border p-4 rounded-xl">
              <h4 className="font-semibold">GET /api/cars</h4>
              <p>Obtener todos los autos.</p>
              <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
                {`[
  {
    "id": 1,
    "brand": "Ford",
    "model": "Mustang",
    "year": 1967,
    "userId": 3
  }
]`}
              </pre>
            </div>

            <div className="border p-4 rounded-xl">
              <h4 className="font-semibold">POST /api/cars</h4>
              <p>Crear un auto clásico. (Requiere token)</p>
              <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
                {`{
  "brand": "Chevrolet",
  "model": "Camaro",
  "year": 1970
}`}
              </pre>
            </div>

            <div className="border p-4 rounded-xl">
              <h4 className="font-semibold">PUT /api/cars/:id</h4>
              <p>Actualizar un auto clásico. (Requiere token)</p>
              <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
                {`{
  "brand": "Ford",
  "model": "Mustang GT",
  "year": 1968
}`}
              </pre>
            </div>

            <div className="border p-4 rounded-xl">
              <h4 className="font-semibold">DELETE /api/cars/:id</h4>
              <p>Eliminar un auto clásico. (Requiere token)</p>
              <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
                {`{
  "message": "Car deleted"
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Modelos de Datos</h2>
          <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
            {`Car:
  id: number
  brand: string
  model: string
  year: number
  userId: number`}
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ejemplos con cURL</h2>

          <div>
            <p>Registrar usuario:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
              {`curl -X POST https://tu-dominio.com/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"juan","email":"juan@example.com","password":"123456"}'`}
            </pre>
          </div>

          <div>
            <p>Obtener token:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
              {`curl -X POST https://tu-dominio.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"juan@example.com","password":"123456"}'`}
            </pre>
          </div>

          <div>
            <p>Crear auto:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-xl text-sm overflow-x-auto">
              {`curl -X POST https://tu-dominio.com/api/cars \
-H "Content-Type: application/json" \
-H "Authorization: Bearer TOKEN" \
-d '{"brand":"Chevrolet","model":"Camaro","year":1970}'`}
            </pre>
          </div>
        </section>
      </div>
    </>
  );
}
