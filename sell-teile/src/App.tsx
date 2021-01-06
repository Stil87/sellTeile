import React, { useEffect, useState } from 'react';
import './App.css';
import { MainPage } from './components/MainPage/MainPage';
import StartForm from './components/StartForm/StartForm';
import fire from './utils/firebaseConfig';







function App() {


  const [userLoggedIn, setUserLoggedIn] = useState(false)

  function userloggedInHandler(isloggedIn: boolean): void {
    if (isloggedIn) {
      console.log('user is logged in')
      setUserLoggedIn(true)
    } else {
      setUserLoggedIn(false)
      console.log('user is logged out')
    }
  }




  return (
    <div className="App">

      <p>Hello</p>


      {userLoggedIn
       ? <MainPage /> 
       : <StartForm handler={userloggedInHandler} />}

    </div>
  );
}

export default App;
