import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = ({FRONTENDURL, listing, setListing, showAllPhotos, setShowAllPhotos, bookingValues, setBookingValues}) => {
  return (
    <div className="bg-white flex py-4 flex-col justify-evenly items-stretch">
      <Header FRONTENDURL={FRONTENDURL} showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos}/>
      <div className="py-20 flex flex-col min-h-screen max-w-10xl mx-auto">
        <Outlet />
      </div>
      <Footer FRONTENDURL={FRONTENDURL} listing={listing} setListing={setListing} bookingValues={bookingValues} setBookingValues={setBookingValues}/>
    </div>
  );
}

export default Layout