import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Helpers/Api";

// Створюємо контекст TribeContext
export const TribeContext = createContext();

// Провайдер контексту
export const TribeProvider = ({ children }) => {
  const [tribe, setTribe] = useState(null); // Статус племені користувача
  const [tribeLoading, setTribeLoading] = useState(false); // Стан завантаження даних
  const [topTribes, setTopTribes] = useState([]); // Топ племена
  const [tribeError, setTribeError] = useState(null); // Для зберігання помилок
  const [tribePosition, setTribePosition] = useState(null);
  // Функція для створення нового племені
  const createTribe = async (telegramId, link) => {
    try {
      setTribeLoading(true);
      const response = await axios.post(`${API_BASE_URL}/create_tribe/`, {
        telegram_id: telegramId,
        link,
      });

      if (response.status === 201) {
        setTribe(response.data.tribe);
        console.log("Tribe created successfully:", response.data);
      } else {
        setTribeError(response.data.message);
      }
    } catch (error) {
      setTribeError(error.message);
      console.error("Error creating tribe:", error);
    } finally {
      setTribeLoading(false);
    }
  };

  // Функція для приєднання до племені
  const joinTribe = async (telegramId, tribeId) => {
    try {
      setTribeLoading(true);
      const response = await axios.post(`${API_BASE_URL}/join_tribe/`, {
        telegram_id: telegramId,
        tribe_id: tribeId,
      });

      if (response.status === 201) {
        console.log("Successfully joined tribe:", response.data);
        fetchTribe(tribeId); // Оновлюємо плем'я після приєднання
      } else {
        setTribeError(response.data.message);
      }
    } catch (error) {
      setTribeError(error.message);
      console.error("Error joining tribe:", error);
    } finally {
      setTribeLoading(false);
    }
  };

  // Функція для виходу з племені
  const leaveMyTribe = async (telegramId, tribeId) => {
    try {
      setTribeLoading(true);
      const response = await axios.post(`${API_BASE_URL}/leave_tribe/`, {
        telegram_id: telegramId,
        tribe_id: tribeId,
      });

      if (response.status === 201) {
        setTribe(null); // Видаляємо плем'я користувача після виходу
        console.log("Successfully left tribe:", response.data);
      } else {
        setTribeError(response.data.message);
      }
    } catch (error) {
      setTribeError(error.message);
      console.error("Error leaving tribe:", error);
    } finally {
      setTribeLoading(false);
    }
  };
  const fetchTribeByName = async (tribeName) => {
    try {
      setTribeLoading(true);
      const response = await axios.post(`${API_BASE_URL}/get_tribe/`, {
        tribe_name: tribeName,
      });

      if (response.status === 200 && response.data.status === "success") {
        setTribe(response.data.tribe);
        setTribePosition(response.data.position); // Збереження позиції племені
      } else {
        setTribeError(response.data.message);
      }
    } catch (error) {
      setTribeError(error.message);
      console.error("Error fetching tribe:", error);
    } finally {
      setTribeLoading(false);
    }
  };
  // Функція для отримання даних про плем'я
  const fetchTribe = async (tribeId) => {
    try {
      setTribeLoading(true);
      const response = await axios.post(`${API_BASE_URL}/get_user_tribe/`, {
        tribe_id: tribeId
      });

      if (response.status === 200) {
        setTribe(response.data.tribe);
        setTribePosition(response.data.position); 
      } else {
        setTribeError(response.data.message);
      }
    } catch (error) {
      setTribeError(error.message);
      console.error("Error fetching tribe:", error);
    } finally {
      setTribeLoading(false);
    }
  };

  // Функція для отримання топ племен
  const fetchTopTribes = async () => {
    try {
      setTribeLoading(true);
      const response = await axios.get(`${API_BASE_URL}/get_top_tribes/`);

      if (response.status === 200) {
        setTopTribes(response.data.tribes);
      } else {
        setTribeError(response.data.message);
      }
    } catch (error) {
      setTribeError(error.message);
      console.error("Error fetching top tribes:", error);
    } finally {
      setTribeLoading(false);
    }
  };

  // Автоматично завантажуємо дані про плем'я користувача, якщо він має tribe_id
  

  return (
    <TribeContext.Provider
      value={{
        tribe,
        tribeLoading,
        topTribes,
        tribeError,
        createTribe,
        joinTribe,
        leaveMyTribe,
        fetchTribe,
        fetchTopTribes,
        fetchTribeByName
      }}
    >
      {children}
    </TribeContext.Provider>
  );
};
