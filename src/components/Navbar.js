import React from 'react';
import Leftbar from './Left_partof_addQuestion_page';
import Rightpart_addqpage
 from './Rightpart_addqpage';
 import img1 from '../images/recruit+logo.png';
 import PeopleIcon from '@mui/icons-material/People';
 import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import { makeStyles } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Addquestions from './add_new_questions_page';
import Sign_up from './Sign_up';
import {Typography,Button,CssBaseline,Container,Grid,Stack,RadioGroup,Radio,Box,makeStyles} from '@mui/material';
import {
    BrowserRouter as Router,
    
    Route,
    Link,
    NavLink,
    Routes
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
            <img src={img1} style={{ width:"50px",height:"50px"}}/>
          </IconButton> <table> 
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'1.3rem',color:'white'}}>
                                                                     RECRUIT+
             </div> </td>
            </tr>
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'0.9rem',color:'white'}}>
               ONE DAY TO DAY ONE
              </div></td>
            </tr>
           </table>
           
        <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Link to='/HomePage'>
          <Button  style={{color:'white'}}>Home</Button>
          </Link>
          <Link to='/Sign_up'>
         
           <Button style={{color:'white'}}> Sign Up</Button></Link>
           <Link to='/Login'>
           <Button  style={{color:'white'}}>Login</Button>
           </Link>
         <PeopleIcon style={{color:'white'}}/>
        </Toolbar>
      </AppBar>
    </Box>
    
  
 
    
    </>
   
  );
}

export default Navbar;