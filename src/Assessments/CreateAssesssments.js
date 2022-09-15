import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button} from "@mui/material";
import {Paper,Box,Table,TableBody,TableCell,TableContainer,TableRow,Checkbox,
        FormControlLabel,Switch, TextField} from "@mui/material";
import swal from 'sweetalert';
import Navbar from "../components/Navbar";
import TableHead from '@mui/material/TableHead';

//----------------------------------------------------Actual function to be exported--------------------------
 function CreateAssessment() {
  const [dense, setDense] = React.useState(false);
  const [Questions, setQuestions]=React.useState([]);
  const [stateQuestion, setQuestionState] = React.useState([]);
  

    React.useEffect(() => {  
      questionHandle()
    },[])
    const questionHandle= () => {
      axios.get('http://localhost:8081/questions/v1/').then((result) =>setQuestions(result?.data?.content))
      .catch(err=>{
        console.log(err.message);
      })
    }
const [data,setData]=React.useState
  (    
    {
      assessment_name:"",
      question_id:[],
      created_by:window.localStorage.getItem("user"),
      last_modified_by:window.localStorage.getItem("user")
    }
  )
function handlepost(e)
 {
  let arrayids = [];
      stateQuestion.forEach(d => {
        if (d.select) {
          arrayids.push(d.id);
          console.log(d.id);
        }
      });
      console.log(stateQuestion);
  const requestBody = {...data,question_id:stateQuestion}
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
    <div style={{paddingTop:'90px',paddingLeft:'80px'}}>
      <Link to='/assessmentlist'>
        <Button style={{background:'#BEBEBE',color:'#000000',paddingLeft:'5px',paddingRight:'5px'}} variant="contained">Close</Button>
      </Link>
    &nbsp;&nbsp;
    <Link to='/addquestiontoassessment'>
      <Button style={{background:'#BEBEBE',color:'#000000'}} variant="contained" >
      Preview
      </Button>
    </Link>
    &nbsp;&nbsp;
    <Button variant="contained"  style={{backgroundColor:'#696969'}} onClick={(e)=>handlepost(e)}>SAVE</Button>
    </div>
{/* ---------------------Box with table, dense padding toggle and prev, next pagination buttons--------------         */} 

    <Box sx={{ width: "95%" ,paddingTop:4,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TextField label="Assessment Name :" onChange={(event) => setData({...data,assessment_name: event.target.value})}>
              </TextField>
              <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell>Question</TableCell>
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