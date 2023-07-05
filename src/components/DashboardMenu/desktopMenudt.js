import { Grid, Link } from "@mui/material";
import React, { useState } from "react";


const DashboardMenuForDesktop = (props) => {
    const menulist = props.menuList.map(function(value, i){
        let linkName = window.location.pathname
        let comparitative = "/" + value[0].toLowerCase();
        let activeClass = ""
        if( comparitative == linkName ){
            activeClass = "active"
        }
        return (
            <Link href={value[1]} className={value[2] + " borders d-block text-left px-3 px-md-4 " + activeClass}>
                <span class="material-icons md-10">{value[4]}</span> {value[0]} 
            </Link>
        );
    });
    return(
        <div className="px-3 d-flex" style={{justifyContent: "space-between",flexDirection: 'column', minHeight: 'calc(100vh - 60px)'}}>
            <div>
                <Link href="/" className="d-block mt-2">
                    <img src={props.siteLogo} className="img-fluid mb-5" style={{width: '100%', height: 'auto', maxWidth: 160}} />
                </Link>
                {menulist}
            </div>
            {/* <Link className="text-light" href="#" onClick={props.logout}>
                Logout <span class="material-icons md-10">
                    logout
                </span>
            </Link> */}
        </div>
    );
}

export default DashboardMenuForDesktop;