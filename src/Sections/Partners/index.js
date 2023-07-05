import { Container, Grid } from "@mui/material";
import React from "react";
import Heading from "../../components/Heading";

import CMC from "../../images/CMC.png"
import GC from "../../images/GC.png"


const Partners = () => {
    return(
        <div className="py-md-5">
            <Container>
                <Grid 
                    container
                    justifyContent="center"
                    alignContent="center"
                    className="py-5 align-items-center"
                >
                    <Grid
                        xs={12}
                    >
                        <Heading 
                            title="Find us on"
                        />
                    </Grid>
                    
                    <Grid
                        xs={12}
                        className="pb-5"
                    >
                        <img src={CMC} className="img-fluid mr-3 my-3" style={{height: 40}} />
                        <img src={GC} className="img-fluid mr-3 my-3" style={{height: 40}} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Partners;