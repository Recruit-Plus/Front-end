

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Link} from 'react-router-dom';
import { Grid,Select,MenuItem,TextField,Stack,Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import EnhancedTable from './Question_List_Page';
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

export default function FullScreenDialog() {
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
  const [age2, setAge2] = React.useState('');
  const ariaLabel = { 'aria-label': 'description' };
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
                <Link to='/Home'>
                   <Button style={{backgroundColor:'black',color:'white'}} >Update </Button>
                </Link>

        </div>
        <Box style={{paddingTop:0}}>
        <Grid container >
        <Grid item xs={2.5} style={{paddingLeft:30 ,borderRight:'3px solid black'}}>
        <Box sx={{ minWidth: 110 , maxHeight:47,paddingRight:0 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Difficulty level</InputLabel>
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
        <Input TextField style ={{width: '100%'}} 
        defaultValue=" Which keyword is used for accessing the features of a package? " inputProps={ariaLabel} />
        </div>
        
        
       
            
             <Container styles={{borderRight:'2px solid black'}}>
            
            <Stack>
           
            <TextField fullWidth label="Option 1" 
             style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField fullWidth label="Option 2" 
             style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField fullWidth label="Option 3" 
             style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField fullWidth label="Option 4" 
             style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
            <TextField fullWidth label="Answer" 
             style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}></TextField>
           
            </Stack>
           
                 
            </Container>
        </Box>
        </Grid>
        
        </Grid>
        </Box>
        <DialogActions>
    </DialogActions>
   
        </Dialog>
        </div>
  );
}