import React, { useEffect, useRef, useState } from "react";
import { MessageDto } from "../dtos/message.dto";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import Loading from "./Loading";
import { toZonedTime } from 'date-fns-tz';
import ChatInputArea from "./ChatInputArea";
import { MeetingWithTimeDescriptionDto } from "../dtos/meeting.dto";


export default function Forum({
  onClose,
  meeting,
}: {
  onClose: () => void;
  meeting: MeetingWithTimeDescriptionDto;
}) {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [names, setNames] = useState<string[]>([])
  const [content, setContent] = useState<string>("")
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [currentMeeting, setCurrentMeeting] = useState<string>("")
  const user = useRecoilValue(userState)

  const handleSendMessageByEnter = async (e: any) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const overThirdtyDays = () => {
    const now = new Date();
    const meetingDate = new Date(meeting.date);

    const timeDifference = now.getTime() - meetingDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference > 30
  }

  const handleSendMessage = async () => {
    if(!content){
      alert("Không thể gửi nội dung trống!")
      return
    }

    if(overThirdtyDays()){
      alert("Cuộc họp này đã kết thúc quá 1 tháng, không thể gửi tin nhắn vào!")
      return
    }

    try{
      setLoading(true)
      await axios.post('https://backend-a2-2019-2022.onrender.com/message/create',{
        content,
        meetingId: meeting.id,
        userName: user.name
      })
      
      fetchMessages()

      setContent("")
      setLoading(false)
    }catch(e){
      alert("Đang có lỗi bên phái server! Vui lòng thử lại sau!")
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://backend-a2-2019-2022.onrender.com/message/meeting/${meeting.id}`
      );
      setMessages(response.data.data);

      if(user.name !== ''){
        await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess',{
            name: user.name,
        })
      }

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
        `https://backend-a2-2019-2022.onrender.com/userMeeting/listUserAccepted/name/${meeting.id}`
      );

      setNames(responseUser.data.data)

      const response = await axios.get("https://backend-a2-2019-2022.onrender.com/meeting/yes");
      
      setCurrentMeeting(response.data.data.id); 
    }catch(e){
      setNames([])
      setCurrentMeeting("")
    }
  }

  const handleUndoMessage = async (messageId: string) => {
    const confirm = window.confirm("Bạn có chắc muốn thu hồi đoạn tin nhắn này?")

    if(!confirm) {
      return
    }

    try {
      setLoading(true)
      await axios.delete(`https://backend-a2-2019-2022.onrender.com/message/undo/${messageId}`)

      fetchMessages()

      setLoading(false)
    } catch (error) {
      alert("Không thể xóa tin nhắn ngay lúc này, vui lòng thử lại sau!")
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
      <div className="w-full max-w-[600px] bg-[#f0f4f1] rounded-lg shadow-lg overflow-hidden md:h-[87%] h-[100%]">
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
          <div className="p-4 sm:h-[100%] md:h-80 h-[85%] overflow-y-auto space-y-4 bg-white">
          {messages.length === 0 ? (
            <p className="text-center text-[#6a6a6a] font-semibold">
              Không có tin nhắn nào trong diễn đàn.
            </p>
          ) : (
            currentMeeting === meeting.id ? (
              names.includes(user.name) || user.role === "Chủ nhiệm" ? (
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
                        <p className="text-sm">
                          {message.updateDate !== null ? (
                            message.content.split('\n').map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))
                          ) : (
                            <i className="italic">Tin nhắn đã được thu hồi</i>
                          )}
                        </p>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          message.userName === user.name
                            ? "text-right text-[#8b8f84]"
                            : "text-left text-[#8b8f84]"
                        }`}
                      >
                       {message.userName === user.name && message.updateDate !== null && (
                          <>
                            <button 
                            type="button"
                            className="font-bold hover:underline"
                            onClick={() => handleUndoMessage(message.id)}
                            >
                              ↺ Thu hồi
                            </button>
                            <>  |  </>
                          </>   
                       )}                  
                       {/* {message.updateDate && message.updateDate !== message.createDate
                        ? `Chỉnh sửa lúc: ${toZonedTime(message.updateDate, 'UTC').toLocaleString()}`
                        : `Gửi lúc: ${toZonedTime(message.createDate, 'UTC').toLocaleString()}`} */}
                        Gửi lúc: {toZonedTime(message.createDate, 'UTC').toLocaleString()}
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
                <div className="p-4 sm:h-[100%] md:h-[200px] h-[85%] overflow-y-auto space-y-4 bg-white">
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
                      <p className="text-sm">
                        {message.updateDate !== null ? (
                          message.content.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))
                        ) : (
                          <i className="italic">Tin nhắn đã được thu hồi</i>
                        )}
                      </p>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        message.userName === user.name
                          ? "text-right text-[#8b8f84]"
                          : "text-left text-[#8b8f84]"
                      }`}
                    >
                      {/* {message.updateDate && message.updateDate !== message.createDate
                        ? `Chỉnh sửa lúc: ${toZonedTime(message.updateDate, 'UTC').toLocaleString()}`
                        : `Gửi lúc: ${toZonedTime(message.createDate, 'UTC').toLocaleString()}`} */}
                      Gửi lúc: {toZonedTime(message.createDate, 'UTC').toLocaleString()}
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
          <div className="p-4 md:h-[77%] sm:h-[90%] h-[89%] overflow-y-auto space-y-4 bg-white">
              <p className="text-gray-500 text-center font-bold text-xl"><i>Vui lòng đăng nhập để xem diễn đàn</i></p>
          </div>
        )}

        <div className="p-4 border-t bg-[#d1e4dd] h-20 flex items-center space-x-2 shadow-inner">
            {currentMeeting === meeting.id || user.role === "Chủ nhiệm"? (
              user.name !== "" && ( names.includes(user.name) || user.role === "Chủ nhiệm" ) && (
                <ChatInputArea 
                content={content} 
                setContent={setContent} 
                handleSendMessageByEnter={handleSendMessageByEnter} 
                handleSendMessage={handleSendMessage}/>
               )
            ) : (
              user.name !== "" &&  (
                <ChatInputArea 
                content={content} 
                setContent={setContent} 
                handleSendMessageByEnter={handleSendMessageByEnter} 
                handleSendMessage={handleSendMessage}/>
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