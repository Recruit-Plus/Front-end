import React from 'react';
import {
  Link,
  } from "react-router-dom";
import img1 from '../images/recruit+logo.png';
import {Box,Toolbar,Typography,Button,IconButton,AppBar} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';

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
          <Link to='/homepage'>
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
          </Typography >
        
          <Link to='/login'> 
          <Button  style={{color:'white'}} >Login</Button>
          </Link>  <Link to='/TakeAssessments'>
           <Button style={{color:'white'}}> Sign Up</Button></Link>
         {/* <PeopleIcon style={{color:'white'}}/> */}
        </Toolbar>
      </AppBar>
    </Box>
    </>
   
  );
}

export default Navbar;