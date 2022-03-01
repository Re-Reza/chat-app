import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {FaCalendarAlt} from "react-icons/fa";
import AddContact from "./AddContactForm.js";
// import "../Style/fonts/Ballines/font-face.css";
import "../Style/header.css";

class HeadPart extends Component{


    //جلوگیری از کپی کردن state
    constructor(props)
    {
        super(props);
        this.d = new Date()
        this.state={date:this.d.toDateString(), time:{hour:this.d.getHours()%12,minute:this.d.getMinutes(), second:this.d.getSeconds(), flag:this.d.getHours()>=12?"pm":"am"}}
    }

    // static getDerivedStateFromProps()
    // {

    //     setInterval(()=>{
    //         let d = new Date()
    //         this.setState({date:d.toDateString(), 
    //             time:{hour:d.getHours()%12,minute:d.getMinutes(), second:d.getSeconds(),flag:this.d.getHours()>=12?"pm":"am"
    //         }});
    //     }, 1000);
    // }

    componentDidMount(){
        setInterval(()=>{
            let d = new Date()
            this.setState({date:d.toDateString(), 
                time:{hour:d.getHours()%12,minute:d.getMinutes(), second:d.getSeconds(),flag:this.d.getHours()>=12?"pm":"am"
            }});
        }, 1000);
    }

    
    render(){
        // console.log("render")
        return(
            <div className="d-flex header-mainContainer justify-content-between">

                <div className="test-text">
                    wellcome to chat application 
                </div>

                <div className="d-flex align-items-baseline">
                    <FaCalendarAlt className="fs-5 text-warning"/>
                    <div className="ms-2 fs-4">
                        {this.state.date}
                    </div>
                </div>
                
                <div className="timeShow fs-3">
                    {this.state.time.hour+":"+this.state.time.minute+":"+this.state.time.second+" "+this.state.time.flag}
                </div>
            </div>
        )
    }
}

export default HeadPart;
