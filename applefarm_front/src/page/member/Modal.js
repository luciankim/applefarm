import React, { useEffect, useRef, useState } from "react";
import "./modal.css";
import { Input, Input2, InputReadOnly } from "../../component/FormFrm";
import DaumPostcode, { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";

//좋아요
const DelModal = (props) => {
  const setModalOpen = props.setModalOpen;
  const clickEvent = props.clickEvent;
  const text = props.text;
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
            <p>{text}</p>
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
//주소록
const AddressModal = (props) => {
  const setModalOpen = props.setModalOpen;
  const [addressName, setAddressName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const status = props.status;
  const setStatus = props.setStatus;
  const input = useRef();
  const backServer = process.env.REACT_APP_BACK_SERVER;

  //주소 api이용
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    const zonecode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = "";
    //console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setZipcode(zonecode);
    setAddressDetail("");
    input.current.focus();
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const detailFunc = (e) => {
    setAddressDetail(e.target.value);
  };

  const [addressDefault, setAddressDefault] = useState(0);
  const changeDefault = (e) => {
    setAddressDefault(e.target.checked ? e.target.value : 0);
    // 체크 여부에 따라 addressDefault 값을 설정
  };

  //모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  const memberNo = 22; //로그인 구현 이후 로그인 정보 불러오기(테스트사용중)
  const addressEnroll = () => {
    //주소 DB 추가 작업 필요
    if (
      addressName !== "" &&
      addressPhone !== "" &&
      zipcode !== "" &&
      address !== "" &&
      addressDetail !== "" //필요여부 수정 예정
    ) {
      const obj = {
        memberNo,
        addressName,
        addressPhone,
        zipcode,
        address,
        addressDetail,
        addressDefault,
      };
      console.log(obj);
      axios
        .post(backServer + "/member/address", obj)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            setModalOpen(false);
            setStatus(!status);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      alert("다입력하세요-> 수정예정");
    }
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
                <input
                  className="input_form2"
                  type="text"
                  value={zipcode}
                  readOnly
                  placeholder="우편번호를 검색하세요"
                ></input>
                <button className="zipcode-btn" onClick={handleClick}>
                  우편번호
                </button>
              </div>
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="address">주소</label>
              </div>
              <input
                className="input_form2"
                type="text"
                value={address}
                readOnly
                placeholder="우편번호 입력 후, 자동 입력됩니다"
              ></input>
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="addressDetail">상세 주소</label>
              </div>
              <input
                type="text"
                value={addressDetail}
                placeholder="건물, 아파트, 동/호수 입력"
                onChange={detailFunc}
                className="input_form2"
                ref={input}
              ></input>
            </div>
            <div className="address-default-check-box-wrap">
              <input
                type="checkbox"
                id="addressDefault"
                defaultValue="1"
                onChange={changeDefault}
              ></input>
              <label htmlFor="addressDefault">기본 배송지로 설정</label>
            </div>
            <div className="address-input-wrap">
              <button className="address-modal-btn" onClick={addressEnroll}>
                등록
              </button>
              <button className="address-modal-btn" onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { DelModal, AddressModal };
