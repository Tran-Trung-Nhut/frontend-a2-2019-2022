import waiting from "../assets/waiting.png";
import "./css/Loading.css"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 text-center w-[500px]">
        <img
          src={waiting}
          alt="Loading Icon"
          className="w-24 h-24 mx-auto mb-6 animate-bounce"
        />

        <p className="text-lg text-gray-700 font-semibold mb-4 loading-text">
          {["Đang", "tải", "dữ", "liệu,", "vui", "lòng", "đợi", "trong", "giây", "lát..."].map(
            (word, index) => (
              <span key={index} className="word">
                {word}&nbsp;
              </span>
            )
  )}
        </p>

        {/* <p className="text-sm text-gray-500 italic mb-4">
          Ứng dụng được phát triển chưa đầy 5 tiếng nên còn nhiều sai sót, mong các bạn thông cảm.
        </p> */}

        {/* <p className="text-sm text-gray-800 font-medium">
          Tính năng mới sắp ra mắt:{" "}
          <span className="font-bold text-blue-600">Diễn đàn</span>
        </p> */}
      </div>
    </div>
  );
}
