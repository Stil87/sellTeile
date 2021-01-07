import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from "react";
import { firebaseLogin, firebaseLogOut } from "../../utils/firebaseFunctions";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export const MainAppBar = ({ userLoggedIn }: { userLoggedIn: boolean }): JSX.Element => {
  const classes = useStyles()
  let buttonText = 'Login In';
  let headerText = 'Ludolfs'
  // const [buttonText, setbuttonText] = useState('Log In')

  if (userLoggedIn) {
    // setbuttonText('Log out')
    buttonText = 'Log out';
    headerText = 'Wie bei Ludolfs'
    
    
  } else {
    // setbuttonText('Log In')
    buttonText = ''
    headerText = 'Log In'
    
  }

  function logHandler ( ) {
    if (userLoggedIn) {
      firebaseLogOut()
    } 
  }
  return (
    <div>

      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" >
            {headerText}
    </Typography>
          <Button onClick={logHandler} color="inherit">{buttonText}</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}




