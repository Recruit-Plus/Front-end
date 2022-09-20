import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button, duration} from "@mui/material";
import {Paper,Box,Table,TableBody,TableCell,TableContainer,TableRow,Checkbox,
        FormControlLabel,Switch, TextField,Stack,FormControl,InputLabel,Select,OutlinedInput,Typography,MenuItem,Grid} from "@mui/material";
import swal from 'sweetalert';
import Navbar from "../components/Navbar";
import TableHead from '@mui/material/TableHead';
import { alignProperty } from "@mui/material/styles/cssUtils";


 function CreateAssessment() {
  const [dense, setDense] = React.useState(false);
  const [Questions, setQuestions]=React.useState([]);
  const [stateQuestion, setQuestionState] = React.useState([]);
  const [users,setUsers]=React.useState([]);
  const [user,setUser]=React.useState([]);

  var dur=0;
  var scr=0;
  var role="candidate";

    React.useEffect(() => {  
      questionHandle()
      userHandle()
      
      
    },[])
    const questionHandle= () => {
      axios.get('http://localhost:8081/questions/v1/').then((result) =>setQuestions(result?.data?.content))
      .catch(err=>{
        console.log(err.message);
      })
    }
    const userHandle=()=>{
      axios.get('http://localhost:8084/users/v1/user/'+role).then((result)=>{
           setUsers(result?.data)
        
      })
      .catch(err=>{
        console.log(err.message)
      })
    }


   

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setUser(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const handleUser=()=>{
      setUsers(user)
      swal({
        title: "Candidates are alloted with assessments",
        icon: "success",
     
        button:"OK"
      })

    }

const [data,setData]=React.useState
  (    
    {
      assessment_name:"",
      question_id:[],
      user_id:[],
      duration:0,
      score:0,
      created_by:window.localStorage.getItem("user"),
      last_modified_by:window.localStorage.getItem("user")
    }
  )
function handlepost(e)
 {
  Questions?.map((questions)=>{
    if (stateQuestion.includes(questions.question_id))
    {
      dur=dur+questions.duration;
      scr=scr+questions.score;
    }
    
  })
  const requestBody = {...data,score:scr,duration:dur,question_id:stateQuestion,user_id:users}
  axios.post("http://localhost:8082/assessments/v1/assessment",requestBody).then(result=>{console.log(result?.data)})
  .catch(err =>console.log(err))
  .alert(swal("Data added successfully", "You clicked the button!", "success"));
}
const handleChangeDense = (event) => {
setDense(event.target.checked);
};
  
  return (
    <>
   <div>
   <Navbar></Navbar>
   <stack>
    <div style={{paddingTop:'90px',paddingLeft:'80px'}}>
      <Link to='/assessmentlist'>
        <Button style={{background:'#BEBEBE',color:'#000000',paddingLeft:'5px',paddingRight:'5px'}} variant="contained">Close</Button>
      </Link>
    &nbsp;&nbsp;
    <Link to='/addquestiontoassessment'>
      <Button style={{background:'#BEBEBE',color:'#000000'}} variant="contained" >
      Preview
      </Button>
    </Link >
    &nbsp;&nbsp;
    <Link to='/assessmentlist'>
    <Button variant="contained"  style={{backgroundColor:'#696969'}} onClick={(e)=>handlepost(e)}>SAVE</Button>
    </Link>
    </div>
    
    </stack>


    <Box sx={{ width: "95%" ,paddingTop:4,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <Stack direction="row" >
              <TextField label="Assessment Name :" onChange={(event) => setData({...data,assessment_name: event.target.value})}>
              </TextField>
              <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography >

              <FormControl sx={{  width: 250 }} >
                      <InputLabel id="demo-multiple-name-label" style={{color:'black'}}>Candidates</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={user}
                      onChange= {handleChange}
                      input={<OutlinedInput />}
                      >
                         {users?.map((user,id) => (
                       
                        <MenuItem key={id} value={user.user_id}>
                          {user.user_name}
                          
                          </MenuItem>
                         ))} 
                      </Select>
                    </FormControl>
                    
                    <Button  onClick={handleUser} style={{backgroundColor:'grey',color:'white',fontSize:'1rem',width:'7px'}}>OK</Button>
                    
              </Stack>
              <TableRow>
                <TableCell>Questions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Questions?.length===0 ?
                <TableCell scope="questions" style={{width:'100%'}} >   
                <h5>No data Available!!!</h5>
              </TableCell>
                :
                Questions?.map((questions,index) => (
                  <TableRow key={index}>          
                    <TableCell scope="questions" style={{width:'100%'}} >
                    <input
                  type="checkbox"
                  value={questions.question_id}
                  onChange={e => {
                    let value = e.target.value; 
                    setQuestionState(
                      stateQuestion=>[...stateQuestion,value],
                    )
                  }}
                  />
            {questions.question}
                  </TableCell>
                </TableRow>
              ),) } 
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
<FormControlLabel
  control={<Switch checked={dense} onChange={handleChangeDense} />}
  label="Dense padding"
/>
</Box>
</div>
  

</>
  );
}

export default CreateAssessment;