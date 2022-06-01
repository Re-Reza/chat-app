import  React,{useEffect} from "react";
import {useNavigate} from "react-router";

function Navigation(props){

    const navigate = useNavigate();
    useEffect(()=>{
        navigate(props.navigation);
    },[])

    return(
        <></>
    )
}

export default Navigation;
