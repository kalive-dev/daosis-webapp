import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { TitleGradient, Title } from "./Home";
import styled from "styled-components";
import Popup, { Button } from "../components/Popup";
import QRCode from "react-qr-code";

import StrangeThing from "../assets/images/strangething.svg";
import { UserContext } from "../Context/UserContext";

const Friends = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [preloadedQRCode, setPreloadedQRCode] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const qrcodevalue = `https://t.me/WeArePrime_Bot/app?startapp=${user.telegram_id}`;

  useEffect(() => {
    const preloadQRCode = () => {
      const canvas = document.createElement("canvas");
      const qrCodeElement = document.createElement("div");
      qrCodeElement.style.width = "256px";
      qrCodeElement.style.height = "256px";

      document.body.appendChild(qrCodeElement);

      const qrCode = <QRCode value={qrcodevalue} size={256} />;
      ReactDOM.render(qrCode, qrCodeElement);

      setTimeout(() => {
        const qrCodeImage = qrCodeElement.querySelector("svg");
        if (qrCodeImage) {
          const svg = qrCodeImage.outerHTML;
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            setPreloadedQRCode(canvas.toDataURL());
            document.body.removeChild(qrCodeElement);
          };
          img.src = "data:image/svg+xml;base64," + btoa(svg);
        }
      }, 100);
    };

    preloadQRCode();

    return () => {
      setPreloadedQRCode(null);
    };
  }, [qrcodevalue]);

  useEffect(() => {
    document.body.style.overflow = isPopupVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
      console.log("Text copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleButtonClickQR = () => {
    copyToClipboard(qrcodevalue);
  };

  return (
    <Container>
      <ImageWrapper>
        <img src={StrangeThing} alt="icon" />
      </ImageWrapper>
      <TitleGradient>Invite your friends!</TitleGradient>
      <HowItWorks>
        <HowItWorksTitle>How it works</HowItWorksTitle>
        <Step>
          <Dot />
          <div>
            <h3>Share your invitation link</h3>
            <p>Get a 🎟 play pass for each fren</p>
          </div>
        </Step>
        <Step>
          <Dot />
          <div>
            <h3>Your friends join Daosis</h3>
            <p>And start farming points</p>
          </div>
        </Step>
        <Step>
          <Dot />
          <div>
            <h3>Score 10% from buddies</h3>
            <p>Plus an extra 2.5% from their referrals</p>
          </div>
        </Step>
      </HowItWorks>
      <InviteButton onClick={handleButtonClick}>invite a friend</InviteButton>
      <Popup
        isVisible={isPopupVisible}
        title="invite a friend"
        icon={
          <QRCodeContainer>
            {preloadedQRCode ? (
              <img
                src={preloadedQRCode}
                alt="QR Code"
                style={{ width: "100%" }}
              />
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
            <ButtonOutlined onClick={handleButtonClickQR}>
              copy link
            </ButtonOutlined>
          </div>
        }
      />
    </Container>
  );
};

// Styled Components remain the same
const ButtonOutlined = styled(Button)`
  background: linear-gradient(#000, #000) padding-box,
    linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%) border-box;
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

const HowItWorksTitle = styled(Title)`
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  text-align: center;
`;

const ImageWrapper = styled.div`
  margin-bottom: 20px;
  margin-top: 95px;
  img {
    width: 110px;
    height: auto;
    z-index: 0;
  }
`;

const HowItWorks = styled.div`
  margin-bottom: 60px;
  text-align: left;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
  border-radius: 50%;
  margin-right: 15px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;

    height: 75px;
    background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
  }
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;

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
    padding-bottom: 40px;
  }
`;

const InviteButton = styled.button`
  background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
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

export default Friends;
