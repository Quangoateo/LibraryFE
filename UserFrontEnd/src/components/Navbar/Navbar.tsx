import { useState, useEffect, useRef } from "react"
import "./Navbar.css"
import logoImg from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { FaUser, FaBell } from "react-icons/fa";
import { getNotifications } from "../../services/NotificationServices";
import { markNotificationAsRead } from "../../services/NotificationServices";

// Declare type for notification
// type Notification = {
//     id: number;
//     message: string;
//     time: string;
// };

// const notilist: Notification[] = [
//     { id: 1, message: "First notification", time: "10:00 AM" },
//     { id: 2, message: "Second notification", time: "11:00 AM" },
//     { id: 3, message: "Third notification", time: "12:00 PM" },
// ];

interface Notification {
    notificationID: number;
    readerID: number;
    message: string;
    dateTime: string;
    isRead: boolean; // Add a property for read status
}

const Navbar = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    
    useEffect(() => {
        const readerID = JSON.parse(localStorage.getItem("ReaderData") || "{}").id;
        const fetchNotifications = async () => {
            const notilist = await getNotifications(readerID);
            console.log(notilist);
            const newUnreadCount = notilist.filter((n: Notification) => !n.isRead).length;
            console.log(newUnreadCount);
            setUnreadCount(newUnreadCount);

            const date = new Date() ;
            const vietnamTime = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // Adding 7 hours for Vietnam timezone
            const today = vietnamTime.toISOString().split('.')[0];   
            for (let i = 0; i < notilist.length; i++) {
                if(notilist[i].dateTime.split('T')[0] === today.split('T')[0]) {
                    // dont show seconds in time
                    notilist[i].dateTime = notilist[i].dateTime.split('T')[1].split(':')[0] + ':' + notilist[i].dateTime.split('T')[1].split(':')[1];
                } else {
                    notilist[i].dateTime = notilist[i].dateTime.split('T')[0];
                }
            }
            
            setNotifications(notilist);
        };

        fetchNotifications();

        // Listen for notification updates
        const handleNotificationsUpdated = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                const updatedNotifications = customEvent.detail as Notification[];
                setNotifications(updatedNotifications);
                setUnreadCount(updatedNotifications.filter((n) => !n.isRead).length);
            }
        };

        window.addEventListener('notificationsUpdated', handleNotificationsUpdated);

        return () => {
            window.removeEventListener('notificationsUpdated', handleNotificationsUpdated);
        };
    }, []);

    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setShowNotifications(false);
        }
    };
    

    const handleNotificationClick = (notification: Notification) => {
        markNotificationAsRead(notification.notificationID);
        setUnreadCount((prevCount) => prevCount - 1);
        setNotifications ((prevNotifications) => prevNotifications.map((n) => {
            if (n.notificationID === notification.notificationID) {
                return { ...n, isRead: true };
            }
            return n;
        }
        ));
        // setShowNotifications(false);
    };



    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light fixed-top" id="navbar">
            <div className="container">
                <Link to='/' className="navbar-brand">
                    <img src={logoImg} alt='site logo' />
                </Link>
                <button className="navbar-toggler" data-bs-target="#menu" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="menu">
                    <ul className="nav navbar-nav justify-content-center">
                        <li className="nav-item"><Link to="/home" className="nav-link">HOME</Link></li>
                        <li className="nav-item"><Link to="/search" className="nav-link">SEARCH</Link></li>
                        <li className="nav-item"><Link to="/confirm" className="nav-link">BORROW</Link></li>
                        <li className="nav-item"><Link to="/favorite" className="nav-link">FAVORITE</Link></li>
                        <li className="nav-item"><Link to="/review" className="nav-link">REVIEW</Link></li>
                    </ul>    
                    <div className="notification-wrapper" ref={notificationRef}>
                    <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
                                <FaBell size={20} />
                                {unreadCount > 0 && <span className="badge badge-danger">{unreadCount}</span>}
                            </button>
                            {showNotifications && (
                                <div className="notification-list">
                                    {notifications.slice().reverse().map((notification) => (
                                        <div
                                            key={notification.notificationID}
                                            className={notification.isRead ? "" : "bold"}
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <p>{notification.message}</p>
                                            <small>{notification.dateTime}</small>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    <ul className="nav navbar-nav justify-content-center">
                        <li className="nav-item"><Link to="/user" className="nav-link"><FaUser size={20} /><span>User</span></Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar