import { Grid } from "@mui/material";
import React from "react";

const AccountCard = (props) => {
    return(
            <Grid
                container
                xs={12}
            >
                <Grid
                    xs={12}
                    sm={6}
                    className="px-4 py-2"
                >
                    <p className="text-center text-sm-left mb-1">{props.title}</p>
                </Grid>
                <Grid
                    xs={12}
                    sm={6}
                    className="px-4 py-2"
                >
                    <p className={"text-center text-sm-right mb-1 " + props.customclass}>{props.discription}</p>
                </Grid>

            </Grid>
    )
}

export default AccountCard;