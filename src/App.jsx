import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrizeWheel from './pages/PrizeWheel';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/wheel/:campaignName" element={<PrizeWheel />} />
				<Route path="/register" element={<div>Página de Cadastro (Em breve)</div>} />
			</Routes>
		</Router>
	);
}

export default App;
