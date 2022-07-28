import React from 'react';

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
    
       <Rightpart_addqpage/>
   
  
    
    </>
   
  );
}

export default Addquestions;