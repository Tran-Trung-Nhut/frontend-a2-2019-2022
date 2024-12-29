import { UserDto } from "../dtos/user.dto";

const OrgChartNode = ({ name, role, avatar }: { name: string; role: string; avatar: string }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-lg w-56 h-56 justify-between border border-gray-300">
      <img src={avatar} alt={name} className="w-20 h-20 rounded-full border-4 border-gray-300 mx-auto" />
      <div className="text-lg font-semibold text-gray-800 text-center">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  );
};

const chunkArray = (arr: any[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const OrgChart = ({ data }: { data: UserDto[] }) => {
  const roles = ["Chủ nhiệm", "Lớp trưởng", "Lớp phó", "Tổ trưởng", "Thành viên"];
  
  const groupedData = roles.map(role => data.filter(member => member.role.includes(role)));

  return (
    <div className="flex flex-col items-center space-y-12 mt-10">
      {groupedData.map((group, index) => (
        <div key={index} className="flex flex-col items-center space-y-6">
          {chunkArray(group, 4).map((chunk, idx) => (
            <div key={idx} className="flex justify-center space-x-10">
              {chunk.map((member, idx) => (
                <OrgChartNode 
                  key={idx} 
                  name={member.name} 
                  role={member.role} 
                  avatar={"https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"} 
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function ClassStructurePage({
  members,
  onClose
}: {
  members: UserDto[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-800 flex justify-center items-center">
      <div className="w-full h-full p-8 rounded-lg shadow-lg overflow-auto relative">
        <button
          onClick={() => onClose()}
          className="absolute top-6 left-6 text-2xl text-white hover:text-gray-300"
        >
          &#8592; Quay lại
        </button>

        {/* Tiêu đề */}
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-7xl font-extrabold text-white">
            Cơ Cấu Lớp Học
          </h1>
        </div>

        <OrgChart data={members} />
      </div>
    </div>
  );
}
