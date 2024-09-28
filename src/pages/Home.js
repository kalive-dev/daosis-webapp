import styled from "styled-components";
import logo from "../assets/images/main-icon.svg";
import backgroundImage from "../assets/images/sqbg.png";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from "react";
import "../Styles/mainStyles.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { RewardsContext } from "../Context/RewardsContext";
import { TribeContext } from "../Context/TribeContext";
import { TasksContext } from "../Context/TasksContext";
import { API_BASE_URL } from "../Helpers/Api";
import axios from "axios";

const Home = ({ telegramId }) => {
  const navigate = useNavigate();
  const { user, fetchUser, updateUserBalance } = useContext(UserContext);
  const { rewards, fetchUserRewards } = useContext(RewardsContext);
  const { tasks, fetchTasks } = useContext(TasksContext);
  const { tribe, resetTribe, fetchTribe } = useContext(TribeContext);
  const [isLoading, setIsLoading] = useState(false);
  const userFetchedRef = useRef(false);
  const rewardsFetchedRef = useRef(false);
  const tasksFetchedRef = useRef(false);
  const { completeTask } = useContext(TasksContext);
  const [activeTab, setActiveTab] = useState("new"); // State to track the active tab
  const [isChecked, setIsChecked] = useState(false); // Track if the task was checked
  const [checkedTasks, setCheckedTasks] = useState({}); // Track checked state for each task

  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!userFetchedRef.current) {
        if (!user) {
          await fetchUser(telegramId);
        }
        userFetchedRef.current = true;
      }

      if (!tasksFetchedRef.current) {
        if (!tasks || tasks.length === 0) {
          await fetchTasks();
        }
        tasksFetchedRef.current = true;
      }
      if (!user.tribe) {
        resetTribe();
      }
      if (user?.tribe != tribe?.tribe_id) {
        fetchTribe(user.tribe);
      }
    };

    loadData();
  }, [fetchUser, fetchTasks, telegramId, user, tasks]);

  const handleButtonClick = (task, index) => {
    const storageKey = `task-${index}-checked`;
    const startTimeKey = `task-${index}-startTime`;

    // Перевіряємо чи завдання вже відмічене
    if (!checkedTasks[index]) {
      if (task.url) {
        window.open(task.url, "_blank");
      }
      // Оновлюємо стан для поточного завдання
      setCheckedTasks((prev) => ({ ...prev, [index]: true }));
      localStorage.setItem(storageKey, true);
      localStorage.setItem(startTimeKey, Date.now().toString());
    } else {
      verifyTask(user.telegram_id, task.title, task.reward, index);
    }
  };

  const handleGoToTribes = () => {
    if (user.tribe) {
      navigate("/community");
    } else {
      navigate("/start-tribe");
    }
  };

  const verifyTask = async (telegramId, taskTitle, reward, index) => {
    try {
      const rewardValue = parseInt(reward.replace("+", ""), 10);
      // Send request to verify task
      const response = await axios.post(
        `${API_BASE_URL}/tasks/verify/`,
        {
          telegram_id: telegramId,
          task: taskTitle,
          reward: rewardValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const updatedBalance = user.balance + rewardValue;
        updateUserBalance(updatedBalance);
        completeTask(index);
        setCheckedTasks((prev) => ({ ...prev, [index]: false }));
        localStorage.removeItem(`task-${index}-checked`);
        localStorage.removeItem(`task-${index}-startTime`);
      } else {
        console.error("Task verification failed:", response.data.message);
        setIsChecked(false);
        localStorage.removeItem(`task-${index}-checked`);
        localStorage.removeItem(`task-${index}-startTime`);
      }
    } catch (error) {
      console.error("Error verifying task:", error);
      setIsChecked(false);
    }
  };

  return (
    <Container>
      <CommunityBanner>
        <div className="left-section">
          <img
            src={
              tribe?.photo
                ? tribe.photo
                : require("../assets/images/white-icon.png")
            }
            alt="community icon"
          />
          <div>
            <Title>{tribe ? tribe.name : "Daosis"}</Title>
            <Subtitle>
              {tribe ? tribe.tribe_collected : "Daosis Community"}
            </Subtitle>
          </div>
        </div>
        <button onClick={handleGoToTribes}>open</button>
      </CommunityBanner>

      <TitleGradient>Daily tasks</TitleGradient>
      <TabList>
        <Tab active={activeTab === "new"} onClick={() => setActiveTab("new")}>
          new
        </Tab>
        <Tab
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          completed
        </Tab>
        <Tab
          active={activeTab === "unfulfilled"}
          onClick={() => setActiveTab("unfulfilled")}
        >
          unfulfilled
        </Tab>
      </TabList>

      <TaskList>
        {activeTab === "new"
          ? tasks.slice(-3).map(
              (task, index) =>
                !task.completed && (
                  <TaskItem key={index}>
                    <div className="left-section">
                      <img src={logo} alt="task icon" />
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.reward}</p>
                      </div>
                    </div>

                    {/* Button appears only for tasks that are not completed */}
                    <button onClick={() => handleButtonClick(task, index)}>
                      {checkedTasks[index] ? "Check" : "START"}
                    </button>
                  </TaskItem>
                )
            )
          : activeTab === "completed"
          ? tasks.map(
              (task, index) =>
                task.completed && (
                  <TaskItem key={index}>
                    <div className="left-section">
                      <img src={logo} alt="task icon" />
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.reward}</p>
                      </div>
                    </div>
                    {/* No button for completed tasks */}
                  </TaskItem>
                )
            )
          : tasks.map(
              (task, index) =>
                !task.completed && (
                  <TaskItem key={index}>
                    <div className="left-section">
                      <img src={logo} alt="task icon" />
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.reward}</p>
                      </div>
                    </div>

                    <button onClick={() => handleButtonClick(task, index)}>
                      {checkedTasks[index] ? "Check" : "START"}
                    </button>
                  </TaskItem>
                )
            )}
      </TaskList>
    </Container>
  );
};
const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CommunityBanner = styled.div`
  background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
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
  background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
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
  color: ${(props) => (props.active ? "#fff" : "#888")};
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
    background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
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
