import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useParams } from 'react-router-dom'
import api from '../services/api';

export default function PrizeWheel() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [wheelData, setWheelData] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const { campaignName } = useParams();

    useEffect(() => {
        const fetchWheelData = async () => {
            try {
                const response = await api.get(`/v1/prize-wheel/${campaignName}`);
                const { campaign, items } = response.data;

                setCampaign(campaign);

                const formattedData = items.map((item) => ({
                    option: item.title,
                    style: { backgroundColor: `#${item.color}`, textColor: 'white' },
                    id_original: item.id,
                    description: item.description
                }));

                setWheelData(formattedData);
            } catch (err) {
                console.error("Erro ao carregar roleta", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWheelData();
    }, [campaignName]);

    const handleSpinClick = async () => {
        if (mustSpin) return;

        try {
            const response = await api.get(`/v1/prize-wheel/spin/${campaignName}`);
            const spinResult = response.data;

            console.log('spinResult', spinResult)
            console.log('wheelData', wheelData)

            const indexFound = wheelData.findIndex(
                item => item.id_original === spinResult.campaign_item_winner_id
            );
            console.log("indexFound", indexFound)

            if (indexFound !== -1) {
                setResult(spinResult);
                setPrizeNumber(indexFound);
                setMustSpin(true);
            } else {
                alert("Erro ao sincronizar prêmio.");
            }
        } catch (err) {
            alert("Erro ao girar a roleta. Verifique se você tem saldo ou permissão.");
            console.error(err);
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
                                    alert(`Resultado: ${result?.prize_details}`);
                                }}
                            />
                        )}
                    </div>

                    <button
                        className="btn btn-success btn-lg px-5 shadow"
                        onClick={handleSpinClick}
                        disabled={mustSpin}
                    >
                        {mustSpin ? 'Sorteando...' : 'GIRAR AGORA!'}
                    </button>
                </div>
            </div>
        </div>
    );
}