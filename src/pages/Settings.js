import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'; // Import react-spring
import ArrowRightGradient from "../assets/images/RightArrow.svg";
import backgroundImage from '../assets/images/sqbg.png'; // Assuming the background image exists
const Settings = () => {
  const [openSection, setOpenSection] = useState(null); // State to track which section is open

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null); // Close section if it's already open
    } else {
      setOpenSection(section); // Open the clicked section
    }
  };

  return (
    <Container>
      <Section>
        <SectionHeader onClick={() => toggleSection('faq')}>
          <h3>FAQ</h3>
          <IconButton isOpen={openSection === 'faq'} />
        </SectionHeader>
        <AnimatedContent isOpen={openSection === 'faq'}>
          <h1>1. What is the Daosis Telegram Bot?</h1>
          <p>The Daosis Telegram Bot is designed to foster community engagement and track user activity. It allows Daosis to monitor which users are most engaged and reward them accordingly.</p>
          <h1>2. How does the bot work?</h1>
          <p>Users can interact with the bot and do small tasks. The users can paste their Oasis Sapphire public wallet address to the form in the bot (MetaMask or any self custodial wallet) wallet address. The bot will then associate the wallet address with the user's Telegram name, storing this information in a secure database.</p>
          <h1>3. What will my wallet information be used for?</h1>
          <p>Your wallet address will be used to track your engagement within the Daosis community. Active participants will have the opportunity to earn rewards based on their contributions and engagement level.</p>
          <h1>4. Is my data safe?</h1>
          <p>Yes, Daosis takes data privacy seriously. We only collect your Telegram name and wallet address, and this data is securely stored and used exclusively for engagement tracking and reward distribution. (See privacy policy for more information)</p>
          <h1>5. How can I start using the bot?</h1>
          <p>Simply join our Telegram group and interact with the bot by following the instructions(MetaMask). You'll then be part of our engagement tracking system!</p>
          <h1>6. What rewards can I earn?</h1>
          <p>Engaged users may earn various rewards, including tokens and exclusive opportunities within the Daosis ecosystem. Stay active and watch for announcements</p>
        </AnimatedContent>
      </Section>

      <Section>
        <SectionHeader>
          <a href='https://daosis.io/assets/Privacy%20Policy.pdf'>
            <h3>Privacy Policy</h3></a>
        </SectionHeader>
      </Section>

      {/* <Section>
        <SectionHeader>
          <Link to="/wallet-settings" style={{ textDecoration: 'none', color: 'inherit', display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
            <h3>Wallet Settings</h3>
            <img src={ArrowRightGradient} alt="Go to Wallet Settings" style={{ width: '12px', height: '12px' }} />
          </Link>
        </SectionHeader>
      </Section> */}
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  margin-top: 50px;
  padding: 20px;
  background-color: #000;
  color: #fff;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh; /* Allow the content to grow beyond the viewport */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Section = styled.div`
  margin-bottom: 10px;
  background: rgba(20, 20, 20, 1);
  border-radius: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  height: 45px;
  cursor: pointer;

  h3 {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;

  background-image: url(${ArrowRightGradient});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const AnimatedContent = ({ isOpen, children }) => {
  const contentRef = useRef(); // Ref to measure content height
  const [contentHeight, setContentHeight] = useState(0); // State to track dynamic height

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const animation = useSpring({
    height: isOpen ? contentHeight : 0,
    opacity: isOpen ? 1 : 0,
    config: { tension: 170, friction: 26 }, // Smoother configuration for transitions
  });

  return (
    <AnimatedDiv style={animation} ref={contentRef}>
      {children}
    </AnimatedDiv>
  );
};

const AnimatedDiv = styled(animated.div)`
  will-change: height, opacity;
  overflow: hidden;
  padding: ${({ style }) => (style.height > 0 ? '10px' : '0px 10px')};
  transition: padding 0.3s ease;
  
  h1 {
    font-size: 16px;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export default Settings;
