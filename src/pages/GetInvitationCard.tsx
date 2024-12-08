import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { useNavigate } from "react-router-dom";
import flagClass from "../assets/FlagClass.png"
import Loading from "../components/Loading";

interface timeDescriptionWithoutId {
  time: string;
  description: string;
}

interface meetingWithTimeDescription {
  id: string;
  date: Date;
  status: string;
  timeDescription: timeDescriptionWithoutId[];
}

export default function GetInvitationCard() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userId, setUserId] = useState<string>('')
  const [meeting, setMeeting] = useState<meetingWithTimeDescription>({
    id: "",
    date: new Date(),
    status: "No",
    timeDescription: [
      {
        time: "",
        description: "",
      },
    ],
  });
  const [isAccepted, setIsAccepted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const fetchMeeting = async () => {
    try {
      const response = await axios.get("https://backend-a2-2019-2022.onrender.com/meeting/yes");
      setMeeting(response.data.data); 

      const res = await axios.get(`https://backend-a2-2019-2022.onrender.com/user/name/${user.name}`)

      setUserId(res.data.data.id); 

      const r = await axios.get(`https://backend-a2-2019-2022.onrender.com/userMeeting/${res.data.data.id}/isAccepted/${response.data.data.id}`)
      console.log(r.data)

      setLoading(false)

      if(r.data.message === 'Bạn đã tham gia buổi họp lớp này rồi!') setIsAccepted(true)
    } catch (e: any) {
      console.log(e);
      if(e.response.data.message === 'Bạn chưa tham gia buổi họp lớp này!') setLoading(false)
    }
  };


  useEffect(() => {
    fetchMeeting();
    setTimeout(() => setIsPopupVisible(true), 500);
  }, []);

  const handleConfirm = async () => {
    try{
      const response = await axios.post('https://backend-a2-2019-2022.onrender.com/userMeeting/accept',{
        userId,
        meetingId: meeting.id
      })

      console.log(response)

      alert("Cảm ơn bạn đã xác nhận tham dự!");

      navigate('/qr')
    }catch(e){
      alert("Xác nhận tham dự thất bại! Vui lòng thử lại sau!")
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${flagClass})`, // Thêm đường dẫn đúng cho hình nền
      }}
    >
      <div
        className={`bg-white/90 backdrop-blur-md p-8 rounded-2xl mt-20 shadow-2xl w-[650px] text-center border-2 border-blue-300 transform transition-all duration-700 ${
          isPopupVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-12"
        }`}
      >
        {loading && (
          <Loading/>
        )}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-wide animate__animated animate__fadeIn animate__delay-1s">
          🎉 Thiệp Mời 🎉
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
          Chào bạn <b><i>{user.name}</i></b>,
        </p>
        <p className="text-lg text-gray-700 leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
          Nhân dịp Tết Nguyên Đán năm 2025, là thời gian phù hợp để A2 chúng ta có cơ hội ngồi lại nói chuyện với nhau.
        </p>

        {/* Time and Location */}
        <p className="text-lg font-semibold text-blue-600 mt-4 animate__animated animate__fadeIn animate__delay-4s">
          Thời gian:{" "}
          <span className="font-bold text-gray-400">8g00, ngày 26/1/2025 (nhằm ngày 27/12/2024 âm lịch)</span>
        </p>
        <p className="text-lg font-semibold text-blue-600 mt-4 animate__animated animate__fadeIn animate__delay-5s">
          Địa điểm: <span className="font-bold text-gray-400">Được thông báo sau thông qua "Diễn đàn" (<i>Sắp ra mắt</i>).</span>
        </p>

        {/* Schedule Table */}
        <div className="mt-6 animate__animated animate__fadeIn animate__delay-6s">
          <table className="min-w-full table-auto text-left border-collapse rounded-lg overflow-hidden animate__animated animate__fadeIn animate__delay-7s">
            <thead>
              <tr>
                <th className="px-6 py-3 font-bold text-blue-600 text-center bg-blue-100 rounded-tl-lg">Thời gian</th>
                <th className="px-6 py-3 font-bold text-blue-600 text-center bg-blue-100 rounded-tr-lg">Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {meeting.timeDescription.map((item, index) => (
                <tr key={index} className="border-t border-b">
                  <td className="px-6 py-4 text-center text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Message */}
        <div className="mt-6 text-gray-800 text-base italic animate__animated animate__fadeIn animate__delay-8s">
          <p>
            Hãy tham gia cùng nhau vì mỗi năm chỉ có một lần, đây sẽ là trải nghiệm đáng nhớ mỗi dịp Tết đến Xuân về mà bạn đáng có!
          </p>
        </div>

        {isAccepted ? (
          <button
            className="mt-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 animate__animated animate__pulse animate__infinite animate__delay-9s"
            onClick={() => navigate('/qr')}
          >
            QR chuyển khoản
          </button>
        ) : (
          <button
            className="mt-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 animate__animated animate__pulse animate__infinite animate__delay-9s"
            onClick={() => handleConfirm()}
          >
            Xác nhận tham dự
          </button>
        )}
  

        <p className="mt-4 text-gray-600 animate__animated animate__fadeIn animate__delay-10s">Chúc bạn một ngày tốt lành!</p>
        <p
          className="mt-4 text-sm text-gray-600 animate__animated animate__fadeIn animate__delay-10s"
          onClick={() => navigate("/")}
        >
          <u>Bấm vào đây để quay trở lại trang chính</u>
        </p>
      </div>
    </div>
  );
}
