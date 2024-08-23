import { useContext } from "react"
import ProfileComponent from "../components/ProfileComponent"
import IsUserContext from "../helper/IsUserContext"
import HaveToLoginComponent from "../components/HaveToLoginComponent"


function ProfilePage() {
    const isUserContext = useContext(IsUserContext)
    if (!isUserContext) {
        throw new Error('this must be as string')
    }
    const { isUser } = isUserContext
    return (
        isUser == true ?
            <ProfileComponent />
            :
            <HaveToLoginComponent />
    )
}

export default ProfilePage