import React, {useContext} from "react";
import FormShowContext from "../Contexts/FormShowContext.js";
import Contacts from "./Contacts.js";

function RecentChats(props)
{
    const contacts = useContext(FormShowContext).userFullInfo.contacts;
    const recentContacts = contacts.filter(item=>{
        if(item.chats.length != 0)
        return item
    });

    return(
        <div>
            {
                recentContacts.map((item, index)=><Contacts contact={item} key={index} isRecent={true}/>)
            }   
        </div>
    );
}

export default RecentChats;