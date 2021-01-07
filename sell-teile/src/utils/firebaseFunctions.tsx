import { User } from "../types"
import fire from "./firebaseConfig"
import firebase from 'firebase'


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
      
      return user})
    .catch(err => console.log(err))

}

export const firebaseLogOut = async () =>{
 await fire.auth().signOut()
  .then(res=> console.log('resulst log out ', res))
  .catch(err=> console.log(err))
}

