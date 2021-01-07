import { MainAppBar } from "../Appbar/AppBar"
import StartForm from "../StartForm/StartForm"


export const MainPage = ({ userLoggedIn }: { userLoggedIn: boolean }): JSX.Element => {

  if (!userLoggedIn) return (<StartForm />)

  return (
    <div>
      <MainAppBar userLoggedIn={userLoggedIn} />


    </div>)

}