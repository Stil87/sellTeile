import React, { useEffect, useState } from 'react';
import './App.css';
import { MainPage } from './components/MainPage/MainPage';
import fire from './utils/firebaseConfig';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CreatePartPage } from './components/createPartPage/CreatePartPage';






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

<Router>
  <Switch>
    <Route exact path={"/"}>
      <MainPage userLoggedIn={userLoggedIn} />
    </Route>
    <Route  path={"/Create"} component={CreatePartPage} />
  </Switch>
</Router>



    </div>
  );
}

export default App;
