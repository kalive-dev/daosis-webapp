import React, { useState } from 'react';
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CreateTribe = () => {
    const [copied, setCopied] = useState(false);
    const [telegramLink, setTelegramLink] = useState('');

    const handleCopy = () => {
        const textToCopy = '@blum_sigma_bot';
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    const handleCreate = () => {
        if (!telegramLink) {
            alert('Please enter a valid Telegram link');
        } else {
            console.log(`Creating tribe with link: ${telegramLink}`);
            // Your logic for creating tribe goes here
        }
    };

    return (
        <Container>
            <Title>Create new tribe</Title>

            <AddToChannel>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Add the Blum bot as an admin</span>
                    <p>@blum_sigma_bot</p>
                </div>
                <CopyWrapper onClick={handleCopy}>
                    <ContentCopyIcon />
                </CopyWrapper>
            </AddToChannel>

            {copied && <CopiedMessage>Copied!</CopiedMessage>}

            <TelegramInputContainer>
                <TelegramLabel>Telegram</TelegramLabel>
                <TelegramInput
                    type="text"
                    placeholder="t.me/"
                    value={telegramLink}
                    onChange={(e) => setTelegramLink(e.target.value)}
                />
                <InfoMessage>
                    If you prefer, you can remove our validation bot after successful creation.
                </InfoMessage>
            </TelegramInputContainer>

            <CreateButton onClick={handleCreate}>Create</CreateButton>
        </Container>
    );
};

// Styles
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
    margin-bottom: 60px;  // ADD THIS TO CREATE SPACE BETWEEN SECTIONS

    p {
        color: #999999;
    }
`;

const CopyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

const CopiedMessage = styled.span`
    font-size: 14px;
    color: green;
    margin-top: 10px;
`;

const TelegramInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px; // ADD MARGIN TOP FOR EXTRA SPACE
`;

const TelegramLabel = styled.span`
    text-align: left;
    font-weight: bold;
    color: #ffffff;
`;

const TelegramInput = styled.input`
    background-color: #222222;
    color: white;
    width: 90%;
    max-width: 500px;
    padding: 10px;
    border: 1px solid #555555;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
`;

const InfoMessage = styled.p`
    font-size: 14px;
    color: #999999;
    margin-top: 5px;
    max-width: 500px;
    text-align: center;
`;

const CreateButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #45a049;
    }
`;

export default CreateTribe;
