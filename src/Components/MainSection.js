import React, {Component} from 'react';
import "../Style/MainSection.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {BrowserRouter , Routes, Route} from "react-router-dom";

//import Components
import ContactSideBar from "./ContactSideBar";
import {FaPlusCircle} from "react-icons/fa"; 
import ChatPage from './ChatPage';
import HeadPart from './HeadPart.js';
import NotFoundPage from "./404page.js";
import Loading from "./Loading.js";

//import Contexts
import UsersContext from "../Contexts/AppContext.js";
import FormShowContext from "../Contexts/FormShowContext.js";
import AddContact from './AddContactForm.js';
import AddContactContext from "../Contexts/AddContactContext.js";

class MainSection extends Component {

    static contextType = UsersContext;

    state={
        showForm:false,
        username:"",
        currentUserId:"",
        // contacts:[ {username:"",contactId:"" ,id:"", selected:false ,chats:[] } ],
        contacts:[],
        loadingChatPage:true,
    };

    toggleFormStatus(){
        this.setState((previousState)=>{
            return{
                showForm : !(previousState.showForm)
            }
        });
    }

    componentDidMount(){
        console.log(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${this.props.params.singedInId}.json`);
        axios.get(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${this.props.params.singedInId}.json`)
        .then((response)=>{ 
            const contacts = response.data.contacts
            // let contacts1 = Object.entries(response.data.contacts) //null was sent as argument so it doesn't work, just accepts objects 
            const promise = new Promise((resolve, reject)=>{
                this.setState((previousState)=>{
                    resolve();
                    return{
                        username:response.data.username,
                        currentUserId:this.props.params.singedInId,
                        contacts:contacts != undefined?Object.entries(contacts).map((item, index)=>{
                            let selectDefault = index==0? true: false;
                            return {
                                id:item[0], 
                                username:item[1].username,
                                selected:selectDefault,
                                contactId:item[1].contactId,
                                chats: item[1].chats != undefined ? 
                                Object.entries(item[1].chats).map((item)=>{
                                    console.log(item)
                                    return{
                                        text:item[1].text,          
                                        chatId:item[0],
                                        sent:item[1].sent,
                                        time:item[1].time,
                                    }
                                })
                                :[] 
                            }
                        }):[]
                    }
                });
                
            });
            promise.then(()=>{
                console.log("in resolve")
                this.setState({
                    loadingChatPage:false
                });
            })

        }).catch(err=>console.log(err))
    
    }

    setContacts(data){
        this.setState((previousState)=>{
            return{
                contacts:[...previousState.contacts, data]
            }
        })
    }

    deleteContact(contactId, isSelected, index){
        console.log(contactId, isSelected);

        //to check if selected item is going to remove
        if(isSelected && this.state.contacts.length>1)
        {
            this.setState((previousState)=>{
                const itemIndex = (index+1)%this.state.contacts.length;
                console.log(itemIndex);
                let foundItem = previousState.contacts[itemIndex];
                foundItem.selected = true
                return{
                    ...previousState
                }
            })
        }
    
        this.setState((previousState)=>{
            return{
                contacts : previousState.contacts.filter(item=>{
                    if(item.id != contactId)
                    {
                        return item
                    }
                })

            }
        });

    }

    toggleUserSelect(contactId){
        console.log("in toggle");
        console.log(contactId);
        this.setState((previousState)=>{
            console.log("in setState");
            let foundItem = previousState.contacts.find((item)=>{
                console.log("here");
                if(item.id == contactId)
                    return item; 
            });
            console.log(foundItem);
            //doesn't work by temp assignment
            // let temp = foundItem.selected?false:true;
            foundItem.selected = true;
            previousState.contacts.forEach((item)=>{
                if(item.id != contactId)
                    item.selected = false;
            })
            return{
                ...previousState
            } 
        });
    }

    addMessage(messageObj, contactId){
        this.setState((previousState)=>{
            previousState.contacts.forEach((item)=>{
                if(item.id == contactId)
                {
                    item.chats.push(messageObj)
                    const set = new Set(item.chats);
                    item.chats = [...set] 
                    console.log(item.chats); 
                }
            });

            return{
                ...previousState
            }
        });
    }

    deleteMessage(contactId, idOfChat)
    {
        this.setState((previousState)=>{
            const foundItem = previousState.contacts.find(item=>item.id==contactId)
            console.log(foundItem.chats)
            foundItem.chats = foundItem.chats.filter(item=>item.chatId != idOfChat)
            return{
                ...previousState
            }
        })
    }

    render() {
        const {users} = this.context;
        console.log(this.props.params.singedInId);
        return(
            
            <FormShowContext.Provider value={{
                addMessage:this.addMessage.bind(this),
                toggleUserSelect:this.toggleUserSelect.bind(this),
                deleteContact:this.deleteContact.bind(this), 
                userFullInfo:this.state, 
                showForm:this.state.showForm, 
                username:this.state.username,
                key:this.props.params.singedInId,
                toggleFormStatus: this.toggleFormStatus.bind(this),
                deleteMessage:this.deleteMessage.bind(this)
            }}>
                <HeadPart/>

                <div className="mainSection-container">
                
                    {/*side bar for contacts*/}
                    <div id="mainSection-sidebar">
                        <ContactSideBar/>
                        {
                            this.state.showForm?
                            <div className="addContactMobile">
                                <AddContact />
                            </div>
                            :<></>
                        }
                    </div>
                   
                    {/*chat part of main section*/}
                    <AddContactContext.Provider value={{
                        setContacts:this.setContacts.bind(this),
                        id:this.props.params.singedInId,
                        name: this.state.username,
                        contacts:this.state.contacts
                    }}> 
                      
                        <div id="mainSection-chatPart">                        
                        {
                            this.state.showForm?
                            <div className="addContactDesktop">
                                <AddContact/>
                            </div>
                            :<></>
                        }
                        {  
                            this.state.loadingChatPage?<Loading/>
                            :
                            <>
                            {
                                this.state.contacts !=0?<ChatPage selectedItem={this.state.contacts.find(item=>item.selected)}/>
                                :<div className="fs-4 text-primary addContact" onClick={this.toggleFormStatus.bind(this)}>
                                    <span>please add contact</span>
                                    <FaPlusCircle className="text-primary ms-2 fs-4"/>
                                </div>
                            }
                            </>     
                        }
                        </div>
                    </AddContactContext.Provider>

                </div>

            </FormShowContext.Provider>
        )
    }
}

export default MainSection;