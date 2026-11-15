// src/pages/Login.tsx
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const { session, signIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (session) return <Navigate to="/" replace />;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 🪄 Traducir el nombre de usuario al correo interno de Supabase
        const normalized = username.trim().toLowerCase();
        let emailToUse = '';

        if (normalized === 'altamira') {
            emailToUse = 'altamira@altamira.local';
        } else if (normalized === 'admin') {
            emailToUse = 'admin@altamira.local';
        } else {
            // Si no es ninguno, mostramos error (o permitimos correo directo si tiene @)
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

                    <img src="/favicon-96x96.png" alt="Altamira" className="mx-auto mb-6 h-16 w-16 rounded-2xl object-cover ring-1 ring-white/30" />

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

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/90">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none transition focus:border-white focus:bg-white focus:ring-2 focus:ring-white/50"
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
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