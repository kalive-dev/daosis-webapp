import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/main-icon.svg';

const Home = () => {
  return (
    <Container>
      <CommunityBanner>
        <div className="left-section">
          <img src={require('../assets/images/white-icon.png')} alt="community icon" />
          <div>
            <Title>community title</Title>
            <Subtitle>subtitle</Subtitle>
          </div>
        </div>
        <button>open</button>
      </CommunityBanner>

      <TitleGradient>Daily tasks</TitleGradient>
      <TabList>
        <Tab active>new</Tab>
        <Tab>completed</Tab>
        <Tab>unfulfilled</Tab>
      </TabList>

      <TaskList>
        {Array.from({ length: 4 }).map((_, index) => (
          <TaskItem key={index}>
            <div className="left-section">
              <img src={logo} alt="task icon" />
              <div>
                <h3>main title</h3>
                <p>+250$</p>
              </div>
            </div>
            <button>btn</button>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CommunityBanner = styled.div`
  background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  color: #000;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-top: 95px;
  margin-bottom: 20px;

  .left-section {
    display: flex;
    align-items: center;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  h2 {
    font-size: 16px;
    margin: 0;
  }

  p {
    font-size: 12px;
    margin: 0;
  }

  button {
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 20px;
`;

const TitleGradient = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
  -webkit-background-clip: text;
  color: transparent;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: rgba(90, 90, 90, 1);
  font-weight: 400;
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding-bottom: 10px;
  color: ${(props) => (props.active ? '#fff' : '#888')};
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const TaskList = styled.div`
  background-color: #1c1c1c;
  border-radius: 12px;
  padding: 10px;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  .left-section {
    display: flex;
    align-items: center;
  }

  img {
    width: 50px;
    height: auto;
    margin-right: 10px;
  }

  h3 {
    font-weight: 400;
    font-size: 16px;
    margin: 0;
  }

  p {
    color: rgba(90, 90, 90, 1);
    font-weight: 400;
    font-size: 14px;
    margin: 0;
  }

  button {
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    font-weight: 400;
    color: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
`;

export { TitleGradient, Title, TaskItem };
export default Home;
