import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from '../components/PageHeader';

export default function AdminUserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        login: '',
        company_id: 0,
        is_active: true
    });

    useEffect(() => {
        if (isEdit) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await api.get(`/v1/user/${id}`);
            setFormData({
                ...response.data,
                password: '' 
            });
        } catch (err) {
            alert("Erro ao carregar usuário.");
            navigate('/admin/users');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData };
            if (isEdit && !dataToSend.password) {
                delete dataToSend.password;
            }

            if (isEdit) {
                await api.put(`/v1/user/${id}`, dataToSend);
            } else {
                await api.post('/v1/user', dataToSend);
            }
            navigate('/admin/users');
        } catch (err) {
            alert("Erro ao salvar usuário.");
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <PageHeader title={isEdit ? "Editar Usuário" : "Novo Usuário"} />

                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome de Usuário</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-control" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Login</label>
                                    <input 
                                        type="text" 
                                        name="login" 
                                        className="form-control" 
                                        value={formData.login} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Senha {isEdit && <small className="text-muted">(Deixe em branco para não alterar)</small>}
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required={!isEdit} 
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="form-check form-switch">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="is_active" 
                                        id="userActive"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="userActive">
                                        Usuário Ativo
                                    </label>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => navigate('/admin/users')}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary px-5">
                                    {isEdit ? "Atualizar" : "Criar Usuário"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
