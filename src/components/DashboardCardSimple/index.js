import { Grid } from "@mui/material";
import React from "react";

const DashboardCardSimple = (props) => {
    return(
        <Grid
            xs={12}
            sm={6}
            md={4}
            className="p-4"
        >
            <p className="mb-1">{props.title}</p>
            <h3>{props.number}</h3>
        </Grid>
    )
}

export default DashboardCardSimple;