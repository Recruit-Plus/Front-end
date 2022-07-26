<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";

function App() {
  return (
    <>
    </>
=======
import React from 'react';
import Addquestions from './components/addquestions';
import EditQuestionPage from './components/EditQuestionPage';
import FullScreenDialog from './components/FullScreenDialog';
import {Typography,Button,CssBaseline,Grid,Container} from '@mui/material';

=======
import React from 'react';
import Addquestions from './components/add_new_questions_page';
import Question_List_Page from './components/Question_List_Page';
import FullScreenDialog from './components/editbutton_popup';
import {Typography,Button,CssBaseline,Grid,Container} from '@mui/material';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import Sign_up from './components/Sign_up';
<<<<<<< HEAD
>>>>>>> c579309dc3a531e9830199a3656d7373a75cb439

=======
import Login from './components/Login';
>>>>>>> eeed1aeac222337ef84331eb5eea966aae9d4964
import {
  BrowserRouter as Router,
  
  Route,
  Link,
  NavLink,
  Routes
} from "react-router-dom";
function App() {

 return (
  
  <>
   
  <Routes>
    <Route path='/' element={ <Addquestions />}>
   
    </Route>
<<<<<<< HEAD
    <Route path='/Home' element={ <EditQuestionPage/>}>
=======
    <Route path='/Home' element={ <Question_List_Page/>}>
>>>>>>> c579309dc3a531e9830199a3656d7373a75cb439

     
    </Route>
   
<<<<<<< HEAD
<<<<<<< HEAD
    <Route path="/FullScreenDialog" element={<FullScreenDialog />} />
=======
   
>>>>>>> c579309dc3a531e9830199a3656d7373a75cb439
=======
    <Route path='/AdminLogin' element={ <AdminLogin/>}>
    </Route>
   
   <Route path='/Home' element={ <FullScreenDialog/>}>

     
</Route>
<Route path='/Sign_up' element={ <Sign_up/>}>

     
</Route>
<Route path='/HomePage' element={ <HomePage/>}>

     
</Route>
<Route path='/Login' element={ <Login/>}>

     
</Route>

>>>>>>> eeed1aeac222337ef84331eb5eea966aae9d4964
  </Routes>
 
    </>
     
<<<<<<< HEAD
>>>>>>> 957485058d54838f4634c7483606cdb38d5ce888
=======
>>>>>>> c579309dc3a531e9830199a3656d7373a75cb439
  );
}

export default App;
