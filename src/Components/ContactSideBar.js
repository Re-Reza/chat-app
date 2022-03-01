import React, {useContext} from "react";
import UsersContext from "../Contexts/AppContext.js";
import Contacts from './Contacts';
import AddContact from "./AddContactForm";
import "bootstrap/dist/css/bootstrap.css";
import {FaSearch} from "react-icons/fa";
import "../Style/contact.css";
import FormShowComponent from "./FormShowComponent.js"; 
import {FaPlusCircle} from "react-icons/fa";
import FormShowContext from "../Contexts/FormShowContext.js";

function ContactSideBar(){

    let usersContext = useContext(UsersContext);
    const showFromContext = useContext(FormShowContext);
    const {toggleFormStatus, showForm} = showFromContext;

    return (
       <div className="w-100">
           <div className="chatSideBar-header">
                <div className="chatSideBar-header-search">
                    <input  type="text" className="me-3 form-control" placeholder="type to search"/>
                    <button className="btn btn-primary"><FaSearch className="text-white"/></button>
                </div>
           </div>

           <div className="chatSideBar-mainSection mt-3">
               <div className="d-flex justify-content-end">
                    <button onClick={toggleFormStatus} className="btn add-icon p-0 ">
                        <span className="text-primary">add contact</span>
                        <FaPlusCircle className="text-primary ms-2 fs-4"/>
                    </button>    
                </div>
                <div className="mt-3">
                {
                        usersContext.users.length==0?<span className="text-danger">no contact</span>
                        :
                        usersContext.users.map((item, index)=><Contacts contact={item} key ={index}/>)
                }
                </div>
            </div>
       </div>
    )

}

export default ContactSideBar;