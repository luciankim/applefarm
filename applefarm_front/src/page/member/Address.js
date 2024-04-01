import { useEffect, useState } from "react";
import { AddressModal, DelModal } from "./Modal";
import axios from "axios";
import Pagination from "../../component/Pagination";
const Address = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [modalOpen, setModalOpen] = useState(false);
  const [addressList, setAddressList] = useState(null);
  const [pageInfo, setPageinfo] = useState({});
  const [reqpage, setreqpage] = useState(1);
  const [status, setStatus] = useState(true);
  const plusModal = () => {
    setModalOpen(true);
  };
  const memberNo = 22; //임의로 설정 -> 로그인 구현후 수정예정
  /*
  useEffect(() => {
    console.log(status);
  }, [status]);*/
  useEffect(() => {
    //주소록 불러오기
    axios
      .get(backServer + "/member/addressList/" + memberNo + "/" + reqpage)
      .then((res) => {
        //console.log(res.data);
        //console.log(res.data.data);
        if (res.data.message === "success") {
          setAddressList(res.data.data.addressList);
          setPageinfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqpage, status]);

  return (
    <div className="mypage-current-wrap">
      <div className="address-title">
        <div className="mypage-current-title">주소록</div>
        <button className="address-btn basic-address-btn" onClick={plusModal}>
          새 배송지 추가
        </button>
      </div>
      <div className="address-list-wrap">
        {addressList === null ? (
          ""
        ) : addressList.length !== 0 ? (
          <>
            <div className="address-list">
              <ul>
                {addressList.map((item, index) => {
                  return (
                    <AddressItem
                      key={"address" + index}
                      address={item}
                      status={status}
                      setStatus={setStatus}
                      addressList={addressList}
                      reqPage={reqpage}
                      setReqPage={setreqpage}
                    />
                  );
                })}
              </ul>
            </div>
            <div className="address-page">
              <Pagination
                pageInfo={pageInfo}
                reqPage={reqpage}
                setReqPage={setreqpage}
              />
            </div>
          </>
        ) : (
          <div className="non-address">
            <div>등록된 배송지가 없습니다.</div>
            <div>새 배송지를 등록해주세요.</div>
            <div>
              <button className="address-btn" onClick={plusModal}>
                새 배송지 추가
              </button>
            </div>
          </div>
        )}
      </div>
      {modalOpen && (
        <AddressModal
          setModalOpen={setModalOpen}
          status={status}
          setStatus={setStatus}
        />
      )}
    </div>
  );
};
const AddressItem = (props) => {
  const address = props.address;
  const status = props.status;
  const setStatus = props.setStatus;
  const addressList = props.addressList;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [modalOpen, setModalOpen] = useState(false);
  const updateAddress = () => {
    console.log("수정");
  };
  const delModalFun = () => {
    //console.log("삭제");
    setModalOpen(true);
  };
  const addressDelFun = () => {
    axios
      .delete(backServer + "/member/address/" + address.addressNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setStatus(!status);
          setModalOpen(false);
          //console.log(addressList.length);
          //console.log("req:" + reqPage);
          if (reqPage > 1 && addressList.length === 2) {
            setReqPage(reqPage - 1);
          }
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  const basicAddressFun = () => {
    //console.log("기본배송지");
    const obj = { memberNo: address.memberNo, addressNo: address.addressNo };
    axios
      .patch(backServer + "/member/basicAddress", obj)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setStatus(!status);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  return (
    <>
      <li className="address-info-wrap">
        <div className="address-info">
          <div className="address-info-name">
            <span>{address.addressName}</span>
            {address.addressDefault == 1 ? (
              <span className="default-address-mark">기본 배송지</span>
            ) : (
              ""
            )}
          </div>
          <div className="address-info-address">
            <span>({address.zipcode})</span>
            <span>{address.address}</span>
            <span>{address.addressDetail}</span>
          </div>
          <div>{address.addressPhone}</div>
        </div>
        <div className="address-btn-wrap">
          {address.addressDefault !== 1 ? (
            <button
              className="address-btn address-list-btn"
              onClick={basicAddressFun}
            >
              기본배송지
            </button>
          ) : (
            ""
          )}
          <button
            className="address-btn  address-list-btn"
            onClick={updateAddress}
          >
            수정
          </button>
          {address.addressDefault !== 1 ? (
            <button
              className="address-btn  address-list-btn"
              onClick={delModalFun}
            >
              삭제
            </button>
          ) : (
            ""
          )}
        </div>
      </li>
      {modalOpen && (
        <DelModal
          setModalOpen={setModalOpen}
          clickEvent={addressDelFun}
          text="주소를 삭제하시겠습니까?"
        />
      )}
    </>
  );
};
export default Address;
