import React from "react";
import axios from 'axios';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,IconButton ,Paper,Box,Table,TableBody,TableCell,TableContainer,alpha,
        TableRow,TableSortLabel,Toolbar,Typography,Checkbox,Tooltip,FormControlLabel,Switch,Stack,Button,Link} from "@mui/material";
import {OutlinedInput ,InputLabel ,MenuItem,FormControl,Select,AppBar} from "@mui/material";

import TakeAssessments from "./TakeAssessments";

import { useNavigate} from "react-router-dom";

const EligibleAssessments =()=>{
    const [assessments, setAssessments]=React.useState([]);
    let navigate =useNavigate();
    const user_id=window.localStorage.getItem("userId");
    React.useEffect(() => {  
        assessmentsHandle()
      },[])

    const assessmentsHandle= () => {

       axios.get(`http://localhost:8082/assessments/v1/user/${user_id}`)  
         .then(result => setAssessments(result?.data))
       .catch(err=>{
         console.log(err.message)
       })
    }
    const handleTest= id =>{
      navigate("/TakeAssessments",{state:{assessment_id:{id}}});
    }



    return <>

    <div align = "center" style={{paddingTop:'80px'}}>
    
    <Box sx={{ width: "80%" ,paddingTop:3,paddingLeft:10}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
         <div align="center" ><h3>Your Assessments</h3></div>
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 , maxwidth :1000 }}
            aria-labelledby="tableTitle"
            //size={dense ? "small" : "medium"}
          >
           
            <TableBody>
                {assessments?.length===0 ?
                <TableCell scope="assessments" style={{width:'100%'}} >   
                <h5>No Assessments assigned to you!</h5>
              </TableCell>
              :
              assessments?.map((assessment,index) => (
              <TableRow key={index}>          
                <TableCell scope="assessments" style={{fontSize:'100%',width:'100%'}} >
                {assessment.assessment_name}
              </TableCell>
              <TableCell >
              <Stack spacing={2} direction="row">
                <Button style={{width:200,backgroundColor:'black',color:'white',fontSize:'1rem'}}
                onClick={()=>{handleTest(assessment.assessment_id)}} >Take Test</Button>
              </Stack>
              </TableCell>
              </TableRow>
              ),) } 
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
    </Box>
            
        </div>
    
    
    
    
    </>;

}
export default EligibleAssessments;