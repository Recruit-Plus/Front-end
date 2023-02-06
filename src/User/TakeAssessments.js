import React from 'react';
import {Link ,useNavigate, useLocation } from "react-router-dom";
import img1 from '../images/recruit+logo.png';
import { Button ,Typography,AppBar,Box,Toolbar,Grid,Stack,RadioGroup,Radio,FormControlLabel,FormControl,TextField,Input,
DialogActions,DialogContentText,DialogContent,DialogTitle,Dialog,TableBody,TableCell,TableRow,Table,Paper,TableContainer}from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import  './takeassessment.css';
import axios from 'axios';


const TakeAssessments = (assessmentId) => {
  const navigate =useNavigate();
  const location = useLocation();
  const [finish,setfinish]=React.useState(false);
  const[Questionsperpage,setquestionsperpage]=React.useState(1);
  const[Currentpage,setcurrentpage]=React.useState(1);
  const[Questions,setQuestions]=React.useState([]);
  const lastIndex=Currentpage*Questionsperpage;
  const firstIndex=lastIndex-Questionsperpage;
  const CurrentQuestion= Questions?.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(Questions?.length/Questionsperpage);
  const assessment_id=location.state.assessment_id.assessment_id;
  const [QuesAnswer,setQuesAnswer]=React.useState(["",[]]);
  const [reset ,SetReset]=React.useState(true);
  const [Answers, setAnswers]=React.useState([]);
  const [QuestionId, setQuestionId]=React.useState("");
  let questionLength=Questions.length;
  const [userResponses,setUserResponses]= React.useState({
    user_id: window.localStorage.getItem("userId"),
    assessment_id:assessment_id,
    responseSubmitted:[],
    Time_taken: 0,
  })
  const [response, setResponse] = React.useState([{
    questionId:"",
    answer_submitted: [""]
  }])
  React.useEffect(()=>{
    handleQuestion()
  },[])
  const handleQuestion=()=>{
    axios.get(`http://localhost:8082/assessments/v1/assessment/questions/${assessment_id}`).then(res =>setQuestions(res?.data))
    .catch(err => console.log(err));
  }
  function handleAnswer(event,id){
    setAnswers([...Answers,event.target.value]);
    setQuestionId(id);
  }
  function resetAnswer(){
    SetReset(false);
 }
   function handleClose(){
    setfinish(false);
   }
   function handleOpen(){
    setfinish(true);
   }
   function handleDelete(){
    let responseLength=response?.length;
    setfinish(false);
    console.log(response);
    const requestBody={...userResponses,responseSubmitted:response};
    console.log(requestBody);
    axios.post('http://localhost:8083/responses/v1/user/response',requestBody).then(res =>console.log(res))
    .catch(err => console.log(err))
    .then(navigate("/Feedback",{state:{QuestionsAttempted:{responseLength}}}));
   }
   const PreviousPage= (event) =>{
    if(Currentpage==1){
      alert("Reached to first question");
    }
    else{
      setcurrentpage(Currentpage-1);
    }
}
const NextPage = () =>{
  if(Currentpage==1){
    setResponse([{questionId:QuestionId,answer_submitted:Answers}])
    setAnswers("");
    setcurrentpage(Currentpage+1);
  }
  else{
    const r= {questionId:QuestionId,answer_submitted:Answers}
    setResponse([...response,r]);
    setAnswers("");
    if(Currentpage<totalPages){
      setcurrentpage(Currentpage+1);
    }
    else if(Currentpage==totalPages){
    alert("Reached to last question");
    }
  }
}
    return <>
        <Dialog
        open={finish}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{hieght:500}}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to end the test?"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
          <Typography ><h6> Do You  want to end the test?</h6></Typography> 
          <Typography ><h6>Once submitted you cannot retake! </h6>  </Typography> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button align='center' style={{backgroundColor:'black',color:'white',height:40,width:140}} onClick={handleDelete}>Submit</Button>
        <Button style={{height:40,width:140}}  onClick={handleClose} autoFocus>
            Cancel
        </Button>
        </DialogActions>
       </Dialog> 
       <Box  style={{ }}>
     <AppBar position="fixed"  style={{backgroundColor:'#d50000',minHeight: 40}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={img1} style={{ width:"50px",height:"50px"}} alt="img"/>
          </IconButton>
             <table> 
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'1.5rem',color:'white'}}>
              <b>                                                       RECRUIT+</b>
             </div> </td>
            </tr>
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'0.8rem',color:'white'}}>
               ONE DAY TO DAY ONE
              </div>
              </td>
            </tr>
           </table> 
        <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography >
          <div style={{paddingTop:5, paddingLeft:989}}>
            <Button align='center' style={{backgroundColor:'#D3D3D3',color:'black',height:40,width:120}} onClick={handleOpen}>Submit</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>

    <Grid container style={{paddingTop:20,height:600,width:1375}} spacing={3}>

      {/* <Grid item xs={2} style={{borderRight:'2px solid black'}} >
          <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:4}}>
            <Paper className='scroll' sx={{ height:"100%",width: "85%", mb: 2 ,paddingBottom:4}}>
            {Questions.map((question,index) => (
              <div style={{ float: "left" ,paddingLeft:50,paddingTop:6}}>
              <Box  width={35} height={35} style={{backgroundColor:'black',borderRadius:30}}><h6 align="center" style={{color:'white',paddingTop:6}}>{index +1}</h6></Box>   
              </div>
               ))}
            </Paper>
         </Box>
       
      </Grid> */}
     
     <Grid  item xs={10}>
     <Box sx={{ width: 1345 ,paddingTop:12,paddingLeft:4}}>
    
     <Paper sx={{ width: 1310, mb: 2 ,paddingBottom:4}}>
      {Questions?.length==0 ?
        <div style={{ float: "left"  }}>
         Question {totalPages} 
         </div>
        :
        <div style={{ float: "left" ,paddingLeft:10,paddingTop:4}}>
        <h5>Question  {Currentpage} </h5> 
          </div>}
     </Paper>
    
      <Paper sx={{ width: "100%", mb: 2}}>
        <TableContainer>
          <Table
            sx={{ minWidth: 580 , maxwidth :600 }}
            aria-labelledby="tableTitle"
           
          >
           
           <TableBody>
                {Questions?.length===0 ?
                <TableCell style={{width:'100%'}} >   
                <h5>No data Available!!!</h5>
              </TableCell>
              :
             CurrentQuestion?.map((questions,index ) => (
          <Table>
        <TableRow

            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    
             <TableCell component="th" scope="row">
              <div  style={{fontSize:'1.2rem'}}>{questions?.question}</div>
             
            </TableCell>
        </TableRow>
        <TableRow>
        
          <TableCell>
   <FormControl>
    {questions.type=="mcq"?
    <div>
   {questions?.choices.map((option) => (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      onChange={(event)=> handleAnswer(event,questions.question_id)}>
       {option.length!=0?
      <FormControlLabel value={option} control={<Radio />} label={option} />:null
       }
    </RadioGroup>
    ))}
    </div>
    :
    <TextField
    label="Answer"
    onChange={(event)=>handleAnswer(event,questions.question_id)}
  />
    }
  </FormControl>
  </TableCell>
    </TableRow>
    </Table>
  ),) } 
   </TableBody>     
            </Table>
        </TableContainer>
        </Paper> 
        <div style={{ float: "left" ,paddingTop:90,paddingRight:700}}>
          <Stack spacing={20} direction='row'>
           {Currentpage==totalPages?
          <Button variant ='outlined' className='button' style={{backgroundColor:'black',color:'white',fontSize:'1rem'}} onClick={NextPage}>Save</Button>
            :
          <Button variant ='outlined' className='button' style={{backgroundColor:'black',color:'white',fontSize:'1rem'}} onClick={NextPage}>Save &amp; Next</Button>
           }
          </Stack>
        </div>   
        <div style={{ float: "right" ,paddingBottom:20,paddingLeft:620}}>Question {Currentpage} of {totalPages}</div>  
    </Box>
     </Grid>
    </Grid>


    </>;
}



export default TakeAssessments;