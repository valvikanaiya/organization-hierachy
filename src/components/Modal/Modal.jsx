import React from "react";
import { createPortal } from "react-dom";
const Backdrop = ({ onClose }) => {
  return (
    <div
      className="fixed w-full h-screen top-0 left-0 z-30 bg-black/5"
      onClick={onClose}
    />
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div
      className={
        "fixed  bg-white overflow-auto max-h-[90%] max-w-[70%] min-w-[30%] z-50  -translate-y-1/2 -translate-x-1/2 top-[50%] left-[50%] rounded ring-2"
      }>
      <div className={"classes.content"}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const Modal = ({ onClose, children, open }) => {
  return (
    open && (
      <>
        {createPortal(<Backdrop onClose={onClose} />, portalElement)}
        {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
      </>
    )
  );
};

export default Modal;
