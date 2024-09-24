import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { HomePage } from "./components/HomePage";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import Logout from "./components/Logout";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
