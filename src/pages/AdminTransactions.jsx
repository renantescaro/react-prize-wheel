import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/v1/transaction');
            setTransactions(response.data);
        } catch (err) {
            console.error("Erro ao carregar transações", err);
        } finally {
            setLoading(false);
        }
    };

    const formatType = (type) => {
        const types = {
            'DEBIT_SPIN': { label: 'Débito (Giro)', class: 'text-danger' },
            'CREDIT_PRIZE': { label: 'Crédito (Prêmio)', class: 'text-success' },
            'DEPOSIT': { label: 'Depósito', class: 'text-primary' }
        };
        return types[type] || { label: type, class: 'text-muted' };
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Movimentações Financeiras</h2>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Data/Hora</th>
                                        <th>Cliente</th>
                                        <th>Tipo</th>
                                        <th className="text-end">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td
                                            colSpan="5"
                                            className="text-center py-4">
                                            Carregando transações...</td>
                                        </tr>
                                    ) : transactions.map((t) => {
                                        const typeInfo = formatType(t.transaction_type);
                                        return (
                                            <tr key={t.id}>
                                                <td><small className="text-muted">#{t.id}</small></td>
                                                <td>{new Date(t.creation_time).toLocaleString('pt-BR')}</td>
                                                <td>Client #{t.client_id}</td>
                                                <td className={typeInfo.class}>{typeInfo.label}</td>
                                                <td className={`text-end fw-bold ${t.value < 0 ? 'text-danger' : 'text-success'}`}>
                                                    {t.value < 0 ? '-' : '+'} R$ {
                                                        Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {!loading && transactions.length === 0 && (
                                        <tr><td
                                            colSpan="5"
                                            className="text-center py-4">
                                            Nenhuma transação encontrada.</td>
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