import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import showSidebar from './Sidebar'

const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font_size: 18px;


    &:hover{
        background: #252831;
        border-left: 6px solid #405d27;
        cursor:pointer;
    }
`;



const SidebarLabel = styled.span`
    margin-left: 16px;
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
    }
`;

const SubMenu = ({item}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubNav = () => setSubnav(!subnav)

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
        {subnav && item.subNav.map((item, index) =>{
            return (
                <DropdownLink to={item.path} key={index} onClick={window.location.reload}>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </DropdownLink>
            )
        })}
        </>

)
}

export default SubMenu
