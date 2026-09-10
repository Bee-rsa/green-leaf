import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const UserLayout = () => {
  const location = useLocation();

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer - Hidden on Login */}
      {location.pathname !== "/login" && <Footer />}
    </>
  );
};

export default UserLayout;