import { useContext } from 'react'
import LoginComponent from '../components/LoginComponent'
import IsUserContext from '../helper/IsUserContext'
import AlreadyUserComponent from '../components/AlreadyUserComponent'



function LoginPage() {
    const isUserContext = useContext(IsUserContext)
    if (!isUserContext) {
        throw new Error('this must be as string')
    }
    const { isUser } = isUserContext
    return (
        isUser ?
            <AlreadyUserComponent />
            :
            <LoginComponent />
    )
}

export default LoginPage