import React, { useState, useEffect } from "react";
import "./registerpage.css";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from '../../services/AdminService';

const RegisterPage: React.FC = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        gender: "",
        avatar: ""
    });

    useEffect(() => {
        const checkSize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', checkSize);
        // Check at least once on component mount
        checkSize();
        return () => window.removeEventListener('resize', checkSize);
    }, []);
    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                navigate('/'); // Redirect to login page
            }, 3000); // Wait for 3 seconds before redirecting
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage, navigate]);
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checkbox = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checkbox.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        } 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if isAdmin is true before sending the data
        // Since isAdmin is true, prepare data excluding the isAdmin property
        try {
            await registerAdmin(formData); // Use the service here
            console.log('Registration Successful');
            setShowSuccessMessage(true);
            // Optionally, navigate to login or show success message
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div className="register-page-wrapper">
            <div className={`register-container ${isSmallScreen ? 'small-screen' : ''}`}>
                <h1>Register Page</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>

                    <div className="form-field">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-field full-width">
                        <label>Phone:</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div className="form-field form-field-full">
                        <label>Address:</label>
                        <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
                    </div>

                    <label>Gender:</label>
                    <div className="radio-wrapper">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="radio-wrapper">
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                    <button type="submit">Register</button>
                </form>
                {showSuccessMessage && (
                    <div className="success-message">
                        You have successfully registered as an admin. Redirecting to login...
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;