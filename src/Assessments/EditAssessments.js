import React from 'react';
import axios from 'axios';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    styled,AppBar,Box,Toolbar,Typography,InputBase,Button} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link, useLocation} from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



function EditAssessments (assess_id, assess_name) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const assessment_id=location.state.assess_id.assessment_id;
  const assessment_name=location.state.assess_name.assessment_name;
  const [questions,setQuestions] = React.useState([]);
  const [questionIdRef , setQuestionIdRef]=React.useState();
  const [score,setScore]=React.useState();
  const [duration,setDuration]=React.useState();

  let navigate=useNavigate();
  React.useEffect(()=>{
    handleQuestions()
  },[])
  const handleQuestions=()=>{
    axios.get(`http://localhost:8082/assessments/v1/assessment/questions/${assessment_id}`).then(res =>setQuestions(res?.data))
      .catch(err => console.log(err));
  }

  const handleAssessment=(assessment_id,assessment_name)=>{
    navigate("/edit",{state:{a_id:{assessment_id},a_name:{assessment_name}}})
    //console.log(a_id)
  }

  const handleClickOpen = (id,scr,dura) => {
    setOpen(true);
    setQuestionIdRef(id);
    setScore(scr);
    setDuration(dura);
  };

    
  const handleDelete = () => {
    setOpen(false);
    axios.delete(`http://localhost:8082/assessments/v1/assessment/${assessment_id}/question/${questionIdRef}`,{
      params:{
        score,duration
      }})
    .then((res)=> {
      swal({
        title: "Question Deleted Successfully",
        icon: "success",
        button: "OK",
      });
      handleQuestions();
    })
    .catch(err => console.log(err));
  };
    const handleClose=()=>{
      setOpen(false);
    }
    return <>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">
      {"Are you sure?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
       Do you really want to delete this Question? This process cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" style={{backgroundColor:'black'}}>Cancel</Button>
      <Button onClick={handleDelete} variant="contained" color="error"autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  <div style={{paddingTop:'75px'}}>
    <div>
    <Box sx={{ flexGrow: 1 }} style={{background:'#ffffff'}}>
      <AppBar position="static" >
        <Toolbar style={{background:'#eeeeee',paddingRight:'20px'}}>
        <Typography
            variant="h6"
            noWrap
            component="div"
            align="center"
            style={{color:'#111111'}}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {assessment_name}&nbsp;&nbsp;Assessment
          </Typography>
            <div style={{paddingLeft:'20px'}}>
              <Link to='/assessmentlist'>
            <Button style={{background:'#BEBEBE',color:'#000000',paddingLeft:'5px',paddingRight:'5px'}} variant="contained">Close</Button>
            </Link>&nbsp;&nbsp;
            <Button style={{background:'#BEBEBE',color:'#000000'}} variant="contained" onClick={()=>handleAssessment(assessment_id,assessment_name)}>Add Question</Button>
            </div>
       
        
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    <div style={{paddingLeft:'40px',paddingRight:'40px',paddingTop:'25px'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {questions?.map((question, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <h6>{question?.question}</h6>
              </TableCell>
              <TableCell component="th" scope="row">
                <Button variant="contained" style={{backgroundColor:'black'}} onClick={()=>handleClickOpen(question?.question_id,question?.score,question?.duration)}>
                  <DeleteIcon/>
                </Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </>;
}


export default EditAssessments;

