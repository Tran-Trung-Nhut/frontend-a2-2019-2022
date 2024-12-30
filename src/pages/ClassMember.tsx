import { useEffect, useState } from "react";
import background from "../assets/backgroundHome.jpg";
import axios from "axios";
import { UserDto } from "../dtos/user.dto";
import Loading from "../components/Loading";
import { useSetRecoilState } from "recoil";
import { dropDownHeaderState } from "../state";
import ClassStructurePage from "../components/ClassStructure";

export default function ClassMember() {
  const [user, setUser] = useState<UserDto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showClassStructure, setShowClassStructure] = useState<boolean>(false)
  const [nameUser, setNameUser] = useState<string[]>([])
  const setDropdownOpen = useSetRecoilState(dropDownHeaderState)

  const fetchUsers = async () => {
    try{
        const response = await axios.get('https://backend-a2-2019-2022.onrender.com/user')

        setUser(response.data.data)

        const tempNameUser = response.data.data
        .filter((user: UserDto) => user.role !== "Chủ nhiệm")
        .map((user: UserDto) => user.name); 
        
        setNameUser(tempNameUser)
        setLoading(false)
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
          {nameUser.map((name: string, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                  alt={name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 mb-4 shadow-lg transition-all duration-300"
                />
                <h3 className="text-lg font-medium text-gray-800 mt-2">{name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            className=" text-white border-white border-4 text-2xl font-extrabold py-4 px-10 rounded-full shadow-2xl transform hover:scale-110 hover:rotate-6 hover:shadow-2xl hover:ring-4 hover:ring-blue-300 transition-all duration-500 ease-in-out"
            onClick={() => setShowClassStructure(true)}
          >
            Cơ cấu lớp
          </button>
        </div>
      </div>
      {showClassStructure && <ClassStructurePage members={user} onClose={() => setShowClassStructure(false)}/>}
    </div>
  );
}
