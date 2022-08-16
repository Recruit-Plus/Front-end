import React from 'react';
import {
    Link,
    } from "react-router-dom";
  import img1 from '../images/recruit+logo.png';
import { Button ,Typography,AppBar,Box,Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
 
const TakeAssessments = () => {
    // const[Hours,Sethours]=React.useState('00');
    // const[Min,SetMin]=React.useState('00');
    // const[Seconds,Setseconds]=React.useState('00');
    // const[time ,Settime]=React.useState("");
    // let interval = useRef();
    // React.useEffect(()=>{
    //     let countdown = new Date()
    // })
    return <>
         <Box  style={{ }}>
     <AppBar position="fixed"  style={{backgroundColor:'#d50000',minHeight: 40}}>
        <Toolbar>
             <Typography sx={{paddingRight:42}}>Assessment Name</Typography>
             <Box variant="h9" 
            component="div" sx={{paddingRight:24 ,paddingLeft:10}}>  02 min 29 seconds 
          </Box >
          <Typography variant="h9" 
            component="div" sx={{paddingRight:11 ,paddingLeft:10}}>Answered : 1/30
          </Typography >
          <Button style={{backgroundColor:'black',color:'white',paddingRight:2 }}>Finish Attempt</Button>
          {/* <PersonIcon/> */}
        </Toolbar>
      </AppBar>
    </Box>
    </>;
}



export default TakeAssessments;