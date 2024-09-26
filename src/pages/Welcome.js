import React, {useContext, useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/images/bg.jpg';
// Import your image (replace with the correct path)
import futuristicImage from '../assets/images/strangething.svg';
import { UserContext } from '../Context/UserContext';
import { TasksContext } from '../Context/TasksContext';
import {API_BASE_URL} from "../Helpers/Api"; // Import TasksContext
import axios from "axios"; // Импорт axios
import { Spinner } from "../icons/Spinner";
import { useNavigate } from "react-router-dom";
const FirstScreen = ({userData, refererId}) => {
  const { user, setUser } = useContext(UserContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const [isLoading, setIsLoading] = useState(false); // Для спіннера
  const navigate = useNavigate(); 
  const createUser = async () => {
    setIsLoading(true); // Початок завантаження
    try {
        const randomUsername = userData.username;
        const randomFirstName = userData.first_name;
        const randomLastName = userData.last_name;
        const randomTelegramId = userData.id;
        const isPremium = userData.is_premium;
        const reference = `874423521djiawiid`;

        // Fetch the registration date

            const userData2 = {
                username: randomUsername,
                first_name: randomFirstName,
                last_name: randomLastName,
                telegram_id: randomTelegramId,
                is_premium: isPremium,
                reference: reference,
                balance: 0,
                wallet: 0,
            };
            setUser(userData2);

            const initialTasks = [
              {"title": "Join Daosis community chat",
                "url": "https://t.me/DaosisCommunity",
                "reward": "+3000",
                "completed": false},
                 {"title": "Join Daosis announcement channel",
                "url": "https://t.me/DaosisAnnouncements",
                "reward": "+3000",
                "completed": false}
            ];

            // Update tasks context
            setTasks(initialTasks);

            const response = await axios.post(
                `${API_BASE_URL}/users/`,
                userData2,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 201) {
                console.log("User created successfully:", response.data);
                console.log(refererId);
                console.log(userData.telegram_id);
                if (refererId) {
                    await addFriend(userData.telegram_id, refererId);
                }
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
                navigate("/home")
            } else {
                console.error("Failed to create user:", response.data);
            }
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        setIsLoading(false); // Закінчення завантаження
    }
};

const addFriend = async (userid, refererId) => {
  try {
      console.log(`Adding friend with telegramId: ${userid}, refererId: ${refererId}`);
      const response = await axios.post(`${API_BASE_URL}/add_friend/`, {
          telegram_id: userid,
          second_telegram_id: refererId,
      }, {
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("Friend added successfully:", response.data.message);
      } else {
          console.error("Failed to add friend:", response.data.message);
      }
  } catch (error) {
      console.error("Error adding friend:", error);
  }
};

    return (
      <Container>
      <ImageContainer>
          <img src={futuristicImage} />
      </ImageContainer>
      <Headline>Experience the innovations of tomorrow, today!</Headline>

      {isLoading ? (
          <Spinner />  // Показати спіннер під час завантаження
      ) : (
          <StartButton onClick={createUser}>Start</StartButton> // Виклик createUser при натисканні
      )}
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
