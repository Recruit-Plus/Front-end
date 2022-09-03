import React,{useEffect} from 'react';
import {
  Link,
  } from "react-router-dom";
import img1 from '../images/recruit+logo.png';
import {Box,Toolbar,Typography,Button,IconButton,AppBar} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
  let navigate =useNavigate();
  useEffect(() =>{
    /* global google*/
    google.accounts.id.initialize({
      client_id:"230149321839-n3hq4qtv99taso7fot2jjl8he3dg3n5p.apps.googleusercontent.com",
      callback:useHandleCallbackResponse
      
    });

    google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
       {
        theme:"outline" ,
        size:"small",
      }
    );
     
  },[])

  function useHandleCallbackResponse(response)
  {
      console.log("Encoded JWT ID token:"+ response.credential);
      var userObject = jwt_decode(response.credential);
      console.log(userObject);

      const email=userObject.email;
      const first_name=userObject.given_name;
      const last_name=userObject.family_name;
      
     console.log(email);
     console.log(first_name);
     console.log(last_name);
      
        SearchUser(email,first_name,last_name);
 
  }

  const SearchUser=(email,first_name,last_name)=>{

    axios.get('http://localhost:8084/users/v1/email',{
        params:{
           email
        }}).then(
          function(result) {
        
            if(result.data==""){
              navigate("/role",{state:{email:{email},
               firstName:{first_name},
               lastName:{last_name}}});
            }
            else if (result.data[0].role === "candidate") {
              navigate("/CandidateLogin",{state:{firstName:{first_name},lastName:{last_name}}});
         
            } else if (result.data[0].role === "admin") {
              navigate("/AdminLogin",{state:{firstName:{first_name},lastName:{last_name}}});
            }
          })
      .catch(err=>{
        console.log(err.message)
      })

  }
  return (
    <>
     <Box  style={{ }}>
     <AppBar position="fixed"  style={{backgroundColor:'#d50000',minHeight: 40}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Link to='/homepage'>
            <img src={img1} style={{ width:"50px",height:"50px"}} alt="img"/>
          </Link>
          </IconButton>
             <table> 
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'1.5rem',color:'white'}}>
              <b>                                                       RECRUIT+</b>
             </div> </td>
            </tr>
            <tr>
              <td><div className='abc'align="centre" style={{fontSize:'0.8rem',color:'white'}}>
               ONE DAY TO DAY ONE
              </div></td>
            </tr>
           </table> 
        <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography >
          <div className="conatiner " align="center">
          <Link to="/adminlogin">
            <Button id="loginDiv">LOGIN</Button>
          </Link> 
          </div>
           
        </Toolbar>
      </AppBar>
    </Box>
    </>
   
  );
}

export default Navbar;