import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Typography,Button,CssBaseline, Container,Radio,RadioGroup,FormControl,Stack,FormControlLabel,Box,TextField,Grid} from '@mui/material';
import {
    BrowserRouter as Router,
    
    Route,
    Link,
    NavLink,
    Routes
  } from "react-router-dom";
import { borderLeft } from '@mui/system';
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
  width: 300px;
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
const Feed= (props) => {
  const[choices,setchoice] = React.useState([]);
  const[option1,setoption1] = React.useState('');
  const[option2,setoption2] = React.useState('');
  const[option3,setoption3] = React.useState('');
  const[option4,setoption4] = React.useState('');
  const[Answer,setanswer] = React.useState([]);
  const[topics,settopics] = React.useState([]);

  const [data,setData]=React.useState(
    {
      question:"",
       choices:choices,
      difficulty_level:"",
      type:"",
      duration:"",
      score:"",
    }
  )
 
 function handlechoice(e)

{

 

 }
function handleClick(e){
   
    const newdata={...data}
    newdata[e.target.id]=e.target.value;
    setData(newdata);
    console.log(newdata);
   
  
 }
 function handlepost(e){
  console.log(data);
  let choice={
    option1,
    option2,
    option3,
    option4
  }
    setchoice([...choices,choice])
    
  console.log(choices);

   e.preventDefault();
  axios.post("http://localhost:8081/recruitPlus/questions",data,choices).then(result => console.log(result))
 
 
}
 const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
   defaultValue: [Category[1]],
    multiple: true,
    options: Category,
    getOptionLabel: (option) => option.title,
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
          Add Category
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TextField
              id="standard-basic"
              label="Category"
              variant="standard"
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
   <Container style={{paddingTop:60,height:'100%'}}>
   
      <Grid container >       {/* After navbar you can see two part left and right
                          imported that component in grid  so you want to change something go to that component*/ }
         <Grid item xs={3.25} style={{width:'100%'}}>
        



   <Box
    style={{borderRight:'4px solid #d50000',paddingTop:90,backgroundColor:'#f8f8f8',height:'100%',paddingLeft:40}}
   >
  <Item>
        <div className='container my-3' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Topic</div>
        <div align='left' >
    <Root>
      <div {...getRootProps()}>
        
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
        
          {value.map((option, index) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}

          <input {...getInputProps()} />
        </InputWrapper>
       
      </div>
      <Box style={{ width: '25%' }}>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()} >
          <Button variant="contained" onClick={handleClickOpen} style={{backgroundColor:'black'}}>Add New Category  </Button>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
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
                            value={data.difficulty_level}
                            onChange={(e)=>handleClick(e)} 
                    >
                    <FormControlLabel value="female" control={<Radio />} label="Easy" style={{color:'black'}}/>
                    <FormControlLabel value="male" control={<Radio />} label="Medium" style={{color:'black'}}/>
                    <FormControlLabel value="other" control={<Radio />} label="Hard" style={{color:'black'}}/>
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
                    <FormControlLabel  value={data.type}   onChange={(e)=>handleClick(e)}  control={<Radio />} label="MCQ" style={{color:'black'}}/>
                    <FormControlLabel  value={data.type}  onChange={(e)=>handleClick(e)} control={<Radio 
                    />} label="Descriptive" style={{color:'black'}}/>
                        </RadioGroup>
                    </FormControl>
                    </div>
            </Item>

            <Item>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Duration</div>
            <div align='left' >
            <TextField id ='duration' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={data.duration}  onChange={(e)=>handleClick(e)}  />
            </div>
            </Item>
       
            <Item>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Score </div>
            <div align='left' >
            <TextField id ='score' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={data.score}  onChange={(e)=>handleClick(e)} />
            </div>
            </Item>














  
   </Box> 
         </Grid>
         <Grid item xs={8.75}>
         <div style={{paddingTop:30,paddingBottom:10}}>
    <Box>
        <Stack spacing={24} direction='row'>
    <Button variant="contained" style={{backgroundColor:'#696969'}} 
     
       ><VisibilityIcon /></Button>
      <Link to='/Home'>
      <Button variant="contained" 
      style={{backgroundColor:'#696969'}}
       >Close</Button>
</Link>
<Button variant="contained"  style={{backgroundColor:'#696969'}} onClick={(e)=>handlepost(e)}
     >SAVE</Button>
      <Button variant="contained"  style={{backgroundColor:'#696969'}} 
        >NEXT</Button>
      
      </Stack>
      </Box>
      </div>
         <Box style={{border:'2px solid black',height:'70%',backgroundColor:'#f8f8f8',margin:'0.9rem auto 0 auto',padding:'15px 2px'}}>
    <Grid container>
    <Grid item xs={2} >
    <Container styles={{borderRight:'2px solid black'}}>
       
  <Stack>
  <p  style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Question</p>
  <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 1</p>

  <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 2</p>

  <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 3</p>

  <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 4</p>
  <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Answer</p>
  </Stack>
 
       
  </Container>

        </Grid>
        <Grid item xs={10}>
        <Container styles={{borderRight:'2px solid black'}}>
       
       <Stack>
        <form>
       <TextField id ='question' fullWidth label="Question " variant='outlined' value={data.question}  onChange={(e)=>handleClick(e)}
       style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
       <TextField  fullWidth label="Option 1" value={option1} onChange={(e)=>setoption1(e.target.value)}
        style={{margin:'0.7rem auto ',color:'black',backgroundColor:'white'}}></TextField>
       <TextField  fullWidth label="Option 2"   value={option2} onChange={(e)=>setoption2(e.target.value)}
        style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
       <TextField  fullWidth label="Option 3"  value={option3}  onChange={(e)=>setoption3(e.target.value)}
        style={{margin:'0.7rem auto ',color:'black',backgroundColor:'white'}}></TextField>
       <TextField  fullWidth label="Option 4" value={option4}  onChange={(e)=>setoption4(e.target.value)}
        style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
       <TextField id ='answer' fullWidth label="Answer"    onChange={(e)=>handlechoice(e)}
        style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}></TextField>
      </form>
       </Stack>
      
            
       </Container>
        </Grid>
        </Grid>
        </Box>
         </Grid>

    </Grid>
  
       

      </Container>
    </>
    
   
  );
}

export default Feed;
const Category = [
  { title: 'C' },
  { title: 'Java' },
  { title: 'C++' },
  { title: 'DS'},
  { title: 'OS' },
  { title: 'DBMS' },
  { title: 'React'},
  {
    title: 'Html'},
  { title: 'Css'},
  { title: 'Java script' },
  { title: 'Apptitude' },
  { title: 'Logical Reasoning' },
  { title: 'English' },
  { title: 'Graphic Designer' },
  { title: 'Management Consultant' },
  { title: 'Investment Banker' },
  
];