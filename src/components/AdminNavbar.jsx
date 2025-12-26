import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../services/api';

export default function AdminNavbar() {
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const isAdmin = localStorage.getItem('isAdmin');

            if (!token || isAdmin == 'false'){
                navigate('/admin/login');
                return;
            }

            const response = await api.get(`/v1/test-user`);
            const data = response.data;
        } catch (err) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            navigate('/admin/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold text-danger" to="/admin/home">
                    Home
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="adminNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/campaigns">Campanhas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/users">Usuários</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Relatórios
                            </a>
                            <ul
                                className="dropdown-menu shadow"
                                aria-labelledby="navbarDropdown">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/admin/spins">Log de Giros
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/admin/transactions">Transações
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/admin/clients">Clientes
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <span className="badge border border-danger text-danger">Modo Administrador</span>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline-light btn-sm"
                        >
                            Sair do Painel
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
