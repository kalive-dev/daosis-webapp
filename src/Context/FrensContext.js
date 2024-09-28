import React, { createContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Helpers/Api";

export const FrensContext = createContext();

export const FrensProvider = ({ children }) => {
  const [frens, setFrens] = useState(null);

  const fetchFrens = async (telegramId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${telegramId}/frens/`
      );
      if (response.status === 200) {
        setFrens(response.data);
        console.log("Fetched frens:", response.data.friends_stats);
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
      } else {
        console.error("Error fetching frens:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch frens:", error);
    }
  };

  return (
    <FrensContext.Provider value={{ frens, setFrens, fetchFrens }}>
      {children}
    </FrensContext.Provider>
  );
};
