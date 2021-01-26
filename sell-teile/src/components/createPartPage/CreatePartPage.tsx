
import { TextField, Fab, Button } from '@material-ui/core'
import { ArrowBack, ArrowForward, } from '@material-ui/icons'
import SendIcon from '@material-ui/icons/Send';

import React, { ChangeEvent, useEffect, useState } from 'react'
import { createNextPartId, deleteImage, getLastPartId, getNewPartCollectionDocID, imagesRef, resizeImage, saveNewPart } from '../../utils/firebaseFunctions'
import { Part, PartImage } from '../../utils/types'
import { PartCard } from '../PartCard/PartCard'



import './CreatePartPage.css'

export const CreatePartPage = (): JSX.Element => {

  const [imgCounter, setImgCounter] = useState(0)

  const [counter, setcounter] = useState(0)

  const [part, setpart] = useState<Part>({
    id: 1,
    firebaseId: '',
    title: '',
    model: '',
    description: '',
    pictures: [],
    status: '',
    date: '',
    onEbaySince: 'in Datenbank hochgeladen',
    preis: 0

  })

  useEffect(() => {
    async function getFirebaseId() {
      const firebaseId = await getNewPartCollectionDocID()

      const lastPartId = await getLastPartId();
      const nextPartId = await createNextPartId(lastPartId, firebaseId)
      setpart(prev => ({ ...prev, id: nextPartId, firebaseId }))
    }




    getFirebaseId()
    return () => {
    }
  }, [])

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

  const uploadToFirebase = async (resizedImg: File) => {
    const partImage: PartImage = { url: '', id: imgCounter.toString() }
    console.log('partImage', partImage)
    const uploadTask = imagesRef.child(`${part.firebaseId}/${partImage.id}`).put(resizedImg)

    uploadTask.on("state_changed",
      snapshot => console.log('snapshot', snapshot),
      error => { console.log('error', error) },
      async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL()
        partImage.url = url
        setpart(prev => ({ ...prev, pictures: [partImage, ...prev.pictures] }))
        setImgCounter(prev => prev + 1)
      }
    )
  }

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const { files } = target
    if (files) {
      const file = files[0];
      console.log('file', file)

      const resizedImg = await resizeImage(file)
      uploadToFirebase(resizedImg)
    }
  }

  function handleDelete(partImg: PartImage, key: number) {
    console.log('partImage: ', partImg)

    deleteImage(partImg, part.firebaseId)

    deleteImageFromState(partImg)


  }

  const deleteImageFromState = (partImg: PartImage) => {
    const updated: PartImage[] = part.pictures.filter((partImage) => partImage.url !== partImg.url);
    setpart(prev => ({ ...prev, pictures: updated }))

  }
  /*
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
 */

  const elements = (<h2>{counter}</h2>)
  return (

    <div className="create_page_container">
      <div className="collector_container">
        <h2>{imgCounter}</h2>
        <h2>{counter}</h2>
        {elements}
        {/*   {/* add a Part card here  }
        <h3>{part.title}</h3>
        <h3>{part.model}</h3>
        <h3>{part.description}</h3>
        {part.pictures.map(image => {
          return (<ul>
            <img key={image} src={image} alt="" style={{ height: 40 }} />
          </ul>)
        })} */}

        <PartCard part={part} handleDelete={handleDelete} />
      </div>
      <div className="filler_container">
        {counter === 0 && <div id='part_title_picker' >
          <form >
            <TextField
              name='title'
              onChange={handleChange}
              label='Name des Teils' />
          </form>
        </div>

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
          <form >
            <TextField
              type='float'

              multiline
              name='preis'
              onChange={handleChange}
              label='Preis' />
          </form> : null}

        {counter === 4 ?
          <div className="image_picker_container">
            <input className='image_picker' type='file' accept="image/*" capture="environment" onChange={handleImage} />
          </div>
          : null}

        {counter === 5 && <Button onClick={() => saveNewPart(part)}>
          <SendIcon></SendIcon>
        </Button>}
      </div>
      {counter <= 4 ? <div className='fab_next'>
        <NextButton />
      </div> : null}
      <div className='fab_previous'>

        {counter > 0 ? <PreviousButton /> : null}
      </div>
    </div>

  )



}