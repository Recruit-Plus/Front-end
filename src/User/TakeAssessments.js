import React from 'react';
import {
    Link,
    } from "react-router-dom";
import img1 from '../images/recruit+logo.png';
import { Button ,Typography,AppBar,Box,Toolbar,Grid,Stack,RadioGroup,Radio,FormControlLabel,FormControl,ListItem,ListItemText} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
 import Instructions from './Instructions';
 import Divider from '@mui/material/Divider';
const TakeAssessments = () => {
  const [finish,setfinish]=React.useState(false);
   function handlefinish(){
      setfinish(true);
      alert("Are you sure you want submit")
   }
    return <>
        
    <Box  style={{paddingBottom:70 }}>
     <AppBar position="fixed"  style={{backgroundColor:'white',minHeight: 20}}>
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
              <td><div className='abc'align="centre" style={{fontSize:'1.5rem',color:'black'}}>
              <b>                                                       RECRUIT+</b>
             </div> </td>
            </tr>
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'0.8rem',color:'black'}}>
               ONE DAY TO DAY ONE
              </div></td>
            </tr>
           </table> 
          <Divider orientation="vertical" flexItem />
        <Stack spacing={4} direction ='row' style={{paddingLeft:35}}>
          
        <div style={{paddingTop:10}}>
            <Button align='center' style={{backgroundColor:'black',color:'white',height:40,width:140}} >All</Button>
          </div>
           <Divider orientation="vertical" flexItem />
           <div style={{paddingTop:10}}>
            <Button align='center' style={{backgroundColor:'black',color:'white',height:40,width:140}} >Instructions</Button>
          </div>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={1}>
            <Stack spacing={3} direction='row'>
             <div style={{color:'black'}}>Completed</div>
             <div  style={{color:'black'}}> Not Answered</div>
             <div  style={{color:'black'}}>Current</div>            
            </Stack>
            <Stack spacing={11} direction='row'>
             <Box  width={30} height={30} style={{backgroundColor:'black'}}></Box>   
             <Box width={30} height={30}  style={{backgroundColor:'gray'}}></Box>   
             <Box width={30} height={30}  style={{backgroundColor:'red'}}></Box>           
            </Stack>
            </Stack>
            <Divider orientation="vertical" flexItem />
           <Typography style={{color:'black',paddingRight:140}}>Username</Typography>
           <Divider orientation="vertical" flexItem />
           <div style={{paddingTop:10}}>
            <Button align='center' style={{backgroundColor:'black',color:'white',height:40,width:140}} onClick={handlefinish}>Finish Attempt</Button>
          </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>

    <Grid container style={{paddingTop:20,height:565}} spacing={2}>

      <Grid item xs={3} >
        <Box  style={{width:'100%',height:'80%',backgroundColor:'#E0E0E0',margin:'1rem auto 0 auto',paddingLeft:30,paddingRight:3,paddingBottom:3,paddingTop:10}}>
         
          
        </Box>
      </Grid>
     <Grid  item xs={9}>
    <Box    style={{width:'90%',height:'70%',backgroundColor:'#E0E0E0',paddingLeft:30,margin:'0.8rem auto 0 auto',paddingRight:3,paddingBottom:3,paddingTop:10}}>
        <div> Who invented Java?</div>
        <div style={{paddingTop:10}}>
          <Stack spacing={2}>
          <div align='left' >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                id='  difficulty_level'
              >
            <FormControlLabel  value='easy'  control={<Radio />} label="Easy" style={{color:'black'}}/>
            <FormControlLabel  value='medium'  control={<Radio />} label="Medium" style={{color:'black'}}/>
            <FormControlLabel   value='hard' control={<Radio />} label="Hard" style={{color:'black'}}/>
            <FormControlLabel   value='hard' control={<Radio />} label="Hard" style={{color:'black'}}/>
            </RadioGroup>
            </FormControl>
        </div>
          </Stack>
        </div>
    </Box>

     </Grid>
    </Grid>


    </>;
}



export default TakeAssessments;