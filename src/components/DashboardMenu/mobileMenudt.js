import * as React from 'react';
import { Container, Grid, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
// import ListIcon from '@mui/icons-material/List';

const MobileMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const menulist = props.menuList.map(function(value, i){
        return (
            <Link 
                href={value[1]} 
                className={value[3] + " d-block"}
                onClick={handleClose}
            >
                <span class="material-icons md-10">{value[4]}</span> {value[0]}
            </Link>
        );
    });
  return (
    <Container>
         <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className="mt-2"
            xs={12}
        >
            <Grid
                xs={8}
                className="text-left"
            >
                <Link href="/">
                    <img src={props.siteLogo} className="img-fluid" style={{width: '100%', height: 'auto', maxWidth: 170}} />
                </Link>
            </Grid>
            <Grid
                xs={4}
                className="text-right"
            >
                 <Button
                    id="fade-button"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <span class="material-icons">menu</span>
                </Button>
            </Grid>
        </Grid>
     
        <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            className="w-100 px-2"
        >
            {menulist}
            {/* <Link href="#" onClick={props.logout} className="Global---menu-link px-3 py-2 mx-3 pr-5">
                <span class="material-icons md-10 mr-1">
                logout
                </span>
                Logout
            </Link> */}
        </Menu>
    </Container>
  );
}

export default MobileMenu;
