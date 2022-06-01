import  React,{useEffect} from "react";
import {useNavigate} from "react-router";

function Navigation(props){

    const navigate = useNavigate();
    console.log(props.navigation);
    console.log("in navigation");
    //reason using useEffect
    useEffect(()=>{
        navigate(props.navigation);
    },[])

    return(
        <></>
    )
}

export default Navigation;
