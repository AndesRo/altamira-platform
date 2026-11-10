import { NavLink, Outlet, Link } from 'react-router-dom';

const links = [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { to: '/admin/administraciones', label: 'Administraciones', icon: '🗳️' },
    { to: '/admin/noticias', label: 'Noticias', icon: '📰' },
    { to: '/admin/documentos', label: 'Documentos', icon: '📄' },
];

export const AdminLayout = () => (
    <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">
            <div className="border-b border-gray-200 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Panel Admin
                </p>
                <p className="text-lg font-bold text-gray-900">Edificio Altamira</p>
            </div>

            <nav className="flex-1 space-y-1 p-3">
                {links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        <span>{l.icon}</span>
                        {l.label}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-gray-200 p-3">
                <Link
                    to="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
                >
                    ← Volver al sitio
                </Link>
            </div>
        </aside>

        {/* Contenido */}
        <div className="flex-1">
            {/* Nav móvil */}
            <nav className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-white p-2 md:hidden">
                {links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.end}
                        className={({ isActive }) =>
                            `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600'
                            }`
                        }
                    >
                        {l.label}
                    </NavLink>
                ))}
                <Link
                    to="/"
                    className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500"
                >
                    ← Sitio
                </Link>
            </nav>

            <main className="p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    </div>
);