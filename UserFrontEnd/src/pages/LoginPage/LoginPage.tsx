import { useEffect } from "react";
import "./loginpage.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../services/services";



const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    let navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const checkbox = document.getElementById('rememberMe') as HTMLInputElement;
            if(checkbox.checked) {
                localStorage.setItem("Email", email);
                localStorage.setItem("Password", password);
            } else {
                localStorage.removeItem("Email");
                localStorage.removeItem("Password");
            }

            const response = await authenticate(email, password);
            localStorage.setItem("ReaderData", JSON.stringify(response));

            console.log(response);
            toast.success(`Successfully logged in as ${email}`);
            
            setTimeout(() => {
                navigate("/home");
            }, 2000);
            
        } catch (error : any) {
            console.error(error);
            let errorMessage = error.response?.data || "Invalid Email or Password"; // Use the error message from the server, if available
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('Email');
        const savedPassword = localStorage.getItem('Password');
      
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            const rememberMeCheckbox = document.getElementById('rememberMe') as HTMLInputElement;
            if (rememberMeCheckbox) {
                rememberMeCheckbox.checked = true;
            }
        }
      }, []);

    const handleRegister = () => {
        navigate("/register");
      }

    return (
        <div className="loginPage">
            {/* <section>
                <div className="banner-login">
                    <div className='banner-text-login'>
                        <h2>find your book of choice</h2>
                        <br />
                        <p className='header-text-login fs-18 fw-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Fusce ut rhoncus ligula, eu viverra ex. Aliquam non mauris sed neque convallis semper ut ac magna.
                            Etiam ornare feugiat consequat.</p>
                    </div>
                </div>
            </section>   */}

                <div className="login-form-container">
                    <p className="login-form-subtitle">Please Sign in to continue</p>
                    <form className="login-form-content">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                value={password}
                            />
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="form-check-input"

                            />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="form-group">
                            <a href="/forgot-password">Forgot Password?</a>
                        </div>
                        <div className="buttonArea">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        </div>
                    </form>

            </div>
            <ToastContainer />
            {/* <Footer /> */}
        </div>
        );
};

export default LoginPage;
