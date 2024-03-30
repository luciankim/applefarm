import React, { useRef, useState } from "react";
import "./modal.css";

const DelModal = (props) => {
  const setModalOpen = props.setModalOpen;
  const clickEvent = props.clickEvent;
  const modalBackground = useRef();

  //모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  //모달밖 클릭시
  const modalBack = (e) => {
    if (e.target === modalBackground.current) {
      setModalOpen(false);
    }
  };

  return (
    <div>
      <div className="modal" ref={modalBackground} onClick={modalBack}>
        <div className="modal-content-wrap">
          <div className="close-icon-wrap">
            <span className="material-icons close-icon" onClick={closeModal}>
              highlight_off
            </span>
          </div>
          <div className="modal-content">
            <span className="material-icons heart-broken-icon">
              heart_broken
            </span>
            <p>Are you sure you want to delete this item?</p>
            <button
              className="like-delete-btn like-modal-btn"
              onClick={clickEvent}
            >
              Yes
            </button>
            <button className="like-modal-btn" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DelModal };
