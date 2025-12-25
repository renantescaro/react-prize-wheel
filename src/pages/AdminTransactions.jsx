import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import DataTable from '../components/DataTable';
import { Link } from 'react-router-dom';

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { label: 'ID' },
        { label: 'Data/Hora' },
        { label: 'Cliente' },
        { label: 'Tipo' },
        { label: 'Valor', className: 'text-end' }
    ];

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
                    <h2>Transações Financeiras</h2>
                </div>

                <DataTable
                    headers={columns}
                    data={transactions}
                    loading={loading}
                    renderRow={(t) => {
                        const typeInfo = formatType(t.transaction_type);
                        const isNegative = t.value < 0;
                        return (
                            <>
                                <td>{t.id}</td>
                                <td>{new Date(t.creation_time).toLocaleString('pt-BR')}</td>
                                <td>
                                    <Link
                                        to={`/admin/clients/view/${t.client_id}`}
                                        className="badge bg-light text-dark border"
                                    >Client #{t.client_id}</Link>
                                </td>
                                <td className={typeInfo.class}>{typeInfo.label}</td>
                                <td className={`text-end fw-bold ${isNegative ? 'text-danger' : 'text-success'}`}>
                                    {isNegative ? '-' : '+'} R$ {Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                            </>
                        );
                    }}
                />
            </div>
        </>
    );
}
