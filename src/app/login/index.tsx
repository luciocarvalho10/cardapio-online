import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";

import IC from "@/components/icons";
import Loanding from '@/components/loanding'
import ThemeButton from "@/components/themeButton";
import { useMenu } from "@/context/menu/useMenu";

export default function AdminLoginPage() {
  const { login, isDarkMode } = useMenu();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(username, password);
    setLoading(false);
    if (ok) {
      navigate("/admin/dashboard");
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300"
      style={{
        background: isDarkMode
          ? "linear-gradient(135deg, #0d0500 0%, #1f0a00 50%, #3d1800 100%)"
          : "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #7a2e00 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 70%, #ff8c00 0%, transparent 50%), radial-gradient(circle at 70% 30%, #ff4500 0%, transparent 40%)",
        }}
      />

      {/* Dark mode toggle */}
      <ThemeButton.ThemeButtonBar />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-2xl mb-4 shadow-xl">
            <IC.ChefHat
              size={32}
              className="text-white"
            />
          </div>
          <h1
            className="text-3xl text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Bella Cucina
          </h1>
          <p className="text-amber-300 text-sm mt-1">Painel Administrativo</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 transition-colors duration-300">
          <h2
            className="text-gray-800 dark:text-gray-100 mb-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Entrar na conta
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Acesso restrito a administradores
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                Usuário
              </label>
              <div className="relative">
                <IC.User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <IC.Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <IC.EyeOff size={16} />
                  ) : (
                    <IC.Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              { loading ? <Loanding.Spinner message="Entrando..." /> : "Entrar" }
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
              Credenciais demo:{" "}
              <span className="font-mono text-gray-600 dark:text-gray-400">
                admin
              </span>{" "}
              /{" "}
              <span className="font-mono text-gray-600 dark:text-gray-400">
                admin123
              </span>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-amber-300/60 text-xs">
          <Link
            href="/"
            className="hover:text-amber-300 underline transition-colors"
          >
            ← Ver cardápio do cliente
          </Link>
        </p>
      </div>
    </div>
  );
}
