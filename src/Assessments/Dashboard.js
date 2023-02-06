import React from 'react';
import { useLocation} from 'react-router-dom';
import {Paper,Box,Table,TableBody,TableCell,TableContainer,TableRow} from "@mui/material";
import axios from 'axios';

function Dashboard (assess_id,assess_name){
  const location = useLocation();
  const [results,setResults]=React.useState([]);
  const assessment_id=location.state.assess_id.assessment_id;
  const assessment_name=location.state.assess_name.assessment_name;
  

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
                    <h3>Dashboard for assessment {assessment_name}</h3>
                    </div>
                    </TableCell>
                </TableRow>
                {results?.length===0 ?
                <TableCell scope="assessments" style={{width:'100%'}} >
                    <h5>No Results Available!!!</h5>
                </TableCell>
                 :
                 <div>
               <TableRow>          
                <TableCell sx={{width: 350}}>candidate Id</TableCell>
                <TableCell sx={{width: 250}}> Name</TableCell>
                <TableCell sx={{width: 330}}> Email </TableCell>
                <TableCell sx={{width: 270}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;college</TableCell>
                <TableCell sx={{width: 120}}>Score</TableCell>
                <TableCell sx={{width: 120}}>Time taken</TableCell>
                </TableRow>
                 {results?.map((result,index) => (
                <div>
                <TableRow key={index}>          
                <TableCell sx={{width: 300}}>{result.user_id}</TableCell>
                <TableCell sx={{width: 230}}>{result.user_name}</TableCell>
                <TableCell sx={{width: 300}}> {result.email}</TableCell>
                <TableCell sx={{width: 250}}>{result.college_name}</TableCell>
                <TableCell sx={{width: 110}}>{result.score}</TableCell>
                <TableCell sx={{width: 110}}>{result.Time_taken}</TableCell>
                </TableRow>
                </div>
             ),) } 
             </div> 
             }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    </>;
}



export default Dashboard;