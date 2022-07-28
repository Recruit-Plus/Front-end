import React from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Stack,Box,
    TextField,
    Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Feed = (props) => {

    const [option1, setOption1] = React.useState('')
    const [option2, setOption2] = React.useState('')
    const [option3, setOption3] = React.useState('')
    const [option4, setOption4] = React.useState('')
    const options = [option1, option2, option3, option4]
    const [data,setData] = React.useState({
        question: "",
        answer: [],
    })

    function handleSubmit() {
        const requestBody = {...data,choices: options}
        console.log(requestBody)
    }

    return (
        <>
            <Container style={{paddingTop:60,height:'100%'}}>
                <div style={{paddingTop:30,paddingBottom:10}}>
                    <Box>
                        <Stack spacing={24} direction='row'>
                            <Button variant="contained" style={{backgroundColor:'#696969'}}>
                                <VisibilityIcon />
                            </Button>
                            <Link to='/Home'>
                                <Button variant="contained" style={{backgroundColor:'#696969'}}>Close</Button>
                            </Link>
                            <Button variant="contained"  style={{backgroundColor:'#696969'}} onClick={() => handleSubmit()}>SAVE</Button>
                            <Button variant="contained"  style={{backgroundColor:'#696969'}} >NEXT</Button>
                        </Stack>
                    </Box>
                </div>
                <Box style={{border:'2px solid black',height:'70%',backgroundColor:'#f8f8f8',margin:'0.6rem auto 0 auto',padding:'15px 2px'}}>
                    <Grid container>
                        <Grid item xs={2} >
                            <Container styles={{borderRight:'2px solid black'}}>
                                <Stack>
                                    <p  style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'1rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Question</p>
                                    <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 1</p>

                                    <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 2</p>

                                    <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 3</p>

                                    <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Option 4</p>
                                    <p style={{fontSize:'1rem',color:'white',border:'2px solid #696969',backgroundColor:'#696969',cursor:'pointer',margin:'0.6rem 0.4rem ',transition:'0.3s linear all',padding:'0.8rem',width:'100%'}}>Answer</p>
                                </Stack>
                            </Container>
                        </Grid>
                        <Grid item xs={10}>
                            <Container styles={{borderRight:'2px solid black'}}>
                                <Stack>
                                    <TextField
                                        fullWidth
                                        label="Question"
                                        onChange={(event) => setData({...data,question: event.target.value})}
                                        style={{margin:'0.8rem auto ',color:'black',backgroundColor:'white'}}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Option 1"
                                        onChange={(event) => setOption1(event.target.value)}
                                        style={{margin:'0.7rem auto ',color:'black',backgroundColor:'white'}}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Option 2"
                                        onChange={(event) => setOption2(event.target.value)}
                                        style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}
                                    />
                                    <TextField
                                        fullWidth label="Option 3"
                                        onChange={(event) => setOption3(event.target.value)}
                                        style={{margin:'0.7rem auto ',color:'black',backgroundColor:'white'}}
                                    />
                                    <TextField
                                        fullWidth label="Option 4"
                                        onChange={(event) => setOption4(event.target.value)}
                                        style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Answer"
                                        value={data.answer}
                                        onChange={(event) => setData({...data,answer: [event.target.value]})}
                                        style={{margin:'0.5rem auto ',color:'black',backgroundColor:'white'}}
                                    />
                                </Stack>
                            </Container>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
);
}

export default Feed;