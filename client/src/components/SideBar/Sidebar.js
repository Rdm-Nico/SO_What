import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IoHomeSharp } from "react-icons/io5";
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons';
import AuthService from "../../services/auth.service";

const Nav = styled.div`
  background: #15171c;
  height: 80px; 
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
`;



const Button = styled.button`
  margin-left: auto;
  margin-right: 1rem;
  background-color: transparent;
  color: #405d27;
  font-size: 18px;
  font-weight: bold;
  
  &:hover {
    font-weight: lighter;
  }
`
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow: auto;
  direction: rtl;
  top: 0;
  left: ${({ sidebar }) => (sidebar === "false" ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarContent = styled.div`
  direction: ltr;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {

  const[sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showUserBoard, setShowUserBoard] = useState(false);

  useEffect(() => {
    // get the user and find if can see this page
    const user = AuthService.getCurrentUser()

    if (user){
      setCurrentUser(user)
      setShowUserBoard(true)
    }
  }, []);

  function handleLogOut(){
    AuthService.logout()
    // reload the page
    window.location.reload()
  }


  const NavHome = styled(Link)`
  margin-left: ${showUserBoard ? '0': 'auto'};
  margin-right: 1rem;
  color: #405d27;
  font-size: 2rem;
`;
  return (
    <>
    <IconContext.Provider value={{ color: '#fff'}}> {/* permette di colorare tutte le icone con un unico colore */}
    <Nav>
      <NavIcon to="#">
        <FaIcons.FaBars onClick={showSidebar} />
      </NavIcon>
      {showUserBoard && (
          <Button onClick={handleLogOut}>
            LogOut
          </Button>
      )}
      <NavHome to={"/home"}>
        <IoHomeSharp/>
      </NavHome>
    </Nav>
      <SidebarNav sidebar={sidebar.toString()}>
      <SidebarContent>
        <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar}

              />
            </NavIcon>
            {SidebarData.map((item, index) =>{
                return <SubMenu item={item} key={index} showSideBar={showSidebar}  />;
            })}
        </SidebarWrap>
      </SidebarContent>
    </SidebarNav>
    </IconContext.Provider>
    </>
  )
}

export default Sidebar
