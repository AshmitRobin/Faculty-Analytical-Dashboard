import {
    LayoutDashboard,
    Users,
    Building2,
    LogOut
} from "lucide-react";

import {
    NavLink,
    useNavigate
} from "react-router-dom";


function Sidebar() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    const linkClass = ({ isActive }) =>

        `sidebar-link ${
            isActive ? "active" : ""
        }`;


    return (

        <aside className="sidebar">

            <div className="logo">

                <div className="logo-icon">
                    FI
                </div>

                <div>
                    <h2>Faculty</h2>
                    <span>Intelligence</span>
                </div>

            </div>


            <nav>

                <NavLink
                    to="/"
                    className={linkClass}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>


                <NavLink
                    to="/faculty"
                    className={linkClass}
                >
                    <Users size={20} />
                    Faculty
                </NavLink>


                <NavLink
                    to="/colleges"
                    className={linkClass}
                >
                    <Building2 size={20} />
                    Colleges
                </NavLink>

            </nav>


            <button
                className="logout-button"
                onClick={logout}
            >
                <LogOut size={19} />
                Logout
            </button>

        </aside>

    );
}


export default Sidebar;