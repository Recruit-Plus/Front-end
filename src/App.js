import React from 'react';
import Addquestions from './Questions/AddQuestion'
import QuestionList from './Questions/questionlist';
import FullScreenDialog from './Questions/EditButtonPopup';
import HomePage from './Homepage/HomePage';
import AdminLogin from './components/AdminLogin';
import Sign_up from './components/SignUp';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AssessmentList from './Assessments/AssessmentList'
import AddAssessment from './Assessments/Create_assessment'
import EditAssessment from './Assessments/EditAssessment';
import AddQuestionToAssessment from './Assessments/AddQuestionToAssessment';

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
    <Route path='/assessmentlist' element={ <AssessmentList/>}/>
    <Route path='/addassessment' element={ <AddAssessment/>}/>
    <Route path='/editassessment' element={<EditAssessment/>}/>
    <Route path='/addquestiontoassessment' element={<AddQuestionToAssessment/>}/>
  </Routes>
    </>  
);
}

export default App;
