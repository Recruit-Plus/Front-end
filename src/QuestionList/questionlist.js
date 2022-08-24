import * as React from "react";
import axios from 'axios';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,IconButton ,Paper,Box,Table,TableBody,TableCell,TableContainer,alpha,
        TableRow,TableSortLabel,Toolbar,Typography,Checkbox,Tooltip,FormControlLabel,Switch,Stack,Button} from "@mui/material";
import {OutlinedInput ,InputLabel ,MenuItem,FormControl,Select,AppBar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import PrimarySearchAppBar from "../components/Subnav";
import EditButtonPopup from "./EditButtonPopup";
import Navbar from '../components/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
function questionFilters(props){
  console.log("function called",props.children)
}
export default function EnhancedTable(props) {
  //  questionFilters(props)
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [questionsPerPage, setQuestionsPerPage] = React.useState(5);
  const [Questions, setQuestions]=React.useState([]);
  const [currentPage,setCurrentPage] = React.useState(1);
  const lastIndex = currentPage * questionsPerPage;
  const firstIndex = lastIndex - questionsPerPage;
  const currentQuestions = Questions && Questions?.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(Questions?.length/questionsPerPage);
  const [QuestionIdRef, setQuestionIdRef] =React.useState();
  const [topicName, setTopicName] = React.useState([]);
  const [Topics,setTopics]=React.useState([]);
  const [questionProps, setQuestionProps] =React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  let topics="";

  // const [topics,settopics]=React.useState([]);
  React.useEffect(() => {  
    questionHandle()
    topicHandler()
  },[])
  const questionHandle= () => {
    
     topics=topicName.join();
    console.log(topics,difficulty_level,type);
    // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    axios.get('http://localhost:8081/questions/v1/')  
      .then(result => setQuestions(result?.data?.content))
    .catch(err=>{
      console.log(err.message)
    })
  }
  const topicHandler=()=>{
    axios.get('http://localhost:8081/questions/v1/topics').then(result => setTopics(result?.data))
    .catch(err=>{
      console.log(err.message)
    })
  }  
  const handleSearch=()=>{
    topics=topicName.join();
    console.log(topics,difficulty_level,type);
    // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
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
  const [difficulty_level, setDifficulty_level] = React.useState("");
  const handleChange1 = (event) => {
    setDifficulty_level(event.target.value);
    // setFilterData({...filterData, difficulty_level:event.target.value})
      };
  const [type, setType] = React.useState("");
  const handleChange2 = (event) => {
    setType(event.target.value);
    // setFilterData({...filterData, type:event.target.value})
      };
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
  const handleClickOpen = () => {
    
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate= question =>{
    setEditOpen(true);
    setQuestionProps(question);
     
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Questions.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleDelete= id =>{
    setOpen(true);
    setQuestionIdRef(id); 
  }
  const DeleteHandleFromDialogue= (choose)=>{
    setOpen(false);
    if(choose){
      axios.delete(`http://localhost:8081/questions/v1/question/${QuestionIdRef}`) //if you are running backend on port 8081 change the port number in url to 8081
        .then((res)=> {
          swal({
            title: "Question Deleted Successfully",
            icon: "success",
            button: "OK",
          });
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
         {/* <PrimarySearchAppBar></PrimarySearchAppBar>  */}
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
       Do you really want to delete this Question? This process cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" style={{backgroundColor:'black'}}>Cancel</Button>
      <Button onClick={() =>DeleteHandleFromDialogue(true)} variant="contained" color="error"autoFocus>Delete</Button>
    </DialogActions>
  </Dialog>
  {/*<Navbar/>*/}
  <Navbar/>
    <div style={{paddingTop:75}}>
    <AppBar position="static" style={{ background: '#D3D3D3' }}>
        <Toolbar>
          <Stack Stack spacing={65} direction='row'>
            <div>
              <Stack Stack spacing={4} direction='row'>
                <div className="mx-3">
                  <Box sx={{ minWidth: 200 , maxHeight:47}}>
                    <FormControl sx={{  width: 250 }}>
                      <InputLabel id="demo-multiple-name-label" style={{color:'black'}}>Topic</InputLabel>
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
                  <Box sx={{ minWidth: 200, maxHeight:47}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label=" Difficulty level"
                        onChange={handleChange2}>
                          <MenuItem value="MCQ">MCQ</MenuItem>
                          <MenuItem value="fill in the blank">Descriptive</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div>
                  <Button onClick={handleSearch}>
                    <SearchIcon></SearchIcon>
                  </Button>
                </div>
                <div className="container" align='right'>
                  <Link to='/Addquestion'>
                    <Button variant="contained" alignItems="right" onClick={handleClickOpen} style={{backgroundColor: "#000000",}} >
                    Add  questions
                    </Button>
                  </Link>
                </div>
              </Stack>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
    <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
         <div align="center" ><h3>Question Bank</h3></div>
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
                {questions?.question}
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