import React from 'react';
import {Link} from "react-router-dom";
  import img1 from '../images/recruit+logo.png';
import { Button ,Typography,AppBar,Box,Toolbar,Grid,Stack,RadioGroup,Radio,FormControlLabel,FormControl,TextField,Input,
  DialogActions,DialogContentText,DialogContent,DialogTitle,Dialog,TableBody,TableCell,TableRow,Table,Paper,TableContainer}from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Instructions from './Instructions';
import Divider from '@mui/material/Divider';
import { useLocation } from "react-router-dom";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import  './takeassessment.css';
import axios from 'axios';


const TakeAssessments = (assessmentId) => {
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
  const [reset ,SetReset]=React.useState(true);
  let questionLength=Questions.length;
  const [questionIndex, setQuestionIndex]=React.useState(0);
  React.useEffect(()=>{

    axios.get(`http://localhost:8082/assessments/v1/assessment/questions/${assessment_id}`).then(res =>setQuestions(res?.data))
    .catch(err => console.log(err));
  },[])
  function resetAnswer(){
    SetReset(false);
 }

   function handleClose(){
    setfinish(false);
   }
   function handleClickOpen(){
    setfinish(true);
   }
   const PreviousPage= (event) =>{
    if(Currentpage==1){
      alert("Reached to first question");
    }
    else{
      setcurrentpage(Currentpage-1);
    }
}
const NextPage = (event) =>{
  if(Currentpage==questionLength){
    alert("Reached to last question");
  }
  else{
    setcurrentpage(Currentpage+1);
  }
}
    return <>
        <Dialog
        open={finish}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{hieght:500}}
      >
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
          <Link to='/Feedback'>
        <Button align='center' style={{backgroundColor:'black',color:'white',height:40,width:140}} onClick={handleClose}>Finish Attempt</Button>
        </Link>
          <Button style={{height:40,width:140}}  onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog> 
    <Box  style={{paddingBottom:70 }}>
     <AppBar position="fixed"  style={{backgroundColor:'#d50000',minHeight: 20}}>
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
            <img src={img1} style={{ width:"40px",height:"40px"}} alt="img"/>
          </IconButton>
          <Divider orientation="vertical" flexItem color='white'/>
        <Stack spacing={4} direction ='row' style={{paddingLeft:30}}>
           <div style={{paddingTop:5}}>
            <Button align='center' style={{backgroundColor:'#D3D3D3',color:'black',height:40,width:140}} >Instructions</Button>
          </div>
          <Divider orientation="vertical" flexItem color='white'/>
          <Typography variant="h4" 
            component="div" sx={{ flexGrow: 3}}>
          </Typography >
          <Typography style={{color:'white',paddingRight:340,paddingLeft:400}}></Typography>
           <Divider orientation="vertical" flexItem color='white'/>
           <div style={{paddingTop:5}}>
            <Button align='center' style={{backgroundColor:'#D3D3D3',color:'black',height:40,width:140}} onClick={handleClickOpen}>Finish Attempt</Button>
          </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>

    <Grid container style={{paddingTop:20,height:565}} spacing={2}>

      <Grid item xs={2} style={{borderRight:'2px solid black'}} >
          <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:4}}>
            <Paper className='scroll' sx={{ height:"100%",width: "85%", mb: 2 ,paddingBottom:4}}>
            {Questions.map((question,index) => (
              <div style={{ float: "left" ,paddingLeft:50,paddingTop:6}}>
              <Box  width={35} height={35} style={{backgroundColor:'black',borderRadius:30}}><h6 align="center" style={{color:'white',paddingTop:6}}>{index +1}</h6></Box>   
              </div>
               ))}
            </Paper>
         </Box>
       
      </Grid>
     
     <Grid  item xs={10}>
     <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:10}}>
    
     <Paper sx={{ width: "100%", mb: 2 ,paddingBottom:4}}>
      {Questions?.length==0 ?
        <div style={{ float: "left"  }}>
         Question {totalPages}  
         </div>
        :
        <div style={{ float: "left" ,paddingLeft:10,paddingTop:4}}>
        <h6>Question  {Currentpage}  </h6> 
          </div>}
     </Paper>
    
      <Paper sx={{ width: "100%", mb: 2}}>

        
        <TableContainer>
          <Table
            sx={{ minWidth: 600 , maxwidth :600 }}
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
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
    
             <TableCell component="th" scope="row" >
              {questions?.question}
            </TableCell>
        </TableRow>
        <TableRow>
        
          <TableCell>
   <FormControl>
    {questions.type=="MCQ"?
    <div>
   {questions?.choices.map((option) => (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group">
       {option.length!=0?
      <FormControlLabel value={option} control={<Radio />} label={option}/>:null
       }
    </RadioGroup>
    ))}
    </div>
    :
    <TextField
    label="Answer"
    onChange={(event)=>console.log(event.target.value)}
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
        <Button onClick={resetAnswer}>Reset Answer <RestartAltIcon/></Button> 
        <div style={{ float: "left" ,paddingTop:90,paddingRight:700}}>
          <Stack spacing={20} direction='row'>
          <Button onClick={PreviousPage}  style={{float: "left"}}>Prev</Button>
          <Button onClick={NextPage}  style={{float: "right"}}>Next</Button>
          </Stack>
        </div>
     
    </Box>
     </Grid>
    </Grid>


    </>;
}



export default TakeAssessments;