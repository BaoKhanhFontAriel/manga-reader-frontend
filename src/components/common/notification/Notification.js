import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Notification(props) {
  const notification = useSelector((state) => state.notification);
  const [text, setText] = useState("");
  // const [show, setShow] = useState(false);
  const [alertList, setAlertList] = useState([]);

  useEffect(() => {
    console.log(notification.text);
    if (notification.text) {
      let newList = [...alertList, notification.text];
      setAlertList(newList);
    }
  }, [notification.text]);

  return (
    <div className="notification-container">
      {alertList.map((alert) => (
        <NotificationAlert text={alert}></NotificationAlert>
      ))}
    </div>
  );
}

function NotificationAlert(props) {
  return (
    <div
      className="notification alert alert-success mx-auto py-2 position-fixed animate pop-from-top"
      style={{
        top: "-50px",
        left: "45%",
        zIndex: "3",
      }}
    >
      {props.text}
    </div>
  );
}
