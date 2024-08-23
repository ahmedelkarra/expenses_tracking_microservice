import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import FooterComponent from './components/FooterComponent.tsx'
import { Box } from '@mui/material'
import IsUserContext from './helper/IsUserContext.ts'
import IsChangeContext from './helper/IsChangeContext.ts'
import UserInfoContext, { IUserInfo } from './helper/UserInfoContext.ts'
import ExpensesInfoContext, { IExpensesInfo } from './helper/ExpensesInfoContext.ts'
import axiosUser from './utils/axiosUser.ts'
import axiosExpense from './utils/axiosExpense.ts'


const Main = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({ _id: "", first_name: "", last_name: "", email: "", username: "" })
  const [isUser, setIsUser] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [expensesInfo, setExpensesInfo] = useState<IExpensesInfo[]>([])
  const token = localStorage.getItem('token') || ''

  const handleUserInfo = async () => {
    try {
      const dataResponse = await axiosUser.get('/me', { headers: { Authorization: token } })
      const data = dataResponse.data as { message: IUserInfo }
      setUserInfo(data.message)
      setIsUser(true)
    } catch (error) {
      const errorMessage = error as { response: { data: { message: string } } }
      console.error(errorMessage?.response?.data?.message || 'Something went wrong')
      setIsUser(false)
      setUserInfo({ _id: "", first_name: "", last_name: "", email: "", username: "" })
    }
  }

  const handleExpensesInfo = async () => {
    try {
      const dataResponse = await axiosExpense.get('/expense', { headers: { Authorization: token } })
      const data = dataResponse.data as { message: IExpensesInfo[] }
      setExpensesInfo(data.message)
    } catch (error) {
      const errorMessage = error as { response: { data: { message: string } } }
      setExpensesInfo([])
      console.error(errorMessage?.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    handleExpensesInfo()
    handleUserInfo()
    setIsChange(false)
  }, [isChange])
  return (
    <StrictMode>
      <BrowserRouter>
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          <IsUserContext.Provider value={{ isUser, setIsUser }}>
            <IsChangeContext.Provider value={{ isChange, setIsChange }}>
              <ExpensesInfoContext.Provider value={{ expensesInfo, setExpensesInfo }}>
                <Box component="div" display="flex" flexDirection="column" minHeight="100dvh">
                  <HeaderComponent />
                  <Box flexGrow={1}>
                    <Routes>
                      <Route path="/" element={<App />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                  </Box>
                  <FooterComponent />
                </Box>
              </ExpensesInfoContext.Provider>
            </IsChangeContext.Provider>
          </IsUserContext.Provider>
        </UserInfoContext.Provider>
      </BrowserRouter>
    </StrictMode>
  )

}



createRoot(document.getElementById('root')!).render(<Main />)
