import React,{useContext, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {FaTrashAlt} from "react-icons/fa";
import UsersContext from "../Contexts/AppContext.js";
import axios from "axios";
import FormShowContext from "../Contexts/FormShowContext.js";
import Loading from "../Components/Loading.js";
import { AiFillMessage } from "react-icons/ai";


//دادن اپشن دسته بندي کردن مخاطبين بر اساس اخرين تماس جنسيت و...
function Contacts(props)
{
    //finding current user 
    const context1 = useContext(FormShowContext);
    const userId  = context1.key;
    const [showLoading, setShowLoading] = useState(false);
    const [windowState,setWindow] = useState(false);
    function deleteContact(){
        setShowLoading(true);
        axios.delete(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${userId}/contacts/${props.contact.id}.json`)
        .then((response)=>{
            const isSelected = props.contact.selected? true:false;
            context1.deleteContact(props.contact.id, isSelected, props.index);
            setShowLoading(false);
        }).catch((error)=>{
            console.log(error)
        });
    }

    function selectContact(){
        console.log(props.contact);
        console.log(userId);
        const {id} = props.contact;
        console.log(id)
        context1.toggleUserSelect(id);
    }
    const chatPart = document.getElementById("mainSection-chatPart");
    const sideBar = document.querySelector("#mainSection-sidebar");    
    function checkWindowSize(){
        if(window.innerWidth<= 680)
        {
            setWindow(true);
        }
        else{
            setWindow(false);
            chatPart.classList = "";
            sideBar.classList = ""
        }
    }
    window.addEventListener("resize", checkWindowSize);
    React.useEffect(()=>{
        checkWindowSize();
    }, []);

    function ShowChat(){
        console.log(chatPart);
        console.log(sideBar);
        chatPart.classList = "show";
        sideBar.classList = "hide";
    }
    

    const chats = props.contact.chats;

    return(
        <div className="contact-mainContainer align-items-center d-flex">
            <div className="contact-container" id={props.contact.selected?"selected-contact":""}>
                <div className="contact-container-row1">
                    <div onClick={selectContact} className="w-100" >   {/*onClick={selectContactCall} */}
                        {/* <span className="me-2"><img id="profile-img"className="img-fluid" src={imgUrl}/></span> */}
                        <span className='contactName'>{props.contact.username}</span>
                    </div>
                    {
                        props.isRecent?<></>:
                        <div onClick={deleteContact}>
                            <span title="delete contact"><FaTrashAlt className="text-danger delete-icon"/></span>
                        </div>
                    }
                    {showLoading?<Loading/>:<></>}
                </div>
            
                {
                    props.isRecent?
                    <div className="recentMessage-container">            
                        <div className="recentMessage-text">{chats[chats.length-1].text}</div>
                        <div className="recentMessage-time" title="last message time">{chats[chats.length-1].time}</div>
                    </div>
                    :<></>
                } 
            </div>
            {
                props.contact.selected && windowState?
                <AiFillMessage onClick={ShowChat} title="chat" className='see-message'/>
                :<></>
            }
        </div>
        
    )
}

export default Contacts;