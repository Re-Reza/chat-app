import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {FaCalendarAlt} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import AddContact from "./AddContactForm.js";
import FormShowContext from "../Contexts/FormShowContext";
import Navigation from './Navigation.js';
import MAIN_URL from "./MainUrl";

// import "../Style/fonts/Ballines/font-face.css";
import "../Style/header.css";


class HeadPart extends Component{

    static contextType = FormShowContext;
    state={
        navigate:false
    };

    constructor(props)
    {
        super(props);
        this.d = new Date()
        this.state={date:this.d.toDateString(), time:{hour:this.d.getHours()%12,minute:this.d.getMinutes(), second:this.d.getSeconds(), flag:this.d.getHours()>=12?"pm":"am"}}
    }

    componentDidMount(){
        setInterval(()=>{
            let d = new Date()
            this.setState({date:d.toDateString(), 
                time:{hour:d.getHours()%12,minute:d.getMinutes(), second:d.getSeconds(),flag:this.d.getHours()>=12?"pm":"am"
            }});
        }, 1000);
    }

    
    render(){
        return(
            <div className="d-flex header-mainContainer justify-content-between">

                <div className="wellcome-text d-flex justify-content-between align-items-center">
                    wellcome to chat application 
                    <AiOutlineLogout onClick={()=>{this.setState({navigate:true})}} className="logOut-Mobile text-danger fs-3 logOutIcon" title="Logout"/>
                </div>
                {/* <div>username:{this.context.username}</div> */}
                <div className="date-container">
                    <div className="d-flex align-items-baseline">
                        <FaCalendarAlt className="fs-5 text-warning"/>
                        <div className="ms-2 ">
                            {this.state.date}
                        </div>
                        
                    </div>
                    <div>
                        {this.state.time.hour+":"+this.state.time.minute+":"+this.state.time.second+" "+this.state.time.flag}
                    </div>
                </div>

                <div className="account-container d-flex align-items-center justify-content-center">
                    <div className="me-3">username: {this.context.username}</div>
                    <AiOutlineLogout onClick={()=>{this.setState({navigate:true})}} className="text-danger logOut-Desktop fs-3 logOutIcon" title="Logout"/>
                    {this.state.navigate?<Navigation navigation={MAIN_URL}/>:<></>}
                </div>
                
            </div>
        )
    }
}

export default HeadPart;
