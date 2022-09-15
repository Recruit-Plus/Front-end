import React,{useEffect} from 'react';
import {
  Link,
  } from "react-router-dom";
import img1 from '../images/recruit+logo.png';
import {Box,Toolbar,Typography,Button,IconButton,AppBar} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { GoogleLogin} from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';


const Navbar = () => {
  let navigate =useNavigate();
  const [user,setUser]=React.useState({});
  const [state,setState]=React.useState({isLogined:false});
  const name=user.name;
  const pic=user.picture;
  const clientId="230149321839-57i5bhj574906nhivbfm27a104n53o16.apps.googleusercontent.com";

  useEffect(()=>{
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({clientId:clientId})
    })
  })
  const logout = (response) => {
    window.sessionStorage.removeItem("email");
     window.sessionStorage.removeItem("name");
     window.localStorage.removeItem("userId");
     window.localStorage.removeItem("user");
     setState(state => ({
         isLogined: false
         
     }),
     console.log(response)
     );
   navigate("/");
 }


  const responseGoogle =(response)=>
  {
      console.log("Encoded JWT ID token:"+ JSON.stringify(response.profileObj));
      var userObject =response.profileObj;
      console.log(userObject);
      window.sessionStorage.setItem("email", userObject.email);
      window.sessionStorage.setItem("name", userObject.givenName);
      window.sessionStorage.setItem("name", userObject.name);
      setState(state => ({
        isLogined: true
        
    })
      );


      setUser(userObject);
      const n=user.name;

      const email=userObject.email;
      const first_name=userObject.givenName;
      const last_name=userObject.familyName;
      SearchUser(email,first_name,last_name);
 

  }

  const SearchUser=(email,first_name,last_name)=>{

    axios.get('http://localhost:8084/users/v1/email',{
        params:{
           email
        }}).then(
          function(result) {
            console.log(result);
            if(result.data==""){
              navigate("/role",{state:{email:{email},
               firstName:{first_name},
               lastName:{last_name}}});
            }
            else if (result.data[0].role === "candidate") {
              window.localStorage.setItem("userId", result.data[0].user_id);
              navigate("/CandidateLogin",{state:{firstName:{first_name},lastName:{last_name}}});
         
            } else if (result.data[0].role === "admin") {
              window.localStorage.setItem("user", result.data[0].user_name);
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
          <div>
          {window.sessionStorage.getItem("name")==null?
          <GoogleLogin
          clientId= {clientId}
          scope=""
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
      />
      :
          <GoogleLogout
                 clientId={clientId}
                 buttonText="Logout"
                onLogoutSuccess={logout}
                >
                 </GoogleLogout>     
          } 
          </div>
           
        </Toolbar>
      </AppBar>
    </Box>
    </>
   
  );
}

export default Navbar;