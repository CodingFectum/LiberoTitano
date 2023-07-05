import { Container, Grid } from "@mui/material";
import React from "react";
import CirculateAnimation from "../../components/Animations/circulateAnimation";
import Menu from "../../components/Menu";

import headerImg from "../../images/header-img.png"

const Header = () => {
    return(
        <div className="LT---header--wrapper pb-md-5">
            <Menu />
            <Container>
                <Grid
                    container
                    justifyContent="flex-start"
                    alignContent="center"
                    className="py-5 my-md-5"
                >
                    <Grid
                        ms={12}
                        sm={8}
                        md={6}
                        className="text-left align-self-center"
                    >
                        <h1 className="mb-4">
                            The Best<br />
                            <span className="LT---text--green">Auto-Staking</span> & <br />
                            <span className="LT---text--pink">Auto-Compounding</span><br />
                            Protocol in Crypto
                        </h1>
                        <p  className="mb-1">
                            Highest Fixed APY - <span className="LT---text--green">480,000%</span>
                        </p>
                        <p  className="mb-1">
                            <span className="LT---text--green">Automatic Staking and Compounding</span>  in Your Wallet!
                        </p>
                        <p  className="mb-1">
                            Get Rewards Every <span className="LT---text--green">30 Minutes / 48 Times Daily!</span>
                        </p>
                        <br />
                        <a 
                            href="https://pancakeswap.finance/swap?outputCurrency=0xd3DdbBf78C516aFB4eeA871BE43868659ac32Da2"
                            className="btn"
                            target="_blank"
                        >
                            Buy Now
                        </a>
                        <a 
                            href="https://www.dextools.io/app/bsc/pair-explorer/0xfc531c66c59504ef3d7ace07663d824c71f3efea" 
                            className="btn2 ml-3"
                            target="_blank"
                        >
                            Chart
                        </a>
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                        className="text-right align-self-center px-0 pt-5 pt-sm-0"
                    >
                        <CirculateAnimation />
                        <img src={headerImg} className="img-fluid w-100 d-none" style={{maxWidth: 470}}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Header;