// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
    { to: '/', label: 'Elecciones' },
    { to: '/noticias', label: 'Noticias' },
    { to: '/documentos', label: 'Documentos' },
    { to: '/contacto', label: 'Contacto' },
];

export const Navbar = () => {
    const { signOut, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Cierra el menú al cambiar de ruta
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Bloquea el scroll del body cuando el menú está abierto
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
                    {/* 🏢 Logo con foto del edificio */}
                    <Link to="/" className="flex items-center gap-3 sm:gap-4">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl ring-2 ring-primary-600/20 shadow-md sm:h-14 sm:w-14">
                            <img
                                src="/favicon-96x96.png"
                                alt="Edificio Altamira"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="leading-tight">
                            <p className="text-base font-extrabold tracking-tight text-gray-900 sm:text-lg">
                                Edificio Altamira
                            </p>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-600 sm:text-xs">
                                Portal Vecinos
                            </p>
                        </div>
                    </Link>

                    {/* 🧭 Navegación desktop */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.to === '/'}
                                className={({ isActive }) =>
                                    `relative rounded-lg px-4 py-2.5 text-base font-semibold transition ${isActive
                                        ? 'text-primary-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {l.label}
                                        {isActive && (
                                            <span className="absolute inset-x-3 -bottom-1 h-1 rounded-full bg-primary-600" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Acciones desktop */}
                    <div className="hidden items-center gap-2 lg:flex">
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-200"
                            >
                                ⚙️ Panel Admin
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Salir
                        </button>
                    </div>

                    {/* 🍔 Botón hamburguesa (móvil) */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-50 lg:hidden"
                        aria-label="Abrir menú"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            {/* 📱 Drawer móvil */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-50 lg:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Panel deslizante */}
                    <aside className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl animate-[slideIn_0.25s_ease-out]">
                        {/* Header del drawer */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded-lg ring-2 ring-primary-600/20">
                                    <img
                                        src="/favicon-96x96.png"
                                        alt="Edificio Altamira"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="leading-tight">
                                    <p className="text-sm font-extrabold text-gray-900">
                                        Edificio Altamira
                                    </p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">
                                        Portal Vecinos
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                                aria-label="Cerrar menú"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                            {links.map((l) => (
                                <NavLink
                                    key={l.to}
                                    to={l.to}
                                    end={l.to === '/'}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition ${isActive
                                            ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    {l.label}
                                    <span className="text-gray-400">→</span>
                                </NavLink>
                            ))}

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="mt-2 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3.5 text-base font-bold text-amber-800 ring-1 ring-amber-200"
                                >
                                    ⚙️ Panel Admin
                                    <span className="text-amber-500">→</span>
                                </Link>
                            )}
                        </nav>

                        {/* Footer del drawer */}
                        <div className="border-t border-gray-200 p-4">
                            <button
                                onClick={handleLogout}
                                className="w-full rounded-xl border border-gray-300 bg-white py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cerrar sesión
                            </button>
                            <p className="mt-3 text-center text-xs text-gray-400">

                            </p>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
};