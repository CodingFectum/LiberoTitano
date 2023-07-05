import { Container, Grid } from "@mui/material";
import React from "react";

import medium from "../../images/medium.png"
import telegram from "../../images/telegram.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"
import reddit from "../../images/reddit.png"

const Footer = () => {
    return(
        <div className="LT---footer">
            <Container  maxWidth="lg">
                <Grid
                    container
                    className="py-3"
                >
                    <Grid
                        xs={12}
                        sm={4}
                        className="text-left py-4"
                    >
                        <h3 className="pb-3 text-uppercase">Products</h3>
                        <a href="/dashboard" className="d-block mb-2">Automatic-Staking</a>
                    </Grid>
                    {/* <Grid
                        xs={12}
                        sm={3}
                        className="text-left py-4"
                    >
                        <h3 className="pb-3 text-uppercase">Learn</h3>
                        <a href="#" target="_blank" className="d-block mb-2">Documentation</a>
                        <a href="#" target="_blank" className="d-block mb-2">Github</a>
                    </Grid> */}
                    <Grid
                        xs={12}
                        sm={4}
                        className="text-left py-4"
                    >
                        <h3 className="pb-3 text-uppercase">Socials</h3>
                        {/* <a href="https://medium.com/@Magneto.financial" target="_blank" className="d-block mb-2">
                            <img src={medium} style={{width: 25, height: 25}} />
                            Medium
                        </a> */}
                        <a href="https://t.me/LiberoTitano" target="_blank" className="d-block mb-2">
                            <img src={telegram} style={{width: 25, height: 25}} />
                            Telegram
                        </a>
                        <a href="https://twitter.com/LiberoTitano" target="_blank" className="d-block mb-2">
                            <img src={twitter} style={{width: 25, height: 25}} />
                            Twitter
                        </a>
                    </Grid>
                    <Grid
                        xs={12}
                        sm={4}
                        className="text-left py-4"
                    >
                        <h3 className="pb-3 text-uppercase">Dashboard</h3>
                        <a href="#" className="btn2 mb-2">
                            Open App
                        </a>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Footer;