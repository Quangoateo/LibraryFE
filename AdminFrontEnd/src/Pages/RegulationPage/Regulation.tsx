import React from "react";
import "./regulation.css";

const Regulation: React.FC = () => {
  return (
    <div className="regulation-page">
      <div className="content">
        <h1>Regulations for Admins - Online Library Management System</h1>
        <p>
          Welcome to the admin portal of our online library management system.
          Before you proceed with managing the library, please read and
          understand the following regulations carefully:
        </p>
        <h2>1. Account Registration</h2>
        <p>
          Admin accounts are created by the system administrator. To obtain an
          admin account, please contact the system administrator.
        </p>
        <h2>2. Library Management</h2>
        <p>
          As an admin, you are responsible for managing the library resources,
          including adding, updating, and removing books from the library
          database.
        </p>
        <h2>3. User Management</h2>
        <p>
          Admins have the authority to manage user accounts, including creating
          new accounts, updating user information, and deactivating or
          suspending user accounts if necessary.
        </p>
        <h2>4. Transaction Monitoring</h2>
        <p>
          Admins should monitor library transactions, including book borrowing
          and returning activities, to ensure the smooth functioning of the
          library system.
        </p>
        <h2>5. Data Security</h2>
        <p>
          Admins must ensure the security and confidentiality of library and
          user data. Access to sensitive information should be restricted to
          authorized personnel only.
        </p>
        <h2>6. Code of Conduct</h2>
        <p>
          Admins are expected to adhere to a professional code of conduct at all
          times while using the library management system and interacting with
          library users.
        </p>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these regulations or
          the operation of the library management system, please contact the
          system administrator at admin@examplelibrary.com.
        </p>
      </div>
    </div>
  );
};

export default Regulation;
