
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../../types'
import { firebaseLogin } from '../../utils/firebaseFunctions'



function StartForm({handler}:any):JSX.Element {

  const [userCredentials, setuserCredentials] = useState<User>({ email: '', password: 0 })

 


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setuserCredentials(prevState => ({ ...prevState, [name]: value }))

  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target

    setuserCredentials(previousState => ({ ...previousState, [name]: value }))

  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(userCredentials)
    const user = await firebaseLogin(userCredentials)
    if(user) {
      handler(true)
    }
   



  }

  return (

    <div className="start_form_container">
      
       
       
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