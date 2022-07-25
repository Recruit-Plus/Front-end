import React from 'react';
import Addquestions from './components/add_new_questions_page';
import Question_List_Page from './components/Question_List_Page';
import FullScreenDialog from './components/editbutton_popup';
import {Typography,Button,CssBaseline,Grid,Container} from '@mui/material';
import Sign_up from './components/Sign_up';

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
    <Route path='/Home' element={ <Question_List_Page/>}>

     
    </Route>
   
   
  </Routes>
 
    </>
     
  );
}

export default App;
