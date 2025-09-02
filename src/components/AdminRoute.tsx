import NotFound from "../pages/NotFound";
import { getRole } from "../utils/functions";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {

    const role = getRole();

    if(role !== 'admin') {
        return <NotFound/>
    }

    return (
        <Outlet/>
    )
}

export default AdminRoute