import React from 'react';
import MainSection from "./MainSection.js"
import {useParams} from "react-router-dom";

function SendParamsToMainSection(){

    const params = useParams();

    return(
        <MainSection params={params}/>
    )
}

export default SendParamsToMainSection;