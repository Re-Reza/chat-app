import React, {useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import Components
import MainSection from "./MainSection";
import AddContact from "./AddContactForm";
import LogInPage from "./LogInPage";
import Loading from "./Loading.js";
import SendParamsToMainSection from "./SendParamsToMainSection.js";
import NotFoundPage from "./404page.js";

//import Reducers
import AppReducer from '../Reducers/AppReducer.js';

//Context
import UsersContext from "../Contexts/AppContext";

import MAIN_URL from './MainUrl';

function App() {

  const [userState, dispatch] = useReducer(AppReducer,{
    users:[]
    }
  )
  let {users} = userState;

  return (
    <div className="App">
      <UsersContext.Provider value={{users, dispatch}}>


        <Router>

          <Routes>
            <Route path={MAIN_URL} element={<LogInPage/>} />
            <Route path={MAIN_URL+"/:singedInId"} element={<SendParamsToMainSection/>} />
            <Route path={MAIN_URL+"/404"} element={<NotFoundPage/>} />
            <Route path="*" element= {<NotFoundPage/>} />
          </Routes>

        </Router>

          
      </UsersContext.Provider>    
  

    </div>
  );
}

export default App;
