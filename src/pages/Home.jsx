import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (token) {
            fetchCampaigns();
        }
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await api.get('/v1/campaign');
            setCampaigns(response.data);
        } catch (err) {
            console.error("Erro ao buscar campanhas", err);
        }
    };

    return (
        <div>
            <div className="row justify-content-center text-center">
                <div className="col-md-10">
                    {!isLoggedIn ? (
                        <div className="py-5">
                            <h1 className="display-4 mb-4">Bem-vindo à nossa App</h1>
                            <p className="lead mb-4">Esta é a página pública inicial. Faça login para ver as campanhas.</p>
                            <div className="d-flex justify-content-center gap-3">
                                <Link to="/login" className="btn btn-primary btn-lg px-5">Entrar</Link>
                                <Link to="/register" className="btn btn-outline-secondary btn-lg px-5">Cadastrar</Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Header />

                            <div className="row g-4 text-start">
                                <p className="lead mb-0">Campanhas Ativas</p>
                                {campaigns.map((camp) => (
                                    <div key={camp.id} className="col-md-4">
                                        <div className="card h-100 shadow-sm">
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title font-weight-bold">{camp.title}</h5>
                                                <p className="card-text text-muted small">{camp.description}</p>
                                                <p className="mt-auto fw-bold text-success">
                                                    Preço: R$ {camp.spin_price.toFixed(2)}
                                                </p>
                                                <Link
                                                    to={`/wheel/${camp.name}`}
                                                    className="btn btn-primary w-100 mt-2"
                                                >
                                                    Jogar Agora
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {campaigns.length === 0 && (
                                    <div className="col-12 text-center text-muted">
                                        Nenhuma campanha ativa no momento.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
