// src/pages/Login.tsx
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const { session, signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (session) return <Navigate to="/" replace />;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const { error } = await signIn(email, password);
        if (error)
            setError('Credenciales incorrectas. Verifica e intenta de nuevo.');
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* 🏢 Foto del edificio de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/edificio-altamira.jpg')" }}
            />

            {/* 🌑 Overlay oscuro para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/65 to-slate-950/90" />

            {/* Contenido centrado, sin tarjeta */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md text-center">
                    {/* Logo/Ícono */}
                    <img src="/favicon-96x96.png" alt="Altamira" className="mx-auto mb-6 h-16 w-16 rounded-2xl object-cover ring-1 ring-white/30" />

                    {/* Título grande */}
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl">
                        Comunidad
                        <br />
                        Edificio Altamira
                    </h1>

                    {/* Subtítulo */}
                    <p className="mt-3 text-base font-medium text-white/80 sm:text-lg">
                        Plataforma informativa vecinal
                    </p>

                    {/* Separador sutil */}
                    <div className="mx-auto mt-8 h-px w-24 bg-white/30" />

                    {/* Formulario sin contenedor */}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/90">
                                Correo comunitario
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none transition focus:border-white focus:bg-white focus:ring-2 focus:ring-white/50"
                                placeholder="vecinos@altamira.com"
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