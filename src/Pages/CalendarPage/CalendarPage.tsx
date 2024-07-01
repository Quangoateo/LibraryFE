import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./calendar.css"; // Import custom CSS file for calendar styles
import { getNotifications } from "../../services/NotificationService";

interface Notification {
  dateTime: string;
  firstName: string;
  lastName: string;
  message: string;
  bookTitle: string;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<{ [key: string]: Notification[] }>({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationList = await getNotifications();
        const formattedEvents = formatEvents(notificationList);
        setEvents(formattedEvents);
      } catch (error) {
        console.log("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const formatEvents = (notificationList: Notification[]) => {
    const formattedEvents: { [key: string]: Notification[] } = {};

    notificationList.forEach((notification) => {
      const date = new Date(notification.dateTime);
      const formattedDate = date.toISOString().split("T")[0];

      if (!formattedEvents[formattedDate]) {
        formattedEvents[formattedDate] = [];
      }

      formattedEvents[formattedDate].push(notification);
    });

    return formattedEvents;
  };

  const dateCellRender = (value: any) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const eventList = events[formattedDate];

    return (
      <ul className="events">
        {eventList &&
          eventList.map((event: Notification, index: number) => (
            <li key={index}>
              <Badge
                status="success" // Adjust status based on your notification type or condition
                text={`${event.firstName} ${event.message.replace("You", "you")} ${event.lastName} borrowed "${event.bookTitle}"`}
              />
            </li>
          ))}
      </ul>
    );
  };

  const monthCellRender = (value: any) => {
    return (
      <div className="notes-month">
        <span>Month Notes</span>
        <section>{value.month()}</section>
      </div>
    );
  };

  return (
    <div className="calendarPage">
      <div className="calendar-container">
        <h1 className="calendar-heading">
          <CalendarOutlined /> Calendar Page
        </h1>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
