import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../../component/FormFrm";
import { useEffect, useRef, useState } from "react";
import { DelModal } from "../member/Modal";

const AdminRefund = () => {
  const [refundList, setRefundList] = useState([
    {
      img: "/image/iphone.jpg",
      name: "아이폰 12 프로 128기가 블랙",
      quality: "A급",
      price: "800,000",
      seller: "user01",
    },
    {
      img: "/image/iphone.jpg",
      name: "에어팟 프로 1세대",
      quality: "b급",
      price: "33,000",
      seller: "user35",
    },
    {
      img: "/image/iphone.jpg",
      name: "아이폰 15 256기가 핑크",
      quality: "c급",
      price: "40,000",
      seller: "user42",
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    //좋아요 리스트 조회하기
  }, []);

  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        <p className="admin-current-p">환불관리</p>
      </div>
      <div className="member-like-tbl-box">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>상품상세</th>
              <th>상품상세</th>
              <th>환불사유</th>
              <th>판매자</th>
              <th>구매자</th>
              <th>구매일</th>
              <th>환불신청일</th>
              <th>환불상태</th>
              <th>환불관리</th>
            </tr>
          </thead>
          <tbody>
            {refundList.map((refund, index) => {
              return (
                <RefundItem
                  key={"refund" + index}
                  refund={refund}
                  refundList={refundList}
                  setRefundList={setRefundList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RefundItem = (props) => {
  const refund = props.refund;
  const navigate = useNavigate();

  //구매 페이지 이동 작성 예정
  const purchase = () => {
    //구매페이지 이동
    navigate("/purchase", { state: { refund: refund } });
  };

  //모달
  const refundList = props.refundList;
  const setRefundList = props.setRefundList;
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  //좋아요 삭제
  const refundDelFun = () => {
    // 삭제 동작 처리 로직 작성 예정 -> 데이터 생성시 구현 예정
    console.log(refund);
    const newRefundList = refundList.filter((item) => {
      return item !== refund;
    });
    setRefundList(newRefundList);
    setModalOpen(false);
  };

  return (
    <tr>
      <td>
        <div className="member-like-img-box">
          <img src={refund.img} />
        </div>
      </td>
      <td>{refund.name}</td>
      <td className="likeName-td">{refund.name}</td>
      <td>{refund.quality}</td>
      <td>{refund.price}</td>
      <td>{refund.seller}</td>
      <td className="purchase-btn-box">
        <Button3 text="구매하기" clickEvent={purchase} />
      </td>
      <td>
        {modalOpen && (
          <DelModal setModalOpen={setModalOpen} clickEvent={refundDelFun} />
        )}
      </td>
    </tr>
  );
};
export default AdminRefund;
