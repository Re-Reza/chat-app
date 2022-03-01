import React from "react";

const UsersContext = React.createContext({
    users:[],
    dispatch:()=>{}
});

export default UsersContext;