import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Paper,Typography,Button,autocompleteClasses,styled ,CssBaseline, 
      Container,Radio,RadioGroup,FormControl,Stack,FormControlLabel,Box,TextField,Grid,IconButton} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

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
`,
);

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 190px;
  border: 1px solid ${theme.palette.mode === 'dark' ? 'black' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  paddingRight:${theme.palette.mode === '60px'};
  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }
  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  &input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
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

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;
  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }
  &span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  &li {
    padding: 5px 12px;
    display: flex;
    &span {
      flex-grow: 1;
    }
    &svg {
      color: transparent;
    }
  }
  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;
    & svg {
      color: #1890ff;
    }
  }
  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;
    & svg {
      color: currentColor;
    }
  }
`,
);
const Feed= (props) => {     //main function
  const[choices,setchoice] = React.useState([]);
  const[option1,setoption1] = React.useState('');
  const[option2,setoption2] = React.useState('');
  const[option3,setoption3] = React.useState('');
  const[option4,setoption4] = React.useState('');
  const[topic,settopic]=React.useState("");
  const[topics,settopics] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const options = [option1, option2, option3, option4]
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
      created_by:"Ritika",
      last_modified_by:"Srinu"
    }
  )
 
 function handlepost(e)
 {
  const requestBody = {...data,choices: options}
  axios.post("http://localhost:8081/questions/v1/question",requestBody).then(result=>{console.log(result.data)})
}
const TopicAddHandler = (e) => {
  setOpen(false);
  console.log(topic);
  axios.post("http://localhost:8081/questions/v1/topic",topic).then(result => console.log(result));
  {TopicGetHandler()}
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
    console.log(topics)
  }
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: topics,
    getOptionLabel: (option) => option.topic,
  });
  return (
    <>
     <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      >
        Add Topic
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
        <Grid container style={{paddingTop:60}} spacing={2}>       {/* After navbar you can see two part left and right
                          imported that component in grid  so you want to change something go to that component*/ }
        <Grid item lg={3} >
      <Box style={{borderRight:'4px solid #d50000',backgroundColor:'#f8f8f8',height:'100%',paddingRight:20,width:'100%'}} >
        <Item  >
        <div className='container my-3' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Topic</div>
        <div align='center' >
        <Root>
          <div {...getRootProps()}>
            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
              {value.map((option, index) => (
                <StyledTag label={option.topic} {...getTagProps({ index })} />
              ))}
              <input {...getInputProps()} />
            </InputWrapper>
          </div>
            <Box style={{ width: '25%' }}>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()} >
                <Button variant="contained" onClick={handleClickOpen} style={{backgroundColor:'black'}}>Add New Topic  </Button>
                {groupedOptions.map((option, index) => (
                  <li {...getOptionProps({ option, index })}>
                    <span>{option.topic}</span>
                    <CheckIcon fontSize="small" />
                  </li>
                ))}
              </Listbox>
            ) : null}
            </Box>  
        </Root>
      </div>
    </Item>
    <Item>
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

            <Item>
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
                    control={<Radio/>} label="Fill in the blank" style={{color:'black'}}/>
                    </RadioGroup>
                  </FormControl>
              </div>
            </Item>
            <Item>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Duration</div>
            <div align='center' >
            <TextField id ='duration' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(event) => setData({...data,duration: event.target.value})} />
            </div>
            </Item>
            <Item>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Score </div>
            <div align='center' >
            <TextField id ='score' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(event) => setData({...data,score: event.target.value})} />
            </div>
            </Item>
          </Box> 
        </Grid>
        <Grid item lg={9}>
         <div style={{paddingTop:30,paddingBottom:10}}>
        <Box>
              <Stack spacing={50} direction='row'>
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
        style={{width:'90%',border:'2px solid black',height:'75%',backgroundColor:'#f8f8f8',margin:'0.8rem auto 0 auto',paddingLeft:30,paddingRight:3,paddingBottom:3,paddingTop:10}}>
        <Grid container>
        <Grid item xs={2} >
        <Container >
          <Stack>
            <p  style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'1.1rem',width:'110%'}}>Question</p>
            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'1rem',width:'110%'}}>Option 1</p>

            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'1rem',width:'110%'}}>Option 2</p>

            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'1rem',width:'110%'}}>Option 3</p>

            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'1rem',width:'110%'}}>Option 4</p>
            <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'1rem',width:'110%'}}>Answer</p>
          </Stack>
       </Container>
      </Grid>
      <Grid item xs={8}>
        <Container styles={{borderRight:'2px solid black',paddingLeft:60}}>    
          <Stack>
            <form >
            <TextField id ='question' fullWidth label="Question " variant='outlined'  onChange={(event) => setData({...data,question: event.target.value})}
            style={{margin:'1rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 1"   onChange={(event) => setoption1(event.target.value)}
              style={{margin:'1rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 2"   onChange={(event) => setoption2(event.target.value)}
              style={{margin:'1rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 3"   onChange={(event) => setoption3(event.target.value)}
              style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Option 4"   onChange={(event) => setoption4(event.target.value)}
              style={{margin:'0.6rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField  fullWidth label="Answer"   value={data.answer}  onChange={(event) => setData({...data,answer: [event.target.value]})}
            
              style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}>
              </TextField>
            </form>
          </Stack>     
        </Container>
        </Grid>
      </Grid>
    </Box>
  </Grid>
</Grid>
</>
  );
}

export default Feed;