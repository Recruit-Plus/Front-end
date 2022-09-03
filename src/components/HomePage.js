import React from 'react';
import './Home.css'
import Bgimg from '../images/Homepage.jpeg'
import { motion } from "framer-motion";
import { Slide } from "@mui/material";
import TimeLogo from '../images/Time.jpeg';
import GrowthLogo from '../images/Growth.jpeg';
import SearchLogo from '../images/Search.jpeg';
import Navbar from './Navbar';

const HomePage = () => {
    return  <>
    <Navbar/>
    <div classname="HomePage">
    <img
    src={Bgimg}
    style={{ marginTop: "15%", display: "inline-block;" , width:"43%",height:"55%",paddingRight:10}}
    ></img>
    <motion.p animate={{ scale:2.2, speed: Slide}} style={{marginTop: "15%",fontSize:'30',paddingRight:20,paddingLeft:0}}> 
    <h1 style={{fontSize:'1.8rem',marginTop: "15%"}}><strong>RECRUIT+</strong></h1>
    Recruit+ is an application developed <br />
    for the purpose of hiring,<br />
    allows hiring managers to conduct tests,<br />
    view results, allows students to take tests <br/> 
    and join their dream companies.
     </motion.p> 
    <div class="container" >
        <div className="row">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 , marginLeft: "-15%"}}>
                <div>
                    <img src={TimeLogo} style={{ width:"45%",height:"25%", marginTop: "10%", marginLeft:"40%"}}>
                    </img>
                    <p style={{fontSize:25, marginLeft: "20%"}}><b>
                        Reduce time to hire</b>
                    </p>
                    <p style={{fontSize:18, marginLeft:"30%", marginTop:"2%", textAlign: "center"}}>
                        Efficiently filter out <br />
                        unqualified candidates.<br/>
                        Reduce time spent by your developers<br />
                        interviewing weak candidates <br />
                        and give them time<br/>
                        back to build products.<br/>
                    </p>
                </div>
                <div>
                    <img src={GrowthLogo} style={{ width:"45%",height:"25%", marginTop: "10%", marginLeft:"34%"}}>
                    </img>
                    <p  style={{fontSize:25 , marginLeft:"17%", marginTop:"15%", textAlign: "center"}}>
                        <b> Grow to Success</b>
                    <p style={{fontsize:15, textAlign: "center"}}> Develop your skills,<br/>
                        test yourself, <br/>
                        and grow towards success,<br/></p>
                    </p>
                </div>
                <div>
                    <img src={SearchLogo} style={{  width:"48%",height:"25%", marginTop: "10%",marginLeft:"37%"}}>
                    </img>
                    <p style={{fontSize:25,  marginTop:"17%", textAlign: "center",marginLeft:100}}>
                     <b >Identify skills beyond resumes</b>
                    </p>
                    <p style={{fontSize:18, marginLeft:1, marginTop:"2%", textAlign: "center"}}>
                    Resumes don't indicate skill.<br />
                    Unpack candidates' strengths<br />
                    and weaknesses with objective skills<br />
                    assessments to reduce bias,<br/>
                    expand your talent pool,<br/>
                    and achieve your hiring goals.<br/>
                    </p>
                </div>
            </div>
        </div>
        <div className="footer">
            <p style={{fontSize:15, marginLeft:"35%", marginTop:"5%", textAlign: "center", marginRight: " 40%"}}> Copyright © 2022 Recruit+  |  Careers</p>
        </div>
    </div> 
</div>
</>
;
}
export default HomePage;