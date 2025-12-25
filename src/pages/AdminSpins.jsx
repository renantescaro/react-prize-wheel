import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import DataTable from '../components/DataTable';

export default function AdminSpins() {
    const [spins, setSpins] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { label: 'ID' },
        { label: 'Cliente' },
        { label: 'Campanha' },
        { label: 'Valor do Prêmio' },
        { label: 'Detalhes' },
        { label: 'Item ID', className: 'text-center' }
    ];

    useEffect(() => {
        fetchSpins();
    }, []);

    const fetchSpins = async () => {
        try {
            const response = await api.get('/v1/spin');
            setSpins(response.data);
        } catch (err) {
            console.error("Erro ao carregar giros", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Log de Giros (Spins)</h2>
                </div>

                <DataTable
                    headers={columns}
                    data={spins}
                    loading={loading}
                    renderRow={(spin) => (
                        <>
                            <td>{spin.id}</td>
                            <td>
                                <Link
                                    to={`/admin/clients/view/${spin.client_id}`}
                                    className="badge bg-light text-dark border"
                                >Client #{spin.client_id}</Link>
                            </td>
                            <td>
                                <Link
                                    to={`/admin/campaigns/edit/${spin.campaign_id}`} 
                                    className="badge bg-secondary"
                                >Camp. #{spin.campaign_id}</Link>
                            </td>
                            <td className="fw-bold text-success">
                                R$ {spin.result_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td>{spin.prize_details}</td>
                            <td className="text-center">
                                <small className="text-muted">{spin.campaign_item_winner_id}</small>
                            </td>
                        </>
                    )}
                />
            </div>
        </>
    );
}
