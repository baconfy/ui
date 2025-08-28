import {Outlet} from "react-router-dom";
import {Navigation} from "./components/navigation";

const Layout = () => (
  <div className="relative min-h-screen">
    <Navigation />

    <main className="p-4 md:p-12">
      <Outlet />
    </main>
  </div>
);

export default Layout;