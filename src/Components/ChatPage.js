import React, {useContext, useState} from "react";
import UsersContext from "../Contexts/AppContext.js";
import Message from "./Message.js";
import "../Style/message.css";
import {FaPaperPlane} from "react-icons/fa";

function ChatPage() {

    const [messageState, setMessage] = useState({
        text:"", 
        time:""
    });

    const contactContext = useContext(UsersContext);
    console.log(contactContext)
    const selectedUser = contactContext.users.find(item=> item.isSelected ==true);
    console.log(selectedUser);
    
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
            contactContext.dispatch({
                type:"addChat", 
                payload:{messageText:messageState.text, messageTime:messageState.time}
            });        
            setMessage({
                text:"",
                time:""
            });
        }
    }

    return(
        //وقتی هیچ کانتکتی انتخاب نشده باشه به مشکل میخوره چون ایتمی که انتخاب شده باشه پیدا نمیکنه
        <div className="chatPage-container">
            <div className="chatPage-header d-flex justify-content-start">
                {"To: "+selectedUser.name}
            </div>

            <div className="chatPage-chatSection">
                <div className="chatPage-chatSection-message-container">
                    {
                        selectedUser.chats.map((item, index) =>{
                            //to avoid sending empty messages
                            if(!(item.message==""))
                               return <Message message={item} key={index}/>
                        })
                    }
                </div>

                <div>
                    <form id="messageForm" onSubmit={addChatCall}>
                        <textarea placeholder="type message..." value={messageState.text} id="writeMessageArea" onChange={setMessageCall} className="form-control" row="30"></textarea>
                        <button type="submit" className="btn send-icon sendMessageBtn" title="send message">
                            <FaPaperPlane className="text-white fs-4"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;