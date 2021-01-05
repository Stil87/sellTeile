
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { User } from '../../types'



function StartForm() {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [userCredentials, setuserCredentials] = useState<User>({ name: '', password: 0 })

  const closeModal = () => {
    setModalIsOpen(false)
  }


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setuserCredentials(prevState => ({ ...prevState, [name]: value }))

  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target

    setuserCredentials(previousState => ({ ...previousState, [name]: value }))

  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(userCredentials)
  


  }

  return (

    <div className="start_form_container">
      <div className="start_form_button_container">
        <button
          onClick={() => setModalIsOpen(true)}
          className="sign_in_button">Log In
         </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel={'Login Daten eingeben!'}
        >
          <form action="submit">
            <label htmlFor="benutzer_name">Benutzer Name</label>
            <input name='name' type="text" onChange={handleNameChange} />
            <label htmlFor="password">Passwort</label>
            <input name='password' type="text" onChange={handlePasswordChange} />
            <button type="submit" onClick={handleSubmit}>Log in</button>
          </form>

        </Modal>
      </div>
    </div>
  )

}


export default StartForm;