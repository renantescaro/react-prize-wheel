import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrizeWheel from './pages/PrizeWheel';
import LoginAdm from './pages/LoginAdm';
import AdminHome from './pages/AdminHome';
import AdminCampaigns from './pages/AdminCampaigns';
import AdminUsers from './pages/AdminUsers';
import AdminSpins from './pages/AdminSpins';
import AdminTransactions from './pages/AdminTransactions';
import AdminClient from './pages/AdminClient';
import AdminCampaignForm from './pages/AdminCampaignForm';
import AdminUserForm from './pages/AdminUserForm';
import AdminClientView from './pages/AdminClientView';
import Register from './pages/Register';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/wheel/:campaignName" element={<PrizeWheel />} />
				<Route path="/register" element={<Register/>} />

				<Route path="/admin/login" element={<LoginAdm />} />
				<Route path="/admin/campaigns" element={<AdminCampaigns />} />
				<Route path="/admin/campaigns/new" element={<AdminCampaignForm />} />
				<Route path="/admin/campaigns/edit/:id" element={<AdminCampaignForm />} />
				<Route path="/admin/users/new" element={<AdminUserForm />} />
				<Route path="/admin/users/edit/:id" element={<AdminUserForm />} />
				<Route path="/admin/clients" element={<AdminClient />} />
				<Route path="/admin/clients/view/:id" element={<AdminClientView />} />
				<Route path="/admin/users" element={<AdminUsers />} />
				<Route path="/admin/spins" element={<AdminSpins />} />
				<Route path="/admin/transactions" element={<AdminTransactions />} />
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/admin/home" element={<AdminHome />} />
			</Routes>
		</Router>
	);
}

export default App;
