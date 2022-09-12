import React from 'react';
import {Link}from 'react-router-dom';
import {Button,TableRow, TableCell} from '@mui/material';
import img2 from '../images/candidate.jpeg';
import Navbar from './Navbar';
import {useLocation} from 'react-router-dom';

import  './App.css';

const CandidateLogin = (firstName,lastName) => {
    const location = useLocation();
    const f_name=location.state.firstName.first_name;
    const l_name=location.state.lastName.last_name;

    return <>
      <div><br></br>
        <TableRow>
            <TableCell><div  ><img src={img2} width={500} height={500} style={{marginTop: "15%", display: "inline-block;" , width:"120%",height:"150%"}}></img></div></TableCell>
            <TableCell>
                <div className='body'><br></br>
                <span className='text1' align='center' style={{fontSize:'45px'}}>Welcome {f_name} {l_name}!</span>
                
                <br></br>
                   
                
                    <span align='center' className='text'>Test yourself....and grow towards success!<br></br>All the best!!</span>
                <div className='wrapper'>
                
                <div className='icon'>
                    <Link to='/EligibleAssessments'>
                        <span><Button variant ='outlined' className='button' style={{backgroundColor:'black',color:'white',fontSize:'1rem'}}>Assessments</Button></span>
                    </Link>
                <div className='tooltip' style={{width:180}}><p style={{fontSize:'1rem'}}>View Assessments</p></div>
                </div>
                </div>
            </div>
            </TableCell>
        </TableRow>
    </div>
</>;
}



export default CandidateLogin;