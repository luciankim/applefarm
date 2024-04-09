import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css"; //박성완
import "./productDetail2.css"; //박근열

// 스와이프
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ProductDetail = (props) => {
  const isLogin = props.isLogin;
  const token = props.token;
  console.log(token ? token.member : "");
  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [productAndMember, setProductAndMember] = useState({});
  const [sellerReviewList, setSellerReviewList] = useState([]);
  const [sellerProductList, setSellerProductList] = useState([]);
  const [productFileList, setProductFileList] = useState([]);
  const [qualityHistory, setQualityHistory] = useState([]);
  const [reliableList, setReliableList] = useState([]);

  const swiper = useSwiper();


  useEffect(() => {
    axios
      .get(backServer + "/product/" + productNo)
      .then((res) => {
        setProductAndMember(res.data.data.productAndMember);
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

  useEffect(() => {}, [productFileList]);

  return (
    <div className="productDetail-wrap">
      {/* productDetail-top */}
      <div className="productDetail-top">
        <div className="productDetail-top-title">
          {productAndMember.tableName === "IPHONE_TBL"
            ? "iPhone"
            : productAndMember.tableName === "MACBOOK_TBL"
            ? "MacBook"
            : productAndMember.tableName === "IPAD_TBL"
            ? "iPad"
            : productAndMember.tableName === "WATCH_TBL"
            ? "Apple Watch"
            : productAndMember.tableName === "AIRPODS_TBL"
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
          <div className="productDetail-image-area productArticle">
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
                  <SwiperSlide key={"product" + index}>
                    <img
                      src={backServer + "/product/img/" + file.filepath}
                      className="productDetail-image"
                    />
                  </SwiperSlide>
                );
              })}
    
            </Swiper>
          </div>
          <div className="productDetail-explain">
            
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
