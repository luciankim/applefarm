import { useState } from "react";
import { AddressModal } from "./Modal";

const Address = () => {
  const [addressList, setAddressList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const plusModal = () => {
    setModalOpen(true);
  };
  return (
    <div className="mypage-current-wrap">
      <div className="address-title">
        <div className="mypage-current-title">주소록</div>
        <button className="address-btn basic-address-btn" onClick={plusModal}>
          새 배송지 추가
        </button>
      </div>
      <div className="address-list-wrap">
        {addressList.length === 0 ? (
          <div className="non-address">
            <div>등록된 배송지가 없습니다.</div>
            <div>새 배송지를 등록해주세요.</div>
            <div>
              <button className="address-btn">새 배송지 추가</button>
            </div>
          </div>
        ) : (
          <>
            <div className="address-list">주소가 없습니다.</div>
          </>
        )}
      </div>
      {modalOpen && <AddressModal setModalOpen={setModalOpen} />}
    </div>
  );
};
export default Address;
