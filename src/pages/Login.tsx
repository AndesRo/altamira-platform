// src/pages/Login.tsx
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ============================================================
   Iconos SVG (Mostrar / Ocultar contraseña)
   ============================================================ */
const EyeIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

/* ============================================================
   Componente Principal
   ============================================================ */
export const Login = () => {
    const { session, signIn } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (session) return <Navigate to="/" replace />;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Traducir el nombre de usuario al correo interno de Supabase
        const normalized = username.trim().toLowerCase();
        let emailToUse = '';

        if (normalized === 'altamira') {
            emailToUse = 'altamira@altamira.local';
        } else if (normalized === 'admin') {
            emailToUse = 'admin@altamira.local';
        } else {
            // Si escribe un correo directo, lo permitimos
            if (normalized.includes('@')) {
                emailToUse = normalized;
            } else {
                setError('Usuario no reconocido. Usa "Altamira" o "Admin".');
                setLoading(false);
                return;
            }
        }

        const { error } = await signIn(emailToUse, password);
        if (error) {
            setError('Credenciales incorrectas. Verifica e intenta de nuevo.');
        }
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* 🏢 Foto del edificio de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/edificio-altamira.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/65 to-slate-950/90" />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md text-center">

                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl font-bold text-white ring-1 ring-white/30 backdrop-blur">
                        A
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl">
                        Comunidad
                        <br />
                        Edificio Altamira
                    </h1>
                    <p className="mt-3 text-base font-medium text-white/80 sm:text-lg">
                        Plataforma informativa vecinal
                    </p>

                    <div className="mx-auto mt-8 h-px w-24 bg-white/30" />

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                        {/* Campo Usuario */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/90">
                                Usuario
                            </label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none transition focus:border-white focus:bg-white focus:ring-2 focus:ring-white/50"
                                placeholder="Ej. Altamira"
                                autoComplete="username"
                            />
                        </div>

                        {/* Campo Contraseña con toggle */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/90">
                                Contraseña compartida
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-white/30 bg-white/95 pl-4 pr-11 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none transition focus:border-white focus:bg-white focus:ring-2 focus:ring-white/50"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="rounded-lg border border-red-300/50 bg-red-500/20 px-3 py-2 text-sm text-red-100 backdrop-blur">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-white py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    <p className="mt-8 text-xs text-white/60">

                    </p>
                </div>
            </div>
        </div>
    );
};