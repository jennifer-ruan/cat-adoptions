import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div>
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header />
        <div className="sm:px-8 md:px-32 xl:px-72">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
