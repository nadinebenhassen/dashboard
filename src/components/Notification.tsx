/** @format */

import React from "react";

type NotificationProps = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};

const notificationStyles = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 mb-4 border rounded-lg shadow-lg ${notificationStyles[type]}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <div>{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-lg font-semibold leading-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
