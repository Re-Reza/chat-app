import React, {Component} from 'react';
import "../Style/MainSection.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {BrowserRouter , Routes, Route} from "react-router-dom";

//import Components


import ContactSideBar from "./ContactSideBar";
import {FaPlusCircle} from "react-icons/fa"; 
import ChatPage from './ChatPage';
import HeadPart from './HeadPart.js';

//import Contexts
import UsersContext from "../Contexts/AppContext.js";
import FormShowContext from "../Contexts/FormShowContext"

class MainSection extends Component {

    static contextType = UsersContext;

    state={
        showForm:false
    };

    toggleFormStatus(){
        this.setState((previousState)=>{
            return{
                showForm : !(previousState.showForm)
            }
        });
    }


    render() {
        const {users} = this.context;
        return(
            <FormShowContext.Provider value={{showForm:this.state.showForm, toggleFormStatus: this.toggleFormStatus.bind(this)}}>
                <HeadPart/>
                <div className="mainSection-container">

                {/*side bar for contacts*/}
                <div id="mainSection-sidebar" className="pe-4">
                {
                    <ContactSideBar/>
                }
                </div>

                {/*chat part of main section*/}
                <div id="mainSection-chatPart">
                    {
                        users.length==0? 
                        <div className="no-contact-warning">
                            <div className="text-danger">there is no contact please add your contacts</div>
                            <button onClick={this.toggleFormStatus.bind(this)} className="btn add-icon p-0 ">
                                <span className="text-primary">add contact</span>
                                <FaPlusCircle className="text-primary ms-2 fs-4"/>
                            </button> 
                        </div>
                        :<ChatPage/>
                    }
                </div>
            </div>

            </FormShowContext.Provider>
        )
    }
}

export default MainSection;