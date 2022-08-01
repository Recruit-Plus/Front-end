import React from 'react';
import {
  Link
} from "react-router-dom";
import { Box,Stack,Grid} from '@mui/material';
import { Container } from '@mui/system';
import Navbar from './Navbar';

const Sign_up = () => {
return <>

<Box style={{paddingTop:120}}>
  <Grid container style={{backgroundColor:'grey',height:'100%',width:'100%'}}>
    <Grid item xs={5}>
      <div position='fixed'>left</div>
    </Grid>
    <Grid item xs={7}>
  <Box style={{}}>
    <div align='center'>
    <form >
      
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="Name" class="form-control" id="exampleInputEmail1"  placeholder="Enter your name" style={{width:'50%'}}/>
        <small id="emailHelp" class="form-text text-muted">Enter your first and last name .</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Email address</label>
        <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Email" style={{width:'50%'}}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">College</label>
        <input type="college" class="form-control" id="exampleInputPassword1" placeholder="Enter your college name" style={{width:'50%'}}/>
      </div>
     
      <div class="form-group">
        <label for="degree">Degree</label>
        <div>
        <select type="degree" class="form-control" id="exampleInputPassword1" style={{width:'50%'}}>
          <option value='Degree'>Select Degree</option>
          <option value='B.tech'>B.tech</option>
          <option value='M.tech'>M.tech</option>
          <option value='Bca'>BCA</option>
          <option value='MCA'>MCA</option>
        </select>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Branch</label>
        <input type="branch" class="form-control" id="exampleInputPassword1" placeholder="Enter your Branch" style={{width:'50%'}}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Experience</label>
        <input type="experience" class="form-control" id="exampleInputPassword1" placeholder="Enter your experience" style={{width:'50%'}}/>
      </div>
     
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
        <label class="form-check-label" for="exampleCheck1">All the information I  have filled is correct </label>
      </div>
      <div style={{paddingTop:15}}>
        <Link to='/Login'>
        <button type="submit" class="btn btn-primary" style={{backgroundColor:'black'}}>Sign up</button>
        </Link>
      </div>
     
    </form>
  </div>
</Box>
</Grid>
</Grid>
</Box>
</>
}


export default Sign_up;