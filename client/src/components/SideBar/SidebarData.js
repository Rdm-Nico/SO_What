import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'
import * as FiIcons from 'react-icons/fi'
import * as FaIcons from 'react-icons/fa6'






export const SidebarData = [


    {
        title:'Reparti',
        path:'/reparti/all',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title:'Tornitura',
                path:'/reparti/tornitura',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Dentatura',
                path:'/reparti/dentatura',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Rettifica',
                path:'/reparti/rettifica',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Raddrizzatura',
                path:'/reparti/raddrizzatura',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Lucidatura',
                path:'/reparti/lucidatura',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Logistica',
                path:'/reparti/logistica',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Produzione',
                path:'/reparti/produzione',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Qualità',
                path:'/reparti/qualità',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Ufficio Tecnico',
                path:'/reparti/ufficio tecnico',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title:'Amministrazione',
                path:'/reparti/amministrazione',
                icon: <IoIcons.IoIosPaper />,
            }
        ]
    },
    {
        title:'Upload Istruzione',
        path:'/istruzione/upload',
        icon: <FiIcons.FiFilePlus />,
    },
    {
        title:'Login In',
        path:'/login',
        icon: <BiIcons.BiLogInCircle />,
    },
    {
        title:'Sign Up',
        path:'/register',
        icon: <FaIcons.FaUserPlus />,
    }
]
