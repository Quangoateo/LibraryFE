import React, { useEffect, useState } from 'react';
import "./NotificationPage.css";
import {getNotifications} from "../../services/NotificationService";
import moment from 'moment';
interface Notification {
  bookID: number;
  readerID: number; 
  firstName: string;
  lastName: string;
  message: string;
  bookTitle: string;
  dateTime: string;
}
const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); 
  useEffect(() => {
    const fetchNotifications = async () => {
        try{
          const notilist = await getNotifications();
          // slice the array to get the last 5 notifications
          const slicedNotilist = notilist.slice(Math.max(0,30));
          setNotifications(slicedNotilist);
        }
        catch(error){
          console.log("Error fetching notifications", error);
        }
    };
    fetchNotifications();
  }, []
  )
// const notification = getNotifications();
  return (
     <div className="notification-page">
       <h1>Notification Page</h1>
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.bookID}
            className={`notification-panel ${notification.bookID}`}
          >
            <p>
              {notification.firstName} {notification.message.includes("borrowed") ? (
                `borrowed "${notification.bookTitle}" at ${moment(notification.dateTime).format("MMMM Do YYYY")}`
              ) : (
                `returned "${notification.bookTitle}" at ${moment(notification.dateTime).format("MMMM Do YYYY")}`
              )}
            </p>
          </div>
        ))}
      </div>
    </div> 
  );
};

export default NotificationPage;



    // Listen for notification updates
    // const handleNotificationsUpdated = (event: Event) => {
    //   const customEvent = event as CustomEvent<Notification[]>;
    //   if (customEvent.detail) {
    //     const updatedNotifications = customEvent.detail as Notification[];
    //     setNotifications(updatedNotifications);
    //   }
    // };
    // window.addEventListener('notificationsUpdated', handleNotificationsUpdated);