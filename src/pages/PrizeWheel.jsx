import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import api from '../services/api';

export default function PrizeWheel() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [wheelData, setWheelData] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWheelData = async () => {
            try {
                const response = await api.get('/v1/prize-wheel/rolada-da-sorte');
                const { campaign, items } = response.data;

                setCampaign(campaign);

                const formattedData = items.map((item) => ({
                    option: item.title,
                    style: { backgroundColor: `#${item.color}`, textColor: 'white' },
                    ...item
                }));

                setWheelData(formattedData);
            } catch (err) {
                console.error("Erro ao carregar roleta", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWheelData();
    }, []);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    if (loading) return <div className="container mt-5 text-center">Carregando...</div>;

    return (
        <div className="container mt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="mb-2">{campaign?.title}</h1>
                    <p className="text-muted mb-4">{campaign?.description}</p>

                    <div className="d-flex justify-content-center mb-4">
                        {wheelData.length > 0 && (
                            <Wheel
                                mustStartSpinning={mustSpin}
                                prizeNumber={prizeNumber}
                                data={wheelData}
                                onStopSpinning={() => {
                                    setMustSpin(false);
                                    alert(`Parabéns! Você ganhou: ${wheelData[prizeNumber].description}`);
                                }}
                            />
                        )}
                    </div>

                    <button
                        className="btn btn-success btn-lg px-5"
                        onClick={handleSpinClick}
                        disabled={mustSpin}
                    >
                        {mustSpin ? 'Girando...' : 'GIRAR!'}
                    </button>
                </div>
            </div>
        </div>
    );
}