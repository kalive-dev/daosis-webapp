import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TribeContext } from "../Context/TribeContext";
import {
  TribeList,
  TribeItem,
  TribeImage,
  TribeIcon,
  TribeDetails,
  TribeTitle,
  TribeSubtitle,
  Rank,
} from "./TopTribes";

import ArrowRightGradient from "../assets/images/arrowright.svg";
import StrangeIcon from "../assets/images/strangething.svg";
const StartTribe = () => {
  const navigate = useNavigate();
  const { topTribes, searchTribe } = useContext(TribeContext);
  const handleTribeClick = async (tribe2) => {
    await searchTribe(tribe2.name);
    navigate("/community");
  };

  return (
    <Container>
      <ImageWrapper>
        <img src={StrangeIcon}></img>
      </ImageWrapper>
      <TitleContainer>
        <Title>Start your tribe journey</Title>
        <Subtitle>⚡️Farm 10% faster as a new tribe member or owner.</Subtitle>
        <ButtonContainer>
          <Link to="/search">
            <Button primary>Join tribe</Button>
          </Link>
          <Button>Create new</Button>
        </ButtonContainer>
      </TitleContainer>
      <div className="header-tribe">
        <h2>Top tribes</h2>
        <Link
          to="/community/top-tribes"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="see-all">
            <h3>see all</h3>
            <img src={ArrowRightGradient} />
          </div>
        </Link>
      </div>
      <TribeContainer style={{ marginBottom: "30px" }}>
        <TribeList>
          {topTribes.slice(0, 3).map((tribe) => (
            <TribeItem
              key={tribe.tribe_id}
              onClick={() => handleTribeClick(tribe)}
            >
              {" "}
              {/* tribe.tribe_id використовується як ключ */}
              <TribeImage>
                {/* Відображення зображення або плейсхолдера */}
                <img
                  src={
                    tribe?.photo
                      ? tribe.photo
                      : require("../assets/images/white-icon.png")
                  }
                  alt="tribe icon"
                />
              </TribeImage>
              <TribeDetails>
                <TribeTitle>{tribe.name}</TribeTitle>
                <TribeSubtitle>{tribe.tribe_collected}</TribeSubtitle>
              </TribeDetails>
              <Rank>{tribe.rank}</Rank> {/* Відображення позиції племені */}
            </TribeItem>
          ))}
        </TribeList>
      </TribeContainer>
    </Container>
  );
};
const TribeContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
`;
const ImageWrapper = styled.div`
  img {
    width: 200px;
  }
`;
const Container = styled.div`
  .header-tribe {
    width: 90vw; /* Ensuring the container has enough width */
    align-items: center;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* Space between the items */
    font-size: 16px;

    h2 {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }

    .see-all {
      font-weight: 400;
      display: flex;
      flex-direction: row;
      align-items: center;
      h3 {
        font-size: 16px;
        background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
        -webkit-background-clip: text;
        color: transparent;
      }
      img {
        width: 6px;
        margin: 10px 0 10px 5px;
      }
    }
  }

  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
`;
const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  text-align: center;
  width: auto;
  font-size: 16px;
  padding: 10px 50px; /* Increased horizontal padding */
  outline: none;
  border: none;
  background-color: ${(props) => (props.primary ? "white" : "#222222cc")};
  color: ${(props) => (props.primary ? "black" : "white")};
  border-radius: 50px;
  box-shadow: ${(props) => (props.primary ? "none" : "0 0 0 2px black")};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "black" : "white")};
    color: ${(props) => (props.primary ? "white" : "black")};
  }
  &:last-child {
    margin-left: 10px;
  }
`;

const Subtitle = styled.p`
  font-weight: 200;
  margin-bottom: 10px;
`;
export default StartTribe;
