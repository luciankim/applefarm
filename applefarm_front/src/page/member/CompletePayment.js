import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button1, Button2 } from "../../component/FormFrm";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const CompletePayment = (props) => {
  const isLogin = props.isLogin;
  const pramas = useParams();
  const productNo = pramas.productNo;
  const navigate = useNavigate();
  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }
  console.log(productNo);
  return (
    <div className="completePayment-wrap">
      <div className="completePayment-content">
        <div className="completePayment-message">
          <img src="/image/apple.png"></img>
          <h3 className="completePayment-title">
            <div>결제가 완료되었습니다.</div>
          </h3>
        </div>
        <div className="completePayment-btn-box">
          <button>주문상세보기</button>
          <button>구매내역보기</button>
        </div>
      </div>
    </div>
  );
};
export default CompletePayment;
