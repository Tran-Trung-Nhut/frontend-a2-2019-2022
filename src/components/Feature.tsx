import release from "../assets/release.png";

export default function FeaturePopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center w-[500px] max-w-sm">
        <img
          src={release}
          alt="Feature Coming Soon"
          className="w-36 h-36 mx-auto mb-6 animate-bounce"
        />
        <p className="text-2xl text-gray-800 font-semibold mb-4">
          Tính năng sắp ra mắt!
        </p>
        <p className="text-sm text-gray-500 italic mb-6">
          Vui lòng đợi Trung Nhựt thi xong nhé.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-6 rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-90"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
