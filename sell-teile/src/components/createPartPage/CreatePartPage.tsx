
import { TextField , Fab} from '@material-ui/core'
import {ArrowForward} from '@material-ui/icons'

import React, { useState } from 'react'

export const CreatePartPage = (): JSX.Element => {

  const [partId, setpartId] = useState(0)
  const [partFirebaseId, setpartFirebaseId] = useState('')
  const [partTitle, setpartTitle] = useState('')
  const [partModel, setpartModel] = useState('')
  const [partDesc, setpartDesc] = useState('')
  const [partPic, setpartPic] = useState([''])
  const [partStatus, setpartStatus] = useState('')
  const [partDate, setpartDate] = useState('')
  const [partOnEbaySince, setpartOnEbaySince] = useState('')

  const [counter, setcounter] = useState(0)

  const NextButton = () => {
    return (<Fab
      onClick={() => {
        console.log(counter)
        setcounter(prevState => prevState+1)
      }}
      color='primary' >
      <ArrowForward/>
    </Fab>)
  }

  const PartTitlePicker = () => {
    return (
      <form>
        <TextField
          onChange={(e) => console.log(e.target.value)}
          label='Name des Teils' />
      </form>
    )
  }

  return (

    <div className="create_page_container">
      <div className="collector_container">
        <h3>{partTitle}</h3>
      </div>
      <div className="filler_container">

        {counter === 0 ? <PartTitlePicker /> : null}
        <NextButton />


      </div>
    </div>

  )



}