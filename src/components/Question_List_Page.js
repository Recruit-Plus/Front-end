import * as React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link,AppBar } from "@mui/material";
import PrimarySearchAppBar from "./Subnav";
import FullScreenDialog from "./editbutton_popup";
import Navbar from "./Navbar";
import axios from 'axios';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}




// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Select All Questions',
    
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <div  >
      <div   >
        <Stack spacing={2} direction='row'>
      <div padding="checkbox" >
          <Checkbox
            color="primary"
            
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          
            inputProps={{
               
              'aria-label': 'select all questions',
            }}
           
          />
        </div>
        {headCells.map((headCell) => (
          <div 
            
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </div>
        ))}
        </Stack>
      </div>
    </div>
  );
}


EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <>
    <Dialog
    open={open1}
    onClose={handleClose1}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Are you sure?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
       Do you really want to delete all Questions? This process cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose1} variant="contained" style={{backgroundColor:'black'}}>Cancel</Button>
      <Button onClick={handleClose1} variant="contained" color="error"autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
        Question Bank
        </Typography>
      )}

{numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
          <Button variant="contained" color="error" onClick={handleClickOpen1}>
           <DeleteIcon/>
           </Button>
           </IconButton>
          </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

      
    </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [questionsPerPage, setQuestionsPerPage] = React.useState(5);
  const [Questions, setQuestions]=React.useState([]);
  const[currentPage,setCurrentPage] = React.useState(1);

  const lastIndex = currentPage * questionsPerPage;
  const firstIndex = lastIndex - questionsPerPage;
  const currentQuestions = Questions && Questions.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(Questions.length/questionsPerPage);
  
  React.useEffect(() => { 
    const url='http://localhost:8081/recruitPlus/questions'; // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    axios.get(url).then(result => setQuestions(result.data))
    .catch(err=>{
      console.log(err.message)
    })
  },[])

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


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Questions.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };



  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * questionsPerPage - Questions.length) : 0;

   
  return (
    <>
         <div>
        <Navbar></Navbar>
        <PrimarySearchAppBar></PrimarySearchAppBar>
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
  {/*<Navbar/>*/}

    <div style={{paddingTop:16}}>
  <PrimarySearchAppBar />
</div>
    <Box sx={{ width: "94%" ,paddingTop:3,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 , maxwidth :1000 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              rowCount={Questions.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

               
                {Questions.length===0 ?
                <TableCell scope="questions" style={{width:'100%'}} >
                     
                <h5>No data Available!!!</h5>
              </TableCell>
              :
                
                currentQuestions.map((questions,index) => (
              <TableRow key={index}
              >          
                <TableCell scope="questions" style={{width:'100%'}} >
                 
                {questions.question}
              </TableCell>
            
              <TableCell >
              <Stack spacing={2} direction="row">
              <FullScreenDialog>
                {questions.questionId}
              </FullScreenDialog>
               
                <Button variant="contained" color="error" onClick={handleClickOpen}>
                  <DeleteIcon/>
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
            
             ),)  
              }
                 
              
            </TableBody>
          </Table>
        </TableContainer>
        {Questions.length===0 ?
        <div style={{ float: "right" }}>

        <Button onClick={PreviousPage}>Prev</Button>
        Page {totalPages} of {totalPages}
        <Button onClick={NextPage}>Next</Button>
        </div>:<div style={{ float: "right" }}>

        <Button onClick={PreviousPage}>Prev</Button>
        Page {currentPage} of {totalPages}
        <Button onClick={NextPage}>Next</Button>
        </div>}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      
    </Box>
         </div>
    </>
  );
}