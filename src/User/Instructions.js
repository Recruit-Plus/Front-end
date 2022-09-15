import React from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Button,Checkbox} from "@mui/material";
import axios from 'axios';
import {styled } from "@mui/material/styles";
import Navbar from '../components/Navbar';
import { useEffect } from "react";
export default function ControlledCheckbox(assessmentId,assessmentDuration,assessmentLength,assessmentName) {
  const [checked, setChecked] = React.useState(false);
  const [assessment,setAssessment]=React.useState();
  let navigate=useNavigate();
  let location = useLocation();
  const assessment_id=location.state.assessmentId.id;
  const assessment_duration=location.state.assessmentDuration.duration;
  const assessment_length=location.state.assessmentLength.length;
  const assessment_name=location.state.assessmentName.name;
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handlAttempt=()=>{
    navigate("/TakeAssessments",{state:{assessment_id:{assessment_id}}});
  }
  return (
    <>
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
              <h4>Assessment Name: {assessment_name}</h4>
              <h4>Time Limit: {assessment_duration}</h4>
              <h4>Total Questions: {assessment_length}</h4>
              <h4>Allowed attempts:01</h4>
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
                       <Link to="/EligibleAssessments">
                       <Button
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          height: 35,
                          width: 140}}>Back</Button></Link>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                          {checked?
                          <Button
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            height: 35,
                            width: 200}}
                            onClick={handlAttempt}>Proceed to take test</Button>:null }
                            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                             &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;

                  
                  </div>
           </container>
           </>
  );
                   
}