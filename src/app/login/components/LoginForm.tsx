"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { UserContext } from "@/context/UserContext";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons modernos

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NUEVO
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginUser({ email, password });
      console.log("Login exitoso:", res);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

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

      {/* EMAIL */}
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

      {/* PASSWORD + SHOW/HIDE */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} // 👈 CAMBIO
          id="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
        />

        {/* BOTÓN OJITO */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* SUBMIT */}
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
