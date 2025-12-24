import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import DataTable from '../components/DataTable';

export default function AdminClient() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { label: 'ID' },
        { label: 'Nome' },
        { label: 'Documento' },
        { label: 'Nascimento' },
        { label: 'Cadastro' },
        { label: 'Status' },
        { label: 'Ações', className: 'text-end' }
    ];

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get('/v1/admin/client');
            setClients(response.data);
        } catch (err) {
            console.error("Erro ao carregar clientes", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Clientes (Jogadores)</h2>
                </div>

                <DataTable
                    headers={columns}
                    data={clients}
                    loading={loading}
                    renderRow={(client) => (
                        <>
                            <td>{client.id}</td>
                            <td><strong>{client.name}</strong></td>
                            <td>{client.document}</td>
                            <td>{new Date(client.birthday).toLocaleDateString('pt-BR')}</td>
                            <td>{new Date(client.creation_date).toLocaleDateString('pt-BR')}</td>
                            <td>
                                {client.is_active ? (
                                    <span className="badge bg-success">Ativo</span>
                                ) : (
                                    <span className="badge bg-danger">Inativo</span>
                                )}
                            </td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    Detalhes
                                </button>
                                <button className={`btn btn-sm ${client.is_active ? 'btn-outline-danger' : 'btn-outline-success'}`}>
                                    {client.is_active ? 'Bloquear' : 'Ativar'}
                                </button>
                            </td>
                        </>
                    )}
                />
            </div>
        </>
    );
}
