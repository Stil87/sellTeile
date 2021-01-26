import { User } from "../types"
import fire from "./firebaseConfig"
import imageCompression from 'browser-image-compression';
import { Part, PartImage } from "./types";
import { Timestamp } from "@firebase/firestore-types";

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

export const deleteImage = (partImage: PartImage, firebaseId: string) => {

  // Delete the file
  imagesRef
    .child(`${firebaseId}/${partImage.id}`)
    .delete()
    .then(function (e) {
      console.log('succesful deleted', e)
      // File deleted successfully
    }).catch(function (error) {
      // Uh-oh, an error occurred!
      console.log('error deleted :', error)
    });
}

export const getNewPartCollectionDocID = async () => {
  const ref = db.collection('Parts').doc()
  return ref.id
}



export const saveNewPart = (part: Part) => {
  db.collection("Parts").doc(part.firebaseId).set(part) //Object.assign({}, part)
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });

}

export const getLastPartId = async () => {

  return db.collection('PartIDs').get().then(snap => {
    console.log('snap size current part id', snap.size)
    return snap.size
  })

}

export const createNextPartId = async (lastPartId: number , firebaseId : string): Promise<number> => {
  return db.collection('PartIDs').doc().set({ id: lastPartId + 1, created: Date.now() , firebaseId}).then(
    () => {
      console.log('lastPartId: ', lastPartId, ' nextPartId: ', lastPartId + 1)
      return lastPartId + 1
    }
  )


}





