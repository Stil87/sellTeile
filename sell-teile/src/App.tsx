import React, { useEffect, useState } from 'react';
import './App.css';
import { MainPage } from './components/MainPage/MainPage';
import StartForm from './components/StartForm/StartForm';
import fire from './utils/firebaseConfig';







function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    
   const unsubscribe =  fire.auth().onAuthStateChanged(user => {
      if (user) { setUserLoggedIn(true) }
      else { setUserLoggedIn(false) }
    })
    return () => {
      unsubscribe()
      
    }
  }, [])





  return (
    <div className="App">



      <MainPage userLoggedIn={userLoggedIn} />

    </div>
  );
}

export default App;
