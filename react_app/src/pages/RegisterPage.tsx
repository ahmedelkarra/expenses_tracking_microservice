import { useContext } from "react"
import RegisterComponent from "../components/RegisterComponent"
import IsUserContext from "../helper/IsUserContext"
import AlreadyUserComponent from "../components/AlreadyUserComponent"


function RegisterPage() {
    const isUserContext = useContext(IsUserContext)
    if (!isUserContext) {
        throw new Error('this must be as string')
    }
    const { isUser } = isUserContext
    return (
        isUser == true ?
            <AlreadyUserComponent />
            :
            <RegisterComponent />
    )
}

export default RegisterPage