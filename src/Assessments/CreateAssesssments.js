import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button, duration} from "@mui/material";
import {Paper,Box,Table,TableBody,TableCell,TableContainer,TableRow,Checkbox,
        FormControlLabel,Switch, TextField,Stack,FormControl,InputLabel,Select,OutlinedInput,Typography,MenuItem,Grid,AppBar,Toolbar} from "@mui/material";
import swal from 'sweetalert';
import Navbar from "../components/Navbar";
import TableHead from '@mui/material/TableHead';
import { alignProperty } from "@mui/material/styles/cssUtils";
import SearchIcon from '@mui/icons-material/Search';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';


 function CreateAssessment() {
  const [dense, setDense] = React.useState(false);
  const [Questions, setQuestions]=React.useState([]);
  const [stateQuestion, setQuestionState] = React.useState([]);
  const [users,setUsers]=React.useState([]);
  const [user,setUser]=React.useState([]);
  const [difficulty_level, setDifficulty_level] = React.useState("");
  const [type, setType] = React.useState("");
  const [topicName, setTopicName] = React.useState([]);
  const [Topics,setTopics]=React.useState([]);
  const [open, setOpen] = React.useState(false);
  let topics="";

  var dur=0;
  var scr=0;
  var role="candidate";

    React.useEffect(() => {  
      questionHandle()
      topicHandler()
      userHandle()
      
      
    },[])
    const questionHandle= () => {
      axios.get('http://localhost:8081/questions/v1/').then((result) =>setQuestions(result?.data?.content))
      .catch(err=>{
        console.log(err.message);
      })
    }

    const topicHandler=()=>{
      axios.get('http://localhost:8081/questions/v1/topics').then(result => setTopics(result?.data))
      .catch(err=>{
        console.log(err.message)
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

    const handleSearch=()=>{
      topics=topicName.join();
      console.log(topics,difficulty_level,type);
      axios.get('http://localhost:8081/questions/v1/search',{
        params:{
          topics,type,difficulty_level
        }}).then(result => setQuestions(result?.data))
      .catch(err=>{
        console.log(err.message)
      })
  
    }


   

    const handleChangeUser = (event) => {
      const {
        target: { value },
      } = event;
      setUser(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setTopicName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleChange1 = (event) => {
      setDifficulty_level(event.target.value);
        };

    const handleChange2 = (event) => {
      setType(event.target.value);
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
   <div style={{paddingTop:75}}>
    <AppBar position="static" style={{ background: '#D3D3D3' }}>
        <Toolbar style={{height:75}}>
          <Stack Stack spacing={65} direction='row'>
            <div>
              <Stack   direction='row'>
                <div className="mx-3">
                  <Box sx={{ minWidth: 200 , maxHeight:47}}>
                    <FormControl sx={{  width: 250}}>
                      <InputLabel id="demo-multiple-name-label" style={{color:'black' }}>Topic</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={topicName}
                      onChange= {handleChange}
                      input={<OutlinedInput label="Topic" />}
                      >
                        {Topics?.map((topics,id) => (
                        <MenuItem key={id} value={topics.topic}>{topics.topic}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                 </Box>
                </div>
                <div className="mx-3">
                  <Box sx={{ minWidth: 200 , border: '1px solid #DDD', maxHeight:47}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Difficulty level</InputLabel>
                      <Select labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={difficulty_level}
                              label=" Difficulty level"
                              onChange={handleChange1}>
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Hard">Hard</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className="mx-3">
                  <Box sx={{ minWidth: 200 , border: '1px solid #DDD', maxHeight:47}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        value={type}
                       
                        onChange={handleChange2}>
                          <MenuItem value="MCQ">MCQ</MenuItem>
                          <MenuItem value="Fill in the blank">Fill in the blank</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div style={{paddingTop:8,paddingRight:220 }}>
                  <Button onClick={handleSearch} style={{color: "#000000"}}>
                    <SearchIcon ></SearchIcon>
                  </Button>
                </div>
                <div style={{paddingTop:'10px',paddingLeft:'80px'}}>
      <Link to='/assessmentlist'>
        <Button style={{background:'black',color:'white',paddingLeft:'5px',paddingRight:'5px'}} variant="contained">Close</Button>
      </Link>
    &nbsp;&nbsp;
    <Link to='/assessmentlist'>
    <Button variant="contained"  style={{backgroundColor:'black'}} onClick={(e)=>handlepost(e)}>SAVE</Button>
    </Link>
    </div>
              </Stack>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
   
   


    <Box sx={{ width: "95%" ,paddingTop:4,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <Stack direction="row" paddingTop="6px" >
              <TextField label="Assessment   Name" onChange={(event) => setData({...data,assessment_name: event.target.value})}>
              </TextField>
              <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography >
          <Box sx={{ minWidth: 200 , maxHeight:47,paddingTop:"1px",paddingRight:"3px"}}>
              <FormControl sx={{  width: 250 }} >
                      <InputLabel  id="demo-multiple-name-label" style={{color:'black' }}>Candidates</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={user}
                    
                      onChange= {handleChangeUser}
                      input={<OutlinedInput label="Candidates" />}
                     
                      >
                         {users?.map((user,id) => (
                       
                        <MenuItem key={id} value={user.user_id}>
                          {user.user_name}
                          
                          </MenuItem>
                         ))} 
                      </Select>
                    </FormControl>
                    </Box>
                    <Box sx={{ paddingTop:"4px",paddingRight:"3px"}}>
                    {/* <Button  onClick={handleUser} style={{backgroundColor:'grey',color:'white',fontSize:'0.9rem',width:10,height:50}}>OK</Button> */}
                    <DoneSharpIcon onClick={handleUser} style={{backgroundColor:'black',color:'white',width:55,height:45,paddingTop:'5px'}}></DoneSharpIcon>
                    </Box>
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