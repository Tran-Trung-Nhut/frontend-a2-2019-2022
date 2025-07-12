import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from './state';
import './styles.css';
import MaintenancePage from './pages/Maintenance';
import NotFound from './pages/NotFound';


function App() {
  const [user, setUser] = useRecoilState(userState)

  const fetchUser = async () => {
    if(user.name !== '' || user.phoneNumber !== '') return

    const existUser = localStorage.getItem('user')

    if(!existUser) return

    setUser(JSON.parse(existUser))
  }

  useEffect( () => {
    fetchUser()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<MaintenancePage/>}>
          {/* <Route path='/' element={<DefaultLayout/>}> */}
          {/* <Route path='/' element={<Home/>}/>
          <Route path='/invitation' element={<GetInvitationCard/>}/>
          <Route path='/class-member' element={<ClassMember/>}/>
          <Route path='/meeting' element={<Meeting/>}/>
          <Route path='/qr' element={<QR/>}/> */}
        </Route>
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/login' element={<MaintenancePage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
