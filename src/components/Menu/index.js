import React from "react"

import DesktopMenu from "./deskTopMenu"
import MobileMenu from "./mobileMenu"

import './menu.css'

import logo from '../../images/logo.png'

const MenuList = [
    [
        'Home', // title
        '/', // Link
        'Global---menu-link px-3 py-1 mx-1', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5' // Class for Mobile
    ],
    [
        'About us',
        '/#about',
        'Global---menu-link px-3 py-1 mx-1', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5' // Class for Mobile
    ],
    [
        'Tokenomics',
        '/#tokenomics',
        'Global---menu-link px-3 py-1 mx-1', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5' // Class for Mobile
    ],
    [
        'Features',
        '/#features',
        'Global---menu-link px-3 py-1 mx-1', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5' // Class for Mobile
    ],
    [
        'Telegram',
        'https://t.me/LiberoTitano',
        'Global---menu-link px-3 py-1 mx-1', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5' // Class for Mobile
    ],
    [
        'Open App',
        '/dashboard',
        'btn Global---menu-link mr-1 ml-4', // Class for Desktop
        'btn Global---menu-link mx-3 text-center' // Class for Mobile
    ]
];
const Menu = () => {
    return(
        <div>
            <div className="d-none d-md-block">
                <DesktopMenu 
                    siteLogo={logo}
                    menuList={MenuList}
                />
            </div>
            <div className="d-md-none">
                <MobileMenu 
                    siteLogo={logo}
                    menuList={MenuList}
                />
            </div>
        </div>
    )
}

export default Menu;