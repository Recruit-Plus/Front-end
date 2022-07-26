import { AppBar,Toolbar,IconButton,Typography,Stack,Menu,MenuItem,Button} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import React, { useState } from "react";

export const Header=()=>{
    const [anchorE1,setAnchorE1]=useState(null);
    const open=Boolean(anchorE1)
    const handleClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorE1(event.currentTarget)

    }
    const handleClose=()=>{
        setAnchorE1(null)
    }
    return(
        <AppBar position="static" style={{backgroundColor:'#d50000'}}>
            <Toolbar>
              <IconButton size="large" edge="start" aria-label="logo" >  
                  <img src="logorecruit.png" className="App-logo" alt="logo" />
              </IconButton>
              <Typography sx={{flexGrow:1}}> </Typography>
              <div>
              <Stack direction='row' spacing={2} style={{fontFamily:"sans-serif"}}>
                   <Button 
                   color="inherit" 
                   id="user-button" 
                   onClick={handleClick} 
                   aria-controls={open? 'user-menu' :undefined}
                   aria-haspopup='true'
                   aria-expanded={open? 'true':undefined}
                   ><b>Welcome to Recruit+</b>
                    <AccountCircleIcon/></Button>
              </Stack>
              <Menu 
              id="user-menu"
               anchorE1={anchorE1} 
               open={open}
               MenuListProps={{'aria-labelledby':'user-button'}}
               onClose={handleClose}
               direction='row'
               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
             
               >
            <MenuItem onClick={handleClose}>Home</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
              </div>

            </Toolbar>
        </AppBar>
    )
}