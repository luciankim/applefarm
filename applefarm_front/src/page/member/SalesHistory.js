import axios from "axios";
import Tab from "./Tab";
import { useEffect, useState } from "react";

const SalesHistory = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const member = props.member;
  const memberNo = member.memberNo;

  const [product, setProduct] = useState([]); // 판매한 상품리스트
  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState(["판매입찰", "진행중", "완료"]);

  useEffect(() => {
    axios
      .post(backServer + "/member/getSalesHistory/" + memberNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setProduct(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [memberNo, backServer]);

  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">판매내역</h3>
      <div className="sales-history-content">
        <Tab
          tabMenu={tabMenu}
          setTabMenu={setTabMenu}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === 0 ? (
          <>
            <table className="salesHistory-content">
              <thead>
                <tr>
                  <td>이미지/날짜</td>
                  <td>이름</td>
                  <td>최고 입찰가</td>
                  <td>판매가</td>
                  <td>상태</td>
                </tr>
              </thead>
              <tbody>
                {product.map((product, index) => (
                  <>
                    <tr key={index}>
                      <td>
                        {new Date(product.productDate).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          className="salesImg"
                          src={product.productThumbnail}
                          alt="Product"
                        />
                      </td>
                      <td>{product.productSummary}</td>
                      <td>{product.maxBidPrice}원</td>
                      <td>{product.productPrice}원</td>
                      <td>{product.tradeState}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </>
        ) : currentTab === 1 ? (
          <>"진행중"</>
        ) : (
          "완료"
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
