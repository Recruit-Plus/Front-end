import React from "react";
import {Link} from 'react-router-dom';
import {Button,Checkbox} from "@mui/material";
import {styled } from "@mui/material/styles";
import Navbar from '../components/Navbar';
export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
    <Navbar></Navbar>
    <container>
    <div style={{ paddingTop: 88,paddingBottom: "20px"  }}>
              <h1 style={{
                color: "red", display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}>General Instructions</h1>
            </div>
             <div className='my-1 mx-2'>
             <ul >
               <h4>Your assessment does not start until you click "Proceed to take test"</h4>
               <h4>Assessments are timed ,and when the time runs out ,your quiz will auto-submit.</h4>
               <h4>Only open your assessment when you are ready to complete it from start to finish.</h4>
               <h4>Make sure there is a reliable internet connection.</h4>
               <h4>When you begin your assessment ,your quiz will open in full screen mode.If you exit fullscreen or reload your assessment your test will auto-submit.</h4>
               <h4>When your quiz auto-submits,all the answers you have already selected will be submitted and graded.</h4>
               <h4>To prevent your test from auto-submitting ,you need to complete your assessment before the time runs out.</h4>
             </ul>
           </div>
           <box>
           <div className='my-1 mx-5' align= "left"style={{ paddingTop: "10px" }}>
              <h4>Time Limit:</h4>
              <h4>Total Questions:</h4>
              <h4>Marks allotted to each question</h4>
              <h4>Allowed attempts:</h4>
            </div>
            </box>
            <container>
            <div  className='my-1 mx-4' style={{ paddingTop: "10px" }} >
            <Checkbox
          checked={checked}
          onChange={handleChange}
           inputProps={{ 'aria-label': 'controlled' }}/>
           <span>I understand the rules for this test and I agree to follow them</span>
           </div>
            </container>
            <div align="right" style={{ paddingBottom: "30px" }}>
                       <Button
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          height: 35,
                          width: 140}}>Back</Button>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<Button
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            height: 35,
                            width: 200}}>Proceed to take test</Button>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                             &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                  
                  </div>
           </container>
           </>
  );
                   
}


