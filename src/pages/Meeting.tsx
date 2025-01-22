import axios from "axios";
import { useEffect, useState } from "react";
import { defaultMeetingWithTimeDescription, MeetingWithTimeDescriptionDto } from "../dtos/meeting.dto";
import background from "../assets/backgroundHome.jpg";
import AcceptedUser from "../components/AcceptedUser";
import Loading from "../components/Loading";
import FeaturePopup from "../components/Feature";
import Forum from "../components/ForumPopup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dropDownHeaderState, userState } from "../state";

export default function Meeting() {
    const [meetings, setMeetings] = useState<MeetingWithTimeDescriptionDto[]>([]);
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingWithTimeDescriptionDto>(defaultMeetingWithTimeDescription);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true)
    const [showNewFeature, setShowNewFeature] = useState<boolean>(false)
    const [isShowForum, setIsShowForum] = useState<boolean>(false)
    const setDropdownOpen = useSetRecoilState(dropDownHeaderState)
    const user = useRecoilValue(userState)

    const fetchMeeting = async () => {
        try {
            const response = await axios.get('https://backend-a2-2019-2022.onrender.com/meeting');
            setLoading(false)
            setMeetings(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleShowUser = async (meeting: MeetingWithTimeDescriptionDto) => {
        try {
            if(user.name !== ''){
                await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess',{
                name: user.name,
                })
            }
            setSelectedMeeting(meeting),
            setIsPopupOpen(true)
        } catch (error) {
            alert("Có lỗi xảy ra vui lòng thử lại!")
        }
    }

    const handleShowForum = async (meeting: MeetingWithTimeDescriptionDto) => {
        try {
            if(user.name !== ''){
                await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess',{
                    name: user.name,
                })
            }
            setSelectedMeeting(meeting)
            setIsShowForum(true)
        } catch (error) {
            alert("Có lỗi xảy ra vui lòng thử lại!")
        }
    }

    useEffect(() => {
        fetchMeeting();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden" onClick={() => setDropdownOpen(false)}>
            {isPopupOpen && (
                <AcceptedUser
                onClose={() => setIsPopupOpen(false)}
                meeting={selectedMeeting}
                />
            )}
            {loading && (
                <Loading/>
            )}
            {showNewFeature && (
                <FeaturePopup onClose={() => setShowNewFeature(false)}/>
            )}
            {isShowForum && (
                <Forum
                onClose={() => setIsShowForum(false)}
                meetingId={selectedMeeting.id}
                />
            )}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm"
                style={{ backgroundImage: `url(${background})` }}
            ></div>

            <div className="relative p-4 flex flex-wrap gap-6 justify-center">
                {meetings.map((meeting) => (
                    <div
                        key={meeting.id}
                        className="border border-gray-300 rounded-lg p-6 w-72 shadow-lg bg-white/80 backdrop-blur-md flex flex-col items-center"
                    >
                        <p className="text-lg font-semibold text-gray-800">
                            <strong>Ngày diễn ra:</strong> {meeting.date}
                        </p>
                        <p className="text-md text-gray-600 mt-2">
                            <strong>Trạng thái:</strong> {meeting.status === 'Yes' ? 'Sắp tới' : 'Đã xong'}
                        </p>

                        <h4 className="text-lg font-bold text-blue-800 mt-4">Lịch trình:</h4>
                        <table className="w-full border-collapse mt-2">
                            <thead>
                                <tr className="bg-blue-100">
                                    <th className="border border-gray-300 p-2 text-center text-sm font-medium text-gray-700">Thời gian</th>
                                    <th className="border border-gray-300 p-2 text-center text-sm font-medium text-gray-700">Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meeting.timeDescription.map((timeDesc, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-200`}
                                    >
                                        <td className="border text-center border-gray-300 p-2 text-sm text-gray-800">{timeDesc.time}</td>
                                        <td className="border border-gray-300 p-2 text-sm text-gray-800">{timeDesc.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button
                            type="button"
                            className="mt-4 px-4 py-2 w-full bg-blue-600 text-white rounded-full font-semibold text-sm shadow-md hover:bg-blue-700 hover:scale-110 focus:ring-2 focus:ring-blue-400 transition duration-300"
                            onClick={() => handleShowUser(meeting)}
                        >
                            Xem người tham gia
                        </button>
                        <button
                            type="button"
                            className="mt-4 px-4 py-2 w-full border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-sm shadow-md hover:scale-110  focus:ring-2 focus:ring-blue-400 transition duration-300"
                            onClick={() => handleShowForum(meeting)}
                        >
                            Diễn đàn
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
