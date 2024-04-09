import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./productDetail.css"; //박성완
import "./productDetail2.css"; //박근열
import Swal from "sweetalert2";

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
  const navigate = useNavigate();

  const isLogin = props.isLogin;
  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [loginMember, setLoginMember] = useState(null);
  const [likeBoolean, setLikeBoolean] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  const [product, setProduct] = useState({});
  const [sellerReviewList, setSellerReviewList] = useState([]);
  const [sellerProductList, setSellerProductList] = useState([]);
  const [productFileList, setProductFileList] = useState([]);
  const [qualityHistory, setQualityHistory] = useState([]);
  const [reliableList, setReliableList] = useState([]);

  useEffect(() => {
    if (isLogin) {
      axios
        .get(backServer + "/member")
        .then((res) => {
          if (res.data.message === "success") {
            setLoginMember(res.data.data);
            axios
              .get(backServer + "/product/likeBoolean/" + productNo)
              .then((res) => {
                if (res.data.message === "success") {
                  setLikeBoolean(res.data.data);
                }
              });
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    }
    axios
      .get(backServer + "/product/detail/" + productNo)
      .then((res) => {
        if (res.data.message === "success") {
          setProduct(res.data.data.product);
          setSellerReviewList(res.data.data.sellerReviewList);
          setSellerProductList(res.data.data.sellerProductList);
          setProductFileList(res.data.data.productFileList);
          setQualityHistory(res.data.data.qualityHistory);
          setReliableList(res.data.data.reliableList);
          //likeCount는 따로 저장
          setLikeCount(res.data.data.product.likeCount);
        } else if (res.data.message === "fail") {
        }
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

  //PswProductDetailBtn 클릭이벤트들
  const clickUpdate = () => {
    navigate("/main"); //추후에 "/product/update"로 수정
  };
  const clickDelete = () => {
    Swal.fire({ title: "정말 삭제하시겠습니까?", showDenyButton: true })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(backServer + "/product/hide", {
              productNo: product.productNo,
            })
            .then((res) => {
              if (res.data.message === "success") {
                console.log("삭제 성공"); //확인!!!!!
                navigate("/main");
              } else {
                console.log("삭제 실패"); //확인!!!!!
                console.log(res.data);
              }
            })
            .catch((res) => {
              console.log("axios 들어가지도 않았음 시발"); //확인!!!!!
              console.log(res.data);
            });
        } else if (result.isDenied) {
          console.log("삭제 거부"); //확인!!!!!
        }
      })
      .catch(() => {});
  };
  const likeClick = () => {
    //좋아요를 누르지 않은 상태일 때 -> 좋아요 Insert
    if (likeBoolean === 0) {
      axios
        .post(backServer + "/product/like", { productNo: product.productNo }) //memberNo는 @RequestAttribute로
        .then((res) => {
          if (res.data.message === "success") {
            setLikeCount(likeCount + 1); //화면에 표시되는 좋아요 개수 변경
            setLikeBoolean(1); //화면에 표시되는 좋아요 이미지 변경
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    }
    //좋아요를 누른 상태일 때 -> 좋아요 Delete
    else if (likeBoolean === 1) {
      axios
        .delete(backServer + "/product/like/" + product.productNo) //memberNo는 @RequestAttribute로
        .then((res) => {
          if (res.data.message === "success") {
            setLikeCount(likeCount - 1); //화면에 표시되는 좋아요 개수 변경
            setLikeBoolean(0); //화면에 표시되는 좋아요 이미지 변경
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    }
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
          {
            //로그인 되어 있고, 로그인한 회원이 글 작성자일 때
            loginMember && loginMember.memberNo === product.memberNo ? (
              <>
                <div className="productDetail-updateBtn">
                  <PswProductDetailBtn clickEvent={clickUpdate} text="수정" />
                </div>
                <div className="productDetail-deleteBtn">
                  <PswProductDetailBtn clickEvent={clickDelete} text="삭제" />
                </div>
                <div className="productDetail-ikeBtn">
                  <span className="material-icons like-image">favorite</span>
                  <span className="productDetail-likeCount">
                    {likeCount + "개"}
                  </span>
                </div>
              </>
            ) : //로그인 되어 있고, 로그인한 회원이 글 작성자가 아닐 때
            loginMember && loginMember.memberNo !== product.memberNo ? (
              <>
                <div className="productDetail-ikeBtn">
                  <span
                    className="material-icons like-image"
                    onClick={likeClick}
                  >
                    {likeBoolean === 1 ? "favorite" : "favorite_border"}
                  </span>
                  <span className="productDetail-likeCount">
                    {likeCount + "개"}
                  </span>
                </div>
              </>
            ) : (
              //로그인 안 되어 있을 때
              <>
                <div className="productDetail-ikeBtn">
                  <span className="material-icons like-image">favorite</span>
                  <span className="productDetail-likeCount">
                    {likeCount + "개"}
                  </span>
                </div>
              </>
            )
          }
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

//박성완
const PswProductDetailBtn = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  return (
    <div className="pswProductDetailBtn" onClick={clickEvent}>
      {text}
    </div>
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
