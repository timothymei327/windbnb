import Header from "./Header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex p-2 flex-col justify-evenly items-stretch">
      <Header />
      <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout