import { Select, stepLabelClasses } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
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

  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }
  //console.log(product);
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
          setDeliveryAddressNo(data.addressNo);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);
  /*
  useEffect(() => {
    console.log("주소록");
    console.log(addressList);
  }, [setAddressList]);*/
  useEffect(() => {
    //전체 주소록 불러오기
    axios
      .get(backServer + "/member/allAddress")
      .then((res) => {
        //console.log(res.data);
        if (res.data.message === "success") {
          setAddressList(res.data.data);
          /*
          const data = res.data.data[0];
          setDeliveryAddressName(data.addressName);
          setDeliveryAddressPhone(data.addressPhone);
          setDeliveryZipcode(data.zipcode);
          setDeliveryAddress(data.address);
          setDeliveryAddressDetail(data.addressDetail);*/
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

  const [selectOption, setSelectOption] = useState("");
  const [freeMessage, setFreeMessage] = useState("");
  const [deliveryAddressRequest, setDeliveryAddressRequest] =
    useState("요청사항 없음");
  const [options, setOptions] = useState([
    { text: "요청사항 없음", active: true },
    { text: "문 앞에 놓아주세요", active: false },
    { text: "경비실에 맡겨 주세요", active: false },
    { text: "파손 위험 상품입니다. 배송 시 주의해주세요", active: false },
    { text: "직접 입력", active: false },
  ]);
  //console.log(product);
  //결제 시 like_tbl에 있을 시 delete(안없애도 될 것 같기도=>이미 거래 상태면 좋아요 조회 X상태 ), trade_tbl에 insert
  //결제하기
  const buyProduct = () => {
    console.log("구매하기");
  };
  return (
    <>
      {product !== null ? (
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
                {deliveryAddress === "" ? (
                  ""
                ) : (
                  <>
                    <div className="payment-delivery">
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
                    </div>
                    <div className="delivery-request-btn-box">
                      <button
                        className="delivery-request-btn"
                        onClick={requestModal}
                      >
                        {deliveryAddressRequest}
                      </button>
                      <span className="material-icons delivery-request-icon">
                        chevron_right
                      </span>
                    </div>
                  </>
                )}

                {openRequest && (
                  <RequestModal
                    setOpenRequest={setOpenRequest}
                    openRequest={openRequest}
                    options={options}
                    setOptions={setOptions}
                    deliveryAddressRequest={deliveryAddressRequest}
                    setDeliveryAddressRequest={setDeliveryAddressRequest}
                    freeMessage={freeMessage}
                    setFreeMessage={setFreeMessage}
                    selectOption={selectOption}
                    setSelectOption={setSelectOption}
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
                        deliveryAddressNo={deliveryAddressNo}
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
              <label htmlFor="agreeChk">
                단순변심으로 인한 환불은 불가합니다.
              </label>
            </div>
            <div className="payment-purchase-btn-box">
              <button
                className="payment-purchase-btn"
                disabled={agreeChk || deliveryAddress === ""}
                onClick={buyProduct}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
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
    deliveryAddressNo,
    setOpenAddress,
    openAddress,
  } = props;
  //const [selected, setSelected] = useState();

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [delModalOpen, setDelModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [addressNo, setAddressNo] = useState("");
  /*
  const [addressName, setAddressName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressDefault, setAddressDefault] = useState("");*/
  const whatModal = "update";

  const handleRadioClick = (e) => {
    console.log(e.target.value);
    setAddressNo(e.target.value);
    //setSelected(e.target.value);
    setDeliveryAddressNo(item.addressNo);
    setDeliveryAddress(item.address);
    setDeliveryAddressDetail(item.addressDetail);
    setDeliveryAddressName(item.addressName);
    setDeliveryZipcode(item.zipcode);
    setDeliveryAddressPhone(item.addressPhone);
    //setOpenAddress(!openAddress);
  };
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
    <div className="address-item-wrap">
      <input
        className="address-item-radio"
        type="radio"
        name="address"
        id={item.addressNo}
        defaultValue={item.addressNo}
        onChange={handleRadioClick}
        checked={deliveryAddressNo === item.addressNo}
      />
      <div className="address-item">
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
    </div>
  );
};
export default Payment;
