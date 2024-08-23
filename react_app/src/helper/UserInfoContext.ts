import { createContext, Dispatch, SetStateAction } from "react";



export interface IUserInfo {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

const UserInfoContext = createContext<{
    userInfo: IUserInfo,
    setUserInfo: Dispatch<SetStateAction<IUserInfo>>
} | undefined>(undefined)


export default UserInfoContext