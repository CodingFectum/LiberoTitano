import { Container, Grid } from "@mui/material";
import React from "react";
import Heading from "../../components/Heading";

import aboutMobile from "../../images/about-mobile.png"
import about from "../../images/about.png"
const About = () => {
    return(
        <div id="about" className="LT---section--About py-md-5">
            <Container>
                <Grid 
                    container
                    justifyContent="center"
                    alignContent="center"
                    className="py-5 align-items-center"
                >
                    <Grid
                        xs={12}
                        sm={6}
                        className="py-4 px-0 pr-md-4 "
                    >
                        <img src={about} className="img-fluid w-100 d-none d-sm-block" />
                        <img src={aboutMobile} className="img-fluid w-100 d-sm-none" />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        className="text-left pl-md-4"
                    >
                        <Heading 
                            title="About"
                        />
                        <p style={{maxWidth: 400}}>
                        LiberoTitano brings you the best of two worlds. If you're looking for a one-way ticket to financial freedom then look no further than LiberoTitano. You thought a project out there had the higher fixed APY? THINK AGAIN! LiberoTitano has an APY locked at 480,000%! 
                        <br />
                        <br />
                        Here at LiberoTitano, we push the limits of what is possible with a DAO mechanism. Owing to the combined powers of automatic staking, compounding and cross-chain farming our holders get nothing but the best returns out there. Now there's an offer you can't refuse. Grab your tokens while you can!
                        </p>
                        <a href="/dashboard" className="btn mt-3">Open App</a>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default About;