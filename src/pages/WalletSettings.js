import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/images/sqbg.png'; // Assuming the background image exists
import chevronDown from "../assets/images/chevron-down.svg";
import Qr from "../assets/images/qr.svg";
import IconOverlay from "../assets/images/icon-cash.svg"
import { Link } from 'react-router-dom';

const WalletSettings = () => {
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


    return (
        <Container>
            <div>
                <Header>
                    <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={chevronDown} alt="Back to settings" />
                    </Link>
                    <h1>wallet settings</h1>
                    <br />
                </Header>
                <Step>
                    <Dot />
                    <div>
                        <h3>lorem ipsum dolor</h3>
                        <p>subtitle</p>
                    </div>
                </Step>
                <Step>
                    <Dot />
                    <div>
                        <h3>lorem ipsum dolor</h3>
                        <p>subtitle</p>
                    </div>
                </Step>
                <Step>
                    <Dot />
                    <div>
                        <h3 style={{ marginBottom: "7px" }}>replenishment address</h3>
                        <div className='inline'>
                            <img src={Qr} alt="QR Code" />
                            <div className='incolumn'>
                                <p>subtitle</p>
                                <h1>Lorem ipsum dolor sit amet</h1>
                            </div>
                        </div>
                    </div>
                </Step>
            </div>
            <br style={{ marginTop: "20px" }} />
            <ChangeAddress onClick={handleButtonClick} style={{ marginBottom: "40px" }}>
                change address
            </ChangeAddress>

            {isPopupVisible && (
                <PopupOverlay>
                    <br style={{ marginBottom: "300px" }} />
                    <PopupContainer>
                        <CloseButton onClick={handleClosePopup}>×</CloseButton>
                        <img src={IconOverlay} width={"120px"} />
                        <h2>enter your wallet address</h2>
                        <Input placeholder="input" />
                        <Button onClick={handleClosePopup}>save</Button>
                    </PopupContainer>

                </PopupOverlay>
            )}
        </Container>
    );
};
const Input = styled.input`
    border: 2px solid rgba(220, 220, 220, 1);
    border-radius: 100px;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.8);
    outline: none;
    background-color: transparent;
    &::placeholder {
        color: rgba(220, 220, 220, 1);
        font-weight: 400;
    }
`;
// Styled Components
const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 1001;
    backdrop-filter: blur(5px);
`;

const PopupContainer = styled.div`
    background: rgba(20, 20, 20, 1);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 90%;
    max-width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
    font-size: 36px;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    -webkit-background-clip: text;
    color: transparent;
    }
`;

const Button = styled.button`
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    color: #fff;
    width: 350px;
    padding: 12px 16px;
    font-size: 20px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    margin-top: 20px;
`;

const CloseButton = styled.button`
    position: relative;
    left: 170px;
    bottom: 40px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
`;
const ChangeAddress = styled.button`
  background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  width: 343px;
  color: #fff;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  font-size: 20px;
`;
const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  background-color: #000;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  .inline {
    display: flex;
    flex-direction: row;
    align-items: center; /* Ensure items are centered if that's desired */
  }
  .incolumn {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left; 
    justify-content: center;
    h1 {
        color: rgba(186, 186, 186, 1);
        font-size: 14px;
        font-weight: 700;
    }
    p {
        font-weight: 400 !important;
        font-size: 14px !important;
        text-align: left !important;
    }
  }
`;
const Header = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  
    h1 {
    font-size: 20px;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    -webkit-background-clip: text;
    color: transparent;
  }
`
const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  border-radius: 50%;
  margin-right: 15px;
  position: relative;

  /* Add the line */
  &::after {
    content: "";
    position: absolute;
    top: 100%; /* Start the line from the bottom of the dot */
    left: 50%;
    transform: translateX(-50%);
    width: 2px; /* Thickness of the line */
    height: 120px; /* Height of the line */
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  }
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
  position: relative; /* To position the line correctly */

  /* Target the last Step to hide the line */
  &:last-child ${Dot}::after {
    display: none;
  }

  h3 {
    font-size: 20px;
    font-weight: 400 !important;
    margin: 0;
  }

  p {
    font-weight: 400 !important;
    font-size: 14px;
    margin: 0;
    color: rgba(90, 90, 90, 1);
  }

  &:not(:last-child) {
    /* Add extra space for the line to be visible */
    padding-bottom: 40px;
  }
`;

export default WalletSettings;
