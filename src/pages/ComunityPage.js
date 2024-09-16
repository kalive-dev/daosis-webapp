import React from 'react';
import styled from 'styled-components';
import { TitleGradient } from './Home';
import { Button } from '../components/Popup';
import Icon from '../assets/images/strangething.svg';
import RingL from '../assets/images/ringL.svg'
import RingR from '../assets/images/ringR.svg'
import backgroundImage from '../assets/images/sqbg.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const CommunityPage = () => {
    return (
        <CommunityContainer>
            <Header>
                <img src={Icon} width="190px" />
                <CommunityTitle>Community title</CommunityTitle>
                <div className='rings'>
                    <img src={RingL} />
                    <span style={{ margin: "10px", color: 'white' }}>1</span>
                    <ArrowForwardIosIcon fontSize='10px' style={{ color: 'white' }} />
                    <img src={RingR} />
                </div>
                <div className='buttons-section'>
                    <HeaderButton>invite</HeaderButton>
                    <HeaderButton>leave</HeaderButton>
                </div>
            </Header>
            <div className='header-tribe'>
                <h2>your Tribe</h2>
                <h3>see all<ArrowForwardIosIcon fontSize='10px'></ArrowForwardIosIcon></h3>
            </div>
            <TribeSection>
                <TribeList>
                    <TribeListItem>
                        <span>perks</span>
                        <span>txt</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span>pribe Rank</span>
                        <span>txt</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span>your Personal Rank</span>
                        <span>txt</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span>tribe Collected</span>
                        <span>txt</span>
                    </TribeListItem>
                    <TribeListItem>
                        <span>members</span>
                        <span>txt</span>
                    </TribeListItem>
                </TribeList>
                <SeeAllButton>See All</SeeAllButton>
            </TribeSection>
            <LeaderboardSection>
                <h2>Leaderboard</h2>
                <SeeAllButton>See All</SeeAllButton>
            </LeaderboardSection>
            <BottomSection>
                <p>Lorem ipsum dolor sit amet</p>
                <FooterButton>btn</FooterButton>
            </BottomSection>
        </CommunityContainer>
    );
};
const CommunityContainer = styled.div`
    background-color: #000;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
     background-attachment: fixed;
    background-color: transparent; /* Dark background */
    color: #00BFFF;  /* Text color */
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
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        h2{
            color:white;
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
    width: 40vw;
    color: white;
    cursor: pointer;
    margin-left: 5px;
`;

const TribeSection = styled.div`
    margin-top: 20px;
    background: rgba(20, 20, 20, 1);
    padding: 0 20px;
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
`;

const SeeAllButton = styled.button`
    background: transparent;
    border: none;
    color: #00BFFF;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const LeaderboardSection = styled.div`
    margin-top: 20px;
`;

const BottomSection = styled.div`
    margin-top: 20px;
`;

const FooterButton = styled.button`
    background: rgb(0, 186, 255);
    border: none;
    border-radius: 5px;
    padding: 10px;
    color: white;
    cursor: pointer;

    &:hover {
        background: rgb(0, 162, 230);
    }
`;

export default CommunityPage;
