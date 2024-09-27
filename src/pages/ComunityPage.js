import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { TitleGradient } from './Home';
import { Button } from '../components/Popup';
import Icon from '../assets/images/strangething.svg';
import RingL from '../assets/images/ringL.svg'
import RingR from '../assets/images/ringR.svg'
import backgroundImage from '../assets/images/sqbg.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightGradient from '../assets/images/arrowright.svg';
import ArrowRightGray from "../assets/images/arrowrightgray.svg"
import { TribeContext } from "../Context/TribeContext";
import { UserContext } from '../Context/UserContext';
import { useNavigate } from "react-router-dom";
import Popup, { Input } from "../components/Popup"

const CommunityPage = () => {
    const navigate = useNavigate();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [preloadedQRCode, setPreloadedQRCode] = useState(null);
    const qrcodevalue = "https://t.me/";
    const { tribe, leaveMyTribe } = useContext(TribeContext);
    const { user } = useContext(UserContext);
    useEffect(() => {
        const preloadQRCode = () => {
            const canvas = document.createElement('canvas');
            const qrCodeElement = document.createElement('div');
            qrCodeElement.style.width = '256px';
            qrCodeElement.style.height = '256px';

            document.body.appendChild(qrCodeElement);

            const qrCode = <QRCode value={qrcodevalue} size={256} />;
            ReactDOM.render(qrCode, qrCodeElement);

            // Wait for QR code to render
            setTimeout(() => {
                const qrCodeImage = qrCodeElement.querySelector('svg');
                if (qrCodeImage) {
                    const svg = qrCodeImage.outerHTML;
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const img = new Image();
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        setPreloadedQRCode(canvas.toDataURL());
                        document.body.removeChild(qrCodeElement);
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(svg);
                }
            }, 100);
        };

        preloadQRCode();

        return () => {
            setPreloadedQRCode(null);
        };
    }, [qrcodevalue]);

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

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard:', text);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const handleButtonClickQR = () => {
        copyToClipboard(qrcodevalue);
    };
    const handleButtonClickLeave = () => {
        leaveMyTribe(user.telegram_id, user.tribe)
        navigate("/home");
    };
    return (
        <CommunityContainer>
            <Header>
                <img src={Icon} width="190px" />
                <CommunityTitle>{tribe ? tribe.name : "Daosis"}</CommunityTitle>
                <div className='rings'>
                    <img src={RingL} />
                    <span style={{ margin: "10px", color: 'white' }}>{tribe ? tribe.tribe_collected : "Daosis"}</span>
                    <ArrowForwardIosIcon fontSize='10px' style={{ color: 'white' }} />
                    <img src={RingR} />
                </div>
                <div className='buttons-section'>
                    <HeaderButton onClick={handleButtonClick}>invite</HeaderButton>
                    <HeaderButton onClick={handleButtonClickLeave}>leave</HeaderButton>

                </div>
            </Header>
            <div className='header-tribe'>
                <h2>Your tribe</h2>
                <Link to="top-tribes" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='see-all'>
                        <h3>see all</h3>
                        <img src={ArrowRightGradient} />
                    </div>
                </Link>
            </div>
            <TribeSection>
                <TribeList>
                    <TribeListItem>
                        <span className='text-gray'>perks</span>
                        <span className='text-white'>x10 to Farming</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span className='text-gray'>pribe rank</span>
                        <span className='text-white'>{tribe.position}</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span className='text-gray'>your personal rank</span>
                        <span className='text-white'>{user.tribe_role}</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span className='text-gray'>tribe collected</span>
                        <span className='text-white'>{tribe.tribe_collected}</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span className='text-gray'>members</span>
                        <span className='text-white'>{tribe.members}</span>
                    </TribeListItem>
                </TribeList>
            </TribeSection>
            <div className='header-tribe'>
                <h2>leaderboard</h2>
                <Link to="/community/top-tribes" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='see-all'>
                        <h3>see all</h3>
                        <img src={ArrowRightGradient} />
                    </div>
                </Link>
                {/* <div className='see-all-gray'>
                    <h3>see all</h3>
                    <img src={ArrowRightGray} />
                </div> */}
            </div>
            <LeaderboardSection>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet
                    </p>
                    <Link to="/"><LeaderboardButton>btn</LeaderboardButton></Link>

                </div>
            </LeaderboardSection>
            <Popup
                isVisible={isPopupVisible}
                title="invite to tribe"
                icon={
                    <QRCodeContainer>
                        {preloadedQRCode ? (
                            <img src={preloadedQRCode} alt="QR Code" style={{ width: '100%' }} />
                        ) : (
                            <QRCode value={qrcodevalue} size={256} />
                        )}
                    </QRCodeContainer>
                }
                onClose={handleClosePopup}
                onSave={handleSave}
                content={
                    <div>
                        <Button>send</Button>
                        <ButtonOutlined onClick={handleButtonClickQR}>copy link</ButtonOutlined>
                    </div>
                }
            />
        </CommunityContainer>
    );
};
const ButtonOutlined = styled(Button)`
  background: 
      linear-gradient(#000, #000) padding-box,
      linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%) border-box;
  color: #ffffff;
  border: 3px solid transparent;
  border-radius: 40px;
  display: inline-block;
  font-size: 20px;
`;

const QRCodeContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  max-width: 100%;
  height: auto;
`;
const CommunityContainer = styled.div`
    background-color: #000;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
     background-attachment: fixed;
    background-color: transparent; /* Dark background */
    color: #ffffff;  /* Text color */
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    .rings{

        display:flex;
        flex-direction: row;
        align-items: center;
        align-content:center;
        justify-content: space-around;
    }
    .buttons-section{
        display: flex;
        flex-direction: row;
    }
    .header-tribe{
        align-items:center;
        margin-top:20px;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        font-size:16px;
        h2{
            font-size: 16px;
            font-weight: 700;
            color:white;
        }
    }
    .see-all{
        font-weight:400;
        display: flex;
        flex-direction: row;
        align-items:center;
        h3{
            font-size: 16px;
            background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
            -webkit-background-clip: text;
            color: transparent;
        }
        img{
            width:6px;
            margin: 10px 0 10px 5px;
        }
    }
    .see-all-gray{
        font-weight:400;
        display: flex;
        flex-direction: row;
        align-items:center;
        h3{
            color: rgba(186, 186, 186, 1);
            font-size: 16px;
        }
        img{
            width:6px;
            margin: 10px 0 10px 5px;
        }
    }
`;

const Header = styled.div`
    margin-top:70px;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`;

const CommunityTitle = styled(TitleGradient)`
    font-size: 24px;
    margin: 0;
`;

const HeaderButton = styled(Button)`
    font-weight:400;
    border: none;
    padding: 10px;
    width: 42vw;
    color: white;
    cursor: pointer;
    margin-left: 5px;
`;
const LeaderboardButton = styled(Button)`
    font-weight:400;
    border: none;
    padding: 10px;
    width: 20vw;
    color: white;
    cursor: pointer;
    margin-left: 5px;
`
const TribeSection = styled.div`
    margin-top: 10px;
    background: rgba(20, 20, 20, 1);
    padding: 0 15px;
    border-radius:20px;
`;

const TribeList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const TribeListItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .text-gray {
        font-weight:400;
        color: rgba(186, 186, 186, 1) !important; /* Apply the color here */
    }

    .text-white {
        font-weight:700;
        color: rgba(255, 255, 255, 1) !important; /* Example for different color if needed */
    }
`;

const LeaderboardSection = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    background: rgba(20, 20, 20, 1);
    padding: 0 15px;
    border-radius: 15px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    div{
        margin: 20px 0 20px 0;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    
`;
export default CommunityPage;
