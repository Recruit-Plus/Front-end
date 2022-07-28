import React from 'react';
import axios from "axios";
 const url="http://localhost:8081/recruitPlus/questions";
class addquestion  {
  saveQuestion(question){
   return  axios.post(url,question);
  }
}


export default new addquestion;