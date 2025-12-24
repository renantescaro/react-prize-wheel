import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminClient() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <h2>Gestão de Clientes (Jogadores)</h2>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Documento</th>
                                        <th>Nascimento</th>
                                        <th>Cadastro</th>
                                        <th>Status</th>
                                        <th className="text-end">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td
                                            colSpan="7"
                                            className="text-center py-4">
                                            Carregando clientes...</td>
                                        </tr>
                                    ) : clients.map((client) => (
                                        <tr key={client.id}>
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
                                                <button
                                                    className={`btn btn-sm ${client.is_active ? 'btn-outline-danger' : 'btn-outline-success'}`}>
                                                    {client.is_active ? 'Bloquear' : 'Ativar'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && clients.length === 0 && (
                                        <tr><td
                                            colSpan="7"
                                            className="text-center py-4">
                                            Nenhum cliente encontrado.</td>
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
