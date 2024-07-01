  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import loginBgImage from "../../assets/img/tram.jpg";
  import loginLogo from "../../assets/img/VGU-logo.png";
  import "./login.css"; // Import the CSS file
  import axios from 'axios';
  import Cookies from "js-cookie"; // Import js-cookie library

  const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    
    const rememberMeCookieName = "rememberMe"; // Define cookie  

    // Inside your component
    useEffect(() => {
      const rememberMeValue = Cookies.get(rememberMeCookieName);
      const rememberedEmail = Cookies.get("rememberedEmail"); // Assuming you use this name for the email cookie
      const rememberedPassword = Cookies.get("rememberedPassword") || "";

      if (rememberMeValue) {
        setRememberMe(rememberMeValue === "true");
        if (rememberedEmail && rememberMeValue === "true") {
          setEmail(rememberedEmail); // Set the email if Remember Me was true
          setPassword(rememberedPassword); // Set the password if Remember Me was true
        }
      }
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      

      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    let navigate = useNavigate();

    const handleLogin = async () => {
      try {
        const response = await axios.post("https://proactive-elegance-production.up.railway.app/api/admins/authenticate", {
          email,
          password,
        });

        if (rememberMe) {
          // Save both Remember Me preference and the email
          Cookies.set(rememberMeCookieName, "true", { expires: 7 }); // Expires in 7 days
          Cookies.set("rememberedEmail", email, { expires: 7 }); // Save email in cookies
          Cookies.set("rememberedPassword", password, { expires: 7 }); // Save password in cookies
        } else {
          // If Remember Me is not checked, remove both
          Cookies.remove(rememberMeCookieName);
          Cookies.remove("rememberedEmail");
          Cookies.remove("rememberedPassword");
        }
    
        // Since there's no authToken, we'll focus on the user data
        const userData = response.data;
        console.log(response.data);

        // Consider what you really need to store; avoid sensitive data
        localStorage.setItem("userData", JSON.stringify({
          id: userData.id,
          address: userData.address,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          username: userData.username,
          gender: userData.gender,
          image: userData.image

          // Exclude sensitive details like 'password'
        }));
    
        // Navigate to the respective home page
        navigate("/home" , { state: { userData } });
      } catch (error: any) {
        let errorMessage = "Invalid Email or Password"; // Default message
    
        // Check if the error structure matches what your backend sends
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
    
        toast.error(errorMessage);
      }
    };
    

    const handleRegister = () => {
      navigate("/register");
    }

    return (
      <div className="grid wide login-container">
        <div className="row login-container-wrapper">
          <div className="col l-4 m-12 c-12">
            <div className="login-form-container">
              <img src={loginLogo} alt="VGU Logo" className="login-form-logo" />
              <div>
                <h1 className="login-form-title">Library Online Management</h1>
                <p className="login-form-subtitle">Please Sign in to continue</p>
              </div>
              <form className="login-form-content">
                <label className="login-form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="login-form-input"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <label className="login-form-label" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="login-form-input"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <div className="login-role-selection">
                </div>
                <div className="login-remember-forgot-container">
                  <div className="login-remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      className="login-remember-checkbox"
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="login-remember-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <div className="login-forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                </div>
                <div className="buttonArea">
                  <button
                    className="button login-form-button"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    className="button register-form-button"
                    type="button"
                    onClick={handleRegister}
                  >
                    Register
                  </button>

                </div>
              </form>
            </div>
          </div>
          {windowWidth >= 740 && (
          <div className="col l-8 m-12 c-12">
            <div className="login-image-container">
              <img
                src={loginBgImage}
                alt="Login Background"
                className="login-img"
              />
            </div>
          </div>
        )}

        </div>
        <ToastContainer />
      </div>
    );
  };

  export default Login;
