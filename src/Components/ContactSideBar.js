import React, {useContext, useState} from "react";
import UsersContext from "../Contexts/AppContext.js";
import Contacts from './Contacts';
import AddContact from "./AddContactForm";
import "bootstrap/dist/css/bootstrap.css";
import {FaSearch} from "react-icons/fa";
import "../Style/contact.css";
import FormShowComponent from "./FormShowComponent.js"; 
import {FaPlusCircle} from "react-icons/fa";
import FormShowContext from "../Contexts/FormShowContext.js";
import RecentChats from './RecentChats.js';

function ContactSideBar(){

    let usersContext = useContext(UsersContext);
    const showFromContext = useContext(FormShowContext);
    const {toggleFormStatus, showForm} = showFromContext;
    const [contactState, setContactState] = useState(true);


    function showContacts(){
        console.log(showFromContext)
        setContactState(true)
    }

    function showChats(){
        setContactState(false);
    }

    return (
       <div className="w-100 sideBar">
           <div className="chatSideBar-header">
                <button onClick={showChats} className={!contactState?"rounded-pill chatSideBar-header-btn active":"rounded-pill chatSideBar-header-btn"}>recent chats</button>
                <button onClick={showContacts} className={contactState?"rounded-pill chatSideBar-header-btn active":"rounded-pill chatSideBar-header-btn"}>contacts</button>
           </div>

           <div className="chatSideBar-mainSection mt-3">
               <div className="d-flex justify-content-between mb-4">
                    {
                        contactState?
                        <div>contacts</div>:
                        <div>recent chtas</div>
                    }
                    <button onClick={toggleFormStatus} className="btn add-icon p-0 ">
                        <span className="text-primary">add contact</span>
                        <FaPlusCircle className="text-primary add-icon ms-2"/>
                    </button>    
                </div>
                <div className="mt-3">
                {
                    contactState ? 
                    <>
                    {
                        showFromContext.userFullInfo.contacts !=undefined?showFromContext.userFullInfo.contacts.map((item, index)=><Contacts key={index} index={index} contact={item} />)
                        :<></>
                    }
                    </>
                    : 
                    <RecentChats/>
                }   
                </div>
            </div>
       </div>
    )

}
export default ContactSideBar;