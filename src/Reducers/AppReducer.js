function AppReducer(previousState, action){

    console.log("here")
    console.log(action);
    switch(action.type)
    {
        case "addContact":
            return addContact(previousState, action);

        case "deleteContact":
            return deleteContact(previousState, action);

        case "selectContact":
            return selectContact(previousState, action);

        case "addChat":
            return addChat(previousState, action);
        
        case "deleteMessageCall":
            return deleteMessage(previousState, action);

        default: 
            return{...previousState}
    }

}

function addContact(previousState, action){
    const {name,phoneNumber, gender, imgUrl} = action.payload;
    
    return{
        ...previousState,
        users:[...previousState.users, {name, phoneNumber, gender, imgUrl,
            chats:[{message:"",date:""}], isSelected:previousState.users.length==0 ?true:false}
        ]
    }
}

function deleteContact(previousState, action){
    let {phoneNumber} = action.payload;
    return {
        ...previousState,
        users:previousState.users.filter((item)=> item.phoneNumber != phoneNumber)
    }
}

function selectContact(previousState, action){
    let {phoneNumber} = action.payload;
    //foundContact refers to original object not a copy of it
    let foundContact = previousState.users.find((item)=>{
        if(item.phoneNumber==phoneNumber)
        {
            return item;
        }
    });

    //just make foundItem (selected item) true and the others false 
    previousState.users.forEach((item)=>{
        if(item.phoneNumber != foundContact.phoneNumber)
            item.isSelected=false;
    })
    foundContact.isSelected=true;

    return {...previousState}
}

function addChat(previousState, action)
{
    const {messageText, messageTime} = action.payload;
    let selectedUser = previousState.users.find(user => user.isSelected);
    selectedUser.chats = [...selectedUser.chats, {message:messageText,date:messageTime}];
    console.log(selectedUser);
    return{...previousState}
}

function deleteMessage(previousState, action)
{
    console.log("delete")
    let {messageTime} = action.payload;
    let selectedUser = previousState.users.find(user=> user.isSelected);
    selectedUser.chats = selectedUser.chats.filter(item=> item.date!=messageTime )
    return{
        ...previousState
    }
}

export default AppReducer;
