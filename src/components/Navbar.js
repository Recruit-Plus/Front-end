import React from 'react';
 import img1 from '../images/recruit+logo.png';
 import PeopleIcon from '@mui/icons-material/People';
 import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Typography,Button} from '@mui/material';
import {
    Link,
    } from "react-router-dom";
 
const Navbar = () => {

  return (
    <>
   
     <Box  style={{ }}>
     <AppBar position="fixed"  style={{backgroundColor:'#d50000',minHeight: 40}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to='/HomePage'>
            <img src={img1} style={{ width:"50px",height:"50px"}} alt="img"/>
          
          </Link>
          </IconButton>
             <table> 
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'1.5rem',color:'white'}}>
              <b>                                                       RECRUIT+</b>
             </div> </td>
            </tr>
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'0.8rem',color:'white'}}>
               ONE DAY TO DAY ONE
              </div></td>
            </tr>
           </table>
           
        <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Link to='/Sign_up'>
         
           <Button style={{color:'white'}}> Sign Up</Button></Link>
          <Link to='/Login'> 
          <Button  style={{color:'white'}} >Login</Button>
          </Link>
         
          
         <PeopleIcon style={{color:'white'}}/>
        </Toolbar>
      </AppBar>
    </Box>
    
  
 
    
    </>
   
  );
}

export default Navbar;