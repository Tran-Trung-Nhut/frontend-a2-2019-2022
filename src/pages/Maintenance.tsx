import background from "../assets/backgroundHome.jpg";
import Footer from "../components/Footer";
import logo from "../assets/logoClass.png";


export default function MaintenancePage() {
  return (
    <>
        <div
        className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${background})` }}
        >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 backdrop-blur-lg"></div>   
        <div className="relative text-center p-10 rounded-lg shadow-xl bg-opacity-60" style={{ backdropFilter: 'blur(0.5px)' }}>
            <h1 className="md:text-6xl text-4xl text-yellow-400 font-extrabold mb-4 animate__animated animate__fadeIn">
              HỆ THỐNG ĐANG TẠM NGƯNG <br/> HOẠT ĐỘNG
            </h1>
            <p className="md:text-xl mb-6">
                Nếu các bạn có nhu cầu muốn sử dụng hệ thống,
                <p>hãy liên hệ với{" "} <span className="font-bold italic text-yellow-300">Trung Nhựt</span>{" "}</p>
                Zalo: <span className="font-bold text-yellow-300">0389819223</span>
            </p>

            <div className="mb-6">
            <img
            src={logo}
            alt="Feature Coming Soon"
            className="w-36 h-36 mx-auto mb-6"
            />
            </div>
            <p className="text-md">
            Chúc các bạn một ngày tốt lành!
            </p>
        </div>
        </div>
        <Footer/>
    </>
  );
}
