import { Url } from "url"
import { User } from "../types"
import fire from "./firebaseConfig"

//create firebase storage reference for images
const storage = fire.storage()
const storageRef = storage.ref()
const imagesRef = storageRef.child('images/image')


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


export const firebaseUploadImage =async  (img: File) => {
  // compress img function here


  const uploadTask = imagesRef.put(img)
 
  return uploadTask.on("state_changed",
  snapshot => console.log('snapshot' ,snapshot),

  error=> {console.log('error',error)}
  
  
  ,async () => {
    const url = await uploadTask.snapshot.ref.getDownloadURL()
    console.log('url', url)
    return url
  }

  )
}

