import { NavLink, useNavigate, Link } from 'react-router-dom';
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

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 font-bold text-white">
                        A
                    </div>
                    <div className="leading-tight">
                        <p className="text-sm font-bold text-gray-900">Edificio Altamira</p>
                        <p className="text-xs text-gray-500">Portal Vecinos</p>
                    </div>
                </Link>

                <nav className="hidden gap-1 md:flex">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === '/'}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 hover:bg-amber-200"
                        >
                            ⚙️ Panel Admin
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Salir
                    </button>
                </div>
            </div>

            <nav className="flex gap-1 overflow-x-auto border-t border-gray-100 px-2 py-2 md:hidden">
                {links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.to === '/'}
                        className={({ isActive }) =>
                            `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600'
                            }`
                        }
                    >
                        {l.label}
                    </NavLink>
                ))}
                {isAdmin && (
                    <Link
                        to="/admin"
                        className="whitespace-nowrap rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800"
                    >
                        Admin
                    </Link>
                )}
            </nav>
        </header>
    );
};