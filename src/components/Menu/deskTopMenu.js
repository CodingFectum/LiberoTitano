import React from "react";
import { 
        Container, 
        Grid,
        Link
    } from "@mui/material";

const DesktopMenu = (props) => {
    const menulist = props.menuList.map(function(value, i){
        return (
            <Link href={value[1]} className={value[2]}>
                {value[0]}
            </Link>
        );
    });
    return (
        <Container maxWidth="xl">
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className="Global---NavMenu py-4"
            >
                <Grid
                    xs={12}
                    sm={2}
                >
                    <Link href="/">
                        <img src={props.siteLogo} className="img-fluid w-100" style={{maxWidth: 170}} />
                    </Link>

                </Grid>
                <Grid
                    xs={12}
                    sm={10}
                    className="text-right"
                >
                    {menulist}
                </Grid>
            </Grid>
        </Container>
    );
}

export default DesktopMenu;
