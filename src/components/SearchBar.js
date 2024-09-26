import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

// Styled component for the search container
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: black;
  padding: 10px;
`;

const SearchInput = styled.input`
  width: ${({ isActive }) => (isActive ? '80vw' : '0px')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: width 0.5s ease-in-out, opacity 0.3s ease;
  padding: ${({ isActive }) => (isActive ? '10px' : '0')};
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
  background: none;
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

const SearchBar = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <SearchContainer>
            {!isActive && <PlaceholderText>Find a tribe you like</PlaceholderText>}
            <SearchInput type="text" isActive={isActive} placeholder="Search..." />
            <SearchButton onClick={handleClick}>
                <SearchIcon />
            </SearchButton>
        </SearchContainer>
    );
};

export default SearchBar;
