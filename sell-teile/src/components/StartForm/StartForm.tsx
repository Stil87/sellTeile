
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../../types'
import { firebaseLogin } from '../../utils/firebaseFunctions'
import { CircularProgress } from '@material-ui/core'



function StartForm(): JSX.Element {

  const [userCredentials, setuserCredentials] = useState<User>({ email: '', password: 0 })
  const [progressBar, setprogressBar] = useState(false)




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
    const user = await firebaseLogin(userCredentials)
    setprogressBar(false)





  }

  return (

    <div className="start_form_container">

      {progressBar ? <CircularProgress /> : null}

      <form action="submit">
        <label htmlFor="email">Email</label>
        <input name='email' type="email" onChange={handleNameChange} />
        <label htmlFor="password">Passwort</label>
        <input name='password' type="text" onChange={handlePasswordChange} />
        <button type="submit" onClick={handleSubmit}>Log in</button>
      </form>


    </div>
  )

}


export default StartForm;