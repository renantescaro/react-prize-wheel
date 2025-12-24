import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminSpins() {
    const [spins, setSpins] = useState([]);
    const [loading, setLoading] = useState(true);

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

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>ID Cliente</th>
                                        <th>ID Campanha</th>
                                        <th>Valor do Prêmio</th>
                                        <th>Detalhes</th>
                                        <th className="text-center">Item ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td
                                            colSpan="6"
                                            className="text-center py-4">
                                            Carregando histórico...</td>
                                        </tr>
                                    ) : spins.map((spin) => (
                                        <tr key={spin.id}>
                                            <td>{spin.id}</td>
                                            <td><span
                                                className="badge bg-light text-dark border">
                                                Client #{spin.client_id}</span>
                                            </td>
                                            <td><span
                                                className="badge bg-secondary">
                                                Camp. #{spin.campaign_id}</span>
                                            </td>
                                            <td className="fw-bold text-success">
                                                R$ {spin.result_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td>{spin.prize_details}</td>
                                            <td className="text-center"><small
                                                className="text-muted">
                                                {spin.campaign_item_winner_id}</small>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && spins.length === 0 && (
                                        <tr><td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >Nenhum registro de giro encontrado.</td>
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
