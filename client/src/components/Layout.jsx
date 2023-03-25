import Header from "./Header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-inter flex py-4 px-2 flex-col justify-evenly items-stretch">
      <Header />
      <div className="py-4 px-16 flex flex-col min-h-screen max-w-10xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout