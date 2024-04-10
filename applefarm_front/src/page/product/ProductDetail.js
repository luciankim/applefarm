import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./productDetail.css"; //박성완
import "./productDetail2.css"; //박근열
import Swal from "sweetalert2";
import PaginationComponent from "../../component/Pagination";

// 스와이프
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductTab from "./ProductTab";
import ProductChart from "./ProductChart";

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
  const [seller, setSeller] = useState(null);
  const [sellerReviewList, setSellerReviewList] = useState([]);
  const [sellerProductList, setSellerProductList] = useState([]);
  const [productFileList, setProductFileList] = useState([]);
  const [qualityHistory, setQualityHistory] = useState([]);
  const [reliableList, setReliableList] = useState([]);


  const [salesInquiriesList, setSalesInquiriesList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage,setReqPage] = useState(1);


  

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
      
          console.log(res.data.data);
          setProduct(res.data.data.product);
          setSeller(res.data.data.seller);
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


  useEffect(()=>{
    axios
      .get(backServer+"/product/inquiry/" + productNo + "?reqPage="+reqPage)
      .then((res)=>{
        console.log(res.data.data);
        setSalesInquiriesList(res.data.data.salesInquiriesList);
        setPageInfo(res.data.data.pi);
      })
      .catch((res)=>{
        console.log(res.data);
      })
  },[reqPage])

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
            <div className="productDetail-explain-summary productArticle2">
              <ProductSummary product = {product}/>
            </div>
            <div className="productDetail-explain-seller productArticle2">
              
              <ProductSeller product = {product} seller={seller}/>
            </div>
          </div>
          <div className="productDetail-explain-detail productArticle2">
            <ProductExplainDetail product = {product}/>
          </div>
        </div>
        {/* //productDetail-content-left */}

        {/* productDetail-content-right */}
        <div className="productDetail-content-right">
          <div className="productDetail-chart">
            <ProductChart product={product} path="productDetail" />
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
          <ProductOneToOne isLogin={isLogin} productNo={productNo} salesInquiriesList={salesInquiriesList} pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage}/>
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
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
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
const ProductSummary = (props) => {
  const product = props.product;
  const selectedProduct = props.product;

  const [summaryQuality, setSummaryQuality] = useState("");
  const [summaryCpu, setSummaryCpu] = useState("");
  const [summaryGpu, setSummaryGpu] = useState("");
  useEffect(() => {
    if (selectedProduct.productQuality) {
      setSummaryQuality(selectedProduct.productQuality + "급");
    } else {
      setSummaryQuality("");
    }
  }, [selectedProduct]);
  useEffect(() => {
    if (selectedProduct.productCpu) {
      setSummaryCpu("CPU(" + selectedProduct.productCpu + ")");
    } else {
      setSummaryCpu("");
    }
  }, [selectedProduct]);
  useEffect(() => {
    if (selectedProduct.productGpu) {
      setSummaryGpu("GPU(" + selectedProduct.productGpu + ")");
    } else {
      setSummaryGpu("");
    }
  }, [selectedProduct]);
  return(<>
  <div className="productSummary-content">
  {
    //아이폰
    product.productLine === "iPhone"
      ? product.productModel + " " + summaryQuality
      : //맥북
      product.productLine === "MacBook Pro" ||
        product.productLine === "MacBook Air"
      ? product.productLine +
        " " +
        product.productGen +
        " " +
        product.productModel +
        " " +
        summaryQuality
      : //아이패드
      product.productLine === "iPad Pro 12.9" ||
        product.productLine === "iPad Pro 11" ||
        product.productLine === "iPad Air" ||
        product.productLine === "iPand Mini" ||
        product.productLine === "iPad"
      ? product.productLine +
        " " +
        product.productGen +
        " " +
        summaryQuality
      : //애플워치
      product.productLine === "Apple Watch Ultra" ||
        product.productLine === "Apple Watch Series" ||
        product.productLine === "Apple Watch SE"
      ? product.productLine +
        " " +
        product.productGen +
        " " +
        summaryQuality
      : //에어팟
      product.productLine === "AirPods" ||
        product.productLine === "AirPods Pro" ||
        product.productLine === "AirPods Max"
      ? product.productLine +
        " " +
        product.productGen +
        " " +
        summaryQuality
      : ""
  }
</div>
<div className="productSummary-content-detail">
  {
    //아이폰
    product.productLine === "iPhone"
      ? product.productStorage +
        " " +
        product.productColor
      : //맥북
      (product.productLine === "MacBook Pro" ||
          product.productLine === "MacBook Air") &&
        (product.productGen === "2018년" ||
          product.productGen === "2019년" ||
          product.productGen === "2020년")
      ? summaryCpu + " " + summaryGpu
      : product.productLine === "MacBook Pro" ||
        product.productLine === "MacBook Air"
      ? product.productChip
      : //아이패드
      product.productLine === "iPad Pro 12.9" ||
        product.productLine === "iPad Pro 11" ||
        product.productLine === "iPad Air" ||
        product.productLine === "iPand Mini" ||
        product.productLine === "iPad"
      ? product.productStorage +
        " " +
        product.productConnectivity +
        " " +
        product.productColor
      : //애플워치
      product.productLine === "Apple Watch Ultra" ||
        product.productLine === "Apple Watch Series" ||
        product.productLine === "Apple Watch SE"
      ? product.productModel +
        " " +
        product.productSize +
        " " +
        product.productConnectivity +
        " " +
        product.productColor
      : //에어팟
      product.productLine === "AirPods" ||
        product.productLine === "AirPods Pro" ||
        product.productLine === "AirPods Max"
      ? product.productCharge +
        " " +
        product.productColor
      : ""
  }
</div>
<div className="productSummary-content-detail">
  {
    //맥북
    (product.productLine === "MacBook Pro" ||
      product.productLine === "MacBook Air") &&
    (product.productGen === "2018년" ||
      product.productLine === "2019년" ||
      product.productLine === "2020년")
      ? product.productModel2 +
        " " +
        product.productStorage +
        " " +
        product.productMemory +
        " " +
        product.productColor
      : product.productLine === "MacBook Pro" ||
        product.productLine === "MacBook Air"
      ? product.productStorage +
        " " +
        product.productMemory +
        " " +
        product.productColor
      : ""
  }
</div></>
)
};

