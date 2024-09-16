// src/components/TopTribesList.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GoBackIcon from '../assets/images/chevron-down.svg'
import TribeIcon from '../assets/images/main-icon.svg'
const tribes = [
    { id: 1, title: "cumunity title", subtitle: "subtitle" },
    { id: 2, title: "cumunity title", subtitle: "subtitle" },
    { id: 3, title: "cumunity title", subtitle: "subtitle" },
    { id: 4, title: "cumunity title", subtitle: "subtitle" },
    { id: 5, title: "cumunity title", subtitle: "subtitle" },
    { id: 6, title: "cumunity title", subtitle: "subtitle" }
];

const TopTribes = () => {
    return (
        <Container>
            <Header>
                <Link to="/community">
                    <img src={GoBackIcon} />
                </Link>
                <Title>top tribes</Title>
            </Header>
            <TribeList>
                {tribes.map((tribe) => (
                    <TribeItem key={tribe.id}>
                        <TribeImage>
                            {/* Icon or image placeholder */}
                            <img src={TribeIcon} alt="tribe icon" />
                        </TribeImage>
                        <TribeDetails>
                            <TribeTitle>{tribe.title}</TribeTitle>
                            <TribeSubtitle>{tribe.subtitle}</TribeSubtitle>
                        </TribeDetails>
                        <Rank>{tribe.id}</Rank>
                    </TribeItem>
                ))}
            </TribeList>
        </Container>
    );
};
const Container = styled.div`
    margin-top:50px;
  padding: 20px;
  background-color: #000;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: #00e4ff;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    -webkit-background-clip: text;
    color:transparent;
    margin-left: 10px;
    font-weight: 700;
`;

const TribeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TribeItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(20, 20, 20, 1);

  border-radius: 15px;
  padding: 10px;
  height:64px;
`;

const TribeImage = styled.div`
  background-color: transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TribeDetails = styled.div`
  margin-left: 10px;
  flex-grow: 1;
  color: #fff;
`;

const TribeTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  margin-bottom:4px;
`;

const TribeSubtitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(186, 186, 186, 1);
`;

const Rank = styled.div`
  background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size:21px;
`;

export default TopTribes;
