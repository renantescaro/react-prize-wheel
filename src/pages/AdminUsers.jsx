import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/v1/user');
            setUsers(response.data);
        } catch (err) {
            console.error("Erro ao carregar usuários", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestão de Usuários</h2>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Data de Criação</th>
                                        <th>Status</th>
                                        <th className="text-end">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-4"
                                            >Carregando...</td>
                                        </tr>
                                    ) : users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td><strong>{user.name}</strong></td>
                                            <td>{new Date(user.creation_date).toLocaleDateString('pt-BR')}</td>
                                            <td>
                                                {user.is_active ? (
                                                    <span className="badge bg-success">Ativo</span>
                                                ) : (
                                                    <span className="badge bg-secondary">Inativo</span>
                                                )}
                                            </td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2">
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger">
                                                    Desativar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && users.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-4"
                                            >Nenhum usuário encontrado.</td>
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
