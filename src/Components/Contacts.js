import React,{useContext} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {FaTrashAlt} from "react-icons/fa";
import UsersContext from "../Contexts/AppContext.js";

//دادن اپشن دسته بندي کردن مخاطبين بر اساس اخرين تماس جنسيت و...
function Contacts(props)
{
    const appContext = useContext(UsersContext);
    const {name, imgUrl, phoneNumber} = props.contact;

    function deleteContactCall(){
        console.log(phoneNumber)
        appContext.dispatch({type:'deleteContact', payload:{phoneNumber}})
    }

    function selectContactCall(event)
    {
        appContext.dispatch({type:"selectContact", payload:{phoneNumber}})
    }

    React.useEffect(()=>{
        return()=>{
            //save what contact has been deleted
            console.log("component will unmount");
        }
    },[])

    return(
        <div className="contact-container" id={props.contact.isSelected?"selected-contact":""}>
            <div className="w-100" onClick={selectContactCall}>
                <span className="me-2"><img id="profile-img"className="img-fluid" src={imgUrl}/></span>
                <span className='contactName'>{name}</span>
            </div>
            <div>
                <span onClick={deleteContactCall} title="delete contact"><FaTrashAlt className="text-danger delete-icon"/></span>
            </div>
        </div>
    )
}

export default Contacts;