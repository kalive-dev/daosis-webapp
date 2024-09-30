import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TribeContext } from "../Context/TribeContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const CreateTribe = () => {
  const [copied, setCopied] = useState(false);
  const [telegramLink, setTelegramLink] = useState("");

  const navigate = useNavigate();
  const { createTribe } = useContext(TribeContext);
  const { user, setUser } = useContext(UserContext);

  const handleCopy = () => {
    const textToCopy = "@daosis_bot";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Скидання після 2 секунд
      })
      .catch((err) => {
        console.error("Не вдалося скопіювати текст: ", err);
      });
  };

  const handleCreate = async () => {
    const response = await createTribe(user.telegram_id, telegramLink);

    if (response?.status === 201) {
      setUser((prevUser) => ({
        ...prevUser,
        tribe: response.data.tribe.tribe_id,
        tribe_role: "owner",
      }));

      navigate("/community");
    } else alert("Помилка!");
  };

  return (
    <Container>
      <Section>
        <Title>Create new tribe</Title>

        <AddToChannel>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Add the Daosis bot as an admin</span>
            <p>@daosis_bot</p>
          </div>
          <CopyWrapper onClick={handleCopy}>
            <ContentCopyIcon />
            {copied && <FlyOutText>copied</FlyOutText>}
          </CopyWrapper>
        </AddToChannel>

        <TelegramInputContainer>
          <TelegramLabel>Telegram</TelegramLabel>
          <TelegramInputWrapper>
            <StaticText>t.me/</StaticText>
            <TelegramInput
              type="text"
              value={telegramLink}
              onChange={(e) => setTelegramLink(e.target.value)}
            />
          </TelegramInputWrapper>
        </TelegramInputContainer>
      </Section>

      <Section>
        <InfoMessage>
          If you prefer, you can remove our validation bot after successful
          creation.
        </InfoMessage>
        <CreateButton onClick={handleCreate}>Create</CreateButton>
      </Section>
    </Container>
  );
};

// Анімація для тексту, що вилітає догори і зникає
const flyUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px); /* Зміщуємо текст догори */
    opacity: 0;
  }
`;

const FlyOutText = styled.span`

  color: #4caf50;
  font-size: 12px;
  position: absolute; /* Текст буде розміщений абсолютно */
  top: -20px; /* Задайте розташування відносно батьківського контейнера */
  left: -10px;
  right: 0;
  text-align: center;
  animation: ${flyUp} 3s forwards; /* Анімація триває 2 секунди */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  background-color: #000000;
  color: #ffffff;
  height: 100vh;
`;

const Section = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 90vw;
`;

const Title = styled.h1`
  margin-top: 60px;
  font-size: 24px;
  color: #ffffff;
`;

const AddToChannel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 60px;

  p {
    color: #999999;
  }
`;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Батьківський контейнер для позиціонування FlyOutText */
  cursor: pointer;
`;

const TelegramInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 40px;
`;

const TelegramLabel = styled.span`
  text-align: left;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
`;

const TelegramInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #222222;
  width: 90vw;
  max-width: 500px;
  padding: 10px;
  border: 1px solid #555555;
  border-radius: 5px;
`;

const StaticText = styled.span`
  color: #999999;
  margin-right: 5px;
`;

const TelegramInput = styled.input`
  background-color: transparent;
  color: white;
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
`;

const InfoMessage = styled.p`
  font-size: 14px;
  color: #999999;
  margin-top: 5px;
  max-width: 500px;
  text-align: center;
`;

const CreateButton = styled.button`
  width: 90vw;
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 100px;

  &:hover {
    background-color: #45a049;
  }
`;

export default CreateTribe;
