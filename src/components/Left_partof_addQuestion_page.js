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
import {TextField,Typography,Button,CssBaseline, Container,FormControlLabel,FormControl,FormLabel,Radio,RadioGroup,Box,Stack} from '@mui/material';
import {
    BrowserRouter as Router,
    
    Route,
    Link,
    NavLink,
    Routes
  } from "react-router-dom";
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
    padding: theme.spacing(1),
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
    width: 260px;
    border: 1px solid ${theme.palette.mode === 'dark' ? 'black' : '#d9d9d9'};
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
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
    width: 260px;
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
const Left_partof_addQuestion_page= () => {
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



   <Container 
    style={{borderRight:'4px solid #d50000',paddingTop:90,backgroundColor:'#f8f8f8',height:'100%'}}
   >
  <Item>
        <div className='container my-3' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Topic</div>
        <div align='center' >
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
                    >
                    <FormControlLabel value="female" control={<Radio />} label="MCQ" style={{color:'black'}}/>
                    <FormControlLabel value="male" control={<Radio />} label="Descriptive" style={{color:'black'}}/>
                        </RadioGroup>
                    </FormControl>
                    </div>
            </Item>

            <Item>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Duration in Minutes</div>
            <div align='center'>
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </div>
            </Item>
       
            <Item>
            <div className='container' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Max Score </div>
            <div align='center' >
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </div>
            </Item>
  
   </Container>
    </>
    
   
  );
}

export default Left_partof_addQuestion_page;

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