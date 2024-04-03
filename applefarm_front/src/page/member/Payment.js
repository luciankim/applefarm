import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const product = location.state.product;
  console.log(product);
  return (
    <div className="payment-wrap">
      <div className="pay-title">결제하기</div>
    </div>
  );
};
export default Payment;
