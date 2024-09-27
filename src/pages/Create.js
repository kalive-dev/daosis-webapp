import React, { useState } from 'react';
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CreateTribe = () => {
    const [copied, setCopied] = useState(false);
    const [telegramLink, setTelegramLink] = useState('');

    const handleCopy = () => {
        const textToCopy = '@daosis_bot';
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
            <Section>
                <Title>Create new tribe</Title>

                <AddToChannel>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Add the Daosis bot as an admin</span>
                        <p>@daosis_bot</p>
                    </div>
                    <CopyWrapper onClick={handleCopy}>
                        <ContentCopyIcon />
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
                    If you prefer, you can remove our validation bot after successful creation.
                </InfoMessage>
                <CreateButton onClick={handleCreate}>Create</CreateButton>
            </Section>

        </Container>
    );
};
const Section = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction:column;
    width: 90vw;
`
// Styles
const Container = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #000000;
    color: #ffffff;
    height: 100vh;
`;

const Title = styled.h1`
    margin-top: 30px;
    font-size: 30px;
    color: #ffffff;
`;

const AddToChannel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 500px;
    padding: 10px;
    margin-top: 30px; 

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
    margin-bottom:10px;
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
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom:100px;

    &:hover {
        background-color: #45a049;
    }
`;

export default CreateTribe;
