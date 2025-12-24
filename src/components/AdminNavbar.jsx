import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const navigate = useNavigate();

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
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/reports">Relatórios</Link>
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
