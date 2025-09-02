import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../utils/functions";

export default function PrivateRoute() {

    const token = getToken();
    const location = useLocation();

    if (!token) {
        return <Navigate to={`/login?next=${location.pathname}`} replace />;
    }

    return <Outlet/>;
}