import React, { useRef, useState } from "react";
import "./modal.css";
import { Input2, InputReadOnly } from "../../component/FormFrm";

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
const AddressModal = (props) => {
  const setModalOpen = props.setModalOpen;
  const [addressName, setAddressName] = useState();
  const [addressPhone, setAddressPhone] = useState();
  const [zipcode, setZipcode] = useState();
  const [address, setAddress] = useState();
  const [addressDetail, setAddressDetail] = useState();

  //모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  const addressEnroll = () => {
    //주소 추가 작업 필요
  };
  return (
    <div>
      <div className="modal">
        <div className="modal-content-wrap address-modal-content-wrap">
          <div className="close-icon-wrap">
            <span className="material-icons close-icon" onClick={closeModal}>
              highlight_off
            </span>
          </div>
          <div className="modal-content">
            <div className="modal-title">새주소 추가</div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="addressName">이름</label>
              </div>
              <Input2
                id="addressName"
                type="text"
                value={addressName}
                setData={setAddressName}
                placeholder="수령인의 이름"
              />
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="addressPhone">전화번호</label>
              </div>
              <Input2
                id="addressPhone"
                type="text"
                value={addressPhone}
                setData={setAddressPhone}
                placeholder="수령할 분의 전화번호를 입력하세요"
              />
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="zipcode">우편번호</label>
              </div>
              <div className="zipcode-wrap">
                <InputReadOnly
                  id="zipcode"
                  type="text"
                  value={zipcode}
                  setData={setZipcode}
                  placeholder="우편번호를 검색하세요"
                />
                <button className="zipcode-btn">우편번호</button>
              </div>
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="address">주소</label>
              </div>
              <InputReadOnly
                id="address"
                type="text"
                value={address}
                setData={setAddress}
                placeholder="우편번호 입력 후, 자동 입력됩니다"
              />
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="addressDetail">상세 주소</label>
              </div>
              <Input2
                id="addressDetail"
                type="text"
                value={addressDetail}
                setData={setAddressDetail}
                placeholder="건물, 아파트, 동/호수 입력"
              />
            </div>
            <button className="address-btn" onClick={addressEnroll}>
              등록
            </button>
            <button className="address-btn" onClick={closeModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { DelModal, AddressModal };
