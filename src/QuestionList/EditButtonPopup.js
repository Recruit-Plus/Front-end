import React from 'react'
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import { Button ,Box, Grid,TextField,Stack,Container} from '@mui/material';
import swal from 'sweetalert'
import Navbar from '../components/Navbar';
export default function EditButtonPopup({question}) {
  const[questionId,setQuestionId] = React.useState(question.question_id);
  const[questionm,setquestionm] = React.useState(question.question);
  const[option1,setoption1] = React.useState(question.choices[0]);
  const[option2,setoption2] = React.useState(question.choices[1]);
  const[option3,setoption3] = React.useState(question.choices[2]);
  const[option4,setoption4] = React.useState(question.choices[3]);
  const[topic,setTopic] = React.useState(question.topics);
  const[type,setType] = React.useState(question.type);
  const[level,setLevel] = React.useState(question.difficulty_level);
  const[duration,setDuration] = React.useState(question.duration);
  const[score,setScore] = React.useState(question.score);
  const ans =question.answer;
  const[choices,setchoice] = React.useState([]);
  const[topics,settopics] = React.useState([]);
  const options = [option1, option2, option3, option4]
  const [valid,setvalid]=React.useState(false);
  const created=question.created_by;
  const [data,setData]=React.useState
  (    
    {
      question:questionm,
       choices:choices,
      topic : topic,
      difficulty_level:level,
      type:type,
      duration:duration,
      score:score,
      answer:ans,
      created_by:created,
      last_modified_by:window.localStorage.getItem("user")
    }
  )
 
  
    
  function Handleput(e){
   
    const requestBody = {...data,choices: options,created_by:created}
    const url='http://localhost:8081/questions/v1/question/'+questionId; // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    axios.put(url,requestBody).then((response) => {
      swal({
        title: "Question Updated Successfully",
        icon: "success",
        button: "OK",
      });
    });  
  }
  return (
    <>
    <Navbar/>
    <div style={{paddingTop:'50px'}}>
       <Stack spacing={85} direction='row'>
              <div></div>
      <div style={{paddingTop:'50px'}}>
        <Button style={{backgroundColor:'black',color:'white'}} onClick={(e)=>Handleput(e)}>Update </Button>
    </div>
</Stack>
    <Grid container style={{paddingTop:20}} spacing={2}>  <Grid item lg={3} >
    <Box 
    style={{width:'100%',border:'2px solid black',height:'100%',backgroundColor:'#f8f8f8',margin:'0.6rem auto 0 auto',paddingTop:40}}>
    <Grid container>
    <Grid item xs={5}>
<Container >
      <Stack>
         <p  style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'0.5rem',width:'100%'}}> Topic</p> 
        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1.3rem 0.4rem ',transition:'0.3s linear all',padding:'0.5rem',width:'100%'}}>Type</p>

        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1.2rem 0.4rem ',transition:'0.3s linear all',padding:'0.5rem',width:'100%'}}>Level</p>

        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'0.5rem',width:'100%'}}>Score</p>

        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Duration</p>
        
      </Stack>
   </Container>
 </Grid>
  <Grid item xs={7}>
    <Container styles={{borderRight:'2px solid black',paddingLeft:60,paddingBottom:30}}>    
      <Stack>
        <form>
        <TextField  fullWidth label="Topic" defaultValue={topic}  onChange={(event) => setData({...data,topics: [event.target.value]})} 
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Type" defaultValue={question.type}  onChange={(event) => setData({...data,type: event.target.value})} 
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Difficulty Level" defaultValue={question.difficulty_level}  onChange={(event) => setData({...data,difficulty_level: event.target.value})} 
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Score" defaultValue={question.score}  onChange={(event) => setData({...data,score: event.target.value})}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Duration" defaultValue={question.duration}   onChange={(event) => setData({...data,duration: event.target.value})}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        
        </form>
      </Stack>     
    </Container>
    </Grid>
  </Grid>
</Box>
    </Grid>
    <Grid item lg={9} >
    <Box 
    style={{width:'90%',border:'2px solid black',height:'100%',backgroundColor:'#f8f8f8',margin:'0.6rem auto 0 auto',paddingLeft:30,paddingRight:3,paddingBottom:3,paddingTop:10}}>
    <Grid container>
    <Grid item xs={2} >
    <Container >
      <Stack>
        <p  style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Question</p>
        {question.type=="MCQ"?
        <Stack>
        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.8rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 1</p>

        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.8rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 2</p>

        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.8rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 3</p>

        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.8rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 4</p>
        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.8rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Answer</p>
        </Stack>: 
        <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.8rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Answer</p>
       }
      </Stack>
   </Container>
  </Grid>
  <Grid item xs={8}>
    <Container styles={{borderRight:'2px solid black',paddingLeft:60}}>    
      <Stack>
        <form>
        <TextField id ='question' fullWidth label="Question " variant='outlined' defaultValue={question.question} onChange={(event) => setData({...data,question: event.target.value})}
                style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        {question.type=="MCQ"?
        <Stack><TextField  fullWidth label="Option 1" defaultValue={question.choices[0]}  onChange={(event) => setoption1(event.target.value)}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Option 2" defaultValue={question.choices[1]}  onChange={(event) => setoption2(event.target.value)} 
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Option 3" defaultValue={question.choices[2]}  onChange={(event) => setoption3(event.target.value)}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Option 4" defaultValue={question.choices[3]} onChange={(event) => setoption4(event.target.value)}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
        <TextField  fullWidth label="Answer" defaultValue={ans} onChange={(event) => setData({...data,answer: [event.target.value]})}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
          </Stack>: 
          <TextField  fullWidth label="Answer" defaultValue={ans} onChange={(event) => setData({...data,answer: [event.target.value]})}
          style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
          }
        </form>
      </Stack>     
    </Container>
    </Grid>
  </Grid>
</Box>
    </Grid>
    </Grid>
    </div>
    </>
  )
}
