import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/images/bg.jpg"; // Assuming the background image exists
import logo from "../assets/images/main-icon.svg";
import doubedIcon from "../assets/images/doubled-icon.svg";
import { TaskItem } from "./Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconOverlay from "../assets/images/icon-cash.svg";
import Popup, { Button } from "../components/Popup";
import CloseButton from "../assets/images/closebutton.svg";
import { API_BASE_URL } from "../Helpers/Api";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
const Wallet = () => {
  const [activeTab, setActiveTab] = useState("balances"); // State to track the active tab
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleWalletChange = (e) => {
    setSearchQuery(e.target.value); // Оновлення пошукового запиту
  };

  useEffect(() => {
    document.body.style.overflow = isPopupVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupVisible]);

  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handleButtonClickConnectWallet = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/connect_wallet/`, {
        telegram_id: user.telegram_id,
        wallet: searchQuery,
      });
      if (response.status === 201) {
        console.log("Wallet connection successfully:", response.data);
        setUser((prevUser) => ({
          ...prevUser,
          wallet: searchQuery,
        }));
      }
    } catch (error) {
      console.error("Error connection wallet:", error);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSave = () => {
    console.log("Save button clicked");
    setPopupVisible(false);
  };

  return (
    <Container>
      <Header>
        <h1>Congratulations!</h1>
        {user.wallet ? (
          <>
            <h2 style={{ fontSize: "2vh", margin: 10, textAlign: "center" }}>
              You Connected wallet: {user.wallet}
            </h2>
          </>
        ) : (
          <></>
        )}
        <button onClick={handleButtonClick}>
          {user.wallet ? "Edit wallet" : "Connect Wallet"}
        </button>
      </Header>

      <MainContent>
        <PointsSection>
          <PointsHeader>
            <h1>Points</h1>
            <PointsDisplay>
              <PointsValue>0$</PointsValue>
            </PointsDisplay>
          </PointsHeader>
          <TabList>
            <Tab
              active={activeTab === "balances"}
              onClick={() => setActiveTab("balances")}
            >
              balances
            </Tab>
            <Tab
              active={activeTab === "history"}
              onClick={() => setActiveTab("history")}
            >
              history
            </Tab>
            {/* Animated background */}
            <AnimatedBackground activeTab={activeTab} />
          </TabList>

          {activeTab === "balances" ? (
            <BalanceContainer>
              <FixedItem>
                <div className="left-section">
                  <img width={"80px"} src={doubedIcon} alt="icon 1" />
                  Earn more in Drop game, Tasks and Quests.
                </div>
                <button>
                  <ArrowForwardIosIcon fontSize="small" />
                </button>
              </FixedItem>

              <BalanceItem>
                <div className="left-section">
                  <img src={logo} alt="task icon" />
                  <div>
                    <h3>main title</h3>
                    <p>subtitle</p>
                  </div>
                </div>
                <button onClick={handleButtonClick}>btn</button>
              </BalanceItem>
            </BalanceContainer>
          ) : (
            <HistoryContainer>
              {/* Replace with your history content */}
              <p>No history available</p>
            </HistoryContainer>
          )}
        </PointsSection>
      </MainContent>

      <Popup
        isVisible={isPopupVisible}
        title="Enter your wallet address"
        icon={<img src={IconOverlay} />}
        onClose={handleClosePopup}
        onSave={handleSave}
        content={
          <div>
            <input
              type="text"
              placeholder="Wallet Address"
              value={searchQuery}
              onChange={handleWalletChange}
              style={{
                border: "2px solid rgba(220, 220, 220, 1)",
                borderRadius: "100px",
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                marginTop: "10px",
                color: "rgba(255, 255, 255, 0.8)",
                backgroundColor: "transparent",
                outline: "none",
              }}
            />
            <Button onClick={handleButtonClickConnectWallet}>
              {user.wallet ? "Edit wallet" : "Connect Wallet"}
            </Button>
          </div>
        }
      />
    </Container>
  );
};

const BalanceItem = styled(TaskItem)``;

const FixedItem = styled.div`
  background: rgba(20, 20, 20, 1);
  border-radius: 12px;
  padding: 9px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left-section {
    display: flex;
    align-items: center;
  }
  p {
    color: rgba(133, 133, 133, 1);
  }
  img {
    margin-right: 10px;
  }
  button {
    max-height: 60px;
    background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 100px;
    cursor: pointer;

    svg {
      font-size: 16px;
    }
  }
`;

const Container = styled.div`
  padding: 20px;
  background-color: #000;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 20px 20px 20px;
  h1 {
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }

  button {
    background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
    color: #fff;
    padding: 12px 40px;
    font-size: 14px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* Enable scrolling */
`;

const PointsSection = styled.div`
  padding: 20px;
`;

const PointsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PointsDisplay = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  align-items: center;
`;

const PointsValue = styled.span`
  background: linear-gradient(
    90deg,
    rgba(46, 235, 155, 0.5) 0%,
    rgba(36, 179, 239, 0.5) 100%
  );
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 400;
`;

const TabList = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  color: ${(props) => (props.active ? "#fff" : "#888")};
  font-size: 16px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  border-radius: 100px;
  &:hover {
    color: #fff;
  }
`;

const AnimatedBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => (props.activeTab === "balances" ? "0%" : "50%")};
  width: 50%;
  height: 40px;
  background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
  border-radius: 100px;
  transition: left 0.3s ease-in-out;
  z-index: 0;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const HistoryContainer = styled.div`
  p {
    color: #888;
  }
`;

export default Wallet;
