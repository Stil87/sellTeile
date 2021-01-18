import { User } from "../types"
import fire from "./firebaseConfig"
import imageCompression from 'browser-image-compression';

//create firebase storage reference for images
const storage = fire.storage()
const storageRef = storage.ref()
export const imagesRef = storageRef.child('images/')

export const db = fire.firestore()


export const firebaseSignUp = async (user: User) => {
  fire.auth().createUserWithEmailAndPassword(user.email, user.password.toString())
    .then((user) => user)
    .catch(err => console.log(err))
}


export const firebaseLogin = async (user: User) => {
  return fire.auth().signInWithEmailAndPassword(user.email, user.password.toString())
    .then(user => {
      console.log('fb functtions user', user)
      console.log('fb functtions currentuser', fire.auth().currentUser)

      return user
    })
    .catch(err => err)

}

export const firebaseLogOut = async () => {
  await fire.auth().signOut()
    .then(res => console.log('resulst log out ', res))
    .catch(err => console.log(err))
}

export const resizeImage = async (img: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  }

  return await imageCompression(img, options)


}

export const getNewPartCollectionDocID =async() => {
  const ref = db.collection('Parts').doc()
  return ref.id
}






