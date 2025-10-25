"use client";

import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const activeClass =
    "bg-gray-800 text-white shadow-lg border-b-2 border-emerald-500";
  const inactiveClass =
    "bg-gray-700 text-gray-400 hover:bg-gray-600 transition duration-150";

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/muestra-de-autos.jpg"
          alt="Garaje de Autos Clásicos"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl">
          <div className="flex mb-8 rounded-lg overflow-hidden border border-gray-700">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 font-semibold ${
                isLogin ? activeClass : inactiveClass
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 font-semibold ${
                !isLogin ? activeClass : inactiveClass
              }`}
            >
              Registro
            </button>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
