import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SalesProductDetails = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const product = useParams();
  const productNo = product.productNo;
  const [trade, setTrade] = useState([]);

  useEffect(() => {
    axios
      .post(backServer + "/member/getSalesProductDetails/" + productNo)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setTrade(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [productNo, backServer]);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <td>{trade.tradeState}</td>
            </tr>
            <tr>
              <td>
                <img
                  className="sales-detail-img"
                  src={`/${trade.productThumbnail}`}
                  alt="iPhone"
                />
              </td>
              <td>{trade.productSummary}</td>
              <td>
                <button>상품상세</button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>판매정산내역</td>
            </tr>
            <tr>
              <td>판매금액</td>
              <td>{trade.tradePrice}원</td>
            </tr>
            <tr>
              <td>수수료</td>
              <td>
                -
                {trade.sellerGrade === 1
                  ? 0.3 * trade.tradePrice
                  : trade.sellerGrade === 2
                  ? 0.2 * trade.tradePrice
                  : 0.1 * trade.tradePrice}
                원
              </td>
            </tr>
            <tr>
              <td>정산금액</td>
              <td>
                {trade.tradePrice -
                  (trade.sellerGrade === 1
                    ? 0.3 * trade.tradePrice
                    : trade.sellerGrade === 2
                    ? 0.2 * trade.tradePrice
                    : 0.1 * trade.tradePrice)}
                원
              </td>
            </tr>
            <tr>
              <td>거래일시</td>
              {dayjs(product.productDate).format("YYYY-MM-DD")}
            </tr>
            <tr>
              <td>판매정산계좌</td>
              <td>{trade.memberAccountnumber}</td>
            </tr>
            <tr>
              <td>반송주소</td>
            </tr>
            <tr>
              <td>받는사람</td>
              <td>{trade.memberName}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>{trade.memberPhone}</td>
            </tr>
            <tr>
              <td>주소</td>
              <td>
                <span>{trade.ad}</span>({trade.zipcode}) {trade.address}{" "}
                {trade.addressDetail} {/*{trade.addressName}*/}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SalesProductDetails;
