import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { RewardsContext } from "../Context/RewardsContext";
import { TasksContext } from "../Context/TasksContext";
import { LeaderboardContext } from "../Context/TribeContext";

export const API_BASE_URL = "http://127.0.0.1:8000/api";
export const API_BASE_URL2 = "http://127.0.0.1:8000/api";
export const telegram_id = "874423521";

export const updateUserBalance = async (telegramId, newBalance) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/update_balance/`,
      {
        telegram_id: telegramId,
        balance: newBalance,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Balance updated successfully:", response.data.user);
      return response.data.user;
    } else {
      console.error("Failed to update balance:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating balance:", error);
    return null;
  }
};

export const updateUserRewards = async (telegramId, taskTitle, rewardValue) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/update_rewards/`,
      {
        telegram_id: telegramId,
        task_title: taskTitle,
        reward_value: rewardValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Rewards updated successfully");
      return response.data;
    } else {
      console.error("Failed to update rewards:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating rewards:", error);
    return null;
  }
};