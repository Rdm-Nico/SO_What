import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import showSidebar from './Sidebar'
import {IconContext} from "react-icons";

const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;


    &:hover{
        background: #252831;
        border-left: 6px solid #405d27;
        cursor:pointer;
    }
`;



const SidebarLabel = styled.span`
    margin-left: 5px;
`;

const DropdownLink = styled(Link)`
    background: #414757;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;

    &:hover{
        background: #405d27;
        cursor: pointer;
        font-style: oblique;
        font-weight: bold;
        color: #15171c;
    }
`;

const IconWrapper = styled(IconContext.Provider)`
    color: #f5f5f5;
    display: flex;
    transition: color 0.3s ease;
    ${DropdownLink}:hover & {
        color: #15171c;
    }
`;


const SubMenu = ({item}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubNav = () => setSubnav(!subnav)
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
        <SidebarLink to={item.path} onClick={
            // this code show how to handle the showing or not of the sidebar
            (item.subNav && showSubNav) || ( !item.subNav && showSidebar)
        }>
        <div>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
            {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}
        </div>
        </SidebarLink>
        {subnav && item.subNav.map((subItem, index) =>{
            return (
                <DropdownLink to={subItem.path} key={index} onClick={window.location.reload} onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(null) }>
                    <IconWrapper value={{color: isHovered === index ? '#15171c' : '#f5f5f5'}}>
                        {subItem.icon}
                    </IconWrapper>
                    <SidebarLabel>{subItem.title}</SidebarLabel>
                </DropdownLink>
            )
        })}
        </>

)
}

export default SubMenu
