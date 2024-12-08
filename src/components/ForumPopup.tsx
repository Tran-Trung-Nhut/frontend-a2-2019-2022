import { useEffect, useRef, useState } from "react";
import { MessageDto } from "../dtos/message.dto";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import Loading from "./Loading";

export default function Forum({
  onClose,
  meetingId,
}: {
  onClose: () => void;
  meetingId: string;
}) {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const user = useRecoilValue(userState);

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

  useEffect(() => {
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
        <div className="p-4 h-80 overflow-y-auto space-y-4 bg-white">
          {messages.length === 0 ? (
            <p className="text-center text-[#6a6a6a] font-semibold">
              Không có tin nhắn nào trong diễn đàn.
            </p>
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
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-[#d1e4dd] flex-col items-center justify-center">
          <p className="text-sm text-[#4b4e42] font-semibold text-center">
            Bạn không được phép gửi tin nhắn vào lúc này!
          </p>
          <p className="text-sm text-[#4b4e42] font-semibold text-center">
            Liên hệ <i><b>Trung Nhựt</b></i> để biết thêm chi tiết!
          </p>
        </div>
      </div>
    </div>
  );
}




{/* Footer */}
{/* <div className="p-4 border-t bg-[#f1d6a8] flex items-center space-x-2 shadow-inner">
    <input
    type="text"
    placeholder="Type a message..."
    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring text-[#5c4033] border-[#d0a96b] shadow-sm"
    />
    <button className="px-4 py-2 bg-[#d0a96b] text-white rounded-lg hover:bg-[#c39a5f] transition-all transform hover:scale-105">
    Gửi
    </button>
</div> */}