import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { label: 'ID' },
        { label: 'Nome' },
        { label: 'Login' },
        { label: 'Data Criação' },
        { label: 'Status' },
        { label: 'Ações', className: 'text-end' }
    ];

    useEffect(() => {
        api.get('/v1/user')
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await api.delete(`/v1/admin/user/${id}`);
                setUsers(users.filter(c => c.id !== id));
            } catch (err) {
                alert("Erro ao excluir usuário.");
            }
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <PageHeader
                    title="Usuários"
                    buttonText="Novo Usuário"
                    buttonLink="/admin/users/new"
                />
                <DataTable
                    headers={columns}
                    data={users}
                    loading={loading}
                    renderRow={(user) => (
                        <>
                            <td>{user.id}</td>
                            <td><strong>{user.name}</strong></td>
                            <td><strong>{user.login}</strong></td>
                            <td>{new Date(user.creation_date).toLocaleDateString()}</td>
                            <td>
                                <span className={`badge bg-${user.is_active ? 'success' : 'secondary'}`}>
                                    {user.is_active ? 'Ativo' : 'Inativo'}
                                </span>
                            </td>
                            <td className="text-end">
                                <Link
                                    to={`/admin/users/edit/${user.id}`}
                                    className="btn btn-sm btn-outline-primary me-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(user.id)}
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
