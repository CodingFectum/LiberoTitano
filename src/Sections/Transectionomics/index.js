import { Container, Grid } from "@mui/material";
import React from "react";
import Heading from "../../components/Heading";

import workFlow from "../../images/work-flow.png"
const Transectionomics = () => {
    return(
        <div id="tokenomics" className="LT---section--tokenomics py-md-5">
            <Container>
                <Grid 
                    container
                    justifyContent="flex-end"
                    alignContent="center"
                    className="py-5 align-items-center"
                >
                    <Grid
                        container
                        xs={12}
                        md={8}
                    >
                        <Grid
                            xs={12}
                            className="pl-5"
                        >
                            <Heading 
                                title="Tokenomics"
                            />
                        </Grid>
                        
                        <Grid
                            xs={12}
                            sm={6}
                            className="LT---transectionomics--border-right"
                        >
                            <h3 className="position-relative mt-4 LT---text--pink">AUTOMATIC LP</h3>
                            <p className="text-left">A portion of all transactions would be used to generate LP tokens for LiberoTitano. This will leave room for massive volumes and listings.</p>
                        </Grid>
                        <Grid xs={12} sm={6} ></Grid>
                        <Grid xs={12} sm={6} ></Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            className="LT---transectionomics--border-left"
                        >
                            <h3 className="position-relative mt-4 LT---text--pink">TREASURY</h3>
                            <p className="text-left">The treasury backs the token's APY percentage to ensure that users get what they are promised. It acts as a buffer against massive spikes and market manipulation.</p>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            className="LT---transectionomics--border-right"
                        >
                            <h3 className="position-relative mt-4 LT---text--pink">RFV</h3>
                            <p className="text-left">The staking rewards are backed by the RFV thus mitigating risk.</p>
                        </Grid>
                        <Grid xs={12} sm={6} ></Grid>
                        <Grid xs={12} sm={6} ></Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            className="LT---transectionomics--border-left"
                        >
                            <h3 className="position-relative mt-4 LT---text--pink">LIBEROxTITANO</h3>
                            <p className="text-left mb-4">Get the very best of what high APY tokens provide. Why settle for less when you have LiberoTitano?</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Transectionomics;