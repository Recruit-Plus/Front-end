// import React from 'react';
// import {
//   Link,
//   } from "react-router-dom";
// import {Button,InputAdornment,InputLabel,FormControl,IconButton,OutlinedInput,Checkbox, outlinedInputClasses} from "@mui/material";
// import GoogleIcon from '@mui/icons-material/Google';
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import validator from 'validator';
// import Navbar from './Navbar';
// import {useEffect} from'react';
// import Google from '@mui/icons-material/Google';
// //import jwt_decode from 'jwt-decode';



// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




// const Login = () => {
//   const [values, setValues] = React.useState({
//     password: "",
//     showPassword: false
//   });
//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };
//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword
//     });
//   };
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   const [open, setOpen] = React.useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const [emailError, setEmailError] = React.useState('')
//   const validateEmail = (e) => {
// var email = e.target.value
// if (validator.isEmail(email)) {
//   setEmailError('Valid Email :)')
// } else {
//   setEmailError('Enter valid Email!')
// }
// }

// function handleCallbackResponse(response)
// {
//   console.log("Encoded JWT ID token:"+ response.credential);
//   var userObject = jwt_decode(response.credential);
//   console.log(userObject);
// }

// useEffect(() =>{
// /* global google*/
// google.accounts.id.initialize({
//   client_id:"107931084468-188kgsko8tnqdot6r5646p19ugi4eas8.apps.googleusercontent.com",
//   callback:handleCallbackResponse
// });

// google.accounts.id.renderButton(
//   document.getElementById("loginDiv"),
//   {
//     theme:"outline" ,size:"large"
//   }
// );
// },[])


  
//   return<>  
//      <Navbar></Navbar>
//     <div align = "center" style={{paddingTop:'80px'}}>
//         <div className="conatiner mt-5" align="center" style={{height: '75vh',width:'54vh', background:'#EEEDE7',paddingTop:'50px'}}>
//             <h4>Welcome Back!! Login to your account</h4>
//               <div className="conatiner" align="center" style={{paddingTop:'8px'}}>
//                 <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-email">
//                 Email
//                 </InputLabel>
//                 <OutlinedInput
//                 id="input-with-icon-textfield"
//                 label="TextField"
//                 onChange={(e)=>validateEmail(e)}
//                 endAdornment={
//                 <InputAdornment position="end">
//                   <AccountCircle >
//                     </AccountCircle> 
//                 </InputAdornment>
                
//               }
//             />
//             <div align="right" >
//               {emailError}
//             </div>
//               </FormControl>
//           </div>
//           <div className="conatiner my-3 " align="center" style={{paddingBottom:'4px'}}>
//             <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//               <InputLabel htmlFor="outlined-adornment-password">
//                Password
//               </InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 type={values.showPassword ? "text" : "password"}
//                 value={values.password}
//                 onChange={handleChange("password")}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                     {values.showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//                 />
//         <div align="right" >
//           <a href='/forget'>Forget password?</a>
//         </div>
//       </FormControl>
//         <div style={{paddingBottom:'8px'}} align="left">
//           <Checkbox style={{}} {...label} />Remember me
//         </div>
//         <div className="conatiner" align="center" style={{paddingBottom:'8px'}}>
//           <Link to="/adminlogin">
//             <Button variant="contained" >
//               Login
//             </Button>
//           </Link>        
//         </div>
//         <div id="loginDiv" className="conatiner " align="center">
//           <Link to="/adminlogin">
//             <Button >
             
//             </Button>
//           </Link> </div>
        
//         <div align="center" style={{paddingTop:'12px'}}>
//           <h6>Don't have an account?<Link to='/signup'>SignUp</Link></h6>
//         </div>
//     </div>
//   </div>
// </div>
// </>;
// }
// export default Login;
