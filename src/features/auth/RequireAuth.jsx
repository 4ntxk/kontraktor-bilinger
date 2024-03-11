import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";

const RequireAuth = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  return token ? (
    <>
      <Sidebar className="mx-6" />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
