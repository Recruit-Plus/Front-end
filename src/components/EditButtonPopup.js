import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { alpha, styled ,Button,Dialog,Box,Input,AppBar,Toolbar,IconButton,Typography,Slide,InputBase,InputLabel,FormControl,DialogActions, Grid,Select,MenuItem,TextField,Stack,Container} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function selectquestionid(props){
  console.log("function called",props.children)
  
  }
  
export default function FullScreenDialog(props) {
  console.log("Key : ",props)
  selectquestionid(props)
  const [Questions, setQuestions]=React.useState([]);

  React.useEffect(() => { 
    const url='http://localhost:8080/questions/v1/'; // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    axios.get(url).then(result =>  setQuestions(result.data) (console.log(result.data) )
    
    )
    
    .catch(err=>{
      console.log(err.message)
    })
  },[])
 const optionlist=[]
  for(const i in Questions.choices){
    console.log("each =>", Questions.choices[i])
    optionlist[i]=(Questions.choices[i])
    
  }
  console.log(optionlist[0])
 
  // const option1 = Questions.choices[0]
  // console.log("options1 =" ,option1)
  // const[option1,setquestion] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [age1, setAge1] = React.useState('');
  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };
  const ariaLabel = { 'aria-label': 'description' };
  const[choices,setchoice] = React.useState([]);
    const[option1,setoption1] = React.useState('');
    const[option2,setoption2] = React.useState('');
    const[option3,setoption3] = React.useState('');
    const[option4,setoption4] = React.useState('');
    const [data,setData]=React.useState(
      {
        question:"",
        difficulty_level:"",

      }
    )
    function handleClick(e){
      const newdata={...data}
      newdata[e.target.id]=e.target.value;
      setData(newdata);
   }
   function handleput(e){
     e.preventDefault();
    axios.put("http://localhost:8080/recruitPlus/questions",data,choices).then(result => console.log(result))
    let choice={
      option1,
      option2,
      option3,
      option4
    }
      setchoice([...choices,choice])
  }
  
  return (
    /* This page is for pop of edit button */ 
        <div align="center">
        <Button variant="outlined" onClick={handleClickOpen} style={{backgroundColor:'black',color:'white'}}>
           <EditIcon/>   {/* This you can see infront of every question */ }
        </Button>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative',backgroundColor:'#d50000' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
    
                </Typography>
                
            </Toolbar>
            </AppBar>
             <div  align="center" style={{paddingBottom:15,paddingTop:6}}>
                <Link to='/home'>
                   <Button style={{backgroundColor:'black',color:'white'}} onClick={(e)=>handleput(e)}>Update </Button>
                </Link>

        </div>
    <Box style={{paddingTop:0}}>
      <Grid container >
        <Grid item xs={2.5} style={{paddingLeft:30 ,borderRight:'3px solid black'}}>
          <Box sx={{ minWidth: 110 , maxHeight:47,paddingRight:0 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" style={{color:'black'}} value={data.difficulty_level}  onChange={(e)=>handleClick(e)}>{Questions.difficulty_level} </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age1}
              label=" Difficulty level"
              onChange={handleChange1}
            >
            <MenuItem value={10}>Easy</MenuItem>
            <MenuItem value={20}>Medium</MenuItem>
            <MenuItem value={30}>Hard</MenuItem>
            </Select>
          </FormControl>
          </Box>
        </Grid>
    <Grid item xs={9.5}>
      <Box  
       alignItems="center"
        component="form"
        sx={{
            '& > :not(style)': { m:1},
        }}
        noValidate
        autoComplete="off"
        >
        <div >
        <Input TextField style ={{width: '100%'}} defaultValue={Questions.question} inputProps={ariaLabel}  onChange={(e)=>handleClick(e)}   />
        </div>
          <Container styles={{borderRight:'2px solid black'}}>
            <Stack>
              <TextField fullWidth label="Option 1" 
              style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}} defaultValue={optionlist[0]}  onChange={(e)=>handleClick(e)}></TextField>
              <TextField fullWidth label="Option 2" 
              style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}} defaultValue={optionlist[1]}   onChange={(e)=>handleClick(e)}></TextField>
              <TextField fullWidth label="Option 3" 
              style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}} defaultValue={optionlist[2]}   onChange={(e)=>handleClick(e)}></TextField>
              <TextField fullWidth label="Option 4" 
              style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}} defaultValue={optionlist[3]}   onChange={(e)=>handleClick(e)}></TextField>
              <TextField fullWidth label="Answer" 
              style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}} defaultValue={Questions.answer}  onChange={(e)=>handleClick(e)}></TextField>
            </Stack>  
          </Container>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Dialog>
</div>
  );
      
}
