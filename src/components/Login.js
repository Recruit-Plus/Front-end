import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import GoogleIcon from "@mui/icons-material/Google";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import validator from 'validator';
import Checkbox from '@mui/material/Checkbox';
import Navbar from './Navbar';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Login = () => {
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
      });
    
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
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
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

    return<>  <div>
          <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

            <div className="conatiner mt-5" align="center" style={{height: '54vh',width:'54vh'}}>

              <h4>Welcome Back!! Login to your account</h4>
                <div className="conatiner" align="center" style={{paddingTop:'8px',paddingBottom:'8px'}}>
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
                <div className="conatiner my-3 " align="center" style={{paddingBottom:'8px'}}>
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
                </div>
                
                <div style={{paddingBottom:'12px'}} align="left">
                
                <Checkbox style={{}} {...label} />Remember me
                </div>
               
                <div className="conatiner my-3" align="center" style={{paddingBottom:'12px'}}>
                <Button variant="contained" onClick={handleClose}>
                Login
              </Button>
                </div>
                <div class="space">
                        </div>
                <div className="conatiner my-5" align="center"></div>
                <Button onClick={handleClose} autoFocus>
                <GoogleIcon />
                Sign in with google
              </Button>
              <div align="left" >

                <h4>Don't have an account?<a href='/signup'>SignUp</a></h4>
              </div>

            </div>
            
            </Dialog>
        </div>

    </>;
}



export default Login;
