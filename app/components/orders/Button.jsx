"use client";
import React from "react";

// app/components/Button.jsx

export default function Button({
  children, // This is the button's content (text, icons, etc)
  type = "button", // Defaults to a standard button, can also be "submit" or "reset"
  onClick, // Optional click handler function
  className = "",
  style = {},
  ...props // Any other props (disabled, id, etc.)
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        " cursor-pointer rounded-full text-white font-bold py-3 px-8 text-lg shadow-lg transition-transform active:scale-95 " +
        className
      }
      style={{
        background: "#7B4A21", // Milk chocolate
        border: "2px solid #FFD59E", // Optional golden border
      }}
      {...props}
    >
      {children}
    </button>
  );
}
