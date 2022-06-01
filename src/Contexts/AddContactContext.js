import React from "react";

const AddContactContext = React.createContext({
    name:null,
    id:null,
    setContacts: ()=>{},
});

export default AddContactContext;