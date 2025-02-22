import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import UserOutline from "../assets/images/user.svg";
import WalletOutline from "../assets/images/wallet.svg";
import SettingsOutline from "../assets/images/settings.svg";
import HomeOutline from "../assets/images/home.svg";

const NavBar = () => {
  const location = useLocation();
  const activeRoute = location.pathname;

  const navItemsRef = useRef([]);
  const [activeRouteOffset, setActiveRouteOffset] = useState(0);
  const [activeRouteWidth, setActiveRouteWidth] = useState(0);

  useEffect(() => {
    const activeIndex = navItemsRef.current.findIndex(
      (ref) => ref && ref.dataset.route === activeRoute
    );
    if (activeIndex !== -1 && navItemsRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = navItemsRef.current[activeIndex];
      setActiveRouteOffset(offsetLeft);
      setActiveRouteWidth(offsetWidth);
    }
  }, [activeRoute]);

  return (
    <NavContainer>
      <NavItem
        ref={(el) => (navItemsRef.current[0] = el)}
        data-route="/home"
        active={activeRoute === "/home"}
      >
        <Link to="/home">
          <img src={HomeOutline} alt="Home" width={24} height={24} />
          <span>home</span>
        </Link>
      </NavItem>
      <NavItem
        ref={(el) => (navItemsRef.current[1] = el)}
        data-route="/friends"
        active={activeRoute === "/friends"}
      >
        <Link to="/friends">
          <img src={UserOutline} alt="Friends" width={24} height={24} />
          <span>friends</span>
        </Link>
      </NavItem>
      <NavItem
        ref={(el) => (navItemsRef.current[2] = el)}
        data-route="/wallet"
        active={activeRoute === "/wallet"}
      >
        <Link to="/wallet">
          <img src={WalletOutline} alt="Wallet" width={24} height={24} />
          <span>wallet</span>
        </Link>
      </NavItem>
      <NavItem
        ref={(el) => (navItemsRef.current[3] = el)}
        data-route="/settings"
        active={activeRoute === "/settings"}
      >
        <Link to="/settings">
          <img src={SettingsOutline} alt="Settings" width={24} height={24} />
          <span>settings</span>
        </Link>
      </NavItem>
      <ActiveIndicator
        style={{
          transform: `translateX(${activeRouteOffset}px)`,
          width: `${activeRouteWidth}px`,
        }}
      />
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(20, 20, 20, 1);
  display: flex;
  justify-content: space-around;
  padding: 0;
  z-index: 1000;
  border-radius: 100px;
  box-shadow: 0px 33px 0px 0 rgba(0, 0, 0, 1);
  overflow: hidden;
  padding: 0;
  margin-bottom: 20px;
`;

const NavItem = styled.div`
  color: ${(props) => (props.active ? "#fff" : "#aaa")};
  font-size: 12px;
  text-align: center;
  padding: 0 15px;
  border-radius: 100px;
  position: relative;

  a {
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 10px;
  }

  ${(props) =>
    props.active &&
    `
    color: #fff;
    `};
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #2eeb9b 0%, #24b3ef 100%);
  border-radius: 100px;
  transition: transform 0.3s ease, width 0.3s ease;
`;

export default NavBar;
