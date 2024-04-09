import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css"; //박성완
import "./productDetail2.css"; //박근열

const ProductDetail = (props) => {
  const isLogin = props.isLogin;

  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [loginMember, setLoginMember] = useState(null);
  const [likeBoolean, setLikeBoolean] = useState(null);

  const [product, setProduct] = useState({});
  const [sellerReviewList, setSellerReviewList] = useState([]);
  const [sellerProductList, setSellerProductList] = useState([]);
  const [productFileList, setProductFileList] = useState([]);
  const [qualityHistory, setQualityHistory] = useState([]);
  const [reliableList, setReliableList] = useState([]);
  useEffect(() => {
    axios
      .get(backServer + "/member")
      .then((res) => {
        setLoginMember(res.data.data);
        if (res.data.message === "success") {
          axios
            .get(backServer + "/product/likeBoolean/" + productNo)
            .then((res) => {
              setLikeBoolean(res.data.data);
            });
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
    axios
      .get(backServer + "/product/detail/" + productNo)
      .then((res) => {
        setProduct(res.data.data.product);
        setSellerReviewList(res.data.data.sellerReviewList);
        setSellerProductList(res.data.data.sellerProductList);
        setProductFileList(res.data.data.productFileList);
        setQualityHistory(res.data.data.qualityHistory);
        setReliableList(res.data.data.reliableList);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <div className="productDetail-wrap">
      {/* productDetail-top */}
      <div className="productDetail-top">
        <div className="productDetail-top-title">
          {product.tableName === "IPHONE_TBL"
            ? "iPhone"
            : product.tableName === "MACBOOK_TBL"
            ? "MacBook"
            : product.tableName === "IPAD_TBL"
            ? "iPad"
            : product.tableName === "WATCH_TBL"
            ? "Apple Watch"
            : product.tableName === "AIRPODS_TBL"
            ? "에어팟"
            : ""}
        </div>
        <div className="productDetail-top-btns">
          {/*예시 : 수정, 삭제, 좋아요*/}
          {/*isLogin && token.memberNo === productAndMember.memberNo*/}
        </div>
      </div>
      {/* //productDetail-top */}

      {/* productDetail-content */}
      <div className="productDetail-content">
        {/* //productDetail-content-left */}
        <div className="productDetail-content-left">
          <div className="productDetail-image">
            <div className="productArticle"></div>
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
