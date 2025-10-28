import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SendOTP } from "./pages/SendOtp.jsx";
import { VerifyOTP } from "./pages/VerifyOtp.jsx"; 
import { ProfileSection } from "./component/Getprofile.jsx";
import { ChatBox } from "./component/chat.jsx";
import { ToastProvider } from "./util/toas.jsx";

function App() {
  return (
    <ToastProvider >
    <Router>
      <Routes>
        <Route path="/" element={<ProfileSection />} />
        <Route path="/otp" element={<SendOTP />} />
        <Route path="/verify" element={<VerifyOTP />} />
         <Route path="/chat" element={<ChatBox />} />
      </Routes>
    </Router>
    </ToastProvider>
  );
}

export default App;
