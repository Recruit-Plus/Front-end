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
                    <h3> {assessment_name} Leaderboard</h3>
                    </div>
                    </TableCell>
                </TableRow>
                {results?.length===0 ?
                <TableCell scope="assessments" style={{width:'100%'}} >
                    <h5>No Results Available!!!</h5>
                </TableCell>
                 :
                
                <div>
                <TableRow >          
                <TableCell style={{fontWeight:'bold'}}>Candidate Id</TableCell>
                <TableCell style={{fontWeight:'bold',paddingLeft:'210px'}}> Name</TableCell>
                <TableCell style={{fontWeight:'bold',paddingLeft:'160px'}}> Email</TableCell>
                <TableCell style={{fontWeight:'bold',paddingLeft:'240px'}}>College Name</TableCell>
                <TableCell style={{fontWeight:'bold',paddingLeft:'80px'}}>Score</TableCell>
                <TableCell style={{fontWeight:'bold',paddingLeft:'80px'}}></TableCell>
                </TableRow>
                {results?.map((result,index) =>(
                  <div>
                <TableRow key={index}>          
                <TableCell style={{width:'200px'}}>{result.user_id}</TableCell>
                <TableCell style={{width:'300px',paddingLeft:'100px'}}>{result.user_name}</TableCell>
                <TableCell style={{width:'300px'}}> {result.email}</TableCell>
                <TableCell style={{width:'150px'}}>{result.college_name}</TableCell>
                <TableCell style={{width:'100px',paddingLeft:'50px'}}>{result.score}</TableCell>
                <TableCell style={{width:'100px',paddingLeft:'50px'}}></TableCell>
                </TableRow>
                </div>
                ),) 
             } 
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