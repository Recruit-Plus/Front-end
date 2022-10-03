import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,IconButton ,Paper,Box,Table,TableBody,TableCell,TableContainer,alpha,
        TableRow,TableSortLabel,Toolbar,Typography,Checkbox,Tooltip,FormControlLabel,Switch,Stack,Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from "../components/Navbar";
import EditButtonPopup from "../QuestionList/EditButtonPopup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from 'sweetalert';
import EditAssessments from './EditAssessments';



const AssessmentList = () => {
  let navigate=useNavigate();
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
  const totalPages = Math.ceil(assessments?.length/assessmentsPerPage);
  const [assessmentId, setAssessmentId] =React.useState();
  const [editopen, setEditOpen] = React.useState(false);
  const [assessmentIdRef, setAssessmentIdRef] =React.useState();
  
  React.useEffect(() => {  
    
   assessmentHandle();
  },[]) 

  const assessmentHandle=()=>{
    axios.get('http://localhost:8082/assessments/v1/assessment').then(result => setassessments(result?.data))
    .catch(err=>{
      console.log(err.message)
    })

  }

  const PreviousPage= (event) =>{
      if(currentPage>1){
        setCurrentPage(currentPage-1);
      }
  }

  const NextPage = (event) =>{
    if(currentPage<totalPages){
    if(currentPage < currentPage+1){
      setCurrentPage(currentPage+1);
    }
  }
  }

  const handleClickOpen = () => {
    
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  const handleUpdate= (assessment_id, assessment_name, assessment_questions)=>{
    setEditOpen(true);
    navigate("/editassessment",{state:{assess_id:{assessment_id}, assess_name:{assessment_name}, assess_questions:{assessment_questions}}})
  }
  const handleDelete= id =>{
    setAssessmentIdRef(id); 
    setOpen(true);
  }


  const DeleteHandle= (choose)=>{
    setOpen(false);
    if(choose){
      axios.delete(`http://localhost:8082/assessments/v1/assessment/${assessmentIdRef}`) 
        .then((res)=> {
          swal({
            title: "Assessment Deleted Successfully",
            icon: "success",
            button: "OK",
          });
          assessmentHandle();
        })
    }
  }

  const handleResult=(assessment_id, assessment_name)=>{
    console.log(assessment_id);
    navigate('/Dashboard',{state:{assess_id:{assessment_id}, assess_name:{assessment_name}}});
  }
 
 
  
   const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

    return <>
         <div>
         <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Are you sure?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
       Do you really want to delete this Assessment? This process cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" style={{backgroundColor:'black'}}>Cancel</Button>
      <Button onClick={() =>DeleteHandle(true)} variant="contained" color="error"autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
    <Box sx={{ width: "95%" ,paddingTop:15,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
       
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 , maxwidth :1000 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
           
            <TableBody>
                <TableCell>
                  <h3 align='center'>Assessments List</h3>
                </TableCell>
                <TableCell align='right'>
                  <Link to='/addassessment'>
                    <Button style={{backgroundColor:'black',color:'white'}}>Add assessment</Button>
                    </Link>
                    </TableCell>
                {assessments?.length===0 ?
                <TableCell scope="assessments" style={{width:'100%'}} >   
                <h5>No assessment Available!!!</h5>
              </TableCell>
              :
              currentassessments?.map((assessments,index) => (
              <TableRow key={index}
              >          
                <TableCell scope="assessments" style={{width:'100%'}} >
                {assessments?.assessment_name}
              
                
              </TableCell>
              
              <TableCell >
              
              <Stack spacing={2} direction="row">
              
              <Button variant="outlined" style={{backgroundColor:'#37474F',color:'white'}} onClick={() =>{handleResult(assessments?.assessment_id,assessments?.assessment_name)}}>
                <LeaderboardIcon/>
              </Button>
             <Button variant="outlined" style={{backgroundColor:'black',color:'white'}} onClick={() =>{handleUpdate(assessments?.assessment_id,assessments?.assessment_name,assessments?.question_id)}}>
                <EditIcon/>  
              </Button>            
              <Button variant="contained" color="error" onClick={() =>{handleDelete(assessments?.assessment_id)}}>
                <DeleteIcon/>
              </Button>
            </Stack>
              </TableCell>
            </TableRow>
             ),) } 
            </TableBody>
          </Table>
        </TableContainer>
        {assessments?.length===0 ?
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

    </>;
}


export default AssessmentList;