import React, {useContext} from "react";
import FormShowContext from "../Contexts/FormShowContext.js";
import Contacts from "./Contacts.js";

function RecentChats(props)
{
    console.log("here")
    const contacts = useContext(FormShowContext).userFullInfo.contacts;
    console.log(contacts)
    const recentContacts = contacts.filter(item=>{
        if(item.chats.length != 0)
        return item
    });
    console.log(recentContacts)

    return(
        <div>
            {
                recentContacts.map((item, index)=><Contacts contact={item} key={index} isRecent={true}/>)
            }   
        </div>
    );
}

export default RecentChats;