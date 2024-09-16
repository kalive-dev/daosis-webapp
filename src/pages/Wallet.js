import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/images/bg.jpg'; // Assuming the background image exists
import logo from '../assets/images/main-icon.svg';
import doubedIcon from "../assets/images/doubled-icon.svg"
import { TaskItem } from './Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconOverlay from "../assets/images/icon-cash.svg"
import Popup, { Button } from '../components/Popup';
import CloseButton from "../assets/images/closebutton.svg"
const Wallet = () => {
  const [activeTab, setActiveTab] = useState('balances'); // State to track the active tab
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isPopupVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPopupVisible]);

  const handleButtonClick = () => {
    setPopupVisible(true);
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
        <h1>lorem ipsum dolor sit amet</h1>
        <button onClick={handleButtonClick}>btn</button>
      </Header>

      <PointsSection>
        <PointsHeader>
          <h1>points</h1>
          <PointsDisplay>
            <PointsValue>$0</PointsValue>
          </PointsDisplay>
        </PointsHeader>
        <TabList>
          <Tab active={activeTab === 'balances'} onClick={() => setActiveTab('balances')}>
            balances
          </Tab>
          <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            history
          </Tab>
          {/* Animated background */}
          <AnimatedBackground activeTab={activeTab} />
        </TabList>

        {activeTab === 'balances' ? (
          <BalanceContainer>
            <FixedItem>
              <div className='left-section'>
                <img width={"80px"} src={doubedIcon} alt="icon 1" />

                <p>lorem ipsum dolor sit amet consectetur adipiscing elit</p>
              </div>
              <button>
                <ArrowForwardIosIcon fontSize='small' />
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
              style={{
                border: "2px solid rgba(220, 220, 220, 1)",
                borderRadius: "100px",
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                marginTop: "10px",
                color: "rgba(255, 255, 255, 0.8)",
                backgroundColor: "transparent",
                outline: "none"
              }}
            />
            <Button>main btn</Button>
          </div>
        }
      />
    </Container>
  );
};
const BalanceItem = styled(TaskItem)`
  
`
// Styled components

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
  p{
    color: rgba(133, 133, 133, 1);

  }
  img{
    margin-right: 10px;
  }
  button {
    max-height:60px;
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    
    /* Icon size correction */
    svg {
      font-size: 16px; /* Set the icon size to 24px */
    }
  }
`;


const Container = styled.div`
  padding: 20px;
  background-color: #000;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px 20px 20px 20px;
  
  h1 {
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }

  button {
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    color: #fff;
    padding: 12px 40px;
    font-size: 14px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }
`;

const PointsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PointsSection = styled.div`
  position: fixed; /* Fixes the section on the viewport */
  top: 350px; /* Adjust this to wherever you want it placed */
  left: 0;
  right: 0;
  padding: 20px;
  background-color: linear-gradient(to top,rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0)); /* Make sure the background is visible */  z-index: 100; /* Ensure it stays on top of other content */
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const PointsDisplay = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  align-items: center;
`;

const PointsValue = styled.span`
  background: linear-gradient(90deg, rgba(46, 235, 155, 0.5) 0%, rgba(36, 179, 239, 0.5) 100%);
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
  color: ${(props) => (props.active ? '#fff' : '#888')};
  font-size: 16px;
  cursor: pointer;
  position: relative;
  z-index: 1; /* Ensure the text is above the animated background */
  border-radius: 100px;
  &:hover {
    color: #fff;
  }
`;

// Background that moves under the text
const AnimatedBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => (props.activeTab === 'balances' ? '0%' : '50%')}; /* Move left or right based on the tab */
  width: 50%; /* Half width for two tabs */
  height: 40px;
  background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  border-radius: 100px;
  transition: left 0.3s ease-in-out; /* Smooth transition */
  z-index: 0; /* Ensure it stays behind the tabs */
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
// const BalanceItem = styled.div`
//   display: flex;

//   justify-content: space-between;
//   padding: 15px 0;

//   div {
//     display: flex;
//     flex-direction:row;
//   }
//   div.title {
//     display: flex;
//     flex-direction:column;
//   }

//   h3 {
//   text-align: left;
//     font-size: 20px;'
//     font-weight: 400;
//     margin: 0;
//   }

//   p {
//     font-size: 14px;
//     margin: 0;
//   }

//   button {
//     background-color: #00d2ff;
//     color: #fff;
//     padding: 10px 20px;
//     border-radius: 20px;
//     border: none;
//     font-size: 14px;
//     cursor: pointer;
//   }
// `;

const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: transpatent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    height: auto;
  }
`;

const HistoryContainer = styled.div`
  /* Styles for the history content */
`;

export default Wallet;
