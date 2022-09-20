import React from 'react';
import { useLocation} from 'react-router-dom';
import {Paper,Box,Table,TableBody,TableCell,TableContainer,TableRow} from "@mui/material";
import axios from 'axios';

function Dashboard (assess_id){
  const [assessments, setassessments]=React.useState([]);
  const location = useLocation();
  const [results,setResults]=React.useState([]);
  const assessment_id=location.state.assess_id.assessment_id;
  

  console.log(results);
  React.useEffect(() => { 
    axios.get(`http://localhost:8083/responses/v1/responses/${assessment_id}`).then(result => setResults(result?.data))
    .catch(err=>{
      console.log(err.message)
    })
  },[]) 


  return <>          
    <Box sx={{ width: "95%" ,paddingTop:15,paddingLeft:10}}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 , maxwidth :1000 }}>
                <TableBody style={{width:'100%'}}>
                <TableRow alignItem = 'center' style={{width:'100%'}}>
                    <TableCell>
                        <div align='center'>
                    <h3>Dashboard for assessment</h3>
                    </div>
                    </TableCell>
                </TableRow>
                {results?.length===0 ?
                <TableCell scope="assessments" style={{width:'100%'}} >
                    <h5>No Results Available!!!</h5>
                </TableCell>
                 :
                 results?.map((result,index) => (
                <div>
                <TableRow >          
                <TableCell style={{width:'200px'}}>candidate Id</TableCell>
                <TableCell style={{width:'300px'}}> Name</TableCell>
                <TableCell style={{width:'300px'}}> Email</TableCell>
                <TableCell style={{width:'300px'}}>College Name</TableCell>
                <TableCell style={{width:'200px'}}>Score</TableCell>
                <TableCell style={{width:'200px'}}>Time taken</TableCell>
                </TableRow>
                <TableRow >          
                <TableCell>{result.user_id}</TableCell>
                <TableCell >{result.user_name}</TableCell>
                <TableCell > {result.email}</TableCell>
                <TableCell >{result.college_name}</TableCell>
                <TableCell >{result.score}</TableCell>
                <TableCell >{result.Time_taken}</TableCell>
                </TableRow>
                </div>
             ),) } 
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    </>;
}



export default Dashboard;