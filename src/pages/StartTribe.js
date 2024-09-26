import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { TribeList, TribeItem, TribeImage, TribeIcon, TribeDetails, TribeTitle, TribeSubtitle, Rank } from './TopTribes'

import ArrowRightGradient from '../assets/images/arrowright.svg';
import StrangeIcon from '../assets/images/strangething.svg'
const StartTribe = () => {
    const tribes = [
        { id: 1, title: "cumunity title", subtitle: "subtitle" },
        { id: 2, title: "cumunity title", subtitle: "subtitle" },
        { id: 3, title: "cumunity title", subtitle: "subtitle" },
    ];

    return (
        <Container>
            <ImageWrapper>
                <img src={StrangeIcon}></img>
            </ImageWrapper>
            <TitleContainer>
                <Title>
                    Start your tribe journey
                </Title>
                <Subtitle>
                    ⚡️Farm 10% faster as a new tribe member or owner.
                </Subtitle>
                <ButtonContainer>
                    <Button primary>Join tribe</Button>
                    <Button>Create new</Button>
                </ButtonContainer>
            </TitleContainer>
            <div className='header-tribe'>
                <h2>Top tribes</h2>
                <Link to="/community/top-tribes" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='see-all'>
                        <h3>see all</h3>
                        <img src={ArrowRightGradient} />
                    </div>
                </Link>
            </div>
            <TribeContainer style={{ marginBottom: "30px" }}>
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
            </TribeContainer>
        </Container>
    )
}
const TribeContainer = styled.div`
    width: 90vw;
    display:flex;
    flex-direction: column;
`
const ImageWrapper = styled.div`
    img{
        width: 200px;
    }
`
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
    justify-content:center;
    width: 70vw;
`
const Title = styled.h1`
    font-size: 40px;
    margin-bottom: 20px;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;

`
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
    margin-bottom:10px;
`
export default StartTribe