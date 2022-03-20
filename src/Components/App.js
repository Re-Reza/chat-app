import React, {useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import Components
import MainSection from "./MainSection"
import AddContact from "./AddContactForm";

//import Reducers
import AppReducer from '../Reducers/AppReducer.js';

//Context
import UsersContext from "../Contexts/AppContext";

function App() {

  const [userState, dispatch] = useReducer(AppReducer,{
    users:[]
    }
  )
  let {users} = userState;

  console.log(users);

  // React.useEffect(()=>{
  //   dispatch();
  // },[])

  return (
    <div className="App">
      <UsersContext.Provider value={{users, dispatch}}>

        <Router>
          <Routes>
            <Route path="/" element={<AddContact/>} />
          </Routes>
        </Router>

          
      </UsersContext.Provider>    
  

    </div>
  );
}

export default App;
