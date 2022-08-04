import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Paper,Box,Table,TableBody,TableCell,TableContainer,
        TableRow,FormControlLabel,Switch,Stack,Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrimarySearchAppBar from "../components/Subnav";
import EditIcon from '@mui/icons-material/Edit';
import Navbar from "../components/Navbar";
import EditButtonPopup from "./EditButtonPopup";


export default function EnhancedTable() {
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [questionsPerPage, setQuestionsPerPage] = React.useState(8);
  const [Questions, setQuestions]=React.useState([]);
  const [currentPage,setCurrentPage] = React.useState(1);
  const lastIndex = currentPage * questionsPerPage;
  const firstIndex = lastIndex - questionsPerPage;
  const currentQuestions = Questions && Questions.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(Questions?.length/questionsPerPage);
  const [questionProps, setQuestionProps] =React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [QuestionIdRef, setQuestionIdRef] =React.useState();

  React.useEffect(() => {  
    questionHandle()
  },[])
  const questionHandle= () => {
    // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    axios.get('http://localhost:8081/questions/v1').then((result) =>setQuestions(result.data))
    .catch(err=>{
      console.log(err.message);
    })
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
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate= question =>{
    setEditOpen(true);
    setQuestionProps(question);
     
  }
   const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleDelete= id =>{
    setOpen(true);
    console.log(id);
    setQuestionIdRef(id); 
  }
  const DeleteHandleFromDialogue= (choose)=>{
    setOpen(false);
    if(choose){
    
      axios.delete(`http://localhost:8081/questions/v1/question/${QuestionIdRef}`) //if you are running backend on port 8081 change the port number in url to 8081
        .then((res)=> {
          console.warn(res)
          questionHandle();
        })
        
      // setQuestions(Questions.filters(Questions => Questions.id !== QuestionIdRef.current));
    }
  }
  return (
    <>
      {

      editopen?<EditButtonPopup question={questionProps} />:
    <div>
        <Navbar></Navbar>
       
        <PrimarySearchAppBar></PrimarySearchAppBar>

      <Dialog
           open={open}
           onClose={handleClose}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description" >
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
      <Button onClick={() =>DeleteHandleFromDialogue(true)} variant="contained" color="error"autoFocus>Delete</Button>
    </DialogActions>
  </Dialog>
  

    <div style={{paddingTop:16}}>
  <PrimarySearchAppBar />
</div>
    <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 , maxwidth :1000 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            
            <TableBody>
                {Questions?.length===0 ?
                <TableCell scope="questions" style={{width:'100%'}} >   
                <h5>No data Available!!!</h5>
              </TableCell>
              :
              currentQuestions?.map((questions,index) => (
              <TableRow key={index}>          
                <TableCell scope="questions" style={{width:'100%'}} >
                {questions.question}
                </TableCell>
              
              <TableCell >
              <Stack spacing={2} direction="row">
               
              <Button variant="outlined" style={{backgroundColor:'black',color:'white'}} onClick={() =>{handleUpdate(questions)}}>
                <EditIcon/>   {/* This you can see infront of every question */ }
              </Button>
              
              <Button variant="contained" color="error" onClick={() =>{handleDelete(questions?.question_id)}}>
                  <DeleteIcon/>
                </Button>
                </Stack>
              </TableCell>
            </TableRow>
                
            
             ),) } 
              
            </TableBody>
          </Table>
        </TableContainer>
        {Questions?.length===0 ?
        <div style={{ float: "right" }}>
          <Button onClick={PreviousPage}>Prev</Button>
          Page {totalPages} 
          <Button onClick={NextPage}>Next</Button>
        </div>:
        <div style={{ float: "right" }}>
          <Button onClick={PreviousPage}>Prev</Button>
          Page {currentPage}
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