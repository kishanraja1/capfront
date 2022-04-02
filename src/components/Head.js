import {useState} from 'react'
import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '2px solid black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Head = (props) => {
  const [open, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }
  setState(open);
};
  return (
    <Box  sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="default" elevation={0} className="TopNav" >
            <Container>
            <Toolbar>
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
              >
                <MenuIcon className='iconBtn'/>
              </IconButton>
            <Drawer
              anchor="left"
              variant="temporary"
              open={open}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <Box >
                <IconButton sx={{mb: 2}}>
                  <CloseIcon onClick={toggleDrawer(false)} />
                </IconButton>
                <Divider sx={{mb: 2}} />
                <Box sx={{mb: 2}}>
                <ListItemButton onClick={()=>{window.location.href="https://fierce-retreat-92206.herokuapp.com/home"}}>
                  <ListItemText primary="Home Page" />
                </ListItemButton>

                <ListItemButton onClick={()=>{window.location.href="https://fierce-retreat-92206.herokuapp.com/news"}}>
                  <ListItemText primary="News" />
                </ListItemButton>
              </Box>
            <Box sx={{
                  display: "flex",
                  justifyContent:"center",
                  position: "absolute",
                  bottom: "30%",
                  left: "50%",
                  transform: "translate(-50%, 0)"}}
                >
                </Box>
              </Box>
            </Drawer>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                <h1>SeekingBeta</h1>
            </Typography>
            <Search onChange={props.handleSearch}>
              <SearchIconWrapper>
            <SearchIcon />
              </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            </Toolbar>
            </Container>
          </AppBar>
        </Box>

  )
}

export default Head
