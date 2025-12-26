import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:'',
        login:'',
        document:'',
        birthday:'',
        password:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/v1/client', formData);
            navigate('/login');
        } catch (err) {
            alert("Erro ao criar cliente.");
        }
    };

    return (
        <>
            <div className="container">
                <PageHeader title={"faça seu cadastro!"} />

                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome Completo</label>
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
                                    <label className="form-label">CPF</label>
                                    <input 
                                        type="text" 
                                        name="document" 
                                        className="form-control" 
                                        value={formData.document} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Data Nascimento</label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        className="form-control"
                                        value={formData.birthday}
                                        onChange={handleChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
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
                                        Senha
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button type="submit" className="btn btn-primary px-5">
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
