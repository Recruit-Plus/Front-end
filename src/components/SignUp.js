import * as React from 'react';
import {
  Link,
  } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack ,Grid,Select,MenuItem,InputLabel,FormControl,FormHelperText,Button} from '@mui/material';
import img1 from '../images/recruitpluslogo.png';
export default function Sign_up() {
  const [Degree,setDegree]=React.useState("");
  const handleChange=(event)=>{
     setDegree(event.target.value)
  }
  return (
  
   <>
   <Grid container style={{paddingTop:30,paddingRight:100}} spacing={2}>
      <Grid item xs={1} >
     
      </Grid>
      <Grid item xs={11}  >
    <Box
      sx={{
        width: '100%',
        height:'100%',
        // maxWidth: '100%',
        paddingTop:7,
        paddingLeft:7,
        backgroundColor:'#EEEDE7',
        paddingRight:7,
        border:'2px solid black'
      }}
    >
       <Stack spacing ={30} direction="row">
        <div></div>
      <div ><h4>SIGN UP TO GET STARTED</h4></div>
      </Stack>
      <Stack spacing ={2} direction="row" style={{paddingTop:17}} >
      <TextField fullWidth label="Name" id="fullWidth" />
      <TextField fullWidth label="E-mail" id="fullWidth" />
      </Stack>
      <Stack spacing ={2} direction="row" style={{paddingTop:17}}>
      <FormControl sx={{  minWidth: 420 }}>
        <InputLabel id="demo-simple-select-helper-label">Degree</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={Degree}
          label="Degree"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>B.tech</MenuItem>
          <MenuItem value={20}>M.tech</MenuItem>
          <MenuItem value={30}>BCA</MenuItem>
          <MenuItem value={30}>MCA</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label="Branch" id="fullWidth" />
      </Stack>
      <Stack direction="row" style={{paddingTop:17}}>
      <TextField fullWidth label="Branch" id="fullWidth" />
      </Stack>
      <Stack direction="row" style={{paddingTop:17}}>
      <TextField fullWidth label="Branch" id="fullWidth" />
      </Stack>
      <Stack spacing={44} direction="row" style={{paddingTop:30}}>
      <div></div>

      <div style={{paddingTop:'20px'}}>
         <Button style={{backgroundColor:'black',color:'white',height:40,width:130}} >Get started </Button>
     </div>
      </Stack>
      <Stack spacing ={1} direction="row" style={{paddingTop:30,paddingLeft:240}}>
      <h5>Already have an account? </h5>
      <Link to='/login'>
      <Button style={{}} >Login</Button>
      </Link>
      </Stack>
    </Box>
    </Grid>
    </Grid>
    </>
  );
}