import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Modal, Upload, message } from "antd";
import {
  ToolOutlined,
  HomeOutlined,
  FileProtectOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import VGULogo from "../../assets/img/VGU-logo.png";
import "./sidebar.css";
import "boxicons";
import axios from "axios";


const { Sider } = Layout;

const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [avatarModalVisible, setAvatarModalVisible] = useState(false);
    const [user, setUser] = useState({
        id: "1",
        address: "123 Vo Truong Toan, tp. Da Nang",
        email: "hai@gmail.com",
        firstName: "Thanh Hai",
        lastName: "Le",
        password: "123456789", // Be cautious with password handling
        phone: "0123456789",
        username: "hai",
        gender: "male",
        image: "",
    });
    
    useEffect(() => {
        const userData = localStorage.getItem('userData'); // Retrieve userData from local storage
        if (userData) {
            const parsedUserData = JSON.parse(userData); // Parse the JSON string to object
            setUser(parsedUserData); // Set the user state with the retrieved data
        }
    }, []);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
     const handleAvatarChange = async (file: File) => {
        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('adminID', user.id);

            // Send the image to the server
            const response = await axios.post("https://proactive-elegance-production.up.railway.app/api/admins/upload-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  
                },
            });
            // Update the user state with the new image
            setUser((prevState) => ({ ...prevState, image: response.data }))
            // Update the local storage with the new image
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                localStorage.setItem('userData', JSON.stringify({ ...parsedUserData, image: response.data }));
            }
            message.success('Avatar updated successfully');
        } catch (error) {
            console.error('Error updating avatar:', error);
            message.error('An error occurred. Please try again');
        }
    };
    return (
        <>
        {/* Toggle button */}
        <div
            className="sidenav-toggle-btn"
            onClick={toggleCollapsed}
            style={{
            position: 'fixed',
            top: '5px',
            left: collapsed ? '5px' : '270px', // Adjust position based on collapsed state
            zIndex: 1000,
            cursor: 'pointer'
            }}
        >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Sider
            className={`sidenav-container ${collapsed ? "collapsed" : ""}`}
            width={300}
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            collapsed={collapsed}
            onBreakpoint={broken => {
                setCollapsed(broken);
            }}
        >
            <div className="sidenav-logo-name-container">
                <Link to="/">
                    <img src={VGULogo} alt="Logo" className="sidenav-logo" />
                </Link>
                <div className="sidenav-app-name">Admin Dashboard</div>
            </div>

            <Menu
                mode="vertical"
                theme="light"
                defaultSelectedKeys={["1"]}
                className="sidenav-menu-bar"
            >

                {/* Home Section  */}
                <Menu.Item key="homepage" icon={<HomeOutlined />}>
                <Link to="/home">Home Page</Link>
                </Menu.Item>

                {/* Management Section */}
                <Menu.SubMenu
                    key="management"
                    icon={<ToolOutlined />}
                    title="Management"
                >
                    <Menu.Item key="RentalManagement">
                        <Link to="/managerentals">Rental Management</Link>
                    </Menu.Item>
                    <Menu.Item key="BooksManagement">
                        <Link to="/managebooks"> Books Management</Link>
                    </Menu.Item>
                </Menu.SubMenu>

                {/* Regulation Section */}
                <Menu.Item key="regulation" icon={<FileProtectOutlined />}>
                    <Link to="/regulations">Regulation</Link>
                </Menu.Item>

                {/* Calendar Section */}
                <Menu.Item key="calendar" icon={<CalendarOutlined />}>
                    <Link to="/calendar">Calendar</Link>
                </Menu.Item>

                {/* Help Section */}
                <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
                <Link to="/help">Help</Link>
                </Menu.Item>

                {/* Notification Section */}
                <Menu.Item key="notification" icon={<BellOutlined />}>
                <Link to="/notification">Notification</Link>
                </Menu.Item>


                {/* Profile Section */}
                <div className="sidenav-profile-section">
                    <div className="sidenav-profile-section-wrapper">
                    <Avatar
                        className="sidenav-avatar"  
                        src={`data:image/jpeg;base64,${user.image}`}
                        icon={!user.image ? <i className="bx bxs-user"></i> : undefined}
                        onClick={() => setAvatarModalVisible(true)}
                    />
                    <div className="sidenav-profile-user-info">
                        <div className="sidenav-user-details">
                            <div className="sidenav-user-name">{user.username}</div>
                            <div className="sidenav-user-role">{'admin'}</div>
                        </div>
                        {/* Render email if available */}
                        {user.email && (
                            <div className="sidenav-user-email">{user.email}</div>
                        )}
                    </div>
                    <div className="sidenav-signout-btn">
                        <Link to="/login">
                        <i className="bx bx-log-out"></i>
                        </Link>
                    </div>
                    </div>
                </div>
            </Menu>
        </Sider>

        {/* Avatar Modal */}
        <Modal
            title="Change Avatar"
            visible={avatarModalVisible}
            onCancel={() => setAvatarModalVisible(false)}
            footer={null}
        >
            <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={(file) => {
                    handleAvatarChange(file);
                    return false; // Prevent default upload behavior
                }}
            >
                {user.image ? (
                    <Avatar src={`data:image/jpeg;base64,${user.image}`} size={80} />
                ) : (
                    <div>
                        <i className="bx bxs-user"></i>
                        <div className="ant-upload-text">Upload</div>
                    </div>
                )}
            </Upload>
        </Modal>
        </>
    );
};

export default SideBar;
