import React from "react"

import { Fab } from "@material-ui/core"
import { MainAppBar } from "../Appbar/AppBar"
import AddIcon from '@material-ui/icons/Add'

import StartForm from "../StartForm/StartForm"

import './MainPage.css'
import { useHistory } from "react-router-dom"




export const MainPage = ({ userLoggedIn }: { userLoggedIn: boolean }): JSX.Element => {

  let history = useHistory()
  if (!userLoggedIn) return (<StartForm />)

  return (
    <div id='main_page_container'>
      <MainAppBar userLoggedIn={userLoggedIn} />

      <Fab id='start_form_fab' onClick={() => history.push("Create")}>
        <AddIcon />
      </Fab>


    </div>)

}