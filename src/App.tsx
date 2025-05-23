import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Booking from "./pages/user/Booking";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Dog from "./pages/user/Dog";
import Review from "./pages/user/Review.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminSignUp from "./pages/admin/AdminSignUp.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import PageNotFound from "./routes/PageNotFound.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Route Users */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dog"
            element={
              <PrivateRoute>
                <Dog />
              </PrivateRoute>
            }
          />
          <Route
            path="/review"
            element={
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Route Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="signup" element={<AdminSignUp />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
