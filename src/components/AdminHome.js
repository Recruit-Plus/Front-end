import React from 'react';
import {Link}from 'react-router-dom'
import img2 from '../images/AdminHome.jpeg'
import {Button,TableRow, TableCell, Typography} from '@mui/material';
import App from '../App';
import Navbar from './Navbar';
import Questions_List_Page from './Question_List_Page';

function AdminHome() {
    return(
        <>
        <Navbar></Navbar>
        <div><br></br>
            <TableRow>
            <TableCell><div className='img' ><img src={img2} width={500} height={500} alt='RecruitPlus'></img></div></TableCell>
        <TableCell>
        <div className='body'><br></br>
            <Typography variant='h2' align='center'>Welcome To <b>RECRUIT+</b></Typography><br></br>
            <Typography align='center' className='text'>Easily create quizzes to test <br></br>student's knowledge and track their performance</Typography>
        <div className='wrapper'>
            <div className='icon'>
                <div className='tooltip'><p>-Add Question<br></br>-View All Questions<br></br>-Edit Question</p></div>
                <Link to='/v1/questions'>
                <span><Button className='button' >Question Bank</Button></span>
                </Link>
            </div>
            <div className='icon'>
                <div className='tooltip'><p>-Add Quiz<br></br>-View Quizzes<br></br>-Edit Quiz</p></div>
                <Link to='/v1/quiz'>
                <span><Button className='button' >Quiz</Button></span>
                </Link>
            </div>
        </div>
        </div>
        </TableCell>
        </TableRow>
        </div>
        </>
    )
}
export default AdminHome;