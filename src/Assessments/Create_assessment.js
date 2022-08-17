import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button,OutlinedInput ,InputLabel ,MenuItem,FormControl,Select,AppBar} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,IconButton ,Paper,Box,Table,TableBody,TableCell,TableContainer,alpha,
        TableRow,TableSortLabel,Toolbar,Typography,Checkbox,Tooltip,FormControlLabel,Switch,Stack, TextField} from "@mui/material";
import Navbar from "../components/Navbar";
import TableHead from '@mui/material/TableHead';



function createData(question, option1, option2, option3, option4,answer) {
  return { question, option1, option2, option3, option4,answer };
}

const rows = [
  createData('Which of the following is not an OOPS concept?', 'Encapsulation', 'Polymorphism','Exception', 'Abstraction','Exception'),
  createData('Which type of members can’t be accessed in derived classes of a base class?', 'All can be accessed', 'Protected','Private', 'Public','Private'),
  createData(' Which inheritance type is used in the class given below? class A : public X, public Y {}', 'Multilevel inheritance', 'Multiple inheritance','Hybrid inheritance', 'Hierarchical inheritance','Multiple inheritance'),
  createData('What happens if non static members are used in static member function?','Executes fine', 'Compile Time Error', 'Executes if that member is unused', 'Runtime Error','Executes fine'),
  createData('Which class cannot create its instance?','Parent Class', 'Nested Class', 'Anonymous class', 'Abstract Class','Abstract Class'),
  
];
const names = [
    'OOP',
    'C',
    'C++',
    'Java',
    'DS',
    'DBMS',
    'Logical Reasoning',
    'English',
    'Java script',
    'Management Consultant',
    'Apptitude',
  ];



//----------------------------------------------------Actual function to be exported--------------------------
 function AddAssessment() {
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [assessmentsPerPage, setAssessmentsPerPage] = React.useState(5);
  const [assessments, setassessments]=React.useState([]);
  const[currentPage,setCurrentPage] = React.useState(1);
  const lastIndex = currentPage * assessmentsPerPage;
  const firstIndex = lastIndex - assessmentsPerPage;
  const currentassessments = assessments && assessments.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(assessments.length/assessmentsPerPage);
  const [questionProps, setQuestionProps] =React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);

  
 

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
  
  
 
 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = assessments.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
   const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const [personName, setPersonName] = React.useState([]);
   
    const handleChange = (event) => {
        
      const {
        target: { value },
      } = event;
    
      setPersonName(
        typeof value === 'string' ? value.split(',') : value,
      );
    console.log("Per",(personName[personName.length-1]))
    
        axios.get('http://localhost:8081/questions/v1/search?topics='+personName[personName.length-1]).then(result => setassessments(result?.data))
        .catch(err=>{
          console.log(err.message)
        })
        console.log('iii=',assessments) 
    
    };
    
          
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const [age1, setAge1] = React.useState('');
  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };
  const [age2, setAge2] = React.useState('');
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };
  
  return (
    <>
      {

         <div>
       
  <Navbar/>

<div style={{ marginTop:80 }}>
 <AppBar position="static" style={{ background: '#D3D3D3' }}>
        <Toolbar>
            <Stack Stack spacing={70} direction='row'>
                <div >
               <Stack Stack spacing={4} direction='row'>
                <Link to='/assessmentlist'>
                  <Button style={{color:'black'}}><ArrowBackIcon /></Button>
                </Link>
                
                  <Box sx={{ width: 170 , height:60}}>
                    <FormControl sx={{width: 200 }}>
                      <InputLabel id="demo-multiple-name-label" style={{color:'black'}}>Topic</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Name" />}
         
                    >
                      
                {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  
                >
                {name}
                
              </MenuItem >
          ))}
                    </Select>
                  </FormControl>
                </Box>
              
          <div style={{ paddingTop:'10px', paddingLeft:'750px'}} align='right'>
        <Button variant="contained" alignItems="left" onClick={handleClickOpen} style={{backgroundColor: "#000000"}} >
          Preview
        </Button>
        &nbsp;
        &nbsp;
        &nbsp;&nbsp;
        <Button variant="contained" alignItems="right" onClick={handleClickOpen} style={{backgroundColor: "#000000"}} >
          Save
        </Button>
        </div>
             
      </Stack>
   
      
    </div>
    </Stack>
  </Toolbar>
  
  </AppBar>
  </div>

{/* ---------------------Box with table, dense padding toggle and prev, next pagination buttons--------------         */} 
{personName}
    <Box sx={{ width: "95%" ,paddingTop:8,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
        <TextField
        
        label="Assessment Name :"
       
       
      />
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
          {rows.map((row) => (
            <TableRow
            
              key={row.question}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
             
              <TableCell component="th" scope="row" >
              <Checkbox></Checkbox>
                {row.question}
              </TableCell>
              
              <TableCell > {row.option1}</TableCell>
              <TableCell >{row.option2}</TableCell>
              <TableCell >{row.option3}</TableCell>
              <TableCell >{row.option4}</TableCell>
              <TableCell >{row.answer}</TableCell>
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
  
}
</>
  );
}

export default AddAssessment;