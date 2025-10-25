"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita recarga
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginUser({ email, password });
      console.log("Login exitoso:", res);

      if (onSuccess) onSuccess();
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Iniciar Sesión</h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-900/30 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
        />
      </div>

      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition duration-150 ease-in-out ${
          isLoading
            ? "bg-emerald-700 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isLoading ? "Accediendo..." : "Acceder"}
      </button>

      <div className="text-center">
        <a
          href="#"
          className="text-sm text-gray-400 hover:text-emerald-400 transition duration-150"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  );
};
