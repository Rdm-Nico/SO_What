import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [

    {
        title:'Reparti',
        path:'/reparti',
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
            title:'Qualità',
            path:'/reparti/qualità',
            icon: <IoIcons.IoIosPaper />,
            }
        ]
    }
]