import { MeetingWithTimeDescriptionDto } from "../dtos/meeting.dto"

export default function MeetingCard ({
    meeting,
    handleShowForum,
    handleShowUser
} : {
    meeting: MeetingWithTimeDescriptionDto,
    handleShowForum: (meeting: MeetingWithTimeDescriptionDto) => void
    handleShowUser: (meeting: MeetingWithTimeDescriptionDto) => void
}) {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return(
        <div
            className="border border-gray-300 rounded-lg p-6 w-72 h-[500px] shadow-lg bg-white/80 backdrop-blur-md flex flex-col items-center"
        >
            <p className="text-lg font-semibold text-gray-800">
                <strong>Ngày diễn ra:</strong> {formatDate(meeting.date)}
            </p>
            <p className={`text-md mt-2 ${meeting.status === 'Yes' ? 'text-green-600' : 'text-gray-600'}`}>
                <strong className="text-gray-600">Trạng thái:</strong> {meeting.status === 'Yes' ? 'Sắp tới' : 'Đã kết thúc'}
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
    )
}