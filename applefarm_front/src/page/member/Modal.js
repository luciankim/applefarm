import React, { useEffect, useRef, useState } from "react";
import "./modal.css";
import { Input, Input2, InputReadOnly } from "../../component/FormFrm";
import DaumPostcode, { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";

//삭제
const DelModal = (props) => {
  const setModalOpen = props.setModalOpen;
  const clickEvent = props.clickEvent;
  const text = props.text;
  const icon = props.icon;
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
            <span className="material-icons modal-main-icon">{icon}</span>
            <p className="modal-text">{text}</p>
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
  const {
    addressNo,
    addressName,
    setAddressName,
    addressPhone,
    setAddressPhone,
    zipcode,
    setZipcode,
    address,
    setAddress,
    addressDetail,
    setAddressDetail,
    addressDefault,
    setAddressDefault,
    whatModal,
    setDeliveryAddress,
    setDeliveryAddressDetail,
    setDeliveryAddressName,
    setDeliveryAddressPhone,
    setDeliveryZipcode,
    setDeliveryAddressNo,
    delivery,
  } = props;
  const status = props.status;
  const setStatus = props.setStatus;
  const input = useRef();
  const backServer = process.env.REACT_APP_BACK_SERVER;

  //입력용
  const [newAddressName, setNewAddressName] = useState(addressName);
  const [newAddressPhone, setNewAddressPhone] = useState(addressPhone);
  const [newZipcode, setNewZipcode] = useState(zipcode);
  const [newAddress, setNewAddress] = useState(address);
  const [newAddressDetail, setNewAddressDetail] = useState(addressDetail);
  const [newAddressDefault, setNewAddressDefault] = useState(addressDefault);

  //주소 api이용
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    const zonecode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = "";
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
    setNewAddress(fullAddress);
    setNewZipcode(zonecode);
    setNewAddressDetail("");
    input.current.focus();
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const changeDefault = (e) => {
    setNewAddressDefault(e.target.checked ? e.target.value : 0);
    // 체크 여부에 따라 addressDefault 값을 설정
  };
  //모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  //체크 메세지
  const [nameCheck, setNameCheck] = useState("");
  const [phoneCheck, setPhoneCheck] = useState("");
  const [addressCheck, setAddressCheck] = useState("");
  const [addressDetailCheck, setAddressDetailCheck] = useState("");
  const nameReq = /^.{2,50}$/;
  const phoneReq = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const addressReq = /^\s*$/;
  const addressDetailReq = /^s*$/;

  const nameChk = () => {
    if (!nameReq.test(newAddressName)) {
      setNameCheck("올바른 이름을 입력해주세요(2-50자).");
    } else {
      setNameCheck("");
    }
  };

  const phoneChk = () => {
    if (!phoneReq.test(newAddressPhone)) {
      setPhoneCheck("올바른 전화번호를 입력해주세요");
    } else {
      setPhoneCheck("");
    }
  };

  const phoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    let formattedInput;
    if (input.length === 11) {
      formattedInput = input.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 010-xxxx-xxxx 형식
    } else {
      formattedInput = input.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
    setNewAddressPhone(formattedInput);
  };

  const addressChk = () => {
    if (addressReq.test(newZipcode)) {
      setAddressCheck("주소를 입력해주세요");
    } else {
      setAddressCheck("");
    }
  };

  const detailFunc = (e) => {
    setNewAddressDetail(e.target.value);
  };

  const addressDetailChk = () => {
    if (newAddressDetail == "") {
      setAddressDetailCheck("상세주소를 입력해주세요");
    } else {
      setAddressDetailCheck("");
    }
  };

  ////////////////////////////////////////////////////////////////////
  //새 주소 등록
  const addressEnroll = () => {
    if (
      nameReq.test(newAddressName) &&
      phoneReq.test(newAddressPhone) &&
      newZipcode !== "" &&
      newAddress !== "" &&
      newAddressDetail !== "" //필요여부 수정 예정
    ) {
      const obj = {
        addressName: newAddressName,
        addressPhone: newAddressPhone,
        zipcode: newZipcode,
        address: newAddress,
        addressDetail: newAddressDetail,
        addressDefault: newAddressDefault,
      };
      console.log(obj);

      axios
        .post(backServer + "/member/address", obj)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            if (delivery === "deliveryPlus") {
              setDeliveryAddress(newAddress);
              setDeliveryAddressDetail(newAddressDetail);
              setDeliveryAddressName(newAddressName);
              setDeliveryZipcode(newZipcode);
              setDeliveryAddressPhone(newAddressPhone);
            }
            setModalOpen(false);
            setStatus(!status);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      alert("정확히 다 입력하세요");
    }
  };
  const addressUpdate = () => {
    if (
      nameReq.test(newAddressName) &&
      phoneReq.test(newAddressPhone) &&
      newZipcode !== "" &&
      newAddress !== "" &&
      newAddressDetail !== "" //필요여부 수정 예정
    ) {
      const obj = {
        addressNo,
        addressName: newAddressName,
        addressPhone: newAddressPhone,
        zipcode: newZipcode,
        address: newAddress,
        addressDetail: newAddressDetail,
        addressDefault: newAddressDefault,
      };
      console.log(obj);
      axios
        .patch(backServer + "/member/address", obj)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            setStatus(!status);
            setModalOpen(false);
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      alert("정확히 모두 입력해주세요.");
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
            <div className="modal-title">
              {whatModal === "update" ? "주소 변경" : "주소 추가"}
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="addressName">이름</label>
              </div>
              <Input2
                id="addressName"
                type="text"
                data={newAddressName}
                setData={setNewAddressName}
                blurEvent={nameChk}
                placeholder="수령인의 이름"
              />
              <div className="address-checkmsg">{nameCheck}</div>
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="addressPhone">전화번호</label>
              </div>
              <input
                className="input_form2"
                type="text"
                value={newAddressPhone}
                placeholder="수령할 분의 전화번호를 입력하세요(- 는 자동입력됩니다)"
                onBlur={phoneChk}
                onChange={phoneChange}
                maxLength={13}
              ></input>
              <div className="address-checkmsg">{phoneCheck}</div>
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="zipcode">우편번호</label>
              </div>
              <div className="zipcode-wrap">
                <input
                  className="input_form2 address-disable-input"
                  type="text"
                  value={newZipcode}
                  readOnly
                  placeholder="우편번호를 검색하세요"
                ></input>
                <button className="zipcode-btn" onClick={handleClick}>
                  우편번호
                </button>
                <div className="address-checkmsg address-check-zip">
                  {addressCheck}
                </div>
              </div>
            </div>
            <div className="address-input-wrap">
              <div>
                <label htmlFor="address">주소</label>
              </div>
              <input
                className="input_form2 address-disable-input"
                type="text"
                value={newAddress}
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
                value={newAddressDetail}
                placeholder="건물, 아파트, 동/호수 입력"
                onChange={detailFunc}
                className="input_form2 input_focus"
                ref={input}
                onBlur={addressDetailChk}
              ></input>
              <div className="address-checkmsg">{addressDetailCheck}</div>
            </div>
            <div className="address-default-check-box-wrap">
              {addressDefault == 1 ? (
                ""
              ) : (
                <>
                  <input
                    type="checkbox"
                    id="addressDefault"
                    defaultValue="1"
                    onChange={changeDefault}
                    checked={newAddressDefault == 1}
                  ></input>
                  <label htmlFor="addressDefault">기본 배송지로 설정</label>
                </>
              )}
            </div>
            <div className="address-input-wrap">
              <button
                className="address-modal-btn address-ok-btn"
                onClick={whatModal === "update" ? addressUpdate : addressEnroll}
                disabled={
                  !nameReq.test(newAddressName) ||
                  !phoneReq.test(newAddressPhone) ||
                  newZipcode === "" ||
                  newZipcode === undefined ||
                  newAddress === "" ||
                  newAddress === undefined ||
                  newAddressDetail === undefined ||
                  newAddressDetail === ""
                }
              >
                {whatModal === "update" ? "수정" : "등록"}
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
const RequestModal = (props) => {
  const {
    setOpenRequest,
    openRequest,
    options,
    setOptions,
    setDeliveryAddressRequest,
    deliveryAddressRequest,
    freeMessage,
    setFreeMessage,
    selectOption,
    setSelectOption,
  } = props;
  const modalBackground = useRef();
  const [isFree, setIsFree] = useState(false);
  //모달 닫기
  const closeModal = () => {
    setOpenRequest(false);
  };
  //모달밖 클릭시
  const modalBack = (e) => {
    if (e.target === modalBackground.current) {
      setOpenRequest(false);
    }
  };
  //초기 모달 상태(해당 옵션 체크되도록)
  useEffect(() => {
    const copyOptions = [...options];
    copyOptions.forEach((item) => {
      if (item.text === selectOption) {
        item.active = true;
        if (selectOption === "직접 입력") {
          setIsFree(true);
        }
      } else {
        item.active = false;
      }
    });
    setOptions(copyOptions);
  }, [setOpenRequest]);
  const changeOption = (index) => {
    const copyOptions = [...options];
    copyOptions.forEach((item) => {
      item.active = false;
    });
    copyOptions[index].active = true;
    if (copyOptions[index].text !== "직접 입력") {
      setIsFree(false);
    } else {
      setIsFree(true);
    }
    setSelectOption(copyOptions[index].text);
    setOptions(copyOptions);
  };
  //const [selectOption, setSelectOption] = useState("");
  //const [freeMessage, setFreeMessage] = useState("");
  const changeData = (e) => {
    setFreeMessage(e.target.value);
  };
  //적용하기
  const requestGo = () => {
    //console.log(freeMessage);
    //console.log(selectOption);
    if (selectOption === "직접 입력") {
      setDeliveryAddressRequest(freeMessage);
    } else {
      setDeliveryAddressRequest(selectOption);
      setFreeMessage("");
    }
    setOpenRequest(false);
  };
  return (
    <div>
      <div className="modal" ref={modalBackground} onClick={modalBack}>
        <div className="modal-content-wrap  modal-round">
          <div className="close-icon-wrap">
            <span className="material-icons close-icon" onClick={closeModal}>
              highlight_off
            </span>
          </div>
          <div className="modal-content">
            <div className="modal-title">배송 요청사항</div>
            <div className="request-message">
              {options.map((item, index) => {
                return (
                  <div key={"option" + index}>
                    <div
                      className={item.active ? "request-option" : ""}
                      onClick={() => {
                        changeOption(index);
                      }}
                    >
                      {item.text}
                      {item.active ? (
                        <span className="material-icons request-chk">
                          check
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="free-box">
                {isFree && (
                  <textarea
                    value={freeMessage}
                    placeholder="내용을 입력해주세요"
                    onChange={changeData}
                  ></textarea>
                )}
              </div>
            </div>
            <button className="request-btn" onClick={closeModal}>
              취소
            </button>
            <button className="request-btn" onClick={requestGo}>
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductStatus = (props) => {
  const modalBackground = useRef();
  const { setModalOpen, statusList, currentStatus, setCurrentSataus } = props;
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
          <span
            className="material-icons close-icon status-close"
            onClick={closeModal}
          >
            highlight_off
          </span>
          <div className="modal-product-status-title">선택한 상태 보기</div>
          <div className="modal-content">
            {statusList.map((item, index) => {
              return (
                <button
                  key={"status" + index}
                  onClick={() => {
                    setCurrentSataus(index);
                    setModalOpen(false);
                  }}
                  className={
                    index == currentStatus
                      ? "status-btns current-status"
                      : "status-btns"
                  }
                  style={item.color === "red" ? { color: "red" } : {}}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DelModal, AddressModal, RequestModal, ProductStatus };
