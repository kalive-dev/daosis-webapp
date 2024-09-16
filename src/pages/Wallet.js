// src/pages/Wallet.js
import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/images/bg.jpg';
const Wallet = () => {
  return (
    <Container>
      <Header>
        <h1>lorem ipsum dolor sit amet</h1>
        <button>btn</button>
      </Header>

      <PointsSection>
        <TabList>
          <Tab active>balances</Tab>
          <Tab>history</Tab>
        </TabList>

        <BalanceContainer>
          <BalanceItem>
            <div>
              <h3>lorem ipsum dolor sit amet</h3>
              <p>consectetur adipiscing elit</p>
            </div>
            <button>btn</button>
          </BalanceItem>
          <BalanceItem>
            <div>
              <h3>main title</h3>
              <p>+250$</p>
            </div>
            <button>btn</button>
          </BalanceItem>
        </BalanceContainer>
      </PointsSection>
    </Container>
  );
};



const Container = styled.div`
  padding: 20px;
  background-color: #000;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: #fff;
  min-height: 100vh;
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 18px;
  }

  button {
    background: linear-gradient(to right, #00d2ff, #3a7bd5);
    color: #fff;
    padding: 12px 20px;
    font-size: 14px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }
`;

const PointsSection = styled.div`
  background-color: #1c1c1c;
  border-radius: 12px;
  padding: 20px;
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding-bottom: 10px;
  color: ${(props) => (props.active ? '#00d2ff' : '#888')};
  font-size: 16px;
  border-bottom: ${(props) => (props.active ? '2px solid #00d2ff' : 'none')};
  cursor: pointer;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BalanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;

  h3 {
    font-size: 16px;
    margin: 0;
  }

  p {
    font-size: 14px;
    margin: 0;
  }

  button {
    background-color: #00d2ff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
`;

export default Wallet;
