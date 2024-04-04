import { Select, stepLabelClasses } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AddressModal, DelModal, RequestModal } from "./Modal";

const Payment = (props) => {
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [addressList, setAddressList] = useState([]);
  const [agreeChk, setAgreeChk] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(false);

  //배송주소
  const [deliveryAddressNo, setDeliveryAddressNo] = useState("");
  const [deliveryZipcode, setDeliveryZipcode] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryAddressDetail, setDeliveryAddressDetail] = useState("");
  const [deliveryAddressName, setDeliveryAddressName] = useState("");
  const [deliveryAddressPhone, setDeliveryAddressPhone] = useState("");
  const [deliveryAddressRequest, setDeliveryAddressRequest] = useState("");

  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }
  console.log(product);
  if (product === null) {
    Swal.fire("상품 정보가 없습니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }
  useEffect(() => {
    //기본배송지 불러오기
    axios
      .get(backServer + "/member/basicAddress")
      .then((res) => {
        //console.log(res.data);
        if (res.data.message === "success") {
          //setAddress(res.data.data);
          const data = res.data.data;
          setDeliveryAddressName(data.addressName);
          setDeliveryAddressPhone(data.addressPhone);
          setDeliveryZipcode(data.zipcode);
          setDeliveryAddress(data.address);
          setDeliveryAddressDetail(data.addressDetail);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);
  useEffect(() => {
    console.log("주소록");
    console.log(addressList);
  }, [setAddressList]);
  useEffect(() => {
    //전체 주소록 불러오기
    axios
      .get(backServer + "/member/allAddress")
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setAddressList(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
    setDeliveryAddress(deliveryAddress);
    setDeliveryAddressDetail(deliveryAddressDetail);
    setDeliveryAddressName(deliveryAddressName);
    setDeliveryAddressPhone(deliveryAddressPhone);
    setDeliveryZipcode(deliveryZipcode);
  }, [status]);

  //console.log(product);

  const agreeFunc = (e) => {
    if (!e.target.checked) {
      setAgreeChk(true);
    } else {
      setAgreeChk(false);
    }
  };

  //새 주소 추가
  const plusAddress = () => {
    setModalOpen(true);
  };
  //주소록보기
  const [openAddress, setOpenAddress] = useState(false);
  const addressShow = () => {
    setOpenAddress(!openAddress);
  };

  const [openRequest, setOpenRequest] = useState(false);
  const requestModal = () => {
    setOpenRequest(true);
  };

  //const [options, setOptions] = useState(["요청사항 없음", "부재중"]);

  //결제 시 like_tbl에 있을 시 delete, trade_tbl에 insert
  //결제하기
  //
  return (
    <div className="payment-wrap">
      <div className="payment-title">주문 / 결제</div>
      <div className="payment-content">
        <div className="payment-info-wrap">
          <div className="payment-sub-title">상품 정보</div>
          <div className="payment-info">
            <div className="payment-product">
              <div className="payment-img-box">
                <img src={product.productThumbnail} />
              </div>
              <div className="payment-product-detail">
                <div>
                  <span>{product.memberNickName}</span>
                  님의 product
                </div>
                <div>
                  <span>{product.productSummary}</span>
                  <span>{product.productQuality}급</span>
                </div>
              </div>
              <div>
                <div>{product.productPrice.toLocaleString()}원</div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-info-wrap">
          <div className="payment-sub-title">
            배송 주소
            <div className="payment-adress-plus" onClick={plusAddress}>
              {" "}
              + 새 주소 추가
            </div>
            {modalOpen && (
              <AddressModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                status={status}
                setStatus={setStatus}
                setDeliveryAddress={setDeliveryAddress}
                setDeliveryAddressDetail={setDeliveryAddressDetail}
                setDeliveryAddressName={setDeliveryAddressName}
                setDeliveryAddressPhone={setDeliveryAddressPhone}
                setDeliveryZipcode={setDeliveryZipcode}
                setDeliveryAddressNo={setDeliveryAddressNo}
                delivery="deliveryPlus"
              />
            )}
          </div>
          <div className="payment-info">
            <div className="payment-delivery">
              {deliveryAddress === "" ? (
                ""
              ) : (
                <>
                  <div className="payment-delivery-detail">
                    <table>
                      <tbody>
                        <tr>
                          <td>받는분</td>
                          <td colSpan={3}>{deliveryAddressName}</td>
                        </tr>
                        <tr>
                          <td>연락처</td>
                          <td colSpan={3}>{deliveryAddressPhone}</td>
                        </tr>
                        <tr>
                          <td>배송 주소</td>
                          <td>({deliveryZipcode})</td>
                          <td>{deliveryAddress}</td>
                          <td>{deliveryAddressDetail}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      className="delivery-address-btn"
                      onClick={addressShow}
                    >
                      주소록
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="delivery-request-btn-box">
              <button className="delivery-request-btn" onClick={requestModal}>
                {deliveryAddressRequest === ""
                  ? "요청사항 없음"
                  : deliveryAddressRequest}
              </button>
              <span className="material-icons delivery-request-icon">
                chevron_right
              </span>
            </div>
            {openRequest && (
              <RequestModal
                setOpenRequest={setOpenRequest}
                openRequest={openRequest}
              />
            )}
          </div>
          {openAddress && (
            <div className="payment-address-list">
              {addressList.map((item, index) => {
                return (
                  <AddressItem
                    key={"address" + index}
                    item={item}
                    status={status}
                    setStatus={setStatus}
                    setDeliveryAddress={setDeliveryAddress}
                    setDeliveryAddressDetail={setDeliveryAddressDetail}
                    setDeliveryAddressName={setDeliveryAddressName}
                    setDeliveryAddressPhone={setDeliveryAddressPhone}
                    setDeliveryZipcode={setDeliveryZipcode}
                    setDeliveryAddressNo={setDeliveryAddressNo}
                    setOpenAddress={setOpenAddress}
                    openAddress={openAddress}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="payment-agree-message">
          <input
            type="checkbox"
            id="agreeChk"
            name="agreeChk"
            onChange={agreeFunc}
          ></input>
          <label htmlFor="agreeChk">단순변심으로 인한 환불은 불가합니다.</label>
        </div>
        <div className="payment-purchase-btn-box">
          <button
            className="payment-purchase-btn"
            disabled={agreeChk || deliveryAddress === ""}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};
const AddressItem = (props) => {
  const {
    item,
    status,
    setStatus,
    setDeliveryAddress,
    setDeliveryAddressDetail,
    setDeliveryAddressName,
    setDeliveryAddressPhone,
    setDeliveryZipcode,
    setDeliveryAddressNo,
    setOpenAddress,
    openAddress,
  } = props;
  const [selected, setSelected] = useState();

  const handleRadioClick = (e) => {
    setSelected(e.target.value);
    setDeliveryAddress(item.address);
    setDeliveryAddressDetail(item.addressDetail);
    setDeliveryAddressName(item.addressName);
    setDeliveryZipcode(item.zipcode);
    setDeliveryAddressPhone(item.addressPhone);
    setOpenAddress(!openAddress);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [delModalOpen, setDelModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [addressNo, setAddressNo] = useState(item.addressNo);
  const [addressName, setAddressName] = useState(item.addressName);
  const [addressPhone, setAddressPhone] = useState(item.addressPhone);
  const [zipcode, setZipcode] = useState(item.zipcode);
  const [address, setAddress] = useState(item.address);
  const [addressDetail, setAddressDetail] = useState(item.addressDetail);
  const [addressDefault, setAddressDefault] = useState(item.addressDefault);
  const whatModal = "update";

  /*
  useEffect(() => {
    setAddressNo(item.addressNo);
    setAddressName(item.addressName);
    setAddressPhone(item.addressPhone);
    setZipcode(item.zipcode);
    setAddress(item.address);
    setAddressDetail(item.addressDetail);
    setAddressDefault(item.addressDefault);
  }, [item]);
*/

  useEffect(() => {});

  const updatModalFun = () => {
    setUpdateModalOpen(true);
  };
  const delModalFun = () => {
    setDelModalOpen(true);
  };
  const addressDelFun = () => {
    axios
      .delete(backServer + "/member/address/" + item.addressNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setStatus(!status);
          setDelModalOpen(false);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  return (
    <>
      <div
        className={
          selected === item.addressNo
            ? "address-item address-select"
            : "address-item"
        }
      >
        <input
          className="address-item-radio"
          type="radio"
          name="addressItem"
          id={item.addressNo}
          value={item.addressNo}
          onChange={handleRadioClick}
        />
        <label htmlFor={item.addressNo}>
          <div className="payment-info-address">
            <div className="address-info-name">
              <span>{item.addressName}</span>
              {item.addressDefault === 1 ? (
                <span className="default-address-mark">기본 배송지</span>
              ) : (
                ""
              )}
            </div>
            <div className="address-info-address">
              <span>({item.zipcode})</span>
              <span>{item.address}</span>
              <span>{item.addressDetail}</span>
            </div>
            <div>
              <span>{item.addressPhone}</span>
            </div>
          </div>
          <div>
            <button
              className="address-btn address-list-btn"
              onClick={updatModalFun}
            >
              수정
            </button>
            {item.addressDefault !== 1 && (
              <button
                className="address-btn address-list-btn"
                onClick={delModalFun}
              >
                삭제
              </button>
            )}
          </div>
        </label>
      </div>
      {delModalOpen && (
        <DelModal
          setModalOpen={setDelModalOpen}
          clickEvent={addressDelFun}
          text="Are you sure you want to delete the address?"
          icon="delete_forever"
        />
      )}
      {updateModalOpen && (
        <AddressModal
          modalOpen={updateModalOpen}
          status={status}
          setStatus={setStatus}
          setModalOpen={setUpdateModalOpen}
          addressName={item.addressName}
          addressPhone={item.addressPhone}
          zipcode={item.zipcode}
          address={item.address}
          addressDetail={item.addressDetail}
          addressDefault={item.addressDefault}
          whatModal={whatModal}
          addressNo={item.addressNo}
          delivery="deliveryUpdate"
        />
      )}
    </>
  );
};
export default Payment;
