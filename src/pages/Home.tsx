import { useNavigate } from "react-router-dom";
import background from "../assets/backgroundHome.jpg";
import "./css/Home.css"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dropDownHeaderState, userState } from "../state";

export default function Home() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState)
  const setDropdownOpen = useSetRecoilState(dropDownHeaderState)

  const handleGetInvitation = () => {
    if(user.name !== '' && user.phoneNumber !== '') navigate('/invitation')
    else navigate('/login')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center home-page"
      style={{ backgroundImage: `url(${background})` }}
      onClick={() => setDropdownOpen(false)}
    >
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black bg-opacity-50 p-8">
        <div className="text-center">
          <div className="text-white text-4xl md:text-6xl font-bold">
            <p>Chào mừng <i>{user.name ? user.role === "Chủ nhiệm" ? "Cô " + user.name : user.name : "bạn"}</i> trở lại</p>
            <p className="text-yellow-300">
              <strong>12A2</strong>
            </p>
            <p className="text-3xl text-yellow-200">
              <strong>Niên khóa 2019 - 2022</strong>
            </p>
          </div>
        </div>

        {user.role !== "Chủ nhiệm" && (
          <button
          className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-blink"
          onClick={() => handleGetInvitation()}
        >
          Nhận thiệp mời
        </button>
        )}
      </div>
    </div>
  );
}
