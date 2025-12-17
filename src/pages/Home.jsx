import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="container mt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-4 mb-4">Bem-vindo à nossa App</h1>
                    <p className="lead mb-4">
                        {isLoggedIn
                            ? "Você está logado e tem acesso à área restrita."
                            : "Esta é a página pública inicial."}
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="btn btn-primary btn-lg">
                                    Entrar
                                </Link>
                                <Link to="/register" className="btn btn-outline-secondary btn-lg">
                                    Cadastrar
                                </Link>
                            </>
                        ) : (
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-danger btn-lg"
                                >
                                    Sair (Logout)
                                </button>
                                <br /><br />
                                <div>
                                    <Link to="/wheel" className="btn btn-primary btn-lg">
                                        Rolada da Sorte
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}