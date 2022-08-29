import * as React from 'react';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
      styled,AppBar,Box,Toolbar,Typography,InputBase,Button} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Automatic type conversion is possible in which of the possible cases?'),
  createData('Who invented Java Programming?'),
  createData('Which statement is true about Java?'),
  createData('Which component is used to compile, debug and execute the java program…'),
  createData('Which environment variable is used to set the java path?'),
  createData('What is not the use of “this” keyword in Java?'),
  createData('Which of the following is a type of polymorphism in Java Programming?'),
  createData('What is Truncation in Java?'),
];


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:'#BEBEBE',
  "&:hover": {
    backgroundColor: '#BEBEBE',
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color:'#000000',
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

export default function EditAssessment({assessment_id}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log({assessment_id});
  return (
    <>
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
      <Button onClick={handleClose} variant="contained" color="error"autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  <div style={{paddingTop:'75px'}}>
    <Navbar></Navbar>
    <div>
    <Box sx={{ flexGrow: 1 }} style={{background:'#ffffff'}}>
      <AppBar position="static" >
        <Toolbar style={{background:'#eeeeee',paddingRight:'20px'}}>
            <div style={{paddingLeft:'20px'}}>
              <Link to='/assessmentlist'>
            <Button style={{background:'#BEBEBE',color:'#000000',paddingLeft:'5px',paddingRight:'5px'}} variant="contained">Close</Button>
            </Link>
            </div>
            
            <div style={{paddingLeft:'20px'}}>
            <Link to='/addquestiontoassessment'>
            <Button style={{background:'#BEBEBE',color:'#000000'}} variant="contained">Add Question</Button>
            </Link>
            
            </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            align="center"
            style={{color:'#111111'}}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Java Assessment
          </Typography>
          <div style={{paddingRight:'20px'}}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon style={{color:'#111111'}}/>
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                />
            </Search>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    <div style={{paddingLeft:'40px',paddingRight:'40px',paddingTop:'25px'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <h6>{row.name}</h6>
              </TableCell>
              <TableCell component="th" scope="row">
                <Button variant="contained" style={{backgroundColor:'black'}} onClick={handleClickOpen}>
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
    </>
  );
}