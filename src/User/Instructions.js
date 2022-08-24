import React from 'react';
//import {Container} from '@material-ui/core';
//import {Button} from "reactstrap";
import { Button ,Container} from '@mui/material';



const Instructions = () => {
    
        
    return <>
<div>
      <header/>
      </div>
    <div>
         <Container maxWidth='lg' style={{ backgroundColor: 'white' }}>
            <div style={{ padding: 20 }}>
              <h1 style={{
                color: "red", display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}>Instructions</h1>
            </div>
            <div className={{ fontSize: '3rem' }}>
              <ol >
                <li><h3>Your assessment does not start until you click attempt quiz.</h3></li>
                <li><h3>Assessments are timed ,and when the time runs out ,your quiz will auto-submit.</h3></li>
                <li><h3>Only open your assessment when you are ready to complete it from start to finish.</h3></li>
                <li><h3>Make sure there is a reliable internet connection.</h3></li>
                <li><h3>When you begin your assessment ,your quiz will open in full screen mode.If you exit fullscreen or reload your assessment your test will auto-submit.</h3></li>
                <li><h3>When your quiz auto-submits,all the answers you have already selected will be submitted and graded.</h3></li>
                <li><h3>To prevent your test from auto-submitting ,you need to complete your assessment before the time runs out.</h3></li>
              </ol>
            </div>
            <div>
              <h3>Time Limit:</h3>
              <h3>Total Questions:</h3>
              <h3>Marks allotted to each question</h3>
              <h3>Allowed attempts:</h3>
            </div>
            <div><Button color="danger" size="lg">Back</Button>&nbsp; &nbsp; &nbsp; &nbsp; <Button color="danger" size="lg">Start</Button> </div>
          </Container>
          
        </div>
    </>;
}



export default Instructions;