import { useEffect, useState } from "react";
import { UserPaidDto } from "../dtos/user.dto";
import axios from "axios";
import { MeetingWithTimeDescriptionDto } from "../dtos/meeting.dto";
import Loading from "./Loading";

export default function AcceptedUser({ 
    meeting, 
    onClose 
}: {
    meeting: MeetingWithTimeDescriptionDto,
    onClose: () => void
}) {
    const [user, setUser] = useState<UserPaidDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAcceptedUser = async () => {
        try {
            const response = await axios.get(
                `https://backend-a2-2019-2022.onrender.com/userMeeting/listUserAccepted/${meeting.id}`
            );
            setLoading(false);
            setUser(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchAcceptedUser();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {loading && (
                <Loading/>
            )}
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl w-[460px] p-4 relative border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                    <p>Danh sách tham gia</p>
                    {/* Center the quantity text here */}
                    <div className="border-2 border-gray-500 max-w-32 px-4 py-2 mx-auto rounded mt-2">
                        <p className="text-sm text-gray-400 text-center">
                            <i>Số lượng</i>: <b className="text-green-500">{user.length}</b>
                        </p>
                    </div>         
                </h3>
                <ul className="space-y-4 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {user.map((u) => (
                        <li
                            key={u.id}
                            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-[400px]"
                        >
                            <img
                                src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                alt={u.name}
                                className="w-14 h-14 rounded-full object-cover shadow-md"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-800">{u.name}</p>
                                <p className="text-sm text-gray-500">
                                    {u.phoneNumber || "Chưa có SĐT"}
                                </p>
                            </div>
                            {u.paid === "Yes" && meeting.status === "Yes" && (
                                <span className="text-green-500 text-sm">
                                    Đã chuyển cọc
                                </span>
                            )}
                            {u.paid === "Yes" && meeting.status === "No" && (
                                <span className="text-green-500 text-sm">
                                    Đã chuyển tiền
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}
