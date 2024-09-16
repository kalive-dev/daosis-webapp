import React from 'react';
import styled from 'styled-components';
import { TitleGradient, Title } from './Home'; // Import TitleGradient from Home
import StrangeThing from '../assets/images/strangething.svg';
const Friends = () => {
  return (
    <Container>
      <ImageWrapper>
        <img src={StrangeThing} alt="icon" />
      </ImageWrapper>
      <TitleGradient>Main title</TitleGradient> {/* Use TitleGradient directly */}
      <HowItWorks>
        <HowItWorksTitle>how it works</HowItWorksTitle>
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
            <h3>lorem ipsum dolor</h3>
            <p>subtitle</p>
          </div>
        </Step>
      </HowItWorks>
      <InviteButton>invite a friend</InviteButton>
    </Container>
  );
};
const HowItWorksTitle = styled(Title)`
  margin-bottom: 20px;
`
const Container = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  text-align: center; /* Center align all content */
`;

const ImageWrapper = styled.div`
  margin-bottom: 20px;
  margin-top: 95px;
  img {
    width: 110px; /* Adjust size as needed */
    height: auto;
  }
`;

const HowItWorks = styled.div`
  margin-bottom: 60px;
  text-align: left;
`;

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
    height: 90px; /* Height of the line */
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



const InviteButton = styled.button`
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

export default Friends;
