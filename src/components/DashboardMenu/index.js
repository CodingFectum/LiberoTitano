import React from "react"
import { Grid, Link } from "@mui/material";
import DesktopMenu from "./desktopMenudt.js"
import MobileMenu from "./mobileMenudt.js"

// import './menu.css'

import logo from '../../images/logo.png'

const MenuList = [
    [
        'Dashboard', // title
        '/dashboard', // Link
        'Global---menu-link hover px-3 py-2 mb-3', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5', // Class for Mobile
        'dashboard'
    ],
    [
        'Account',
        '/account', 
        'Global---menu-link hover px-3 py-2 mb-3', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5', // Class for Mobile
        'person_outline'
    ],
    [
        'Calculator',
        '/calculator',
        'Global---menu-link hover px-3 py-2 mb-3', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5', // Class for Mobile
        'calculate'
    ],
    [
        '',
        '#',
        'Global---menu-link hover px-3 py-2 borderTop', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5 borderTop', // Class for Mobile
        ''
    ],
    [
        'Swap',
        'https://pancakeswap.finance/swap?outputCurrency=0xd3DdbBf78C516aFB4eeA871BE43868659ac32Da2',
        'Global---menu-link hover px-3 py-2 mb-3', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5', // Class for Mobile
        'swap_horizontal_circle'
    ],
    [
        'Chart',
        'https://www.dextools.io/app/bsc/pair-explorer/0xfc531c66c59504ef3d7ace07663d824c71f3efea',
        'Global---menu-link hover px-3 py-2 mb-3', // Class for Desktop
        'Global---menu-link px-3 py-2 mx-3 pr-5', // Class for Mobile
        'description'
    ]
];

const handleLogout = () => {
    // console.log('User has been logd: ', localStorage.getItem("token") )
    localStorage.clear();
    // console.log('User has been logd: ', localStorage.getItem("token") )
    window.location.replace("/login");
}
const Menu = () => {
    return(
        <Grid item xs={12} md={2} className="Global-main-menu-outer text-md-center w-100 pb-0 py-md-4 px-0 d-block LT---Features--card ">
            <div className="d-none d-md-block">
                <DesktopMenu 
                    siteLogo={logo}
                    menuList={MenuList}
                    logout= {handleLogout}
                />
            </div>
            <div className="d-md-none">
                <MobileMenu 
                    siteLogo={logo}
                    menuList={MenuList}
                    logout= {handleLogout}
                />
            </div>
        </Grid>
    )
}

export default Menu;