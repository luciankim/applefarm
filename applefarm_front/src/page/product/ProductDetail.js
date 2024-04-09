import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css"; //박성완
import "./productDetail2.css"; //박근열

// 스와이프
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductTab from "./ProductTab";

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

  //탭
  const productDetailTabArr = ["1:1 문의", "거래 후기", "판매 상품"];
  const [productDetailTab, setProductDetailTab] = useState(
    productDetailTabArr[0]
  );
  const changeDetailTab = (e) => {
    setProductDetailTab(e.target.id);
  };

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
          <div className="productDetail-image-area">
            <ProductImage productFileList={productFileList} />
          </div>
          <div className="productDetail-explain">
            <div className="productDetail-explain-summary">
              <ProductSummary />
            </div>
            <div className="productDetail-explain-seller">
              <ProductSeller />
            </div>
          </div>
          <div className="productDetail-explain-detail">
            <ProductExplainDetail />
          </div>
        </div>
        {/* //productDetail-content-left */}

        {/* productDetail-content-right */}
        <div className="productDetail-content-right">
          <div className="productDetail-chart">
            <ProductChart />
          </div>
          <div className="productDetail-bid">
            <ProductBid />
          </div>
          <div className="productDetail-quality">
            <ProductQuality />
          </div>
        </div>
        {/* //productDetail-content-right */}
      </div>
      {/* //productDetail-content */}

      {/* productDetail-tab-area */}
      <div className="productDetail-tab-area">
        <div className="productDetail-tab">
          <ProductTab
            productTab={productDetailTab}
            changeTab={changeDetailTab}
            tabNameArr={productDetailTabArr}
          />
        </div>
        <div className="productDetail-oneToOne">
          <ProductOneToOne />
        </div>
        <div className="productDetail-tradeReview">
          <ProductTradeReview />
        </div>
        <div className="productDetail-productList">
          <ProductProductList />
        </div>
      </div>
      {/* //productDetail-tab-area */}

      {/* productDetail-reliableList */}
      <div className="productDetail-reliableList">
        <ProductReliable />
      </div>
      {/* //productDetail-reliableList */}
    </div>
  );
};

export default ProductDetail;

const ProductImage = (props) => {
  const productFileList = props.productFileList;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {productFileList.map((file, index) => {
        return (
          <SwiperSlide key={"productFile" + index}>
            <img
              src={backServer + "/product/img/" + file.filepath}
              className="productDetail-image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

//박근열
const ProductSummary = (props) => {};

//박근열
const ProductSeller = (props) => {};

//박근열
const ProductExplainDetail = (props) => {};

//박성완
const ProductChart = (props) => {};

//박성완
const ProductBid = (props) => {};

//박성완
const ProductQuality = (props) => {};

//박근열
const ProductOneToOne = (props) => {};

//박근열
const ProductTradeReview = (props) => {};

//박근열
const ProductProductList = (props) => {};

//박성완
const ProductReliable = (props) => {};
