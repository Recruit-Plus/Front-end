import React from 'react';
import Left_partof_addQuestion_page from './Left_partof_addQuestion_page';
import Rightpart_addqpage
 from './Rightpart_addqpage';
 import img1 from '../images/recruit+logo.png';
 import PeopleIcon from '@mui/icons-material/People';
 import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './Navbar';
import {Typography,Button,CssBaseline,Container,Grid,Stack,RadioGroup,Radio,Box,makeStyles} from '@mui/material';
import {
    BrowserRouter as Router,
    
    Route,
    Link,
    NavLink,
    Routes
  } from "react-router-dom";
 
const Addquestions = () => {
 
  return (
      <>
   
         <Navbar />      {/* imported Navbar componemt */}
    
  
    <Grid container >       {/* After navbar you can see two part left and right
                            imported that component in grid  so you want to change something go to that component*/ }
        
           {/**
            * <Grid item xs={3.25}>
           <Left_partof_addQuestion_page/>       
         </Grid>
            */}
         
          
         <Grid item xs={8.75}>
          <Rightpart_addqpage/>
         </Grid>

    </Grid>
  
    
    </>
   
  );
}

export default Addquestions;