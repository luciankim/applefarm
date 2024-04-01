import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../../component/FormFrm";
import { useEffect, useRef, useState } from "react";
import { DelModal } from "../member/Modal";

const AdminRefund = () => {
  const [refundList, setRefundList] = useState([
    {
      img: "/image/iphone.jpg",
      name: "아이폰 12 프로 128기가 블랙",
      reason: "변심",
      seller: "코딩의신",
      buyer: "user01",
      price: "800,000",
      state: "승인",
    },
    {
      img: "/image/iphone.jpg",
      name: "에어팟 프로 1세대",
      seller: "코딩의신",
      reason: "설명상이",
      price: "33,000",
      buyer: "user35",
      state: "진행중",
    },
    {
      img: "/image/iphone.jpg",
      name: "아이폰 15 256기가 핑크",
      seller: "코딩의신",
      reason: "고장",
      price: "40,000",
      buyer: "user42",
      state: "반려",
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
              <th colSpan={2} width="20%">
                상품상세
              </th>
              <th width="10%">사유</th>
              <th width="10%">판매자</th>
              <th width="10%">구매자</th>
              <th width="15%">구매일</th>
              <th width="10%">신청일</th>
              <th width="10%">상태</th>
              <th width="15%">환불관리</th>
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
      <td className="likeName-td">{refund.reason}</td>
      <td>{refund.seller}</td>
      <td>{refund.buyer}</td>
      <td>{refund.buyer}</td>
      <td>{refund.buyer}</td>
      <td>{refund.state}</td>
      <td className="purchase-btn-box">
        <Button1 text="승인" clickEvent={purchase} />
        <Button2 text="반려" clickEvent={purchase} />
      </td>
    </tr>
  );
};
export default AdminRefund;

{
  /* <td>
  {modalOpen && (
    <DelModal setModalOpen={setModalOpen} clickEvent={refundDelFun} />
  )}
</td> */
}
