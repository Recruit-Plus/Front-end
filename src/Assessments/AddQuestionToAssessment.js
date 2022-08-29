import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Paper,Box,Table,TableBody,TableCell,TableContainer,
        TableRow,FormControlLabel,Switch,Stack,Button,Checkbox} from "@mui/material";
import Navbar from "../components/Navbar";


export default function AddQuestionToAssessment({assessment}) {
    const [dense, setDense] = React.useState(false);
    const [Questions, setQuestions]=React.useState([]);
    const [stateCustomer, setCustomerState] = React.useState([]);
    
    React.useEffect(() => {  
      questionHandle()
    },[])
    const questionHandle= () => {
      
      axios.get('http://localhost:8081/questions/v1/').then((result) =>setQuestions(result?.data?.content))
      .catch(err=>{
        console.log(err.message);
      })
    }
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
      };
      const AddQuestionByIds = () => {
        console.log(stateCustomer);
        console.log({assessment});
        let arrayids = [];
        stateCustomer.forEach(d => {
          if (d.select) {
            arrayids.push(d.id);
            console.log(d.id);
          }
        });
        
      //   axios
      //     .delete(`http://localhost:8080/customers/${arrayids}`)
      //     .then(data => {
      //       console.log(data);
      //       getCustomer();
      //     })
      //     .catch(err => alert(err));
      };

    return (
      <>
      
        {
  
        
      <div>
          <Navbar></Navbar>
        <div style={{paddingTop:80,marginLeft:100}}>
          <Button variant="contained" style={{backgroundColor:'black'}} onClick={() => {
          AddQuestionByIds();
        }}>Add</Button>
        </div>
      <div >
  </div>
      <Box sx={{ width: "95%" ,paddingTop:3,paddingLeft:10}}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          
          <TableContainer>
          
            <Table
              sx={{ minWidth: 1000 , maxwidth :1000 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              
              <TableBody>
                <TableCell><h3>Question Bank</h3></TableCell>
                  {Questions?.length===0 ?
                  <TableCell scope="questions" style={{width:'100%'}} >   
                  <h5>No data Available!!!</h5>
                </TableCell>
                :
                Questions?.map((questions,index) => (
                <TableRow key={index}>          
                  <TableCell scope="questions" style={{width:'100%'}} >
                  <input
                type="checkbox"
                value={questions.question_id}
                onChange={e => {
                  let value = e.target.value; 
                  setCustomerState(
                    stateCustomer=>[...stateCustomer,value],
                  )
                }}
              />
                  {questions.question}
                  </TableCell>
                
                
              </TableRow>
                  
              
               ),) } 
                
              </TableBody>
            </Table>
          </TableContainer>
          
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  }
  </>
    );
}
