import { firebaseLogOut } from "../../utils/firebaseFunctions"


export const MainPage = () => {

  return (<div>
    <p>Helllo bitches</p>

    <button onClick={firebaseLogOut}>Log out</button>
  </div>)

}