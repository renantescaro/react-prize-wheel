import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            client_login: email,
            client_secret: password,
            kind: "client"
        };

        try {
            const response = await api.post('/v1/auth', payload);

            const token = response.data.token;
            localStorage.setItem('token', token);

            navigate('/');
        } catch (err) {
            alert('Erro ao realizar login. Verifique suas credenciais.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">E-mail</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}