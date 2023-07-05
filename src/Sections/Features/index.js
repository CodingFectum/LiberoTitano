import { Container, Grid } from "@mui/material";
import React from "react";
import FeaturesCard from "../../components/FeaturesCard";
import Heading from "../../components/Heading";

import headerImg from "../../images/features-card.png"
const Features = () => {
    return(
        <div id="features" className="py-md-5">
            <Container>
                <Grid 
                    container
                    justifyContent="center"
                    alignContent="center"
                    className="py-5"
                >
                    <Grid
                        xs={12}
                    >
                        <Heading 
                            title="Features"
                        />
                    </Grid>
                    <Grid
                        container
                        xs={12}
                        className="position-relative"
                        style={{zIndex:1}}
                    >
                    <img src={headerImg} className="LT---features--bk-img d-none d-sm-block" />
                        <FeaturesCard
                            title="DEFI 3.0 MULTICHAIN FARMING"
                            customClass="ml-md-auto"
                            discription="LiberoTitano's token looks for the best network to farm tokens on in realtime. For every second that your tokens are hard at work, you can rest assured that they're putting out the best returns you can get across any chain."
                        />
                        <FeaturesCard
                            title="STAKING REWARDS"
                            customClass="mr-md-auto"
                            discription="Once you buy your tokens they are automatically inducted into our staking program. Staking rewards are siphoned back into the initial capital and keep compounding indefinitely."
                        />
                        <FeaturesCard
                            title="RISK FREE VALUE (RFV) FUND"
                            customClass="ml-md-auto"
                            discription="The DAO manages a treasury that backs up the fixed APY while continuously making investments and disbursements as needed. The RFV backs the staking rewards provided by the rebase."
                        />
                        <FeaturesCard
                            title="AUTOMATIC HYPER BURN PROGRAM"
                            customClass="mr-md-auto"
                            discription="A portion of each transaction is burnt off to gradually shrink the supply as time progresses, this allows the token's price to remain stable while providing a massive fixed APY."
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Features;