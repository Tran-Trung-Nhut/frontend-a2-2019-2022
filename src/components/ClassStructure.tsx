import { UserDto } from "../dtos/user.dto";
import background from "../assets/backgroundHome.jpg";

const OrgChartNode = ({ name, role, avatar }: { name: string; role: string; avatar: string }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg w-full sm:w-60 h-auto justify-between border border-gray-300 hover:shadow-xl hover:border-gray-400 transition-all duration-300">
      <img
        src={avatar}
        alt={name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-200 shadow-md"
      />
      <div className="mt-4 text-lg sm:text-xl font-bold text-gray-800 text-center tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition duration-300">
        {name}
      </div>
      <div className="text-sm text-gray-500 italic">{role}</div>
    </div>
  );
};

const OrgChart = ({ data }: { data: UserDto[] }) => {
  const roles = ["Chủ nhiệm", "Lớp trưởng", "Lớp phó", "Tổ trưởng", "Thành viên"];
  const groupedData = roles.map(role => data.filter(member => member.role.includes(role)));

  return (
    <div className="flex flex-col items-center space-y-16 mt-10">
      {groupedData.map((group, index) => (
        <div key={index} className="w-full">
          {/* Tên vai trò */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-500 text-center mb-6">
            {roles[index]}
          </h2>

          {/* Nhóm thành viên */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
            {group.map((member, idx) => (
              <OrgChartNode
                key={idx}
                name={member.name}
                role={member.role}
                avatar={"https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ClassStructurePage({
  members,
  onClose,
}: {
  members: UserDto[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600 flex justify-center items-center">
      <div className="relative w-full h-full sm:w-[95%] sm:h-[90%] p-6 sm:p-10 bg-white bg-opacity-80 rounded-xl shadow-2xl overflow-auto">
        {/* Nút quay lại */}
        <button
          onClick={() => onClose()}
          className="absolute top-6 left-6 text-xl sm:text-2xl text-gray-700 hover:text-gray-900 transition duration-200"
        >
          &#8592; Quay lại
        </button>

        {/* Tiêu đề */}
        <div className="flex justify-center items-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg">
            Cơ Cấu Lớp Học
          </h1>
        </div>

        {/* Hiển thị thông tin các thành viên */}
        <OrgChart data={members} />
      </div>
    </div>
  );
}
