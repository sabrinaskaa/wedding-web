import React from "react";

const modal = {
  position: "fixed",
  zIndex: 10,
  left: 0,
  bottom: 0,
  width: "100vw",
  height: "calc(100vh - 6rem)",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.8)"
};

const close = {
  position: "absolute",
  top: 15,
  right: 90,
  color: "#f1f1f1",
  fontSize: 40,
  fontWeight: "bold",
  cursor: "pointer"
};

const modalContent = {
  display: "flex",
  alignItems: "center",
  width: "75%",
  height: "100%",
  margin: "auto"
};

export const Modal = ({ onOpen, children }) => {
  return <div onClick={onOpen}> {children}</div>;
};

export const ModalContent = ({ onClose, children }) => {
  return (
    <div style={modal}>
      <span style={close} onClick={onClose}>
        &times;
      </span>
      <div style={modalContent}>{children}</div>
    </div>
  );
};
