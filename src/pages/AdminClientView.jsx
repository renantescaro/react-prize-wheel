import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from '../components/PageHeader';

export default function AdminClientView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        login: '',
        document: '',
        birthday: '',
        creation_date: '',
        is_active: false,
        account_id: 0,
        account_value: 0,
    });

    useEffect(() => {
            fetchClient();
    }, []);

    const fetchClient = async () => {
        try {
            const response = await api.get(`/v1/admin/client/${id}`);
            const data = response.data;
            setFormData({
                ...data,
                birthday: data.birthday.split('T')[0],
                creation_date: data.creation_date.split('T')[0]
            });
        } catch (err) {
            alert("Erro ao carregar dados.");
            navigate('/admin/clients');
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <PageHeader title={"Cliente"} />

                <div className="card shadow-sm">
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name} readOnly />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Login</label>
                                    <input
                                        type="text"
                                        name="login"
                                        className="form-control"
                                        value={formData.login} readOnly />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Documento</label>
                                    <input
                                        type="text"
                                        name="document"
                                        className="form-control"
                                        value={formData.document} readOnly />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Aniversário</label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        className="form-control"
                                        value={formData.birthday}
                                        readOnly />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Data Criação</label>
                                    <input
                                        type="date"
                                        name="creation_date"
                                        className="form-control"
                                        value={formData.creation_date}
                                        readOnly />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Saldo</label>
                                    <input
                                        type="number"
                                        name="account_value"
                                        step="0.01"
                                        className="form-control"
                                        value={formData.account_value}
                                        readOnly />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
