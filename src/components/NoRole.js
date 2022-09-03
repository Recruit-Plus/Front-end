import React, { useState } from "react";
import {
  Button,
  InputAdornment,
  FormControl,
  IconButton,
  OutlinedInput,
  Checkbox,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import validator from "validator";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { borderRight } from "@mui/system";
import Navbar from "./Navbar";
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Stack,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function FormPropsTextFields(email,firstName,lastName) {
  const [showhide, setShowhide] = useState("");
  const [branch, setBranch] = useState("");
  const verify="";
  const[invalid,setinvalid]=React.useState(false);
  const location = useLocation();
  const f_name=location.state.firstName.first_name;
  const Email=location.state.email.email;
  const [userDetails,setUserDetails]=React.useState
  (    
    {
      user_name:f_name,
      email:Email,
      role:"",
      degree:"",
      branch:"",
      college:"",
      year:""
    }
  )
  let navigate =useNavigate();
  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
    {setUserDetails({...userDetails,role:event.target.value})}
  };
  // const [degree, setDegree] = React.useState("");
  const handleChange = (event) => {
    {setUserDetails({...userDetails,degree:event.target.value})}
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    const requestbody={...userDetails,college:data.college,branch:data.branch,year:data.year}
    axios.post("http://localhost:8084/users/v1/",requestbody).then(result=>console.log(result))
    .catch(err=>{
        console.log(err.message)
      });
      if(userDetails.role==="candidate"){
      navigate("/TakeAssessments")
     }
     else{
      navigate("/Adminlogin")
     }

 }
  const onSubmitHandle=(data)=>{
    console.log(data);
  }
  return (
    <>
      <Navbar></Navbar>
      <Grid
        container
        style={{ paddingTop: 140, paddingRight: 100 }}
        spacing={2}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              // maxWidth: '100%',
              paddingTop: 5,
              paddingLeft: 7,
              backgroundColor: "",
              paddingRight: 7,
              border: "2px solid black",
            }}
          >
            <Stack spacing={15} direction="row" style={{ paddingTop: 17 }}>
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="User name"
                defaultValue={f_name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Email"
                defaultValue={Email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>

            <div style={{ paddingTop: 17 }}>
              <label>Select Your role</label>
              <select
                name="role"
                className="form-control"
                onChange={(e) => handleshowhide(e)}
              >
                <option value=""onChange={(event) => setUserDetails({...userDetails,role:event.target.value})}>---role---</option>
                <option value="candidate"onChange={(event) => setUserDetails({...userDetails,role:event.target.value})}>candidate</option>
                <option value="admin"onChange={(event) => setUserDetails({...userDetails,role:event.target.value})}>Admin</option>
              </select>
            </div>
            {showhide === "candidate" && (
              <container>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2} direction="row" style={{ paddingTop: 17 }}>
                    <FormControl sx={{ minWidth: 420 }}>
                      <InputLabel required>Degree</InputLabel>
                      <Select
                        
                        label="degree"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="B.tech" onChange={(event) => setUserDetails({...userDetails,degree:event.target.value})}>B.tech</MenuItem>
                        <MenuItem value="M.tech" onChange={(event) => setUserDetails({...userDetails,degree:event.target.value})}>M.tech</MenuItem>
                        <MenuItem value="BCA" onChange={(event) => setUserDetails({...userDetails,degree:event.target.value})}>BCA</MenuItem>
                        <MenuItem value="MCA"onChange={(event) => setUserDetails({...userDetails,degree:event.target.value})}>MCA </MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                       required
                       fullWidth
                      label="Year of passing"
                      onChange={(event) => setUserDetails({...userDetails,year:event.target.value})}
                      {...register("year", {
                        required: "Enter Year of Passing",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Enter Valid data",
                        },
                      })}
                    />
                    {errors.year && (
                      <small className="text-danger">
                        {errors.year.message}
                      </small>
                    )}
                  </Stack>
                  <Stack style={{ paddingTop: 17 }}>
                    <TextField
                      required
                      id="fullWidth "
                      label="Branch"
                      onChange={(event) => setUserDetails({...userDetails,branch:event.target.value})}
                      {...register("branch", {
                        required: "Enter Your Branch",
                        pattern: {
                          value: /^[A-Za-z]*$/,
                          message: "Enter valid Branch Name",
                        },
                      })}
                    />
                    {errors.branch && (
                      <small className="text-danger">
                        {errors.branch.message}
                      </small>
                    )}
                  </Stack>
                  <Stack style={{ paddingTop: 17 }}>
                    <TextField
                     required
                      id="fullWidth "
                      label="College Name"
                      onChange={(event) => setUserDetails({...userDetails,college:event.target.value})}
                      className={`${errors.message && "invalid"}`}
                      {...register("college", {
                        required: "Enter Your College Name",
                        pattern: {
                          value: /^[A-Za-z]*$/,
                          message: "Enter valid College Name",
                        },
                      })}
                    />
                    {errors.college && (
                      <small className="text-danger">
                        {errors.college.message}
                      </small>
                    )}
                  </Stack>
                  <Stack
                    spacing={44}
                    direction="row"
                    style={{ paddingTop: 30 }}
                  >
                    <div></div>
                  </Stack>
                  <div align="center" style={{ paddingTop: "20px" }}>
                  
                    <Button
                      type="submit"
                      value="Send message"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        height: 40,
                        width: 200,
                      }}
                    
                    >
                      proceed to take test
                    </Button>
                
                  </div>
                </form>
              </container>
            )}
            {showhide === "admin" && (
              <container>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <Stack style={{ paddingTop: 17 }}>
                    <TextField
                      required
                      label="Verification code"
                      id="fullWidth"
                    
                        className={`${errors.verificationcode && "invalid"}`}
                      {...register("verificationcode", {
                        required: "Verification code is Required",
                        pattern: {
                          value: /2326/,
                          message: "Enter Valid code",
                        },
                      })}
                    />
                    {errors.verificationcode && (
                      <small className="text-danger">
                        {errors.verificationcode.message}
                      </small>
                    )}
                  </Stack>
                  <div align="center" style={{ paddingTop: "20px" }}>
                    
                      <Button
                        type="submit"
                        value="Send message"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          height: 40,
                          width: 150,
                        }}
                      >
                        Login
                      </Button>
                  
                  </div>
                </form>
              </container>
            )}
            <br></br>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}