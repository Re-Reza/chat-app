import React, { Component} from 'react';
import UsersContext from "../Contexts/AppContext.js";
import "bootstrap/dist/css/bootstrap.css";
import "../Style/AddCotactForm.css";
import FormShowComponent from "./FormShowComponent.js";
import {FaTimes} from "react-icons/fa";
import FormShowContext from "../Contexts/FormShowContext.js";

class AddContact extends Component {

    constructor(props) {
        super(props);
    }

    state={nameInput:"", phoneNumberInput:"", gender:"male", imgUrl:"",
        phoneInputWarning:false, nameInputWarning:false
    }
    static contextType = UsersContext;


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
    addUserCall(phoneInputWarning, nameInputWarning, event){
        event.preventDefault();
        //try to optimzie 
        if(phoneInputWarning==false && nameInputWarning==false)
        {   
            const {nameInput, phoneNumberInput, gender, imgUrl} = this.state;
            this.context.dispatch({type:"addContact",payload:{name:nameInput,
                phoneNumber:phoneNumberInput, gender, imgUrl 
            }});
            
            this.setState({nameInput:"", phoneNumberInput:"", gender:"male", imgUrl:"",
                phoneNumberInput:phoneInputWarning, nameInputWarning:nameInputWarning
            });
            return;
        }

        this.setState({ 
            phoneInputWarning:phoneInputWarning, nameInputWarning:nameInputWarning
        });
    }

    render() {
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
                                <form action="#" id="addContactFrom" onSubmit={this.addUserCall.bind(this,phoneNumberWarning,nameInputWarning)}>
                                    
                                    <FaTimes onClick={context.toggleFormStatus} className="exit-icon"/>
                                    
                                    <div className="input-container">
                                        <label htmlFor="name-input mb-3" className="form-label">name:</label>
                                        <input type="text" value={this.state.nameInput} onChange={this.changeNameInput.bind(this)} className="form-control" id="name-input"/>
                                        {this.state.nameInputWarning?<span className="text-danger mt-1 fs-6">please fill contact name input!</span>:<></>}
                                    </div>
        
                                    <div className="input-container">
                                        <label className="mb-3" htmlFor="phoneNumber-input">phone number:</label>
                                        <input type="number" value={this.state.phoneNumberInput} onChange={this.changePhoneNumberInput.bind(this)} className="form-control" id="phoneNumber-input"/>    
                                        {this.state.phoneInputWarning?<span className="text-danger mt-2 fs-6">please fill phone number input!</span>:<></>}
                                    </div>
                                    
                                    <div className="mt-4 d-flex align-items-center justify-content-between">
                                        <span id="inputFileStatus" className="ms-2">no file</span>
                                        <label className="btn btn-primary" htmlFor="fileInput">upload contact img</label>
                                        <input  onChange={this.changeFileInput.bind(this)} id="fileInput" type="file" className=""/>
                                    </div>
        
                                    <select id="select-part" defaultValue={"male"} onChange={this.changeGenderInput.bind(this)} className="form-select">
                                        <option value="male">male</option>
                                        <option value="female" >female</option>
                                    </select>
                                    <button className="btn btn-success mt-4" type="submit">add</button>
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


