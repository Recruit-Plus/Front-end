import React from 'react';
import Addquestions from './QuestionList/AddQuestion'
import Questionlist from './QuestionList/questionlist';
import EditButtonPopup from './QuestionList/EditButtonPopup';
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
    <Route path='/Addquestion' element={ <Addquestions/>}/>
    <Route path="/EditQuestion" element={<EditButtonPopup />} />
    <Route path='/questionlist' element={ <Questionlist/>}/>
    <Route path='/adminlogin' element={ <AdminLogin/>}/>
    <Route path='/home' element={ <EditButtonPopup/>}/>
    <Route path='/signup' element={ <Sign_up/>}/>
    <Route path='/homepage' element={ <HomePage/>}/>
    <Route path='/login' element={ <Login/>}/>
  </Routes>
    </>  
);
}

export default App;
