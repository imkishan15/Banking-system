import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../Routes/routes";
import styled from "styled-components";

const StyledNav = styled.nav`
  background: #000;
  padding: 16px;
  font-size: 24px;
  border-radius: 12px;
`;

const StyledLink = styled(Link)<{ isactive: boolean }>`
  background-color: ${({ isactive }) =>
    isactive ? "#535353" : "transparent"};
  color: ${({ isactive }) => (isactive ? "lightblue" : "aliceblue")};
  border-radius: 8px;
  margin: 0 6px;
  padding: 6px 6px;
  text-decoration: none;
`;

const NavBar = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  return (
    <div>
      <StyledNav>
        <StyledLink to={ROUTES.HOME} isactive={activeTab === ROUTES.HOME}>
          Home
        </StyledLink>
        <StyledLink
          isactive={activeTab === ROUTES.USER_LIST}
          to={ROUTES.USER_LIST}
        >
          User List
        </StyledLink>
        <StyledLink
          isactive={activeTab.includes(ROUTES.TRANSACTION)}
          to={ROUTES.TRANSACTION}
        >
          Make transaction
        </StyledLink>
        <StyledLink
          isactive={activeTab === ROUTES.STATEMENTS}
          to={ROUTES.STATEMENTS}
        >
          Statement
        </StyledLink>
      </StyledNav>
    </div>
  );
};

export default NavBar;
