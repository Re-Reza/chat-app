import React, {useContext, useEffect, useState} from 'react';
import {FaTrashAlt} from "react-icons/fa";
import UsersContext from "../Contexts/AppContext.js";
import axios from 'axios';
import FormShowContext from "../Contexts/FormShowContext.js";
import Loading from './Loading.js';

function Message(props)
{
    // message has text, time, chatID(id of message) and status
    const {text, time, sent} = props.message;
    const ContactContext = useContext(UsersContext);
    const context1 = useContext(FormShowContext);

    function deleteMessage(){
        console.log(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${context1.userFullInfo.currentUserId}/contacts/${props.selectedContact.id}/chats/${props.message.chatId}`);
        axios.delete(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${context1.userFullInfo.currentUserId}/contacts/${props.selectedContact.id}/chats/${props.message.chatId}.json`)
        .then(response=>{
            console.log(response);
            context1.deleteMessage(props.selectedContact.id, props.message.chatId);
            
        }).catch(error=>console.log(error));
        context1.deleteMessage(props.selectedContact.id, props.message.chatId);
    }
    useEffect(()=>{
        return ()=>console.log("message deleted")
    },[])

    return(
        <div className={sent?"message-container":"message-container message-container-received"}>
            <div className="message-option-container">
                <span title="delete message" onClick={deleteMessage}>
                    {sent?<FaTrashAlt className="text-danger fs-6 delete-icon"/>:<></>}
                </span>
                
                <span className="message-time">{time}</span>
            </div>
            <span className={sent?"message-sent ms-2 text-white bg-success":"message-received ms-2 "}>{text}</span>
            
        </div>
    )
}

export default Message;