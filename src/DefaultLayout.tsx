import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function DefaultLayout () {
    return(
        <div className="w-[98.8vw] scrollbar-hide">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}