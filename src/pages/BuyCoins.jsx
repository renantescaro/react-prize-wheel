import { useState } from 'react';
import Header from "../components/Header";
import api from '../services/api';

export default function BuyCoins() {
    const [valueToBuy, setValueToBuy] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/v1/buy-coins', {
                value: parseFloat(valueToBuy)
            });
            alert("Depósito realizado com sucesso!");
            setValueToBuy("");
            window.dispatchEvent(new Event('updateBalance'));
        } catch (err) {
            alert("Erro ao processar pagamento.");
        } finally {
            setLoading(false);
        }
    };

    const quickValues = [10, 20, 50, 100];

    return (
        <div className="bg-light min-vh-100">
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow border-0">
                            <div className="card-body p-4 text-center">
                                <div className="mb-4">
                                    <div className="display-4 text-primary mb-2">
                                        💰
                                    </div>
                                    <h3 className="fw-bold">Compre Moedas</h3>
                                    <p className="text-muted">Adicione saldo à sua conta para girar a roleta</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4 text-start">
                                        <label className="form-label fw-bold small text-uppercase text-muted">
                                            Valor do Depósito (R$)
                                        </label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-white">R$</span>
                                            <input
                                                type="number"
                                                step="1.0"
                                                className="form-control border-start-0 ps-0"
                                                placeholder="0,00"
                                                value={valueToBuy}
                                                onChange={(e) => setValueToBuy(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between gap-2 mb-4">
                                        {quickValues.map(val => (
                                            <button
                                                key={val}
                                                type="button"
                                                className="btn btn-outline-primary btn-sm flex-fill"
                                                onClick={() => setValueToBuy(val.toString())}
                                            >
                                                + R$ {val}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 shadow-sm py-3 fw-bold"
                                        disabled={loading || !valueToBuy}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                        ) : 'Confirmar Compra'}
                                    </button>
                                </form>
                            </div>
                            <div className="card-footer bg-white text-center py-3 border-0">
                                <small className="text-muted">
                                    Pagamento seguro e processamento instantâneo.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}