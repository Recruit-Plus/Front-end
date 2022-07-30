import React from 'react';
import Addquestions from './components/AddQuestion'
import QuestionList from './components/QuestionList';
import FullScreenDialog from './components/EditButtonPopup';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import Sign_up from './components/SignUp';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
 return (
  <>
  <Navbar/>

  <Routes>
    <Route path='/' element={ <HomePage />}></Route>
    <Route path='/home' element={ <Addquestions/>}/>
    <Route path='/questionlist' element={ <QuestionList/>}/>
    <Route path="/fullscreendialog" element={<FullScreenDialog />} />
    <Route path='/adminlogin' element={ <AdminLogin/>}/>
    <Route path='/home' element={ <FullScreenDialog/>}/>
    <Route path='/signup' element={ <Sign_up/>}/>
    <Route path='/homepage' element={ <HomePage/>}/>
    <Route path='/login' element={ <Login/>}/>
  </Routes>
    </>  
);
}

export default App;
