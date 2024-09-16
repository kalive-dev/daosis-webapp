import React from 'react';
import styled from 'styled-components';
import IconOverlay from "../assets/images/icon-cash.svg";
import CloseButtonIcon from "../assets/images/closebutton.svg";

// Popup component
const Popup = ({ isVisible, onClose, title, icon, content }) => {
    if (!isVisible) return null;

    return (
        <PopupOverlay>
            <PopupContainer>
                <CloseButton onClick={onClose}>
                    <img src={CloseButtonIcon} alt="Close" />
                </CloseButton>
                {icon}
                <h2>{title}</h2>
                {content}
            </PopupContainer>
        </PopupOverlay>
    );
};

// Styled Components for the popup
const PopupOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: end; /* Center vertically */
    align-items: center;
    z-index: 1100;
    backdrop-filter: blur(5px);
`;

const PopupContainer = styled.div`
    position: relative; /* Position relative to contain the CloseButton */
    background: rgba(10, 10, 10, 1);
    padding: 30px;
    border-radius: 16px 16px 0 0;
    text-align: center;
    width: 90%;
    max-width: 400px;
    height: 530px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        font-size: 36px;
        margin-top: 20px;
        margin-bottom: 0;
        background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
        -webkit-background-clip: text;
        color: transparent;
    }
`;

const Input = styled.input`
    border: 2px solid rgba(220, 220, 220, 1);
    border-radius: 100px;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.8);
    outline: none;
    background-color: transparent;

    &::placeholder {
        color: rgba(220, 220, 220, 1);
        font-weight: 400;
    }
`;

const Button = styled.button`
    background: linear-gradient(90deg, #2EEB9B 0%, #24B3EF 100%);
    color: #fff;
    width: 80vw;
    max-width: 350px;
    padding: 12px 16px;
    font-size: 20px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    margin-top: 20px;
`;

const CloseButton = styled.button`
    position: absolute; /* Position absolutely within PopupContainer */
    top: 10px; /* Adjust as needed */
    right: 10px; /* Adjust as needed */
    background: transparent;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    z-index: 1200; /* Ensure it's above other content */
`;

export { Button };
export default Popup;