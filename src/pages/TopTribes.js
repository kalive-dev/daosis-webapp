// src/components/TopTribesList.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GoBackIcon from "../assets/images/chevron-down.svg";
import TribeIcon from "../assets/images/main-icon.svg";
import { TribeContext } from "../Context/TribeContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Popup";

const TopTribes = () => {
  const navigate = useNavigate();
  const { topTribes, searchTribe } = useContext(TribeContext);
  const handleTribeClick = async (tribe2) => {
    await searchTribe(tribe2.name);
    navigate("/community");
  };
  return (
    <Container>
      <Header>
        <Link to="/community">
          <img src={GoBackIcon} />
        </Link>
        <Title>top tribes</Title>
      </Header>
      <TribeList>
        {topTribes.map((tribe) => (
          <TribeItem key={tribe.id} onClick={() => handleTribeClick(tribe)}>
            <TribeImage>
              <img
                src={tribe?.photo ? tribe.photo : require('../assets/images/white-icon.png')}
                alt="tribe icon"
              />
            </TribeImage>
            <TribeDetails>
              <TribeTitle>{tribe.name}</TribeTitle>
              <TribeSubtitle>{tribe.tribe_collected}</TribeSubtitle>
            </TribeDetails>
            <Rank>{tribe.rank}</Rank>
          </TribeItem>
        ))}
      </TribeList>
    </Container>
  );
}



const Search = styled(Input)`
padding: 10px 20px;
font-size: 24px;
  &::placeholder{
    font-size: 24px;
    font-weight:500;
  }

`
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
font-size: 24px;
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
export { TribeList, TribeItem, TribeImage, TribeIcon, TribeDetails, TribeTitle, TribeSubtitle, Rank }
export default TopTribes;
