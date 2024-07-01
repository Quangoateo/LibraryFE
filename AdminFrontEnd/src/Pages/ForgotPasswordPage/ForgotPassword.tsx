import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgotPassword.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { confirmEmail, resetPassword } from '../../services/AdminService';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>(""); // State for new password
    const [phase, setPhase] = useState<'email' | 'reset'>('email'); // Phase state to toggle between email and reset
    let navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
        const response = await confirmEmail(email);
        if (response.status === 200) {
            toast.success('Email confirmed. Please check your email for the reset link.');
            setPhase('reset'); // Change the phase to reset
        }
        } catch (error: any) {
        toast.error('Error confirming email.');
        }
    };

    const handleResetPassword = async () => {
        try {
        const response = await resetPassword(email, newPassword);
        if (response.status === 200) {
            toast.success('Password reset successful.');
            setTimeout(() => {
                navigate('/'); // Navigate to login page after a delay
            }, 2000);
        }
        } catch (error: any) {
        toast.error('Error resetting password.');
        }
    };

    const renderResetPhase = () => (
        <div className="reset-password-container">
        <h1>Reset Password</h1>
        <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={() => handleResetPassword()}>Reset Password</button>
        </div>
    );

    const renderEmailPhase = () => (
        <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
        />
        <button onClick={() => handleForgotPassword()}>Reset Password</button>
        </div>
    );

    return (
        <div className="forgot-password-page">
        {phase === 'email' ? renderEmailPhase() : renderResetPhase()}
        <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
