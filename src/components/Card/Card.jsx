import React from "react";

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`border border-indigo-600 rounded overflow-hidden min-w-0 ${className}`}
      {...props}>
      {children}
    </div>
  );
};

export default Card;
