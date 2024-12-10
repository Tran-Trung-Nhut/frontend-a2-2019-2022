import { useEffect, useRef, useState } from "react";
import { MessageDto } from "../dtos/message.dto";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import Loading from "./Loading";
import { UserPaidDto } from "../dtos/user.dto";

export default function Forum({
  onClose,
  meetingId,
}: {
  onClose: () => void;
  meetingId: string;
}) {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [names, setNames] = useState<string[]>([])
  const [content, setContent] = useState<string>("")
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [currentMeeting, setCurrentMeeting] = useState<string>("")
  const user = useRecoilValue(userState);

  const handleSendMessage = async () => {
    if(!content){
      alert("Không thể gửi nội dung trống!")
      return
    }

    if(meetingId !== currentMeeting){
      alert("Cuộc họp này đã kết thúc, không thể gửi tin nhắn vào!")
      return
    }

    try{
      await axios.post('https://backend-a2-2019-2022.onrender.com/message/create',{
        content,
        meetingId,
        userName: user.name
      })

      fetchMessages()

      setContent("")
    }catch(e){
      alert("Đang có lỗi bên phái server! Vui lòng thử lại sau!")
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://backend-a2-2019-2022.onrender.com/message/meeting/${meetingId}`
      );

      setMessages(response.data.data);

      setLoading(false);
    } catch (e: any) {
      if (e.response.data.message === "Không có tin nhắn nào tồn tại!") {
        setMessages([]);
        setLoading(false);
      }
    }
  };

  const fetchAcceptedUserAndCurrentMeeting = async () => {
    try{
      const responseUser = await axios.get(
        `https://backend-a2-2019-2022.onrender.com/userMeeting/listUserAccepted/${meetingId}`
      );

      const namesUser = responseUser.data.data.map((name: UserPaidDto) => {
        return name.name
      })

      setNames(namesUser)

      const response = await axios.get("https://backend-a2-2019-2022.onrender.com/meeting/yes");
      
      setCurrentMeeting(response.data.data.id); 
    }catch(e){
      setNames([])
      setCurrentMeeting("")
    }
  }

  useEffect(() => {
    fetchAcceptedUserAndCurrentMeeting()
    fetchMessages();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {loading && <Loading />}
      <div className="w-full max-w-[600px] bg-[#f0f4f1] rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b bg-[#d1e4dd] shadow-md flex justify-center items-center">
          <button
            className="bg-[#90c8ac] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-[#7ca89a] transition-transform transform hover:scale-105"
            onClick={onClose}
          >
            Thoát
          </button>
        </div>

        {/* Message List */}
        {user.name !== "" ? (
          <div className="p-4 h-80 overflow-y-auto space-y-4 bg-white">
          {messages.length === 0 ? (
            <p className="text-center text-[#6a6a6a] font-semibold">
              Không có tin nhắn nào trong diễn đàn.
            </p>
          ) : (
            currentMeeting === meetingId ? (
              names.includes(user.name) ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end ${
                      message.userName === user.name
                        ? "justify-end"
                        : "justify-start"
                    } animate-fade`}
                  >
                    {message.userName !== user.name && (
                      <img
                        src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                        alt={`${message.userName}'s avatar`}
                        className="w-10 h-10 rounded-full mr-2 border-2 border-[#90c8ac] hover:scale-105 transition-transform"
                      />
                    )}
                    <div className="max-w-xs">
                      <p
                        className={`text-xs mb-1 ${
                          message.userName === user.name
                            ? "text-right text-[#4b4e42]"
                            : "text-left text-[#6a6a6a]"
                        }`}
                      >
                        {message.userName}
                      </p>
                      <div
                        className={`px-4 py-2 rounded-lg shadow-md ${
                          message.userName === user.name
                            ? "bg-[#90c8ac] text-white"
                            : "bg-[#e7f2f1] text-[#4b4e42]"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          message.userName === user.name
                            ? "text-right text-[#8b8f84]"
                            : "text-left text-[#8b8f84]"
                        }`}
                      >
                        {message.updateDate &&
                        message.updateDate !== message.createDate
                          ? `Chỉnh sửa lúc: ${new Date(
                              message.updateDate
                            ).toLocaleString()}`
                          : `Gửi lúc: ${new Date(
                              message.createDate
                            ).toLocaleString()}`}
                      </p>
                    </div>
                    {message.userName === user.name && (
                      <img
                        src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                        alt="Your avatar"
                        className="w-10 h-10 rounded-full ml-2 border-2 border-[#90c8ac] hover:scale-105 transition-transform"
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 h-80 overflow-y-auto space-y-4 bg-white">
                  <p className="text-gray-500 text-center font-bold text-xl"><i>Hãy xác nhận tham gia để xem diễn đàn</i></p>
                </div>
              )
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end ${
                    message.userName === user.name
                      ? "justify-end"
                      : "justify-start"
                  } animate-fade`}
                >
                  {message.userName !== user.name && (
                    <img
                      src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                      alt={`${message.userName}'s avatar`}
                      className="w-10 h-10 rounded-full mr-2 border-2 border-[#90c8ac] hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="max-w-xs">
                    <p
                      className={`text-xs mb-1 ${
                        message.userName === user.name
                          ? "text-right text-[#4b4e42]"
                          : "text-left text-[#6a6a6a]"
                      }`}
                    >
                      {message.userName}
                    </p>
                    <div
                      className={`px-4 py-2 rounded-lg shadow-md ${
                        message.userName === user.name
                          ? "bg-[#90c8ac] text-white"
                          : "bg-[#e7f2f1] text-[#4b4e42]"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        message.userName === user.name
                          ? "text-right text-[#8b8f84]"
                          : "text-left text-[#8b8f84]"
                      }`}
                    >
                      {message.updateDate &&
                      message.updateDate !== message.createDate
                        ? `Chỉnh sửa lúc: ${new Date(
                            message.updateDate
                          ).toLocaleString()}`
                        : `Gửi lúc: ${new Date(
                            message.createDate
                          ).toLocaleString()}`}
                    </p>
                  </div>
                  {message.userName === user.name && (
                    <img
                      src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full ml-2 border-2 border-[#90c8ac] hover:scale-105 transition-transform"
                    />
                  )}
                </div>
              ))
            )
          )}
          <div ref={messageEndRef} />
        </div>
        ) : (
          <div className="p-4 h-80 overflow-y-auto space-y-4 bg-white">
              <p className="text-gray-500 text-center font-bold text-xl"><i>Vui lòng đăng nhập để xem diễn đàn</i></p>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t bg-[#d1e4dd] flex items-center space-x-2 shadow-inner">
            {currentMeeting === meetingId ? (
              user.name !== "" && names.includes(user.name) && (
                <>
                 <input
                 type="text"
                 value={content}
                 placeholder="Soạn tin nhắn"
                 className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring text-[#3f8c73] border-[#49a185] shadow-sm"
                 onChange={(e) => setContent(e.target.value)}
                 />
                 <button 
                 className="px-4 py-2 bg-[#7ca89a] text-white rounded-lg hover:bg-[#49a185] transition-all transform hover:scale-110"
                 onClick={() => handleSendMessage()}>
                   Gửi
                 </button>
                </>
               )
            ) : (
              user.name !== "" && (
                <>
                 <input
                 type="text"
                 value={content}
                 placeholder="Soạn tin nhắn"
                 className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring text-[#3f8c73] border-[#49a185] shadow-sm"
                 onChange={(e) => setContent(e.target.value)}
                 />
                 <button 
                 className="px-4 py-2 bg-[#7ca89a] text-white rounded-lg hover:bg-[#49a185] transition-all transform hover:scale-110"
                 onClick={() => handleSendMessage()}>
                   Gửi
                 </button>
                </>
              )
            )}
        </div>
      </div>
    </div>
  );
}




{/* Footer */}
 {/* <div className="p-4 border-t bg-[#d1e4dd] flex-col items-center justify-center">
  {(user.name !== "" && names.includes(user.name)) && (
    <>
      <p className="text-sm text-[#4b4e42] font-semibold text-center">
      Bạn không được phép gửi tin nhắn vào lúc này!
      </p>
      <p className="text-sm text-[#4b4e42] font-semibold text-center">
        Liên hệ <i><b>Trung Nhựt</b></i> để biết thêm chi tiết!
      </p>
    </>
  )}
</div> */}