import { useNavigate } from "react-router-dom";
import qr from "../assets/qr.jpg"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dropDownHeaderState, userState } from "../state";
import { useEffect } from "react";
import axios from "axios";

export default function QR() {
    const navigate = useNavigate()
    const setDropdownOpen = useSetRecoilState(dropDownHeaderState)
    const user = useRecoilValue(userState)

    const updateLastAccess = async () =>{
        if(user.name !== ''){
            await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess',{
                name: user.name,
            })
        }
    }

    useEffect(() => {
        updateLastAccess()
    },[])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-100" onClick={() => setDropdownOpen(false)}>
            <div className="bg-white rounded-lg shadow-2xl w-[700px] p-5 relative border border-gray-200 my-5">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Thanh Toán Cọc</h2>
                <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                    Chúng ta sẽ tổ chức ở quán nhậu chứ không phải nhà của bất cứ cá nhân nào, nên nếu có thể mọi người nên cọc trước.
                </p>

                {/* QR Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={qr}
                        alt="QR Thanh Toán"
                        className="w-64 h-72 object-cover shadow-xl rounded-lg transition-transform transform hover:scale-105"
                    />
                </div>

                {/* Payment Info */}
                <div className="text-center">
                    <p className="text-4xl font-bold text-green-700 mb-1">
                        <span className="text-yellow-500"><i>50.000đ</i></span>
                    </p>
                    <p className="text-xl font-bold text-green-700 mb-4">
                        <span className="text-gray-500">Nội dung: <i className="text-gray-700">Họp lớp - Tên người chuyển</i></span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2 mb-6">
                        Sau khi thanh toán, trong vòng 2 tiếng bạn sẽ có <i>"Đã chuyển cọc"</i> trên danh sách tham gia buổi họp
                    </p>
                </div>

                {/* Back Button */}
                <div className="text-center">
                    <button 
                        onClick={() => {
                            setDropdownOpen(false)
                            navigate('/invitation')
                        }} 
                        className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}
