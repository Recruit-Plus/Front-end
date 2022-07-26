import * as React from "react";
import axios from "axios";

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
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from "@mui/material/Paper";
import img1 from '../images/recruit+logo.png';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link,AppBar } from "@mui/material";
import PrimarySearchAppBar from "./Subnav";
import FullScreenDialog from "./editbutton_popup";
import Navbar from "./Navbar";
import Sign_up from "./Sign_up";

function createData(name) {
  return {
    name
  };
}

const rows = [
    
];

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
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [Questions, setQuestions]=React.useState([]);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { 
    const url='http://localhost:8081/recruitPlus/questions'; // if u r running backend on port :8081 ...change url to 'http://localhost:8081/recruitPlus/questions'
    fetch(url).then(result => result.json()).then(result => setQuestions(result))
    .catch(err=>{
      console.log(err.message)
    })
  },[])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

   
    
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
  <Navbar/>

    <div style={{paddingTop:80}}>
  <PrimarySearchAppBar />
</div>
     
    <Box sx={{ width: "98%" ,paddingTop:4,paddingLeft:5}}>
      <Paper sx={{ width: "100%", mb: 2 , border:'1px solid black'}}>
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
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

                 {Questions.map(questions=>(
                  <TableRow key={questions.id}
 >           
                    <TableCell style={{width:'100%'}} >
                     
                    {questions.question}
                  </TableCell>
                
                  <TableCell >
                  <Stack spacing={2} direction="row">
                  <FullScreenDialog></FullScreenDialog>
                   
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                      <DeleteIcon/>
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
                 ))}
             
                  
              
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 53 : 73) * emptyRows
                  }}
                >
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={Questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
    </>
  );
}
