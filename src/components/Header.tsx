import { useNavigate } from "react-router-dom";
import logoClass from "../assets/logoClass.png";
import { useRecoilState } from "recoil";
import { dropDownHeaderState, userState } from "../state";
import { defaultLoginUser } from "../dtos/user.dto";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState)
  const [isDropdownOpen, setDropdownOpen] = useRecoilState(dropDownHeaderState);

  const handleLogOut = () => {
    const confirm = window.confirm("Bạn có chắc muốn đăng xuống khỏi ứng dụng?")

    if(!confirm) return

    localStorage.removeItem('user')
    setUser(defaultLoginUser)

    navigate('/')
  }

  const handleNavigate = async (page: string) => {
    try {
      if(user.name !== ''){
        await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess',{
          name: user.name,
        })
      }

      navigate(page)
    } catch (error) {
      alert("Có lỗi xảy ra vui lòng thử lại sau!")
    }
  }


  return (
    <header className="shadow-2xl border flex items-center justify-between px-6 py-2" onClick={() => setDropdownOpen(false)}>
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
            onClick={() => handleNavigate('/class-member')}
          >
            Thành viên
          </button>
        </div>

        <div className="relative flex items-center ml-4 h-max">
          <button
            className="text-black font-semibold h-auto hover:scale-110 active:scale-90"
            style={{ border: 'none' }}
            onClick={() => handleNavigate('/meeting')}
          >
            Họp Lớp
          </button>
        </div>
      </div>

     {user.name !== '' ? (
        <div className="relative flex items-center">

          <button
            type="button"
            className="font-semibold py-2 px-6 text-black rounded-lg border-2 shadow-md hover:shadow-lg hover:scale-110 active:scale-90"
            onClick={(e) => {
              e.stopPropagation()
              setDropdownOpen(!isDropdownOpen)
            }}
          >
            {user.name}
          </button>

          {isDropdownOpen && (
            <div className="absolute w-48 top-full right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
              <button
                type="button"
                className="block w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => handleLogOut()}
              >
                Đăng xuất
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="relative flex items-center">
          <button
            type="button"
            className="font-semibold py-2 px-6 text-black rounded-lg border-2 shadow-md hover:shadow-lg hover:scale-110 active:scale-90"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </button>
        </div>
      )}

    </header>
  );
}
