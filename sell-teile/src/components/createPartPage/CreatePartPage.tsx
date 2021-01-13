
import { TextField, Fab } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'

import React, { ChangeEvent, useState } from 'react'
import { Part } from '../../utils/types'

import './CreatePartPage.css'

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

  const [part, setpart] = useState({
    title: '',
    model: '',
    description: '',
    pictures: [''],
    status: '',
    date: '',

  })


  const NextButton = () => {
    return (<Fab
      onClick={() => {
        console.log(partTitle)
        setcounter(prevState => prevState + 1)
      }}
      color='primary' >
      <ArrowForward />
    </Fab>)
  }

  function PartTitlePicker() {
    return (
      <form action='submit'>
        {/* <TextField
        value= {part.title}
          onChange={handleChange}
          label='Name des Teils' /> */}
        <label>Title</label>
        <input name='title' onChange={handleChange} />
      </form>
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setpart(prevState => ({ ...prevState, [name]: value }))



  }

  return (

    <div className="create_page_container">
      <div className="collector_container">
        <h3>{part.title}</h3>
      </div>
      <div className="filler_container">



        {counter === 0 ? <div id='part_title_picker' >
          <form >
            <TextField
              name='title'
              onChange={handleChange}
              label='Name des Teils' />
          </form>
        </div>
          : null
        }

      </div>
      <div
        className='fab_next'
      >
        <NextButton />
      </div>
    </div>

  )



}