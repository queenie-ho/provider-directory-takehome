//Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-secondary-5 text-white font-medium py-2 px-6 rounded-full hover:bg-secondary-5/90 transition"
    >
      {children}
    </button>
  );
};

export default Button;