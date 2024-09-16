import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import WalletSettings from './pages/WalletSettings'; // Import the new page
import CommunityPage from "./pages/ComunityPage";
function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '56px', backgroundColor: '#000', color: '#fff' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wallet-settings" element={<WalletSettings />} />
          <Route path="/community" element={<CommunityPage />} />
          {/* Add the new route */}
        </Routes>
      </div>
      <NavBar />
    </Router>
  );
}

export default App;
