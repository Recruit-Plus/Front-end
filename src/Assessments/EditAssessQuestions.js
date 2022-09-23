import React from "react";
import Navbar from "../components/Navbar";
import {Paper,Box,Table,TableHead,
    TableBody,TableCell,TableContainer,TableRow,Checkbox,
    FormControlLabel,Switch,Button, TextField,Stack,FormControl,InputLabel,Select,OutlinedInput,Typography,MenuItem,Grid,AppBar,Toolbar, duration} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import swal from "sweetalert";
function EditAssessQuestion(a_id,a_name){
    const location = useLocation();
  
  const assessment_id=location.state.a_id.assessment_id;
  const assessment_name=location.state.a_name.assessment_name;
  const [loading, setLoading] =React.useState(true);
  //const [stateQuestion, setQuestionState] = React.useState([]);
 
    const [Questions, setQuestions]=React.useState([]);

    const [difficulty_level, setDifficulty_level] = React.useState("");
    const [type, setType] = React.useState("");
    const [topicName, setTopicName] = React.useState([]);
    const [Topics,setTopics]=React.useState([]);
    const [open, setOpen] = React.useState(false);
    
    const [assessQuestions,setAssessQuestions]=React.useState([]);
    const [Score,setScore]=React.useState(0);
    const [Duration,setDuration]=React.useState(0);
    const [users,setUsers]=React.useState([]);
    
    const [data,setData]=React.useState
  (    
    {
      assessment_name:assessment_name,
      question_id:[],
      user_id:users,
      duration:Duration,
      score:Score,
      created_by:window.localStorage.getItem("user"),
      last_modified_by:window.localStorage.getItem("user")
    }
  )
    let topics="";


    React.useEffect(() => {  
        console.log(assessment_id)
        handleQuestions()
        questionHandle()
        topicHandler()
      },[loading]);

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

      const handleQuestions=()=>{
      
          const load = async () => {
           const responseData =await axios.get(`http://localhost:8082/assessments/v1/assessment/${assessment_id}`)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });
            setAssessQuestions(responseData.question_id);
            setScore(responseData.score);
            setDuration(responseData.duration);
            setUsers(responseData.user_id);
           
            setLoading(false);
         }
        if (loading) {
            load();
        }
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

          function handleput(e) {
            

            //console.log(stateQuestion);
            const requestBody = {...data,question_id:assessQuestions,score:Score,duration:Duration}
            const url='http://localhost:8082/assessments/v1/assessment/'+assessment_id;
            axios.put(url,requestBody).then((response)=>{
            swal({
              title:"Data added successfully", 
              icon:"success", 
              button:"ok",
            });
          });
          }








    return<>

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
                <div style={{paddingTop:8,paddingRight:200 }}>
                  <Button onClick={handleSearch} style={{color: "#000000"}}>
                    <SearchIcon ></SearchIcon>
                  </Button>
                </div>
                <div style={{paddingTop:'10px',paddingLeft:'80px'}}>
      <Link to='/assessmentlist'>
        <Button style={{background:'#BEBEBE',color:'#000000',paddingLeft:'5px',paddingRight:'5px'}} variant="contained">Close</Button>
      </Link>
    &nbsp;&nbsp;

    &nbsp;&nbsp;
    <Link to='/assessmentlist'>
    <Button variant="contained"  style={{backgroundColor:'#696969'}} onClick={(e)=>handleput(e)}>SAVE</Button>
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
              <TextField  label="Assessment Name :" defaultValue={assessment_name} InputProps={{
                  readOnly: true,
                }}  >
              </TextField>
              <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography >

              
                    
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
                    console.log(assessQuestions);
                    console.log(Score);
                    console.log(Duration);
                    let value = e.target.value;
                    assessQuestions.push(value);
                    setScore(Score+questions.score);
                    setDuration(Duration+questions.duration);
                    
                    
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
</Box>
    
    
    
    
    
    
    
    
    </>
}
export default EditAssessQuestion;