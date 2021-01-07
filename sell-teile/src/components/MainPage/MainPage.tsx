import { Fab } from "@material-ui/core"
import React from "react"
import { MainAppBar } from "../Appbar/AppBar"
import AddIcon from '@material-ui/icons/Add'
import StartForm from "../StartForm/StartForm"
import './MainPage.css'


export const MainPage = ({ userLoggedIn }: { userLoggedIn: boolean }): JSX.Element => {

  if (!userLoggedIn) return (<StartForm />)

  return (
    <div id='main_page_container'>
      <MainAppBar userLoggedIn={userLoggedIn} />

      <Fab id='start_form_fab'>
        <AddIcon/>
      </Fab>


    </div>)

}