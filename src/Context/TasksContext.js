import React, { createContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Helpers/Api";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    
  ]);

  const completeTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: true } : task
      )
    );
  };

  const fetchTasks = async (telegramId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${telegramId}/tasks/`
      );
      if (response.status === 200 && response.data.status === "success") {
        setTasks(response.data.tasks);
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
        localStorage.setItem("tasks", JSON.stringify(response.data.tasks));
      } else {
        console.error("Error fetching tasks:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, completeTask, fetchTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};
