import React from "react";
import "./HelpPage.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const HelpPage: React.FC = () => {
  return (
    <div className="help-page">
      <div className="content">
        <h1>Need Help?</h1>
        <p>
          If you have any questions or need assistance, feel free to contact us
          using the following methods:
        </p>
        <div className="contact-info">
          <div className="contact-method">
            <FaEnvelope className="icon" />
            <p>Email us at: support@example.com</p>
          </div>
          <div className="contact-method">
            <FaPhone className="icon" />
            <p>Call us at: +1234567890</p>
          </div>
        </div>
        <p>
          Our support team is available during business hours to assist you
          with any inquiries or issues you may have.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
