import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "..//components/Login";
import VerifyOTP from ".//components/VerifyOTP";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
            </Routes>
        </Router>
    );
}

export default App;
