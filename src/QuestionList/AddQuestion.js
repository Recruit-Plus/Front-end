import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Paper,Typography,Button,autocompleteClasses,styled ,CssBaseline, 
      Container,Radio,RadioGroup,Stack,FormControlLabel,Box,TextField,Grid,IconButton, TableCell} from '@mui/material';
import {OutlinedInput ,InputLabel ,MenuItem,FormControl,Select,AppBar,Table} from "@mui/material"
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 14,
            top: 14,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`
);
function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Feed= (props) => {     //main function
  const[choices,setchoice] = React.useState([]);
  const[option1,setoption1] = React.useState('');
  const[option2,setoption2] = React.useState('');
  const[option3,setoption3] = React.useState('');
  const[option4,setoption4] = React.useState('');
  const[topic,settopic]=React.useState("");
  const[topics,settopics] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const[category,setCategory]=React.useState([]);
  const options = [option1, option2, option3, option4]
 const[invalid,setinvalid]=React.useState(false);
 const [answers,setanswers]=React.useState([]);
  const [data,setData]=React.useState
  (    
    {
      question:"",
       choices:choices,
      difficulty_level:"",
      type:"",
      duration:"",
      score:"",
      answer:[],
      topics:[],
      created_by:"Ritika",
      last_modified_by:"Srinu"
    }
  )
  const handleChangeTopic = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangeAnswer = (event) => {
    const {
      target: { value },
    } = event;
    setanswers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
 function handlepost(e)
 {
  var c=/^[a-zA-Z]*$/;
  if
  (data.question.length==0  || data.type.length=="fghg"
     || data.difficulty_level.length=="ngf" || data.duration==0 || data.score==0 || category.length==0 
     || answers.length==0 || options.length==0
    )

    {
    setinvalid(true);
    swal({
      title: "Failed",
      text: "Enter all fields",
      icon: "warning",
      dangerMode: true,
    })
  }
  else if((data.duration.match(c) && data.score.match(c))){
    setinvalid(true);
    swal({
      title: "Duration and score should be number",
     
      icon: "warning",
      dangerMode: true,
    })
  }
  else{
  const requestBody = {...data,choices: options,topics:category,answer:answers}
  axios.post("http://localhost:8081/questions/v1/question",requestBody).then(result=>{console.log(result?.data)})
  .alert(swal({
    title: "Question added Successfully",
   
    icon: "success",
     
    button:"OK"
  }));
}
 }
const TopicAddHandler = (e) => {
  setOpen(false);
  console.log(topic);
  axios.post("http://localhost:8081/questions/v1/topic",topic).then(result => console.log(result))
  TopicGetHandler()
}
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {TopicGetHandler()},[])
  const TopicGetHandler =() => {
    axios.get('http://localhost:8081/questions/v1/topics').then(result => settopics(result.data))
    .catch(err=>{
      console.log(err.message)
    })
  }
  // const [Answers, setAnswers] = React.useState([]);
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setAnswers(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  
  return (
    <>
    <Navbar/>
<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      >
        Add New Topic
      </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>
           <TextField
             id="standard-basic"
             label="topic"
            variant="standard"
            onChange={(event) => settopic({topic:event.target.value})}
          />
        </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={() =>{TopicAddHandler()}}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
        <Grid container style={{paddingTop:60}} spacing={2}> {/* After navbar you can see two part left and right
                          imported that component in grid so you want to change something go to that component*/ }
        <Grid item lg={3} >
      <Box style={{borderRight:'4px solid #d50000',height:'100%',paddingRight:20,width:'100%'}} >
     
        <Item>
        <div className='container my-3' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Topic</div>
        <Table size='small' padding='none'>
        <TableCell>
             
        </TableCell>
        <TableCell>
        <div className="mx-3">
                  <Box sx={{ minWidth: 200 , maxHeight:55}}>
                    <FormControl sx={{  width: 190 }}>
                      <InputLabel id="demo-multiple-name-label" style={{color:'black'}}>Topic</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={category}
                      onChange= {handleChangeTopic}
                      input={<OutlinedInput label="Topic" />}
                      >
                        <Button variant="contained" onClick={handleClickOpen} align="right" style={{backgroundColor:'black'}}>Add New Topic</Button>  
                        {topics?.map((Topics,id) => (
                        <MenuItem key={id} value={Topics.topic}>{Topics.topic}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                 </Box>
                </div>
                </TableCell>
              </Table>
              {/* <IconButton variant="contained" onClick={handleClickOpen} align="right"><AddIcon/></IconButton>        */}
        </Item>
    <Item style={{paddingTop:1 ,paddingBottom:1}}>
      <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Difficulty level</div>
          <div align='left' >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                id='  difficulty_level'
              >
            <FormControlLabel  value='easy' onChange={(event) => setData({...data,difficulty_level:event.target.value})} control={<Radio />} label="Easy" style={{color:'black'}}/>
            <FormControlLabel  value='medium' onChange={(event) => setData({...data,difficulty_level:event.target.value})} control={<Radio />} label="Medium" style={{color:'black'}}/>
            <FormControlLabel   value='hard' onChange={(event) => setData({...data,difficulty_level:event.target.value})} control={<Radio />} label="Hard" style={{color:'black'}}/>
            </RadioGroup>
            </FormControl>
        </div>
            </Item>

            <Item style={{paddingTop:0,paddingBottom:0.5}}>
              <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Type</div>
              <div align='left' >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      id='type'      
                    >
                    <FormControlLabel value='mcq' onChange={(event) => setData({...data,type:event.target.value})}  
                     control={<Radio />} label="MCQ" style={{color:'black'}}/>
                    <FormControlLabel value='Fill in the blank' onChange={(event) => setData({...data,type:event.target.value})}   
                    control={<Radio/>} label="Descriptive" style={{color:'black'}}/>
                    </RadioGroup>
                  </FormControl>  
              </div>
            </Item>
            <Item style={{paddingTop:0.2 ,paddingBottom:1}}>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Duration</div>
            <div align='center' >
            <TextField id ='duration' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(event) => setData({...data,duration: event.target.value})} />
            </div>
            </Item>
            <Item style={{paddingTop:0.2,paddingBottom:1}}>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} > Score </div>
            <div align='center' >
            <TextField id ='score' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(event) => setData({...data,score: event.target.value})} />
            </div>
            </Item>
          </Box> 
        </Grid>
        <Grid item lg={9}>
         <div style={{paddingTop:25,paddingBottom:1}}>
        <Box>
              <Stack spacing={36} direction='row'>
            <div></div>
              <Link to='/questionlist'>
                <Button variant="contained" 
                style={{backgroundColor:'#696969'}}
                >Close</Button>
              </Link>
           <Link to='/questionlist'>
              <Button variant="contained"  style={{backgroundColor:'#696969'}} onClick={(e)=>handlepost(e)}
                  >SAVE</Button>
          </Link>
          </Stack>
        </Box>
      </div>
      <Box 
        style={{width:'100%',height:'80%',margin:'0.8rem auto 0 auto',paddingLeft:30,paddingRight:3,paddingBottom:3,paddingTop:10}}>
           <Paper  sx={{ height:"100%",width: "95%", mb: 2 ,paddingBottom:4,paddingTop:4}}>
        <Grid container>
        <Grid item xs={2} >
        <Container >
          <Stack>
            <p  style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'130%'}}>Question</p>
            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'130%'}}>Option 1</p>

            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'130%'}}>Option 2</p>

            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'130%'}}>Option 3</p>

            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'130%'}}>Option 4</p>
            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'130%'}}>Answer</p>
          </Stack>
       </Container>
      </Grid>
      <Grid item xs={8}>
        <Container styles={{borderRight:'2px solid black',paddingLeft:60}}>    
          <Stack>
            <form >
            <TextField id ='question' fullWidth label="Question " variant='outlined'  onChange={(event) => setData({...data,question: event.target.value})}
            style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 1"   onChange={(event) => setoption1(event.target.value)}
              style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 2"   onChange={(event) => setoption2(event.target.value)}
              style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 3"   onChange={(event) => setoption3(event.target.value)}
              style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 4"   onChange={(event) => setoption4(event.target.value)}
              style={{margin:'0.9rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            {/* <TextField  fullWidth label="Answer"   value={data.answer}  onChange={(event) => setData({...data,answer: [event.target.value]})}
            
              style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}>
              
              </TextField> */}
              <FormControl sx={{width:570}}>
              <InputLabel id="demo-multiple-name-label" style={{color:'black'}}>Answer</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={answers}
                      onChange= {handleChangeAnswer}
                      input={<OutlinedInput label="Answer" />}
                      >
                         <MenuItem  value={options[0]} >{options[0]}</MenuItem>
                         <MenuItem  value={options[1]} >{options[1]}</MenuItem>
                         <MenuItem  value={options[2]} >{options[2]}</MenuItem>
                         <MenuItem  value={options[3]} >{options[3]}</MenuItem>
                       
                         {/* {choices?.map((choice,id) => (
                        <MenuItem  value={choice.options}>{choice.options}</MenuItem>
                        ))} */}
                        
                      </Select>
                      </FormControl>
            </form>
          </Stack>     
        </Container>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  </Grid>
</Grid>
</>
  );
}

export default Feed;