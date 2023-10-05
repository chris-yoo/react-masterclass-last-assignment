import { motion } from "framer-motion";
import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

const MainNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const StyledLink = styled(Link)`
  position: relative;
`;

const Item = styled.div`
  font-size: 20px;
  margin: 20px;
  display: flex;
`;

const Cicle = styled(motion.div)`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.accentColor};
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

function App() {
  const popularMatch = useMatch("/");
  const comingMatch = useMatch("/coming-soon");
  const nowMatch = useMatch("/now-playing");

  return (
    <>
      <MainNav>
        <Item>
          <StyledLink to="/">
            POPULAR
            {popularMatch ? <Cicle layoutId="circle" /> : null}
          </StyledLink>
        </Item>
        <Item>
          <StyledLink to="/coming-soon">
            COMING SOOM
            {comingMatch ? <Cicle layoutId="circle" /> : null}
          </StyledLink>
        </Item>
        <Item>
          <StyledLink to="/now-playing">
            NOW PLAYING
            {nowMatch ? <Cicle layoutId="circle" /> : null}
          </StyledLink>
        </Item>
      </MainNav>
      <Outlet />
    </>
  );
}

export default App;
