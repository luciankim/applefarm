import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = (props) => {
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }
  useEffect(() => {
    //배송정보
  }, []);
  console.log(product);
  //결제 시 like_tbl에서 delete, trade_tbl에 insert
  return (
    <div className="payment-wrap">
      <div className="payment-title">주문 / 결제</div>
      <div className="payment-content">
        <div className="payment-product-info">
          <div className="payment-img-box">
            <img src={product.productThumbnail} />
          </div>
          <div className="payment-product-info-detail">
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
            <div>{product.productPrice}원</div>
          </div>
        </div>
        <div className="payment-delivery-info">
          <div>배송정보</div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
