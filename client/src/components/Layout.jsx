import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = ({FRONTENDURL, showAllPhotos, setShowAllPhotos}) => {
  return (
    <div className="font-inter bg-white flex py-4 flex-col justify-evenly items-stretch">
      <Header FRONTENDURL={FRONTENDURL} showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos}/>
      <div className="py-20 flex flex-col min-h-screen max-w-10xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout