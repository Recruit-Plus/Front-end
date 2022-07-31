
import * as React from "react";
import axios from 'axios';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,IconButton ,Paper,Box,Table,TableBody,TableCell,TableContainer,alpha,
        TableRow,TableSortLabel,Toolbar,Typography,Checkbox,Tooltip,FormControlLabel,Switch,Stack,Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import PrimarySearchAppBar from "./SubNav";
import FullScreenDialog from "./EditButtonPopup";
import Navbar from "./Navbar";

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
  const currentQuestions = Questions && Questions.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(Questions.length/questionsPerPage);
  const QuestionIdRef =React.useRef();
  
  React.useEffect(() => {  
    // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    console.log(Questions)
    axios.get('http://localhost:8080/questions/v1/').then(result => setQuestions(result?.data?.content))
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
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleDelete= id =>{
    setOpen(true);
    QuestionIdRef.current = id; 
  }
  const DeleteHandleFromDialogue= (choose)=>{
    setOpen(false);
    if(choose){
      axios.delete(`http://localhost:8080/questions/v1/question/${QuestionIdRef.current}`) //if you are running backend on port 8081 change the port number in url to 8081
        .then((res)=> {
          console.warn(res)
        })
      // setQuestions(Questions.filters(Questions => Questions.id !== QuestionIdRef.current));
    }
  }
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
      <Button onClick={() =>DeleteHandleFromDialogue(true)} variant="contained" color="error"autoFocus>Delete</Button>
    </DialogActions>
  </Dialog>
  {/*<Navbar/>*/}

    <div style={{paddingTop:16}}>
  <PrimarySearchAppBar />
</div>
    <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:10}}>
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
                {Questions.length===0 ?
                <TableCell scope="questions" style={{width:'100%'}} >   
                <h5>No data Available!!!</h5>
              </TableCell>
              :
              currentQuestions.map((questions,index) => (
              <TableRow key={index}>          
                <TableCell scope="questions" style={{width:'100%'}} >
                {questions?.question}
              </TableCell>
              <TableCell >
              <Stack spacing={2} direction="row">
                <FullScreenDialog>{questions?.questionId}</FullScreenDialog>
                <Button variant="contained" color="error" onClick={handleDelete(questions.questionId)}>
                  <DeleteIcon/>
                </Button>
              </Stack>
              </TableCell>
              </TableRow>
              ),) } 
              
            </TableBody>
          </Table>
        </TableContainer>
        {Questions.length===0 ?
        <div style={{ float: "right" }}>
          <Button onClick={PreviousPage}>Prev</Button>
          Page {totalPages} of {totalPages}
          <Button onClick={NextPage}>Next</Button>
        </div>:
        <div style={{ float: "right" }}>
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