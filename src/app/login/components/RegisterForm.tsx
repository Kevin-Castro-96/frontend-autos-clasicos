"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";
import { UserContext } from "@/context/UserContext";

// 👁️ ICONOS DE LUCIDE
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // 👁️ estados para mostrar/ocultar
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!terms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerUser({ name, email, password });

      // Guardar usuario
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      if (onSuccess) onSuccess();

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Registro</h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-900/30 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      {/* NOMBRE */}
      <div>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition"
        />
      </div>

      {/* EMAIL */}
      <div>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition"
        />
      </div>

      {/* PASSWORD con icono */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* CONFIRM PASSWORD con icono */}
      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirmar Contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition"
        />

        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
        >
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* TÉRMINOS */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
        />
        <label className="ml-2 text-sm text-gray-400">
          Acepto los términos y condiciones
        </label>
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition ${
          isLoading
            ? "bg-emerald-700 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isLoading ? "Registrando..." : "Registrarme"}
      </button>
    </form>
  );
};
