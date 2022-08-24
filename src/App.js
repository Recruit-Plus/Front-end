import React from 'react';
import Addquestions from './QuestionList/AddQuestion'
import Questionlist from './QuestionList/questionlist';
import EditButtonPopup from './QuestionList/EditButtonPopup';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import Sign_up from './components/SignUp';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CreateAssesssments from './Assessments/CreateAssesssments';
import EditAssessments from './Assessments/EditAssessments';
import AssessmentList from './Assessments/AssessmentList';
import TakeAssessments from './User/TakeAssessments';
import Instructions from './User/Instructions';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
 return (
  <>
 

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
    <Route path='/TakeAssessments' element={ <TakeAssessments/>}/>
    <Route path='/assessmentlist' element={ <AssessmentList/>}/>
    <Route path='/addassessment' element={ <CreateAssesssments />}/>
    <Route path='/editassessment' element={<EditAssessments/>}/>
    <Route path='/instructions' element={<Instructions/>}/>
  </Routes>
    </>  
);
}

export default App;
