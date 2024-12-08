import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Home from './pages/Home';
import GetInvitationCard from './pages/GetInvitationCard';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from './state';
import Login from './pages/Login';
import ClassMember from './pages/ClassMember';
import Meeting from './pages/Meeting';
import QR from './pages/QR';

function App() {
  const [user, setUser] = useRecoilState(userState)

  const fetchUser = async () => {
    if(user.name !== '' || user.phoneNumber !== '') return

    const existUser = sessionStorage.getItem('user')

    if(!existUser) return

    setUser(JSON.parse(existUser))
  }

  useEffect( () => {
    fetchUser()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/invitation' element={<GetInvitationCard/>}/>
          <Route path='/class-member' element={<ClassMember/>}/>
          <Route path='/meeting' element={<Meeting/>}/>
          <Route path='/qr' element={<QR/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
