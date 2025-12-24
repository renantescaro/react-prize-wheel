import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Header() {
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await api.get('/v1/account');
                setBalance(response.data.value);
            } catch (err) {
                console.error("Erro ao buscar saldo", err);
            }
        };

        fetchBalance();

        window.addEventListener('updateBalance', fetchBalance);
        return () => window.removeEventListener('updateBalance', fetchBalance);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    if (balance === null) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">PrizeWheel</Link>

                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center">
                        <span
                            className="me-2 text-muted text-uppercase x-small fw-bold"
                            style={{ fontSize: '0.7rem' }}>
                            Saldo:
                        </span>
                        <span className="badge bg-success fs-6">
                            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="border-start ps-3">
                        <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}