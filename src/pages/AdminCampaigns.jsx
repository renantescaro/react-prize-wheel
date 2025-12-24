import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await api.get('/v1/admin/campaign/');
            setCampaigns(response.data);
        } catch (err) {
            console.error("Erro ao carregar campanhas", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta campanha?")) {
            try {
                await api.delete(`/v1/admin/campaign/${id}`);
                setCampaigns(campaigns.filter(c => c.id !== id));
            } catch (err) {
                alert("Erro ao excluir campanha.");
            }
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestão de Campanhas</h2>
                    <Link to="/admin/campaigns/new" className="btn btn-success">
                        + Nova Campanha
                    </Link>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Nome (Slug)</th>
                                        <th>Preço Giro</th>
                                        <th>Expira em</th>
                                        <th className="text-end">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="6" className="text-center py-4">Carregando...</td></tr>
                                    ) : campaigns.map((camp) => (
                                        <tr key={camp.id}>
                                            <td>{camp.id}</td>
                                            <td><strong>{camp.title}</strong></td>
                                            <td><code>{camp.name}</code></td>
                                            <td>R$ {camp.spin_price.toFixed(2)}</td>
                                            <td>{new Date(camp.end_date).toLocaleDateString('pt-BR')}</td>
                                            <td className="text-end">
                                                <Link
                                                    to={`/admin/campaigns/edit/${camp.id}`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(camp.id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && campaigns.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-4"
                                            >Nenhuma campanha encontrada.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
