import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectWallet from './pages/ConnectWallet';
import HomeScreen from './pages/HomeScreen';
import DetailsPage from './pages/DetailsPage';

export default function RouterPage(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/wallet" element={<ConnectWallet/>}/>
      </Routes>
    </Router>
  )

}