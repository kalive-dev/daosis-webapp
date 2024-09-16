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

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Container>
      <Section>
        <SectionHeader onClick={() => toggleSection('faq')}>
          <h3>FAQ</h3>
          <IconButton isOpen={openSection === 'faq'} />
        </SectionHeader>
        <AnimatedContent isOpen={openSection === 'faq'}>
          <h1>Lorem ipsum dolor sit amet?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <h1>Lorem ipsum dolor sit amet?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <h1>Lorem ipsum dolor sit amet?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </AnimatedContent>
      </Section>

      <Section>
        <SectionHeader onClick={() => toggleSection('privacy')}>
          <h3>Privacy Policy</h3>
          <IconButton isOpen={openSection === 'privacy'} />
        </SectionHeader>
        <AnimatedContent isOpen={openSection === 'privacy'}>
          <p>Here you can put the privacy policy content...</p>
        </AnimatedContent>
      </Section>

      <Section>
        <SectionHeader>
          <Link to="/wallet-settings" style={{ textDecoration: 'none', color: 'inherit', display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
            <h3>Wallet Settings</h3>
            <img src={ArrowRightGradient} alt="Go to Wallet Settings" style={{ width: '12px', height: '12px' }} />
          </Link>
        </SectionHeader>
      </Section>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  margin-top: 50px;
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  background-color: #000;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh; /* Ensure the container fills the viewport height */
  overflow: hidden; /* Prevent internal scrolling */
`;

const Section = styled.div`
  margin-bottom: 10px;
  background: rgba(20, 20, 20, 1);
  border-radius: 12px;
  /* Ensure that content within sections does not cause overflow */
  overflow: hidden;
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

  // Rotate the icon 90 degrees when the section is open
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

// Updated AnimatedContent component

const AnimatedContent = ({ isOpen, children }) => {
  const contentRef = useRef(); // Ref to measure content height
  const [contentHeight, setContentHeight] = useState(0); // State to track dynamic height

  useEffect(() => {
    // Update content height when component mounts or isOpen changes
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
    <AnimatedDiv style={animation} ref={contentRef}> {/* Assign ref here */}
      {children}
    </AnimatedDiv>
  );
};

const AnimatedDiv = styled(animated.div)`
  will-change: height, opacity;
  overflow: hidden;
  padding: ${({ style }) => (style.height > 0 ? '10px' : '0px 10px')};
  transition: padding 0.3s ease; // Smooth padding transition for better UX
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
  }
`;

export default Settings;
