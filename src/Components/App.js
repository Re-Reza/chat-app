import React, {useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.css";

//import Components
import HeadPart from './HeadPart.js';
import MainSection from "./MainSection"

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

          <HeadPart/>
          <MainSection/>  
          
      </UsersContext.Provider>    
  

    </div>
  );
}

export default App;
