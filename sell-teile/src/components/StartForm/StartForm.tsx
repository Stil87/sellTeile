
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../../types'
import { firebaseLogin } from '../../utils/firebaseFunctions'
import { CircularProgress, Button, AppBar, } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { MainAppBar } from '../Appbar/AppBar'




function StartForm(): JSX.Element {

  const [userCredentials, setuserCredentials] = useState<User>({ email: '', password: 0 })
  const [progressBar, setprogressBar] = useState(false)
  const [showAlert, setshowAlert] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')



  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setuserCredentials(prevState => ({ ...prevState, [name]: value }))

  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target

    setuserCredentials(previousState => ({ ...previousState, [name]: value }))

  }

  const handleSubmit = async (event: FormEvent) => {
    setprogressBar(true)
    event.preventDefault();
    console.log(userCredentials)
    await firebaseLogin(userCredentials).then(res => {
      if (res.message) {
        seterrorMessage(res.message)
        setshowAlert(true)
      }
    })
    setprogressBar(false)





  }

  return (

    <div className="start_form_container">

      <MainAppBar userLoggedIn={false} />

      <form action="submit">
        <label htmlFor="email">Email</label>
        <input name='email' type="email" onChange={handleNameChange} />
        <label htmlFor="password">Passwort</label>
        <input name='password' type="text" onChange={handlePasswordChange} />
        <button type="submit" onClick={handleSubmit}>Log in</button>
      </form>

      {progressBar ? <CircularProgress /> : null}

      {showAlert ?
        <Alert onClose={() => setshowAlert(false)}>{errorMessage}</Alert>
        : null
      }
    </div>
  )

}


export default StartForm;