import React from "react";
import { Container, Grid } from "@mui/material";

import page404 from './page404.png'
import Menu from "../../components/Menu";

const PageNotFound = () => {
  return (
    <div className="LT---404-container">
      <Menu />
      <div className="LT---404">
        <Container maxWidth="lg">
          <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="py-5"
          >
              <Grid
                  xs={12}
                  className="text-center"
              >
                <h1><b>Oops!</b></h1>
                <br />
                <br />
                <h5 style={{color: '#FF58B1'}}>404 - Page Not Found</h5>
                <br />
                <p className="mx-auto" style={{maxWidth:400}}>The page you are looking for might have been removed had it's name changed or is temporarily unavailable</p>
                <br />
                <a href="/" className="btn">Go To Homepage</a>
              </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default PageNotFound;
