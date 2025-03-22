import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebaseConfig";

const VerifyOTP = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmation, setConfirmation] = useState(null);
    const [error, setError] = useState("");

    const sendOTP = async () => {
        setError("");
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible"
            });
            const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
            setConfirmation(confirmationResult);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOTP = async () => {
        setError("");
        try {
            await confirmation.confirm(otp);
            alert("2FA Verification Successful!");
        } catch (err) {
            setError("Invalid OTP. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div id="recaptcha-container"></div>
                {!confirmation ? (
                    <>
                        <input type="text" placeholder="Phone Number" className="border p-2 w-full mb-2"
                            value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <button onClick={sendOTP} className="bg-blue-500 text-white px-4 py-2 w-full">Send OTP</button>
                    </>
                ) : (
                    <>
                        <input type="text" placeholder="Enter OTP" className="border p-2 w-full mb-2"
                            value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        <button onClick={verifyOTP} className="bg-green-500 text-white px-4 py-2 w-full">Verify OTP</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;
