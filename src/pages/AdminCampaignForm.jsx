import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from '../components/PageHeader';

export default function AdminCampaignForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        spin_price: 0,
        company_id: 0,
    });

    useEffect(() => {
        if (isEdit) {
            fetchCampaign();
        }
    }, [id]);

    const fetchCampaign = async () => {
        try {
            const response = await api.get(`/v1/admin/campaign/${id}`);
            const data = response.data;
            setFormData({
                ...data,
                start_date: data.start_date.split('T')[0],
                end_date: data.end_date.split('T')[0]
            });
        } catch (err) {
            alert("Erro ao carregar dados.");
            navigate('/admin/campaigns');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/v1/admin/campaign/${id}`, formData);
            } else {
                await api.post('/v1/admin/campaign', formData);
            }
            navigate('/admin/campaigns');
        } catch (err) {
            alert("Erro ao salvar. Verifique os dados.");
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <PageHeader title={isEdit ? "Editar Campanha" : "Nova Campanha"} />

                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Título da Campanha</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={formData.title}
                                        onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome (Slug/URL)</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Preço do Giro (R$)</label>
                                    <input
                                        type="number"
                                        name="spin_price"
                                        step="0.01"
                                        className="form-control"
                                        value={formData.spin_price}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Data de Início</label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        className="form-control"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Data de Término</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        className="form-control"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        required />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => navigate('/admin/campaigns')}>
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-5">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
