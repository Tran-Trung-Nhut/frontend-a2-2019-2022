import background from "../assets/backgroundHome.jpg";
import Footer from "../components/Footer";
import logo from "../assets/logoClass.png";

export default function NotFound() {
  return (
    <>
      <div
        className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${background})`,width: 'var(--bg-width)', height: 'var(--bg-height)' }}
        >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 backdrop-blur-lg"></div>
        <div className="relative text-center p-10 rounded-lg shadow-xl bg-opacity-60" style={{ backdropFilter: 'blur(0.5px)' }}>
          <h1 className="md:text-6xl text-4xl text-yellow-400 font-extrabold mb-4 animate__animated animate__fadeIn">
            TRANG KHÔNG TỒN TẠI
          </h1>
          <p className="md:text-xl mb-6">
            Trang bạn đang tìm kiếm có thể đã bị di chuyển hoặc xóa.
            <br />
            Nếu bạn có thắc mắc, hãy liên hệ với{" "}
            <span className="font-bold italic text-yellow-300">Trung Nhựt</span>{" "}
            Zalo: <span className="font-bold text-yellow-300">0389819223</span>
          </p>
          <div className="mb-6">
            <img
              src={logo}
              alt="404 Not Found"
              className="w-36 h-36 mx-auto mb-6"
            />
          </div>
          <a
            href="/"
            className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-500 hover:text-white transition duration-300"
          >
            Quay Lại Trang Chủ
          </a>
          <p className="text-md mt-4">Chúc các bạn một ngày tốt lành!</p>
        </div>
      </div>
      <Footer />
    </>
  );
}