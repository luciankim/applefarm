import { stepLabelClasses } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = (props) => {
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [address, setAddress] = useState({});
  //const [zipcode, setZipcode] = useState("");
  //const [address, setAddress] = useState("");
  //const [addressDetail, setAddressDetail] = useState("");
  //const [addressName, setAddressName] = useState("");
  //const [addressPhone, setAddressPhone] = useState("");
  //const [addressRequest, setAddressRequest] = useState("");

  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
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
        console.log(res.data);
        if (res.data.message === "success") {
          setAddress(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  console.log(product);
  //결제 시 like_tbl에서 delete, trade_tbl에 insert
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
          <div className="payment-sub-title">배송 주소</div>
          <div className="payment-info">
            <div className="payment-delivery">
              <div className="payment-delivery-detail">
                <table>
                  <tbody>
                    <tr>
                      <td>받는분</td>
                      <td colSpan={3}>{address.addressName}</td>
                    </tr>
                    <tr>
                      <td>연락처</td>
                      <td colSpan={3}>{address.addressPhone}</td>
                    </tr>
                    <tr>
                      <td>배송 주소</td>
                      <td>({address.zipcode})</td>
                      <td>{address.address}</td>
                      <td>{address.addressDetail}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <button className="delivery-address-btn">주소록</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <input type="checkbox" id="refundChk"></input>
          <label htmlFor="refundChk">
            단순변심으로 인한 환불은 불가합니다.
          </label>
        </div>
        <div className="payment-purchase-btn-box">
          <button>결제하기</button>
        </div>
      </div>
    </div>
  );
};
export default Payment;
