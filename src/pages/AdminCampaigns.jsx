import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';

export default function AdminCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { label: 'ID' },
        { label: 'Título' },
        { label: 'Nome (Slug)' },
        { label: 'Preço Giro' },
        { label: 'Expira em' },
        { label: 'Ações', className: 'text-end' }
    ];

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await api.get('/v1/admin/campaign');
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
                <PageHeader
                    title="Campanhas"
                    buttonText="Nova Campanha"
                    buttonLink="/admin/campaigns/new"
                />

                <DataTable
                    headers={columns}
                    data={campaigns}
                    loading={loading}
                    renderRow={(camp) => (
                        <>
                            <td>{camp.id}</td>
                            <td><strong>{camp.title}</strong></td>
                            <td><code>{camp.name}</code></td>
                            <td className="fw-bold">R$ {camp.spin_price.toFixed(2)}</td>
                            <td>{new Date(camp.end_date).toLocaleDateString('pt-BR')}</td>
                            <td className="text-end">
                                <Link 
                                    to={`/admin/campaigns/${camp.id}/items`} 
                                    className="btn btn-sm btn-outline-warning me-2"
                                >
                                    Items/Prêmios
                                </Link>
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
                        </>
                    )}
                />
            </div>
        </>
    );
}
