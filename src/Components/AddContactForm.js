import React, { Component} from 'react';
import UsersContext from "../Contexts/AppContext.js";
import "bootstrap/dist/css/bootstrap.css";
import "../Style/AddCotactForm.css";
import FormShowComponent from "./FormShowComponent.js";
import {FaTimes} from "react-icons/fa";
import FormShowContext from "../Contexts/FormShowContext.js";
import axios from 'axios';
import Loading from "./Loading.js";
import AddContactContext from '../Contexts/AddContactContext.js';

class AddContact extends Component {

    constructor(props) {
        super(props);
    }

    state={
        nameInput:"", 
        phoneNumberInput:"",
        gender:"male", 
        imgUrl:"",
        phoneInputWarning:false, 
        nameInputWarning:false,
        loading:false,
    }
    static contextType = AddContactContext;


    changeNameInput(event){
        this.setState({
            nameInput:event.target.value
        });
    }
    changePhoneNumberInput(event){
        this.setState({
            phoneNumberInput:event.target.value
        });
    }   
    changeGenderInput(event){
        this.setState({
            gender:event.target.value
        });
    }   

    changeFileInput(event){
        document.querySelector("#inputFileStatus").textContent=event.target.value
        const url=URL.createObjectURL(event.target.files[0]);
        this.setState({
            imgUrl : url
        });
        console.log(url);
    }

    //last parameter is event as default
    addUserCall( nameInputWarning, event){
        event.preventDefault();
        //try to optimize
        if(nameInputWarning==false)
        {   
            this.setState({
                loading:true
            });
            axios.get("https://chat-app-373ad-default-rtdb.firebaseio.com/users.json")
            .then(response=>{
                const contact = this.checkContact(response.data)
                this.setState({
                    loading:false
                });

                if(contact != undefined)
                {
                    const {username} = contact[1];
                    console.log(username);
                    axios.post(`https://chat-app-373ad-default-rtdb.firebaseio.com/users/${this.context.id}/contacts.json`, {username, contactId:contact[0] ,chats:[] })
                    .then(response=>{
                        console.log(response.data);
                        const selected = this.context.contacts.length==0 ? true : false;  
                        this.context.setContacts({username:username, contactId:contact[0] ,id:response.data.name, selected , chats:[] })
                    })
                    .catch(err=>console.log(err))
                    document.querySelector(".form-warning").textContent="";
                    console.log("test")
                }
                else{
                    console.log(document.querySelectorAll(".form-warning"))
                    document.querySelectorAll(".form-warning").forEach((item)=>item.textContent="Entered username doesn't exist or it isn't valid!")
                }
                

            }).catch(err=>{
                console.log(err);
            });
        }

        this.setState({ 
            nameInputWarning:nameInputWarning
        });
    }
    
    checkContact(data) {
        const contactExist = Object.entries(data).find((item)=>{
            if(item[1].username == this.state.nameInput && item[1].username != this.context.name )   
                return item;
        });

        return contactExist;
    }

    render() {
        // console.log(this.props)
        const phoneNumberWarning = this.state.phoneNumberInput == "" ? true : false;
        const nameInputWarning = this.state.nameInput == "" ? true : false;
        
        return(
            <FormShowContext.Consumer>
                {
                    (context)=>            
                        <div title="add contact">
                        {
                            context.showForm?
                            <div className="addContactFromContainer">
                                <form action="#" className="addContactFrom" onSubmit={this.addUserCall.bind(this,nameInputWarning)}>
                                    
                                    <FaTimes onClick={context.toggleFormStatus} className="exit-icon"/>
                                    
                                    <div className="input-container">
                                        <label htmlFor="name-input mb-3" className="form-label">user name:</label>
                                        <input type="text" value={this.state.nameInput} onChange={this.changeNameInput.bind(this)} className="form-control" id="name-input"/>
                                        {this.state.nameInputWarning?<span className="text-danger mt-1 warning-text">please fill contact name input!</span>:<></>}
                                    </div>
        
                                    {/* <div className="input-container">
                                        <label className="mb-3" htmlFor="phoneNumber-input">phone number:</label>
                                        <input type="number" value={this.state.phoneNumberInput} onChange={this.changePhoneNumberInput.bind(this)} className="form-control" id="phoneNumber-input"/>    
                                        {this.state.phoneInputWarning?<span className="text-danger mt-2 warning-text">please fill phone number input!</span>:<></>}
                                    </div> */}
                                    
                                    {/* <div className="mt-4 d-flex align-items-center justify-content-between">
                                        <span id="inputFileStatus" className="ms-2">no file</span>
                                         <label className="btn btn-primary" htmlFor="fileInput">upload contact img</label>
                                        <input  onChange={this.changeFileInput.bind(this)} id="fileInput" type="file" className=""/>
                                    </div> */}
        
                                    {/* <select id="select-part" defaultValue={"male"} onChange={this.changeGenderInput.bind(this)} className="form-select">
                                        <option value="male">male</option>
                                        <option value="female" >female</option>
                                    </select> */} 
                                    <p className="form-warning text-danger mt-3"></p>
                                    <div className="mt-4 addContactForm-loaderContainer">
                                        <button className="btn btn-success " type="submit">add</button>
                                        {this.state.loading ? <Loading/> : <></>}
                                    </div>
                                </form>
                            </div>
                            :
                            <></>
                        }
                    </div>
                }
            </FormShowContext.Consumer>
        )
    }
}

export default AddContact;


