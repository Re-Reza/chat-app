import React, {useContext, useEffect} from 'react';
import {FaTrashAlt} from "react-icons/fa";
import UsersContext from "../Contexts/AppContext.js";

function Message(props)
{
    const {message, date} = props.message;
    const ContactContext = useContext(UsersContext);

    function deleteMessageCall()
    {
        ContactContext.dispatch({
            type:"deleteMessageCall", 
            payload:{messageTime:date}
        });
    }

    useEffect(()=>{
        return ()=>console.log("message deleted")
    },[])

    return(
        <div className="message-container">
            <div className="message-option-container">
                <span title="delete contact" onClick={deleteMessageCall}>
                    <FaTrashAlt className="text-danger fs-6 delete-icon"/>
                </span>
                <span className="message-time">{date}</span>
            </div>
            <span className="message ms-2">{message!=""?message:null}</span>
        </div>
    )
}

export default Message;