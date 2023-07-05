import { Grid } from "@mui/material";
import React from "react";

const DashboardCardBordered = (props) => {
    const darkClass = "0";
    if(props.percentage){
        var txt = props.percentage;
        // console.log('sdfds: ', txt)
        var thenum = txt.match(/\d/g); // replace all leading non-digits with nothing
        // thenum = thenum.join("");
        // console.log('sdfds: ', thenum)
        // alert(thenum)
        // if( thenum < 1 ) {
        //     darkClass = "red"
        // }else{
        //     darkClass = "green"
        // }
    }
    return(
        <Grid
            xs={12}
            sm={6}
            className={props.customClass}
        >
            <div className="LT---Features--card">
                <div className="p-4">
                    <div className="d-flex justify-content-between"> 
                        <p className="text-capitalize mb-1">{props.title}</p>
                        <p className={darkClass}>{props.percentage}</p>
                    </div>
                    <h3 className="text-left">{props.number}</h3>
                    <p className="text-uppercase mb-0 text-left" style={{minHeight:"unset"}}>{props.discription}</p>
                </div>
            </div>
        </Grid>
    )
}

export default DashboardCardBordered;