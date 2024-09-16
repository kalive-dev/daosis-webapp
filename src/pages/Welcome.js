import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/images/bg.jpg';
// Import your image (replace with the correct path)
import futuristicImage from '../assets/images/strangething.svg';

const FirstScreen = () => {
    return (
        <Container>
            <ImageContainer>
                <img src={futuristicImage} />
            </ImageContainer>
            <Headline>Experience the innovations of tomorrow, today!</Headline>
            <Link to="/">
                <StartButton>Start</StartButton>
            </Link>
        </Container>
    );
};

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;  /* Black background */
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  img {
    width: 300px; /* Adjust size as needed */
    height: auto;
  }
`;

const Headline = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 20px 20px;
`;

const StartButton = styled.button`
  background: linear-gradient(90deg, #00FFA3 0%, #00B6FF 100%);
  width: 90vw;
  color: white;
  font-size: 18px;
  padding: 10px 40px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

  &:hover {
    background: linear-gradient(90deg, #00D98A 0%, #00A5E0 100%);
  }
`;

export default FirstScreen;
