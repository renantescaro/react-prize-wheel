import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrizeWheel from './pages/PrizeWheel';
import LoginAdm from './pages/LoginAdm';
import AdminHome from './pages/AdminHome';
import AdminCampaigns from './pages/AdminCampaigns';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/wheel/:campaignName" element={<PrizeWheel />} />
				<Route path="/register" element={<div>Página de Cadastro (Em breve)</div>} />

				<Route path="/admin/login" element={<LoginAdm />} />
				<Route path="/admin/campaigns" element={<AdminCampaigns />} />
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/admin/home" element={<AdminHome />} />
			</Routes>
		</Router>
	);
}

export default App;