//박근열
const ProductSeller = (props) => {
  const product = props.product;
  const seller = props.seller;
  
  return(
    <>
      {seller ? (
      <>    <div className="productDetail-explain-seller-name-area">
          {seller.memberNickName}
        </div>
        <div className="productDetail-explain-seller-score-area">
          <div className="productDetail-explain-seller-score-icon">
             {/* 
            {seller.sellerScore}는 37부터 시작 
              
            */}
            {(0<=seller.sellerScore<=37) ? <img src="/image/scoreImage/썩은사과.png"/> : 
            (38<=seller.sellerScore<=70) ? <img src="/image/scoreImage/보통사과.png"/> :
            (71<=seller.sellerScore<=100) ? <img src="/image/scoreImage/금사과.png"/> : ""}
          </div>
          
          <div className="productDetail-explain-seller-score-text">
            사과점수 {seller.sellerScore}점
          </div>
        </div>
        <div className="productDetail-explain-seller-grade-area">
            {/* 
          seller.sellerGrade는 1~6까지 존재
          1
          2
          3
          */}
          {seller.sellerGrade === 1 ? 1 : 
          seller.sellerGrade === 2 ? 2 :
          seller.sellerGrade === 3 ? 3 : ""}
          등급 회원
        </div>
        <div className="productDetail-explain-seller-report-area">
          
          <div className="productDetail-explain-seller-report-icon">
            <img src="/image/report/report.png"/>
          </div>

          <div className="productDetail-explain-seller-report-text">
            신고하기
          </div>
        </div>
    
      </>) : ""}
    </>
  );
};

//박근열
const ProductExplainDetail = (props) => {
  const product = props.product;
  
  return(
    <>
      <div dangerouslySetInnerHTML={{__html : product.productExplain}}></div> 
    </>
  );
};

//박성완
//const ProductChart = (props) => {};

//박성완
const ProductBid = (props) => {
  const backServer = props.backServer;
  const product = props.product;

  useEffect(() => {
    axios
      .get(backServer + "/product/bid/" + product.productNo)
      .then((res) => {
        if (res.data.message === "success") {
          //
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  //판매자가 자신의 판매금액을 수정
  const priceUpdate = () => {};
  //판매자가 구매호가 판매버튼을 클릭
  const selling = () => {};
  //구매자가 자신의 구매호가를 수정
  const bidUpdate = () => {};
  //구매자가 구매버튼을 클릭
  const purchasing = () => {};

  return (
    <div className="productBid">
      <div className="productBid-title">판매 희망가</div>
      <div className="productBid-content"></div>
      <div className="productBid-title">구매 희망가</div>
      <div className="productBid-content"></div>
    </div>
  );
};

//박성완
const ProductQuality = (props) => {};

//박근열
const ProductOneToOne = (props) => {
  const salesInquiriesList = props.salesInquiriesList;
  const pageInfo = props.pageInfo;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const isLogin = props.isLogin;
  const productNo = props.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [content,setContent] = useState();
  

  const changeData = (e) => {
    setContent(e.target.value);
  };

  const write = () =>{
    if(content === ""){
      alert("등록할 내용을 입력해주세요.");
      return;
    }else{
      const obj = {inquiryContent:content,productNo:productNo};
      axios.post(backServer+"/product/inquiry",obj)
      .then((res)=>{
         console.log(res.data.data);
      })
      .catch((res)=>{
         console.log(res.data);
      })
      setContent("");
    }
  }


  return(
    <>
        {salesInquiriesList.map((list,index)=>{
          return(
            <SalesInquiriesItem key={"salesInquiries"+index} list={list}/>
          )
        })}

        {isLogin ? (<>
          <div className="productDetail-SalesInquiries-write-wrap">
          <div className="productDetail-SalesInquiries-input">
            <textarea value={content} onChange={changeData}></textarea>
          </div>
          <button className="productDetail-SalesInquiries-writeBtn" onClick={write}>등록하기</button>
        </div>

        <div className="salesInquiries-page">
          <PaginationComponent pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage}></PaginationComponent>
        </div>
        </>) : ""}
        
    </>
  )
};

const SalesInquiriesItem = (props) => {
  const list = props.list;
  return(
    <div className="productDetail-SalesInquiries-item">
      <div className="productDetail-SalesInquiries-item-left">
        <div className="productDetail-SalesInquiries-writer">
        {list.inquiryWriter}
        </div>
        <div className="productDetail-SalesInquiries-date">
        {list.inquiryDate}
        </div>
      </div>

      <div className="productDetail-SalesInquiries-item-right">
        {list.inquiryContent}
      </div>
    </div>
  );

}

//박근열
const ProductTradeReview = (props) => {};

//박근열
const ProductProductList = (props) => {};

//박성완
const ProductReliable = (props) => {};
