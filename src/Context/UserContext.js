// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Helpers/Api";
// Create a context for user
export const UserContext = createContext();

export const UserProvider = ({ children, userData }) => {
  // Initialize state for user with default values
  console.log(userData);
  const [user, setUser] = useState({});
  const updateUserBalance = async (newBalance) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/update_balance/`,
        {
          telegram_id: userData?.id.toString(),
          balance: newBalance,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === "success") {
        console.log(
          "Balance updated successfully on server:",
          response.data.user
        );
        // Update the local context state
        setUser((prevUser) => ({
          ...prevUser,
          balance: newBalance,
          wallet: response.user.wallet,
        }));
      } else {
        console.error(
          "Failed to update balance on server:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating balance on server:", error);
    }
  };
  const resetUserTribe = () => {
    setUser((prevUser) => ({
      ...prevUser,
      tribe: null,
      tribe_role: null,
    }));
  };
  const joinToTribe = (tribeId, role) => {
    setUser((prevUser) => ({
      ...prevUser,
      tribe: tribeId,
      tribe_role: role,
    }));
  };
  const fetchUser = async (telegramId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/join/`, {
        user_id: telegramId,
      });

      if (response.status === 200 && response.data.status === "success") {
        setUser(response.data.user);
      } else {
        console.error("Error fetching user:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserBalance,
        fetchUser,
        resetUserTribe,
        joinToTribe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
