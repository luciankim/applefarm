import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css"; //박성완
import "./productDetail2.css"; //박근열

const ProductDetail = (props) => {
  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    axios
      .get(backServer + "/product/" + productNo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="productDetail-wrap">
      {/* productDetail-top */}
      <div className="productDetail-top">
        <div className="productDetail-top-title">
          {/*예시 : iPhone 15 Pro*/}
        </div>
        <div className="productDetail-top-btns">
          {/*예시 : 수정, 삭제, 좋아요*/}
        </div>
      </div>
      {/* //productDetail-top */}

      {/* productDetail-content */}
      <div className="productDetail-content">
        {/* //productDetail-content-left */}
        <div className="productDetail-content-left">
          <div className="productDetail-image">
            <div className="productArticle example">sksksk</div>
          </div>
        </div>
        {/* //productDetail-content-left */}

        {/* productDetail-content-right */}
        <div className="productDetail-content-right"></div>
        {/* //productDetail-content-right */}
      </div>
      {/* //productDetail-content */}

      {/* productDetail-tab-area */}
      <div className="productDetail-tab-area"></div>
      {/* //productDetail-tab-area */}

      {/* productDetail-reliableList */}
      <div className="productDetail-reliableList"></div>
      {/* //productDetail-reliableList */}
    </div>
  );
};

export default ProductDetail;
