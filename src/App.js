import "./App.css";
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import WalletSettings from './pages/WalletSettings'; // Import the new page
import CommunityPage from "./pages/ComunityPage";
import TopTribes from "./pages/TopTribes";
import Welcome from "./pages/Welcome"
import axios from "axios";
import { UserProvider } from "./Context/UserContext";
import { RewardsProvider } from "./Context/RewardsContext";
import { TasksProvider } from "./Context/TasksContext";
import { TribeProvider } from "./Context/TribeContext";
import { API_BASE_URL } from "./Helpers/Api";
import PreLoad from "./pages/LoadingPage";
import StartTribe from './pages/StartTribe'
import SearchTribe from './pages/SearchTribe'
function App() {
  const [userData, setUserData] = useState(null);
  const [refererId, setRefererId] = useState("");
  const [reg_date, setRegDate] = useState(null);
  const location = useLocation();
  const showBottomNavbar = location.pathname !== '/welcome' && location.pathname !== '/preload';

  useEffect(() => {
    const initializeTelegramWebApp = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const webAppData = window.Telegram.WebApp.initDataUnsafe;
        const user = webAppData.user;
        const urlParams = new URLSearchParams(window.location.search);
        const hhh = urlParams.get('tgWebAppStartParam');
        setRefererId(hhh);
        if (refererId) {
          console.log('Referer ID:', refererId);
        }
        if (user) {
          const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
          setRegDate(randomDate);
        } else {
          const defaultUser = {
            username: "bogdan_krvsk",
            first_name: "bogdan_krvsk 🐵",
            id: 874423521,
            is_premium: true,
          };
          setUserData(defaultUser);
          const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
          setRegDate(randomDate);
        }
      } else {
        const defaultUser = {
          username: "bogdan_krvsk",
          first_name: "bogdan_krvsk 🐵",
          id: 874423521,
          is_premium: true,
        };
        setUserData(defaultUser);
        const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
        setRegDate(randomDate);
      }
    };
    initializeTelegramWebApp();
  }, []);

  if (!userData) {
    return <div style={{color:"red"}}>Loading...</div>;
  }

  return (
    <UserProvider userData={userData}>
      <div style={{ paddingBottom: '56px', backgroundColor: '#000', color: '#fff' }}>
        <Routes>
          <Route path="/preload" element={<PreLoad telegramId={userData.id} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wallet-settings" element={<WalletSettings />} />
          <Route path="/community" element={<CommunityPage />} >
            <Route path="top-tribes" element={<TopTribes />} />
          </Route>
          <Route path="/start-tribe" element={<StartTribe />}>
            <Route path="search" element={<TopTribes />} />
          </Route>
          <Route path="/welcome" element={<Welcome userData={userData} refererId={refererId} />} />
          <Route path="/start-tribe" element={<StartTribe />} />
          <Route path="/search" element={<SearchTribe />} />
          <Route path='*' element={<Navigate to='/preload' />} />
          {/* Add the new route */}
        </Routes>
      </div>
      {showBottomNavbar && <NavBar />}
    </UserProvider>
  );
}
function AppWrapper() {
  const [showModal, setShowModal] = useState(false);
  const manifestUrl = new URL('/tonconnect/tonconnect-manifest.json', window.location.origin);

  return (

    <TribeProvider>
      <TasksProvider>
        <RewardsProvider>
          <Router>
            <App />
          </Router>
        </RewardsProvider>
      </TasksProvider>
    </TribeProvider>

  );
}

export default AppWrapper;
