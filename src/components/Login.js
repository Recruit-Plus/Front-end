import React from 'react';
import {
  Link,
  } from "react-router-dom";
import {Button,InputAdornment,InputLabel,FormControl,IconButton,OutlinedInput,Checkbox, outlinedInputClasses} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import validator from 'validator';
import Navbar from './Navbar';
import {useEffect} from'react';
import Google from '@mui/icons-material/Google';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import TakeAssessments from '../User/TakeAssessments';
import AdminLogin from './AdminLogin';
import NoRole from './NoRole';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Login = () => {
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
      });
      let navigate =useNavigate();
    
      const [email,setEmail]=React.useState("");
      
      const [first_name,setFirst_name]=React.useState("");

      const [last_name,setLast_name]=React.useState("");

      const [role,setRole]=React.useState("");

     

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword
        });
      };
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const [open, setOpen] = React.useState(false);
      const handleClose = () => {
        setOpen(false);
      };
      const [emailError, setEmailError] = React.useState('')
      const validateEmail = (e) => {
    var email = e.target.value
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }


  function useHandleCallbackResponse(response)
  {
      console.log("Encoded JWT ID token:"+ response.credential);
      var userObject = jwt_decode(response.credential);
      console.log(userObject);

      setEmail(userObject.email);
      setFirst_name(userObject.given_name);
      setLast_name(userObject.family_name);


      const email=userObject.email;
      const first_name=userObject.given_name;
      const last_name=userObject.family_name;
      
     console.log(email);
     console.log(first_name);
     console.log(last_name);
      
        SearchUser(email);
 
  }

  const SearchUser=(email)=>{
    axios.get('http://localhost:8084/users/v1/email',{
        params:{
           email
        }}).then(
          function(result) {
            console.log(result.data[0].role);
            if (result.data[0].role === "candidate") {
              navigate("/TakeAssessments");
            } else if (result.data[0].role === "admin") {
              navigate("/AdminLogin");
            }
            else{
              navigate("/NoRole");
            }
          })
      .catch(err=>{
        console.log(err.message)
      })

  }

  useEffect(() =>{
    /* global google*/
    google.accounts.id.initialize({
      client_id:"230149321839-n3hq4qtv99taso7fot2jjl8he3dg3n5p.apps.googleusercontent.com",
      callback:useHandleCallbackResponse
      
    });

    google.accounts.id.renderButton(
      document.getElementById("loginDiv"),
      {
        theme:"outline" ,size:"large"
      }
    );
  },[])





  return<>  
    <Navbar></Navbar>
    <div align = "center" style={{paddingTop:'80px'}}>
        <div className="conatiner mt-5" align="center" style={{height: '75vh',width:'54vh', background:'#EEEDE7',paddingTop:'50px'}}>
            <h4>Welcome Back!! Login to your account</h4>
              <div className="conatiner" align="center" style={{paddingTop:'8px'}}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                Email
                </InputLabel>
                <OutlinedInput
                id="input-with-icon-textfield"
                label="TextField"
                onChange={(e)=>validateEmail(e)}
                endAdornment={
                <InputAdornment position="end">
                  <AccountCircle >
                    </AccountCircle> 
                </InputAdornment>
                
              }
            />
            <div align="right" >
              {emailError}
            </div>
              </FormControl>
          </div>
          <div className="conatiner my-3 " align="center" style={{paddingBottom:'4px'}}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
               Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                />
        <div align="right" >
          <a href='/forget'>Forget password?</a>
        </div>
      </FormControl>
        <div style={{paddingBottom:'8px'}} align="left">
          <Checkbox style={{}} {...label} />Remember me
        </div>
        <div className="conatiner" align="center" style={{paddingBottom:'8px'}}>
          <Link to="/adminlogin">
            <Button variant="contained" >
              Login
            </Button>
          </Link>        
        </div>
        <div id="loginDiv" className="conatiner " align="center">
          <Link to="/adminlogin">
            <Button >
             
            </Button>
          </Link> </div>
        
        <div align="center" style={{paddingTop:'12px'}}>
          <h6>Don't have an account?<Link to='/signup'>SignUp</Link></h6>
        </div>
    </div>
  </div>
</div>
</>;
}
export default Login;