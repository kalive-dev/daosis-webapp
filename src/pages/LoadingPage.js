import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { RewardsContext } from "../Context/RewardsContext";
import { TasksContext } from "../Context/TasksContext";
import { TribeContext } from "../Context/TribeContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Helpers/Api";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/images/bg.jpg';
import futuristicImage from '../assets/images/strangething.svg';
import { Spinner } from "../icons/Spinner";


const PreLoad = ({ telegramId }) => {
  const navigate = useNavigate();
  const { user, setUser, updateUserBalance } = useContext(UserContext);
  const { setRewards } = useContext(RewardsContext);
  const { setTasks } = useContext(TasksContext);
  const { fetchTribe,fetchTopTribes  } = useContext(TribeContext);
  const [rewardData, setRewardData] = useState(null);
  const [showRewardPage, setShowRewardPage] = useState(false);

  const hasFetchedData = useRef(false);
  useEffect(() => {
      if (hasFetchedData.current) return;
      const loadData = async () => {
          try {
              hasFetchedData.current = true;
              const rewardResult = await fetchDailyReward(telegramId);
              if (rewardResult) {
                  setRewardData(rewardResult);
                  setShowRewardPage(true);
                  window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
                  // Скрыть RewardPage через 5 секунд и загрузить остальные данные
                  setTimeout(async () => {
                      setShowRewardPage(false);
                      await fetchAllData(telegramId);
                      navigate("/home");
                  }, 3000);
              } else {
                  await fetchAllData(telegramId);
              }
          } catch (error) {
              console.error("Error loading data", error);
          }
      };

      loadData();
  }, [telegramId, navigate]);
  const fetchAllData = async (telegramId) => {
    fetchTopTribes();
      await fetchUser(telegramId);
      await fetchUserRewards(telegramId);
      await fetchTasks(telegramId);
      
  };

  const fetchUser = async (telegramId) => {
      try {
          const response = await axios.post(`${API_BASE_URL}/users/join/`, {
              user_id: telegramId
          });

          if (response.status === 200 && response.data.status === "success") {
            const userData = response.data.user;
            setUser(userData);
              if (userData.tribe) {
                await fetchTribe(userData.tribe); 
              }
          } else {
              console.error("Error fetching user:", response.data.message);
          }
      } catch (error) {
          if (error.response && error.response.status === 404) {
              navigate("/welcome"); // Navigate to WelcomePage if user is not found
          } else {
              console.error("Failed to fetch user:", error);
          }
      }
  };

  const fetchUserRewards = async (telegramId) => {
      try {
          console.log(telegramId)
          const response = await axios.get(`${API_BASE_URL}/users/${telegramId}/rewards/`);
          if (response.status === 200 && response.data.status === "success") {
              setRewards(response.data.reward);

          } else{
              navigate("/welcome");
          }
      } catch (error) {
          console.error("Failed to fetch user rewards:", error);
      }
  };
  const fetchTasks = async (telegramId) => {
      try {
          const response = await axios.get(`${API_BASE_URL}/users/${telegramId}/tasks/`);
          if (response.status === 200 && response.data.status === "success") {
              setTasks(response.data.tasks);
              window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');

              if(!showRewardPage) {
               navigate("/home")
              }
          } else {
              console.error('Error fetching tasks:', response.data.message);
          }
      } catch (error) {
          console.error("Failed to fetch tasks:", error);
      }
  };
  const fetchDailyReward = async (telegramId) => {
      try {
          const response = await axios.post(`${API_BASE_URL}/daily_reward/`, {
              telegram_id: telegramId
          });
          if (response.status === 200 && response.data.status === "success") {
              return response.data;
          } else {
              console.error("Error fetching daily reward:", response.data.message);
              return null;
          }
      } catch (error) {
          console.error("Failed to fetch daily reward:", error);
          return null;
      }
  };
  return (
        <Container>
            <ImageContainer>
                <img src={futuristicImage} />
            </ImageContainer>
            <Headline>Experience the innovations of tomorrow, today!</Headline>
            <Spinner />
        </Container>
  );
};


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

export default PreLoad;
