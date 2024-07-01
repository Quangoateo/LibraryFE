import React, { useState } from "react";
import "./registerpage.css";
import { useNavigate } from "react-router-dom";  
import { toast , ToastContainer} from "react-toastify";
import { createReader } from "../../services/services";
const RegisterPage:React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    // const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [formData, setFormData] = useState({
        "address" : "",
        "email" : "",
        "firstName" : "",
        "lastName" : "",
        "password" : "",
        "phoneNumber" : "",
        "username" : "",
        "gender" : "",
        "image" : ""
    });


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
            await createReader(formData); // Use the service here
            console.log('Registration Successful');
            // Optionally, navigate to login or show success message

            toast.success('Registration Successful. Redirecting to login page...');

            setTimeout(() => {
                navigate('/login') 
            }
            , 3000);
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error (e.g., show error message)
        }
    }


    return (
        <div className="register-page-wrapper">
            <div className={`register-container`}>
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
                        value="M"
                        checked={formData.gender === "M"}
                        onChange={handleChange}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="radio-wrapper">
                        <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="F"
                        checked={formData.gender === "F"}
                        onChange={handleChange}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
            <ToastContainer />
        </div>
  );
};

export default RegisterPage;