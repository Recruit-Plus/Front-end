import * as React from "react";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from "@mui/material";
import {Link} from "react-router-dom";
const names = [
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


export default function PrimarySearchAppBar() {
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
    
      <AppBar position="static" style={{ background: '#D3D3D3' }}>
        <Toolbar>
            <Stack Stack spacing={65} direction='row'>
                <div>

               <Stack Stack spacing={4} direction='row'>
            <Link to='/AdminLogin'>
           <Button style={{color:'black'}}><ArrowBackIcon /></Button>
           </Link>
        <div className="mx-3">
    <Box sx={{ minWidth: 200 , maxHeight:47}}>
    <FormControl sx={{  width: 250 }}>
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
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
    </div>
        
        <div className="mx-3">
        <Box sx={{ minWidth: 200 , border: '1px solid #DDD', maxHeight:47}}>
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
        </div>
    <div className="mx-3">
    <Box sx={{ minWidth: 200, maxHeight:47}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age2}
          label=" Difficulty level"
          onChange={handleChange2}
        >
          <MenuItem value={10}>MCQ</MenuItem>
          <MenuItem value={20}>Descriptive</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </div>

    </Stack>
    </div>
    <div className="container" align='right'>
        <Link to='/Home'>
    <Button variant="contained" alignItems="right" onClick={handleClickOpen} style={{backgroundColor: "#000000",}} >
          Add  Question
        </Button>
        </Link>
    </div>
    </Stack>
        </Toolbar>
      </AppBar>
  );
}
