import { useSetRecoilState } from "recoil";
import hcmut from "../assets/hcmut.png"
import { dropDownHeaderState } from "../state";

export default function Footer() { 
    const setDropdownOpen = useSetRecoilState(dropDownHeaderState)

    return (
      <footer className="bg-gray-800 text-white py-4" onClick={() => setDropdownOpen(false)}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <img src={hcmut} alt="Logo" className="h-12 mx-auto" />
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Người phát triển ứng dụng:</p>
            
            <p className="text-xl font-semibold">Trần Trung Nhựt</p>
            
            <p className="text-xs text-gray-400">Nguyên Tổ trưởng Tổ 2 - A2 khóa 2019-2022 - Trường THPT Thanh Bình 2</p>
            <p className="text-xs text-gray-400">Nguyên Ủy viên Ban Thường vụ Đoàn khoa Khoa học và Kỹ thuật Máy tính</p>
            <p className="text-xs text-gray-400">Ủy viên Ủy Ban Kiểm tra Đoàn trường Đại học Bách khoa - ĐHQG-HCM</p>
          </div>
  
          <div className="mt-4 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Trần Trung Nhựt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  