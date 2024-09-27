import React, { useState, useContext } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { TribeContext } from "../Context/TribeContext";
// Styled component for the search container
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: black;
  justify-content: center;
  padding: 10px;
`;

const SearchInput = styled.input`
  width: ${({ isActive }) => (isActive ? "80vw" : "0px")};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: width 0.5s ease-in-out, opacity 0.3s ease;
  padding: ${({ isActive }) => (isActive ? "10px" : "0")};
  border: none;
  outline: none;
  background-color: black;
  color: white;
  border-radius: 20px;
  border: 1px solid white;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  margin-left: 10px;
  background: none;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
`;

const PlaceholderText = styled.div`
  color: white;
  margin-right: 10px;
  font-size: 18px;
  white-space: nowrap;
`;
const SearchBar = ({ onSearch }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Стан для пошукового запиту

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Оновлення пошукового запиту
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery); // Викликаємо функцію пошуку з батьківського компонента
    }
  };

  return (
    <SearchContainer>
      {!isActive && <PlaceholderText>Find a tribe you like</PlaceholderText>}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchInput
          type="text"
          isActive={isActive}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange} // Обробка введення запиту
        />

        <SearchButton
          type="submit"
          onClick={!isActive ? handleClick : null} // Виклик handleClick, якщо isActive true
        >
          <SearchIcon />
        </SearchButton>
      </form>
    </SearchContainer>
  );
};

export default SearchBar;
