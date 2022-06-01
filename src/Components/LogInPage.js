import React from "react";
import axios from "axios";
import {FaEye} from "react-icons/fa"
import {FaEyeSlash} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css"
import "../Style/loginPage.css";
import Loading from "./Loading.js";
import Navigation from "./Navigation";
import MAIN_URL from "./MainUrl";

class LogInPage extends React.Component 
{
    state={
        username:"",
        password:"",
        passwordWarning:false,
        usernameWarning:false,
        showPassword:false,
        register:false,
        loading:false,
        navigate:false,
        logInUser:null
    }

    setPasswordShow(){
        this.setState((previousState)=>{
            return {
                showPassword: !previousState.showPassword
            }
        })
    }

    checkEnteredData(passWarn, usernameWarn, event){
        event.preventDefault();
        if(!passWarn && !usernameWarn)
        {
            this.setState({
                loading:true
            })
            if(this.state.register) //if user wants to register
            {
                const newUser = {
                    username:this.state.username,
                    password:this.state.password
                }
                axios.post("https://chat-app-373ad-default-rtdb.firebaseio.com/users.json", newUser)
                .then((response)=>{
                    this.setState({
                        loading:false
                    });
                    document.querySelector("#register-status").textContent="registration was successful, please sing in to created account"
                }, (err)=>console(err))
            }
            else{
                axios.get("https://chat-app-373ad-default-rtdb.firebaseio.com/users.json")
                .then((response)=>{
                    this.setState({
                        loading:false
                    });
                    this.check(response.data);
                }).catch((error)=>{console.log(error);})
            }
        }

        this.setState({
            passwordWarning:passWarn,
            usernameWarning:usernameWarn,
        });
    }

    check(data){
        let foundItem = Object.entries(data).find(item=>{
            if(item[1].username == this.state.username)
            {
                return item;
            }
        });
        if(foundItem == undefined)
        {
            alert("Entered username does not exist.");
        }
        else{
            const commandAfterCheckingPassWord = foundItem[1].password != this.state.password ? 
            alert("password is incorrect"):
            this.setState({
                logInUser:MAIN_URL+"/"+foundItem[0],
                navigate:true
            });
            // window.location.assign(`/${foundItem[0]}`);
            eval(commandAfterCheckingPassWord); //operate assign command in above conditional operator
        }
    }

    usernameSetter(event){
        this.setState({
            username:event.target.value
        })
    } 

    passwordSetter(event){ 
        this.setState({
            password:event.target.value
        });
    }

    changeRegisterStatus(){
        this.setState((previousState)=>{
            return{
                register: !(previousState.register)
            }
        })
    }
    
    render() {
        const passWarn = this.state.password == "" ? true : false;
        const usernameWarn = this.state.username == "" ? true : false;

        return(
            <div className="main d-flex justify-content-center align-items-center">
                {this.state.navigate?<Navigation navigation={this.state.logInUser}/>:<></>}
                <div className="main-container">
                    <h1>{this.state.register?"Register" : "Sign in"}</h1>
                    <span className="text-success" id="register-status"></span>
                    <form onSubmit={this.checkEnteredData.bind(this, passWarn, usernameWarn)} id="loginForm">
                        <div className="text-start">
                            <input value={this.state.username} onChange={this.usernameSetter.bind(this)} type="text" placeholder="Enter username" className="form-control mb-2"/>
                            {this.state.usernameWarning?<span className="text-danger">please enter your username</span>:<></>}
                            <div className="input-group flex-nowrap mb-2">
                                <input value={this.state.password} onChange={this.passwordSetter.bind(this)} type={this.state.showPassword?"text":"password"} className="form-control" placeholder="Enter password"/>
                                <span onClick={this.setPasswordShow.bind(this)} className="input-group-text show-password" title={this.state.showPassword?"hide password":"show password"}>{this.state.showPassword?<FaEyeSlash/>:<FaEye/>}</span>
                            </div>
                            
                            {this.state.passwordWarning?<span className="text-danger">please enter your password</span>:<></>}
                        </div>
                        <div className="loader-container mt-5">
                            <button type="submit" className="btn submitBtn ">{this.state.register?"register":"sign in"}</button>
                            {this.state.loading ? <Loading/> : <></>}
                        </div>
                    </form>
    
                    <div>
                        <span onClick={this.changeRegisterStatus.bind(this)} className="text-muted register">{this.state.register?"Do you have account? (Sing in)":"register now"}</span>
                    </div>
                </div>  
            </div>
        )
    }
}

export default LogInPage;