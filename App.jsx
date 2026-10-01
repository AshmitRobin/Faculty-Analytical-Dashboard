import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Colleges from "./pages/Colleges";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Dashboard */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Faculty */}

                <Route
                    path="/faculty"
                    element={
                        <ProtectedRoute>
                            <Faculty />
                        </ProtectedRoute>
                    }
                />


                {/* Colleges */}

                <Route
                    path="/colleges"
                    element={
                        <ProtectedRoute>
                            <Colleges />
                        </ProtectedRoute>
                    }
                />


                {/* Unknown URL */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;