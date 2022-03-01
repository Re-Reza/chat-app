import React from 'react';
import {FaPlusCircle} from "react-icons/fa";

function FormShowComponent(props){
    
    let {toggleFormStatus} = props;

    return(
        <button onClick={toggleFormStatus} className="btn add-icon p-0 ">
            <span className="text-primary">add contact</span>
            <FaPlusCircle className="text-primary ms-1 fs-4"/>
        </button>            
    )
}

export default FormShowComponent;