import { Container, Grid } from "@mui/material";
import React from "react";

import workFlow from "../../images/work-flow.png"
import workFlowBK from "../../images/workFlow-BK.png"
const WorkFlow = () => {
    return(
        <div className="pt-4" style={{ backgroundImage: "linear-gradient(#070d21, transparent , #070d21 90%),url("+workFlowBK+")",backgroundSize: "cover", backgroundRepeat: 'no-repeat'}}>
            <Container>
                <Grid 
                    container
                    justifyContent="center"
                    alignContent="center"
                    className="my-md-4 py-5 align-items-center"
                >
                    <Grid
                        xs={12}
                    >
                        <img src={workFlow} className="img-fluid w-100" />
                    </Grid>
                    <a href="https://pancakeswap.finance/swap?outputCurrency=0xd3DdbBf78C516aFB4eeA871BE43868659ac32Da2" target="_blank" className="btn">Start Earning Now</a>
                </Grid>
            </Container>
        </div>
    );
}

export default WorkFlow;