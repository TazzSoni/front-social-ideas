import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./dasboard";
import Login from "./auth/login";
import { getUserData } from "../infra/storage/local-storage";
import Register from "./auth/register";

const ProtectedRoute = ({ children }) => {
  const userData = getUserData();

  if (!userData) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />

        <Route
          path={"/"}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default AppRouter;
