import React from 'react';
import Navbar from './Navbar';
import { Box} from '@mui/material';
import { Container } from '@mui/system';
import {
  Link
} from "react-router-dom";
const Sign_up = () => {
  return <>
    <Navbar></Navbar>
    <Container style={{paddingTop:80}}>
   <Box style={{}}>
    <div>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" style={{width:'50%'}}/>
    <small id="emailHelp" class="form-text text-muted">Enter your first and last name .</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Email address</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Email" style={{width:'50%'}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">College</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your college name" style={{width:'50%'}}/>
  </div>
  <div class="form-group">
    <label for="degree">Degree</label>
    <div>
    <select type="password" class="form-control" id="exampleInputPassword1" style={{width:'50%'}}>
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
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your Branch" style={{width:'50%'}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Experience</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your experience" style={{width:'50%'}}/>
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
    </Container>
  </>
}


export default Sign_up;