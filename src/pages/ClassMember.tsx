import { useEffect, useState } from "react";
import background from "../assets/backgroundHome.jpg";
import axios from "axios";
import { UserDto } from "../dtos/user.dto";
import Loading from "../components/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "../state";


export default function ClassMember() {
  const [user, setUser] = useState<UserDto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const userLogin = useRecoilValue(userState)

  const fetchUsers = async () => {
    try{
        const response = await axios.get('https://backend-a2-2019-2022.onrender.com/user')

        setUser(response.data.data)
    

        if(userLogin.name !== ''){
          await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess',{
            name: userLogin.name,
          })
        }
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
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{backgroundImage: `url(${background})`}}
    >
      {loading && <Loading/>}
      <div className="w-full h-full sm:w-[100%] sm:h-[100%] p-6 sm:p-10 bg-black bg-opacity-60 overflow-auto scrollbar-hide">
        <div className="flex justify-center items-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent text-white">
            Cơ Cấu Lớp Học
          </h1>
        </div>

        <OrgChart data={user} />
      </div>
    </div>
  );
}

const OrgChartNode = ({ name, role, avatar }: { name: string; role: string; avatar: string }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg w-[70%] sm:w-60 h-auto justify-between border border-gray-300 hover:shadow-xl hover:border-gray-400 transition-all duration-300 hover:scale-110">
      <img
        src={avatar}
        alt={name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-200 shadow-md"
      />
      <div className="mt-4 text-lg sm:text-xl font-bold text-gray-800 text-center tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition duration-300">
        {name}
      </div>
      <div className="text-sm text-gray-500 italic">{role}</div>
    </div>
  );
};

const OrgChart = ({ data }: { data: UserDto[] }) => {
  const roles = ["Chủ nhiệm", "Lớp trưởng", "Lớp phó", "Tổ trưởng", "Thành viên"];
  const groupedData = roles.map(role => data.filter(member => member.role.includes(role)));

  return (
    <div className="flex flex-col items-center space-y-16 mt-10">
      {groupedData.map((group, index) => (
        <div key={index} className="w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
            {roles[index]}
          </h2>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
            {group.map((member, idx) => (
              <OrgChartNode
                key={idx}
                name={member.name}
                role={member.role}
                avatar={"https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


