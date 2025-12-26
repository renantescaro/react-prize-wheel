import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from '../components/PageHeader';

export default function AdminCampaignItems() {
    const { campaignId } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, [campaignId]);

    const fetchItems = async () => {
        try {
            const response = await api.get(`/v1/admin/campaign-item/${campaignId}`);
            setItems(response.data);
        } catch (err) {
            console.error("Erro ao carregar itens", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = () => {
        const newItem = {
            id: null,
            name: '',
            title: '',
            description: '',
            color: '000000',
            value: 0
        };
        setItems([...items, newItem]);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...items];
        updatedItems[index][name] = name === 'value' ? parseFloat(value) : value;
        setItems(updatedItems);
    };

    const handleRemoveItem = async (index, itemId) => {
        try {
            if (itemId) {
                const response = await api.delete(`/v1/admin/campaign-item/${campaignId}/${itemId}`);
            }

            setItems(items.filter((_, i) => i !== index));
        } catch (err) {
            if(err.status === 409) {
                alert("Esse item já foi sorteado e não pode ser apagado.")
                return;
            }
            alert("Erro ao apagar item.");
        }
    };

    const handleSave = async () => {
        try {
            const payload = items.map(({ creation_date, company_id, campaign_id, ...rest }) => rest);
            await api.post(`/v1/admin/campaign-item/${campaignId}`, payload);
            alert("Itens salvos com sucesso!");
            fetchItems();
        } catch (err) {
            alert("Erro ao salvar itens.");
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container pb-5">
                <PageHeader title="Configurar Fatias da Roleta" />

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Título</th>
                                        <th>Nome</th>
                                        <th>Valor (R$)</th>
                                        <th>Cor</th>
                                        <th>Descrição</th>
                                        <th className="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="id"
                                                    className="form-control form-control-sm"
                                                    value={item.id}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    readOnly />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="form-control form-control-sm"
                                                    value={item.title}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    required />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control form-control-sm"
                                                    value={item.name}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    required />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="value"
                                                    className="form-control form-control-sm"
                                                    value={item.value}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    step="0.01"
                                                    required />
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <input
                                                        type="color"
                                                        name="color"
                                                        value={`#${item.color.replace('#', '')}`}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace('#', '');
                                                            const updated = [...items];
                                                            updated[index].color = val;
                                                            setItems(updated);
                                                        }}
                                                        className="form-control form-control-color form-control-sm" />
                                                    <small className="text-muted">#{item.color}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    className="form-control form-control-sm"
                                                    value={item.description}
                                                    onChange={(e) => handleInputChange(index, e)} />
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleRemoveItem(index, item.id)}>
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button className="btn btn-outline-primary" onClick={handleAddItem}>
                                + Adicionar Item
                            </button>
                            <div className="gap-2 d-flex">
                                <button
                                    className="btn btn-light"
                                    onClick={() => navigate('/admin/campaigns')}>
                                    Voltar
                                </button>
                                <button
                                    className="btn btn-success px-5"
                                    onClick={handleSave}
                                    disabled={items.length === 0}>
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}