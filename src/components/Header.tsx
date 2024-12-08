import { useNavigate } from "react-router-dom";
import logoClass from "../assets/logoClass.png";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

export default function Header() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState)

  return (
    <header className="shadow-2xl border flex items-center justify-between px-6 py-2">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img 
            src={logoClass} 
            alt="Logo" 
            className="w-16 h-auto cursor-pointer" 
            onClick={() => navigate('/')}
          />
        </div>

        <div className="relative flex items-center ml-4 h-max">
          <button
            className="text-black font-semibold h-auto hover:scale-110 active:scale-90"
            style={{ border: 'none' }}
            onClick={() => navigate('/')}
          >
           Trang chính
          </button>
        </div>

        <div className="relative flex items-center ml-4 h-max">
          <button
            className="text-black font-semibold h-auto hover:scale-110 active:scale-90"
            style={{ border: 'none' }}
            onClick={() => navigate('/class-member')}
          >
            Danh Sách Lớp
          </button>
        </div>

        <div className="relative flex items-center ml-4 h-max">
          <button
            className="text-black font-semibold h-auto hover:scale-110 active:scale-90"
            style={{ border: 'none' }}
            onClick={() => navigate('/meeting')}
          >
            Họp Lớp
          </button>
        </div>
      </div>

     {user.name !== '' && (
        <div className="relative flex items-center">
          <button
            className="font-semibold py-2 px-6 text-black rounded-lg border-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {user.name}
          </button>
          <div className="absolute inset-0 rounded-lg bg-black opacity-0 hover:opacity-20 transition-all duration-300"></div>
        </div>
      )}

    </header>
  );
}
