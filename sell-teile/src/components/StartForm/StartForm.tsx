
import React, { useState } from 'react'
import Modal from 'react-modal'

function signUp ()  {




}

function SignIn () {

}

function StartForm () {

  const [modalIsOpen, setmodalIsOpen] = useState(false)

  return (

    <div className="start_form_container">
      <div className="start_form_button_container">
        <button className="sign_in_button">Log In</button>
        <Modal
        isOpen= {modalIsOpen}
        ></Modal>
      </div>
    </div>
  )

}


export default StartForm;