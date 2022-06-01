import React from "react";
import {AiOutlineWarning} from "react-icons/ai"
import "../Style/notfoundPage.css";

function NotFoundPage() {

    return(
        <div style={{fontSize:"5em", animation:"warning 1.5s linear alternate infinite"}} className="text-danger d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <AiOutlineWarning />
            <div className="h2">404</div>
            <div className="h2">Not found</div>
        </div>
    );
}

export default NotFoundPage;