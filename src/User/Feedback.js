import React from 'react';
import Rating from '@mui/material/Rating';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Divider,Typography,Stack,Box,IconButton,Toolbar,AppBar } from '@mui/material';
import img1 from '../images/recruit+logo.png';
import {Link, useLocation} from "react-router-dom";


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(8),
    },
    '& .MuiInputBase-input': {
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      padding: '50px 300px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  
const Feedback = (QuestionsAttempted) => {
  const location = useLocation();
  const Questions_attempted=location.state.QuestionsAttempted.responseLength;
    return <>
     <Container>
    <box>
    <div align ="center" style={{paddingTop : 75}}> 
    <h2>Your Quiz has been submitted successfully!!!!!</h2>
    <div>
    <div style={{paddingTop : 10}} align="left">
    <h5>       Quiz Summary</h5>
    <div style={{paddingTop : 10}}> Number of Questions Attempted:     {Questions_attempted}</div>
          Time Taken :
    </div>
    </div>
    <div style={{paddingTop : 50}}><h5>How would you rate your experience</h5></div>
    <Rating
     name="half-rating"
     size="large" />
     </div>
     <div align = "left" style={{paddingTop : 20}}><h5>Do you have any suggestions to improve our website</h5></div>
     <div className='container my-2 mx-1' align= "left" style={{paddingTop : 20}} >
     <FormControl variant="standard">
        <BootstrapInput defaultValue=" " />
      </FormControl>
      </div>
      <div style={{paddingTop : 40}} align= "center">
      <Link to="/">
      <Button  variant="contained" style={{backgroundColor:'black'}}>Submit</Button>
      </Link>
      </div>
     </box>
     </Container></>;
}


export default Feedback;