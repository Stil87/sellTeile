
import { TextField, Fab } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'

import React, { ChangeEvent, useState } from 'react'
import { firebaseUploadImage } from '../../utils/firebaseFunctions'
import { Part } from '../../utils/types'

import './CreatePartPage.css'

export const CreatePartPage = (): JSX.Element => {

  const [counter, setcounter] = useState(0)

  const [part, setpart] = useState<Part>({
    id: undefined,
    firebaseId: undefined,
    title: '',
    model: '',
    description: '',
    pictures: [''],
    status: '',
    date: '',
    onEbaySince: undefined

  })







  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setpart((prevState) => ({ ...prevState, [name]: value }))
  }
  const NextButton = () => {
    return (<Fab
      onClick={() => {
        setcounter(prevState => prevState + 1)
      }}
      color='primary' >
      <ArrowForward />
    </Fab>)
  }

  const PreviousButton = () => {
    return (<Fab
      onClick={() => {
        setcounter(prevState => prevState - 1)
      }}
      color='primary' >
      <ArrowBack />
    </Fab>)
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const {target} = event
    const {files} = target
    if(files) {
      const file = files[0];
      console.log(file)
      firebaseUploadImage(file)
    }


  }

  return (

    <div className="create_page_container">
      <div className="collector_container">
        {/* add a Part card here  */}
        <h3>{part.title}</h3>
        <h3>{part.model}</h3>
        <h3>{part.description}</h3>
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


        {counter === 1 ? <div id='part_title_picker' >
          <form >
            <TextField
              multiline
              name='model'
              onChange={handleChange}
              label='Baureihe' />
          </form>
        </div>
          : null
        }


        {counter === 2 ? <div id='part_title_picker' >
          <form >
            <TextField

              multiline
              name='description'
              onChange={handleChange}
              label='Beschreibung' />
          </form>
        </div>
          : null
        }

        {counter === 3 ?
        <div className="image_picker_container">
          <input type='file' accept="image/*" capture= "environment"  onChange={handleImage}/> 
          <input type='file' accept="image/*" capture= "environment"  onChange={handleImage}/> 
        </div>
          : null}
      </div>
      <div className='fab_next'>
        <NextButton />
      </div>
      <div className='fab_previous'>

        {counter > 0 ? <PreviousButton /> : null}
      </div>
    </div>

  )



}