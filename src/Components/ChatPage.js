import React, {useContext, useState} from "react";
import UsersContext from "../Contexts/AppContext.js";
import Message from "./Message.js";
import "../Style/message.css";
import {FaPaperPlane} from "react-icons/fa";
import axios from "axios";
import Loading from "./Loading.js";
import sound from "../messageSound.mp3"
import { AiFillContacts } from "react-icons/ai";

//import context
import FormShowContext from "../Contexts/FormShowContext.js";

function ChatPage(props) {

    const [messageState, setMessage] = useState({
        text:"", 
        time:""
    });
    
    const [loading, setLoading] = useState(false);

    const {username, id, contactId} = props.selectedItem;
    const context1 = useContext(FormShowContext);
    function setMessageCall(event)
    {
        let d = new Date()
        setMessage({
            text:event.target.value,
            time: d.toLocaleTimeString()
        });
    }

    function addChatCall(event)
    {
        event.preventDefault();
        if(messageState.text !="")
        {
            setLoading(true);
            const{currentUserId, username} = context1.userFullInfo;    
            let data = {
                text:messageState.text,
                time:messageState.time,
                sent:true,
            }
            let chatId;
            axios.post(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${currentUserId}/contacts/${id}/chats.json`, data)
            .then(response=>{
                console.log(response);
                chatId = response.data.name;
                setLoading(false);           
                axios.get(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${contactId}/contacts.json`)
                .then(response=>{
                    console.log(response.data)
                    const searchResult = isContactExist(response.data, username);
                    if(searchResult != undefined)
                    {
                        axios.post(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${contactId}/contacts/${searchResult[0]}/chats.json`, {...data, sent:false})
                        .then(response=>{
                            console.log(response);
                            deleteTextArea();
                        }).catch(error=>console.log(error))
                    }
                    else{
                        const newContact = {
                            username: username,
                            contactId:currentUserId,
                            chats:[{...data, sent:false,}]
                            //status of message must be changed
                        }
                        axios.post(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${contactId}/contacts.json`, newContact)
                        .then(response=>{
                            console.log(response);
                            deleteTextArea();
                        }).catch(error=>{
                            console.log(error);
                        })
                    }
                });
                data={...data, chatId}
                console.log(data);
                context1.addMessage(data, id);
                // const audio = new Audio("message_sent_1_wav_lr8ezxq5 (1).mp3");
                // console.log(audio);
                const audio = document.getElementById("test");
                audio.play();
                
            }).catch(err=>console.log(err))
            // setMessage({
            //     text:"",
            //     time:""
            // });
        }
    }
    function deleteTextArea(){
        setMessage({
            text:"",
            time:""
        });
    }

    function isContactExist(data, searchUsername)
    {   
        if(data==null) return undefined;
        const foundItem = Object.entries(data).find(item=>{
            if(item[1].username == searchUsername)
                return item 
        });
        return foundItem;
    }

    function ShowContact()
    {
        document.getElementById("mainSection-sidebar").classList="show";
        document.getElementById("mainSection-chatPart").classList="hide";
    }
    
    return(
        <>
            {
                props.selectedItem != undefined?
                <div className="chatPage-container">
                    <div className="chatPage-header d-flex justify-content-between align-items-center">
                    {"To : "+username}
                    <AiFillContacts onClick={ShowContact} title="contact List" className="returnContactListIcon"/>
                    </div>
                <audio className="d-none" controls src={sound} id="test"/>
    
                <div className="chatPage-chatSection">
                    <div className="chatPage-chatSection-message-container">
                    {
                        props.selectedItem.chats.map((item, index)=>{
                            return <Message selectedContact={props.selectedItem} message={item} key={index}/>
                        })        
                    }
                    </div>
                </div>
    
                <div>                   
                    <form id="messageForm" onSubmit={addChatCall}>
                        <textarea placeholder="type message..." value={messageState.text} id="writeMessageArea" onChange={setMessageCall} className="form-control" row="30"></textarea>
                        <div className="d-flex flex-column">
                            {loading?<Loading/>:<></>}
                            <button type="submit" className="btn mt-3 send-icon sendMessageBtn" title="send message">
                                <FaPaperPlane className="text-white fs-4"/>
                            </button>
                        </div>
                    </form>
                </div>
            
            </div>
            :
            <></>
            }
            </>
    )
}

export default ChatPage;