import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button} from "@mui/material";
import {Paper,Box,Table,TableBody,TableCell,TableContainer,TableRow,Checkbox,
        FormControlLabel,Switch, TextField} from "@mui/material";
import swal from 'sweetalert';
import Navbar from "../components/Navbar";
import TableHead from '@mui/material/TableHead';
//import PreviewWindow from './components/PreviewWindow';



//----------------------------------------------------Actual function to be exported--------------------------
 function AddAssessment() {
  const [dense, setDense] = React.useState(false);
  const [assessmentsPerPage, setAssessmentsPerPage] = React.useState(5);
  const [assessments, setassessments]=React.useState([]);
  const[currentPage,setCurrentPage] = React.useState(1);
  const lastIndex = currentPage * assessmentsPerPage;
  const firstIndex = lastIndex - assessmentsPerPage;
  const currentassessments = assessments && assessments.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(assessments.length/assessmentsPerPage);
  const[invalid,setinvalid]=React.useState(false);
  const[assessmentName,setAssessmentName]=React.useState("");

  const [data,setData]=React.useState
  (    
    {
      assessment_name:"",
      question_id:[],
      created_by:"Ritika",
      last_modified_by:"Srinu"
    }
  )

  function handlepost(e)
 {

  const requestBody = {...data}
  axios.post("http://localhost:8082/assessments/v1/assessment",requestBody).then(result=>{console.log(result?.data)})
  .alert(swal("Data added successfully", "You clicked the button!", "success"));

 }
  const PreviousPage= (event) =>{
      if(currentPage>1){
        setCurrentPage(currentPage-1);
      }
  }

  const NextPage = (event) =>{
    if(currentPage < currentPage+1){
      setCurrentPage(currentPage+1);
    }
  }

   const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  
    const optionlist=[]
    for(const i in assessments.choices){
      console.log("each =>",  assessments.choices[i])
      optionlist[i]=( assessments.choices[i])
      
    }

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
            <Button style={{background:'#BEBEBE',color:'#000000'}} variant="contained">Add Question</Button>
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
            <TableCell >Option 1</TableCell>
            <TableCell >Option 2</TableCell>
            <TableCell >Option 3</TableCell>
            <TableCell >Option 4</TableCell>
            <TableCell >Answer</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {assessments.map((row) => (
            <TableRow
            key={row.question}
              
            >
             
             
              <TableCell component="th" scope="row" >
              <Checkbox></Checkbox>
                {row.question}
              </TableCell>
              
              
              <TableCell >{row.choices[0]}</TableCell>
              <TableCell >{row.choices[1]}</TableCell>
              <TableCell >{row.choices[2]}</TableCell>
              <TableCell >{row.choices[3]}</TableCell>
              {/* if({row.answer[0]}=={row.choices[0]})<TableCell>{row.choices[0]}</TableCell> */}
              <TableCell >{row.answer[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        {assessments.length===0 ?
        <div style={{ float: "right" }}>
          <Button onClick={PreviousPage}>Prev</Button>
          Page {totalPages} of {totalPages}
          <Button onClick={NextPage}>Next</Button>
        </div>:
        <div style={{ float: "right" }}>
          <Button onClick={PreviousPage}>Prev</Button>
          Page {currentPage} of {totalPages}
          <Button onClick={NextPage}>Next</Button>
        </div>}
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

export default AddAssessment