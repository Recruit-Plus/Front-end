import React from 'react';
import {Link}from 'react-router-dom';
import {Button,TableRow, TableCell} from '@mui/material';
import img2 from '../images/AdminHome.jpeg';
import Navbar1 from './Navbar1';
import  './App.css';
import {useLocation} from 'react-router-dom';

const AdminLogin = (firstName,lastName) => {
    const location = useLocation();
    const f_name=location.state.firstName.first_name;
    const l_name=location.state.lastName.last_name;
    return <>
      <Navbar1/>
      <div><br></br>
        <TableRow>
            <TableCell><div  ><img src={img2} width={500} height={500} style={{marginTop: "12%", display: "inline-block;" , width:"80%",height:"80%",borderRadius:"90px"}}></img></div></TableCell>
            <TableCell>
                <div className='body'><br></br>
                    <span className='text1' align='center' style={{fontSize:'45px'}}>Welcome {f_name} {l_name}!</span><br></br>
                    <span align='center' className='text'>Easily create quizzes to test <br></br>student's knowledge and track their performance</span>
                <div className='wrapper'>
                <div className='icon'>
                    <Link to='/questionlist'>
                        <span><Button variant ='outlined' className='button' style={{backgroundColor:'black',color:'white',fontSize:'1rem'}} >Question Bank</Button></span>
                    </Link>
                <div className='tooltip' style={{width:230}}><p style={{fontSize:'1rem'}}>Add Question<br></br>View All Questions<br></br>Edit Question</p></div>
                </div>
                <div className='icon'>
                    <Link to='/assessmentlist'>
                        <span><Button variant ='outlined' className='button' style={{backgroundColor:'black',color:'white',fontSize:'1rem'}}>Assessments</Button></span>
                    </Link>
                <div className='tooltip' style={{width:180}}><p style={{fontSize:'1rem'}}>Add Assessment<br></br>View Assessments<br></br>Edit Assessments</p></div>
                </div>
                </div>
            </div>
            </TableCell>
        </TableRow>
    </div>
</>;
}



export default AdminLogin;