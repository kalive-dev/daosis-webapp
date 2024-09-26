import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Helpers/Api";

export const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [count, setCount] = useState(0);
  const [friends_stats, setFriendsStats] = useState(null);
  const [isLeaderboardLoading, setIsLeaderboardLaoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);

  const checkFriends = async (telegramId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/check_friends/`, {
        telegram_id: telegramId,
      });
      if (response.status === 200) {
        console.log("Friends checked successfully:", response.data);
      }
    } catch (error) {
      console.error("Error checking friends:", error);
    }
  };

  const fetchLeaderboard = async (telegramId) => {
    try {
      setIsLeaderboardLaoading(true);
      await checkFriends(telegramId);

      const response = await axios.post(`${API_BASE_URL}/leaderboard/`, {
        telegram_id: telegramId,
      });
      if (response.status === 200) {
        const leaderboardData = response.data;

        setLeaderboard(leaderboardData.board);
        setCount(leaderboardData.count);
        setUserStats(leaderboardData.me);
        setFriendsStats(leaderboardData.friends_stats);
        setFriendsCount(leaderboardData.total_friends_count);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setIsLeaderboardLaoading(false);
    } finally {
      setIsLeaderboardLaoading(false);
    }
  };

  return (
    <LeaderboardContext.Provider
      value={{
        userStats,
        setUserStats,
        leaderboard,
        setLeaderboard,
        count,
        setCount,
        setFriendsStats,
        friends_stats,
        fetchLeaderboard,
        isLeaderboardLoading,
        friendsCount,
        setFriendsCount,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};
