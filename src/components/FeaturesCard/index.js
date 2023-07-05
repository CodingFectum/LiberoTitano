import { Grid } from "@mui/material";
import React from "react";

const FeaturesCard = (props) => {
    return(
        <Grid
            xs={12}
            sm={6}
            className="py-3 p-sm-5"
        >
            <div className={"LT---Features--card " + props.customClass}>
                <div className="py-4">
                    <h4 className="px-4 mb-3 text-uppercase">{props.title}</h4>
                    <p className="px-4 mb-0">{props.subTitle}</p>
                    <p className="px-4 mb-0">{props.discription}</p>
                </div>
            </div>
        </Grid>
    );
}

export default FeaturesCard;