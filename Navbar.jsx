import {
    Bell,
    User
} from "lucide-react";


function Navbar({ title }) {

    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    return (

        <header className="navbar">

            <div>

                <h1>{title}</h1>

                <p>
                    Faculty Intelligence & Academic Analytics
                </p>

            </div>


            <div className="navbar-right">

                <button className="icon-button">
                    <Bell size={20} />
                </button>


                <div className="profile">

                    <div className="profile-icon">
                        <User size={18} />
                    </div>

                    <div>

                        <strong>
                            {user.name || "Administrator"}
                        </strong>

                        <span>
                            {user.role || "Admin"}
                        </span>

                    </div>

                </div>

            </div>

        </header>

    );
}


export default Navbar;