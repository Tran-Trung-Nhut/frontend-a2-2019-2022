import { useState } from "react";
import background from "../assets/backgroundHome.jpg";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";
import axios from "axios";
import Loading from "../components/Loading";

export default function Login() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const setUser = useSetRecoilState(userState)
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!fullName || !phoneNumber){
        alert("Vui lòng nhập đầy đủ thông tin!")
        return
    }

    if(phoneNumber.length < 10 || phoneNumber.length > 11 || phoneNumber[0] !== '0'){
      alert("Số điện thoại không hợp lệ! Vui lòng nhập lại!")
      return
    }

    try{
      setLoading(true)
      const response = await axios.post('https://backend-a2-2019-2022.onrender.com/login',{
        name: fullName,
        phoneNumber
      })

      setUser({
          name: fullName,
          phoneNumber
      })

      setLoading(false)

      sessionStorage.setItem('user', JSON.stringify({name: fullName, phoneNumber: phoneNumber}))
      if(response.data.message === 'Login successfully!') navigate('/')
    }catch(e: any){
      setLoading(false)
      alert(e.response.data.message)
    }

  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {loading && (
        <Loading/>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="relative bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="fullName" className="block text-gray-800 text-lg font-semibold mb-2">
              Họ và Tên
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên"
              className="text-black w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="phoneNumber" className="block text-gray-800 text-lg font-semibold mb-2">
              Số Điện Thoại
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="text-black w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            Đăng Nhập
          </button>
          <p 
          className="text-center text-gray-400 text-sm mt-3"
          onClick={() => navigate('/')}>
            <u>Trở lại trang chính</u>
            </p>
        </form>
      </div>
    </div>
  );
}
