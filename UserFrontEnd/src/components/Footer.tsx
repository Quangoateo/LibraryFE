import "./Footer.css";
import { FaFacebookMessenger, FaFacebookSquare, FaInstagram, FaYoutube, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <footer className='footer'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-6 col-12'>
                  <div className='footer-info'>
                    <h3>Library for highland children</h3>
                    <p>
                      <strong>Ring road 4, Quarter 4, Thoi Hoa Ward, Ben Cat Town, Binh Duong Province</strong>
                    </p>
                    <p>Tel. (0274) 222 0990 - 70206</p>
                    <p>Fax: (0274) 222 0980</p>
                  </div>
                  <div>
                    <p><FaEnvelope /> onlinelibrary@gmail.com</p>
                  </div>
                  <div>
                    <p>Copyright @2024 by Online Library</p>
                  </div>
                </div>
                <div className='col-md-6 col-12'>
                  <div className='text-center'>
                    <div className='is-divider'></div>
                    <div className='footer-quote'>
                      <blockquote>
                        <p>
                          <em>"You must be the change you wish to see in the world."</em>
                        </p>
                      </blockquote>
                    </div>
                    <div className='is-divider'></div>
                  </div>
                  <div className='footer-icons'>
                    <span>
                      <a href="https://www.facebook.com/hailukes/" >
                          <FaFacebookSquare />
                      </a>
                    </span>
                    <span>
                      <a href="https://www.instagram.com/thenhai2k3/" target="_blank" rel="noopener noreferrer">
                          <FaInstagram />
                      </a>
                    </span>
                    <span>
                      <a href="https://www.facebook.com/hailukes/" target="_blank" rel="noopener noreferrer">
                          <FaFacebookMessenger />
                      </a>
                    </span>
                    <span>
                      <a href="https://www.linkedin.com/in/le-thanh-hai-3bb349236/" target="_blank" rel="noopener noreferrer">
                          <FaLinkedin />
                      </a>
                    </span>
                    <span>
                        <a href="https://www.youtube.com/@Hailu03" target="_blank" rel="noopener noreferrer">
                          <FaYoutube />
                        </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer