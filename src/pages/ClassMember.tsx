
import { useEffect, useState } from "react";
import background from "../assets/backgroundHome.jpg";
import axios from "axios";
import { UserDto } from "../dtos/user.dto";
import Loading from "../components/Loading";
import { useSetRecoilState } from "recoil";
import { dropDownHeaderState } from "../state";

export default function ClassMember() {
  // Danh sách tên và hình ảnh của các thành viên
  const [user, setUser] = useState<UserDto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const setDropdownOpen = useSetRecoilState(dropDownHeaderState)

  const fetchUsers = async () => {
    try{
        const response = await axios.get('https://backend-a2-2019-2022.onrender.com/user')

        setLoading(false)

        setUser(response.data.data)
    }catch(e){
        console.log(e)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{backgroundImage: `url(${background})`}}
    >
      {loading && (
        <Loading/>
      )}
      <div className="w-full max-w-screen min-h-screen px-4 py-8 text-center bg-black bg-opacity-60 shadow-2xl" onClick={() => setDropdownOpen(false)}>
        <h1 className="text-5xl font-extrabold text-white mb-12 text-shadow-lg">
          Danh Sách Thành Viên Lớp
        </h1>

        <div className="flex overflow-x-auto space-x-8 pb-4 bg-gray-800 bg-opacity-75 p-4 rounded-lg">
          {user.map((member: UserDto, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              
            >
              <div className="flex flex-col items-center">
                <img
                  src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                  alt={member.name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 mb-4 shadow-lg transition-all duration-300"
                />
                <h3 className="text-lg font-medium text-gray-800 mt-2">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
