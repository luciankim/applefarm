import {
  useBlocker,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProductQualityInsert from "./ProductQualityInsert";
import ProductInsertLast from "./ProductInsertLast";
import { useEffect, useState } from "react";
import ProductTab from "./ProductTab";
import ProductCategory from "./ProductCategory";
import axios from "axios";

const ProductInsert = (props) => {
  //https://heycoding.tistory.com/72#3.2.%20useNavigate

  const location = useLocation();

  const [navTable, setNavTable] = useState(location.state.navTable);
  const [navLine, setNavLine] = useState(location.state.navProductLine);
  const [navGen, setNavGen] = useState(location.state.navProductGen);
  const [navModel, setNavModel] = useState(location.state.navProductModel);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [productLine, setProductLine] = useState("");
  const [productGen, setProductGen] = useState("");
  const [productModel, setProductModel] = useState();
  const [productModel2, setProductModel2] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productStorage, setProductStorage] = useState("");
  const [productMemory, setProductMemory] = useState("");
  const [productChip, setProductChip] = useState("");
  const [productCpu, setProductCpu] = useState("");
  const [productGpu, setProductGpu] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productConnectivity, setProductConnectivity] = useState("");
  const [productCharge, setProductCharge] = useState("");
  const [productQuality, setProductQuality] = useState("");

  useEffect(() => {
    setProductLine(location.state.navProductLine);
    setProductGen(location.state.navProductGen);
    setProductModel(location.state.navProductModel);

    setNavTable(location.state.navTable);
    setNavLine(location.state.navProductLine);
    setNavGen(location.state.navProductGen);
    setNavModel(location.state.navProductModel);
  }, [location]);

  //ProductInsert.js 버전 setSelectedProduct
  const [selectedProduct, setSelectedProduct] = useState({}); //객체
  useEffect(() => {
    setSelectedProduct({
      productLine: productLine,
      productGen: productGen,
      productModel: productModel,
      productModel2: productModel2,
      productColor: productColor,
      productImage: productImage,
      productStorage: productStorage,
      productMemory: productMemory,
      productChip: productChip,
      productCpu: productCpu,
      productGpu: productGpu,
      productSize: productSize,
      productConnectivity: productConnectivity,
      productCharge: productCharge,
      productQuality: productQuality,
    });
  }, [
    productLine,
    productGen,
    productModel,
    productModel2,
    productColor,
    productImage,
    productStorage,
    productMemory,
    productChip,
    productCpu,
    productGpu,
    productSize,
    productConnectivity,
    productCharge,
    productQuality,
    location,
  ]);
  //--ProductCategory.js로 넘겨줄 데이터

  const navigate = useNavigate();

  //progress
  const progressArr = ["제품 선택", "품질 선택", "세부 내용", "상품 등록"];
  const [pip, setPip] = useState(progressArr[0]); //pip = progressInsertProgress
  const changePip = (e) => {
    if (
      nextBtnActive[progressArr.indexOf(pip)] === true || //다음으로 넘어가는 버튼 클릭시 그 nextBtnActive가 true여야 작동함을 표시
      progressArr.indexOf(e.target.value) < progressArr.indexOf(pip) //뒤로 돌아가는 버튼임을 표시
    ) {
      setPip(e.target.value);
    }
  };
  const [nextBtnActive, setNextBtnActive] = useState([false, false, false]);
  //changeBtnActive을 컴포넌트에 줄거임
  const changeBtnActiveTrue = () => {
    if (progressArr.indexOf(pip) > -1) {
      nextBtnActive[progressArr.indexOf(pip)] = true;
      setNextBtnActive(...[nextBtnActive]);
    }
  };
  const changeBtnActiveFalse = () => {
    if (progressArr.indexOf(pip) > -1) {
      nextBtnActive[progressArr.indexOf(pip)] = false;
      setNextBtnActive(...[nextBtnActive]);
    }
  };
  //"등록 취소"버튼 클릭시 제품별 메인페이지로 이동
  useEffect(() => {
    if (pip === "등록 취소") {
      navigate("/product/main"); //아직 메인페이지 경로 없음
    }
  }, [pip]);

  //ProductQualityInsert.js로 넘겨줄 속성
  const [grade, setGrade] = useState(null);
  const [partOrder, setPartOrder] = useState([]);

  //ProductInsertLast.js로 넘겨줄 속성
  const [title, setTitle] = useState(); //제목
  const [content, setContent] = useState(); //내용
  const [price, setPrice] = useState(); //가격
  const [file, setFile] = useState([]); //이미지
  const [thumbnail, setThumbnail] = useState(); //대표이미지

  //서버 변수
  const backServer = process.env.REACT_APP_BACK_SERVER;

  //insert 하기 위해 서버 오픈
  useEffect(() => {
    if (
      title &&
      content &&
      price &&
      file &&
      thumbnail &&
      pip === progressArr[progressArr.length - 1]
    ) {
      //partOrder객체의 각 value값을 key-value쌍으로 변환작업
      //[{part2 : 'DISPAY',value:'정상'}] -> {DISPLAY : '정상'}
      //reduce함수(배열요소 순회 함수) - (누적,현제요소,현제요소 인덱스, 호출한배열),(초기값설정 - 여기는 빈 객체로 설정)
      const partObject = partOrder.reduce((acc, item) => {
        acc[item.part2] = item.value;
        return acc;
      }, {});
      //console.log(partObject);

      //navigate("/product/main"); //아직 메인페이지 경로 없음

      //여기에 서버로 가서 insert하는 axios코드
      //navigate("/product/main"); //아직 메인페이지 경로 없음

      const form = new FormData();
      form.append("productTitle", title);
      form.append("productExplain", content);
      form.append("productPrice", price);
      form.append("productQuality", grade);
      form.append("thumbnail", thumbnail);
      form.append("productSummary", summaryFind());

      for (let i = 0; i < file.length; i++) {
        form.append("productFile", file[i]);
      }

      form.append("productLine", selectedProduct.productLine);
      form.append("productGen", selectedProduct.productGen);
      form.append("productModel", selectedProduct.productModel);
      form.append("productModel2", selectedProduct.productModel2);
      form.append("productColor", selectedProduct.productColor);
      form.append("productColor", selectedProduct.productColor);
      form.append("productImage", selectedProduct.productImage);
      form.append("productStorage", selectedProduct.productStorage);
      form.append("productMemory", selectedProduct.productMemory);
      form.append("productChip", selectedProduct.productChip);
      form.append("productCpu", selectedProduct.productCpu);
      form.append("productGpu", selectedProduct.productGpu);
      form.append("productSize", selectedProduct.productSize);
      form.append("productConnectivity", selectedProduct.productConnectivity);
      form.append("productCharge", selectedProduct.productCharge);
      form.append("tableName", navTable);

      for (let i = 0; i < file.length; i++) {
        form.append("productFile", file[i]);
      }
      form.append("productLine", selectedProduct.productLine);
      form.append("productGen", selectedProduct.productGen);
      form.append("productModel", selectedProduct.productModel);
      form.append("productModel2", selectedProduct.productModel2);
      form.append("productColor", selectedProduct.productColor);
      form.append("productColor", selectedProduct.productColor);
      form.append("productImage", selectedProduct.productImage);
      form.append("productStorage", selectedProduct.productStorage);
      form.append("productMemory", selectedProduct.productMemory);
      form.append("productChip", selectedProduct.productChip);
      form.append("productCpu", selectedProduct.productCpu);
      form.append("productGpu", selectedProduct.productGpu);
      form.append("productSize", selectedProduct.productSize);
      form.append("productConnectivity", selectedProduct.productConnectivity);
      form.append("productCharge", selectedProduct.productCharge);
      form.append("tableName", navTable);

      if (navTable == "MACBOOK_TBL") {
        form.append("displayScreen", partObject.DISPLAY_SCREEN);
        form.append("backPanelSide", partObject.BACK_PANEL_SIDE);
        form.append("burnIn", partObject.BURN_IN);
        form.append("display", partObject.DISPLAY);
        form.append("keyboard", partObject.KEYBOARD);
        form.append("ports", partObject.PORTS);
        form.append("batteryEfficiency", partObject.BATTERY_EFFICIENCY);
        form.append("wirelessConffectivity", partObject.WIRELESS_CONNECTIVITY);
        form.append("camera", partObject.CAMERA);
        form.append("microphone", partObject.MICROPHONE);
        form.append("speakersAudioJack", partObject.SPEAKERS_AUDIO_JACK);
        form.append(
          "biometricAuthentication",
          partObject.BIOMETRIC_AUTHENTICATION
        );
        form.append("power", partObject.POWER);
        form.append("voiceRecording", partObject.VOICE_RECORDING);
        form.append("trackpad", partObject.TRACKPAD);
        form.append("operation", partObject.OPERATION);
      } else if (navTable == "IPHONE_TBL") {
        form.append("displayScreen", partObject.DISPLAY_SCREEN);
        form.append("backPanelSide", partObject.BACK_PANEL_SIDE);
        form.append("burnIn", partObject.BURN_IN);
        form.append("display", partObject.DISPLAY);
        form.append("power", partObject.POWER);
        form.append("camera", partObject.CAMERA);
        form.append("wifi", partObject.WIFI);
        form.append(
          "biometricAuthentication",
          partObject.BIOMETRIC_AUTHENTICATION
        );
        form.append("compass", partObject.COMPASS);
        form.append("voiceRecording", partObject.VOICE_RECORDING);
      } else if (navTable == "IPAD_TBL") {
        form.append("displayScreen", partObject.DISPLAY_SCREEN);
        form.append("backPanelSide", partObject.BACK_PANEL_SIDE);
        form.append("burnIn", partObject.BURN_IN);
        form.append("display", partObject.DISPLAY);
        form.append("keyboard", partObject.KEYBOARD);
        form.append("ports", partObject.PORTS);
        form.append("batteryEfficiency", partObject.BATTERY_EFFICIENCY);
        form.append("wirelessConffectivity", partObject.WIRELESS_CONNECTIVITY);
        form.append("camera", partObject.CAMERA);
        form.append("microphone", partObject.MICROPHONE);
        form.append("speakersAudioJack", partObject.SPEAKERS_AUDIO_JACK);
        form.append(
          "biometricAuthentication",
          partObject.BIOMETRIC_AUTHENTICATION
        );
        form.append("power", partObject.POWER);
        form.append("voiceRecording", partObject.VOICE_RECORDING);
        form.append("operation", partObject.OPERATION);
      } else if (navTable == "WATCH_TBL") {
        form.append("displayScreen", partObject.DISPLAY_SCREEN);
        form.append("backPanelSide", partObject.BACK_PANEL_SIDE);
        form.append("burnIn", partObject.BURN_IN);
        form.append("display", partObject.DISPLAY);
        form.append("digitalCrownButton", partObject.DIGITAL_CROWN_BUTTON);
        form.append("batteryEfficiency", partObject.BATTERY_EFFICIENCY);
        form.append("wirelessConffectivity", partObject.WIRELESS_CONNECTIVITY);
        form.append("microphone", partObject.MICROPHONE);
        form.append("speaker", partObject.SPEAKER);
        form.append("power", partObject.POWER);
        form.append("voiceRecording", partObject.VOICE_RECORDING);
        form.append("operation", partObject.OPERATION);
      } else if (navTable == "AIRPODS_TBL") {
        form.append("soundQuality", partObject.SOUND_QUALITY);
        form.append("connectionStability", partObject.CONNECTION_STABILITY);
        form.append("batteryEfficiency", partObject.BATTERY_EFFICIENCY);
        form.append("exterior", partObject.EXTERIOR);
        form.append("charging", partObject.CHARGING);
        form.append("touchSensor", partObject.TOUCH_SENSOR);
      }

      //테이블에 따라서 품질내역을 요청하는 url이 달라잠
      //상품품질내역 등록
      let url;
      if (navTable === "IPHONE_TBL") {
        url = backServer + "/product/iphone";
      } else if (navTable === "MACBOOK_TBL") {
        url = backServer + "/product/macbook";
      } else if (navTable === "IPAD_TBL") {
        url = backServer + "/product/ipad";
      } else if (navTable === "WATCH_TBL") {
        url = backServer + "/product/watch";
      } else if (navTable === "AIRPODS_TBL") {
        url = backServer + "/product/airpods";
      }

      //상품 등록
      axios
        .post(url, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [pip]);

  //selectedProduct.productSummary 구하기
  const summaryFind = () => {
    const summaryQuality = selectedProduct.productQuality + "급";
    //데이터에 설명 추가

    const summary =
      selectedProduct.productLine === "iPhone"
        ? selectedProduct.productModel + " " + summaryQuality
        : //맥북
        selectedProduct.productLine === "MacBook Pro" ||
          selectedProduct.productLine === "MacBook Air"
        ? selectedProduct.productLine +
          " " +
          selectedProduct.productGen +
          " " +
          selectedProduct.productModel +
          " " +
          summaryQuality
        : //아이패드
        selectedProduct.productLine === "iPad Pro 12.9" ||
          selectedProduct.productLine === "iPad Pro 11" ||
          selectedProduct.productLine === "iPad Air" ||
          selectedProduct.productLine === "iPand Mini" ||
          selectedProduct.productLine === "iPad"
        ? selectedProduct.productLine +
          " " +
          selectedProduct.productGen +
          " " +
          summaryQuality
        : //애플워치
        selectedProduct.productLine === "Apple Watch Ultra" ||
          selectedProduct.productLine === "Apple Watch Series" ||
          selectedProduct.productLine === "Apple Watch SE"
        ? selectedProduct.productLine +
          " " +
          selectedProduct.productGen +
          " " +
          summaryQuality
        : //에어팟
        selectedProduct.productLine === "AirPods" ||
          selectedProduct.productLine === "AirPods Pro" ||
          selectedProduct.productLine === "AirPods Max"
        ? selectedProduct.productLine +
          " " +
          selectedProduct.productGen +
          " " +
          summaryQuality
        : "";
    return summary;
  };

  return (
    <div className="productInsert-wrap">
      <div className="productInsert-title">상품 등록</div>
      <div className="pip-bar-top">
        <ProductInsertProgress pip={pip} progressArr={progressArr} />
      </div>
      <div className={pip === progressArr[0] ? "" : "displayNone"}>
        <ProductCategory
          /*nextBtn용*/
          changeBtnActiveTrue={changeBtnActiveTrue}
          changeBtnActiveFalse={changeBtnActiveFalse}
          pip={pip}
          /*axios용*/
          navTable={navTable}
          navLine={navLine}
          navGen={navGen}
          navModel={navModel}
          /*--axios용*/
          /*selectedCategory, selectProduct용*/
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          productQuality={productQuality}
          setProductQuality={setProductQuality}
          productLine={productLine}
          setProductLine={setProductLine}
          productGen={productGen}
          setProductGen={setProductGen}
          productModel={productModel}
          setProductModel={setProductModel}
          productModel2={productModel2}
          setProductModel2={setProductModel2}
          productColor={productColor}
          setProductColor={setProductColor}
          productImage={productImage}
          setProductImage={setProductImage}
          productStorage={productStorage}
          setProductStorage={setProductStorage}
          productMemory={productMemory}
          setProductMemory={setProductMemory}
          productChip={productChip}
          setProductChip={setProductChip}
          productCpu={productCpu}
          setProductCpu={setProductCpu}
          productGpu={productGpu}
          setProductGpu={setProductGpu}
          productSize={productSize}
          setProductSize={setProductSize}
          productConnectivity={productConnectivity}
          setProductConnectivity={setProductConnectivity}
          productCharge={productCharge}
          setProductCharge={setProductCharge}
          selectedProduct={selectedProduct}
        />
      </div>
      <div className={pip === progressArr[1] ? "" : "displayNone"}>
        <ProductQualityInsert
          /*nextBtn용*/
          changeBtnActiveTrue={changeBtnActiveTrue}
          changeBtnActiveFalse={changeBtnActiveFalse}
          //원래ProductQualityInsert용
          grade={grade}
          setGrade={setGrade}
          partOrder={partOrder}
          setPartOrder={setPartOrder}
        />
      </div>
      <div className={pip === progressArr[2] ? "" : "displayNone"}>
        <ProductInsertLast
          /*nextBtn용*/
          changeBtnActiveTrue={changeBtnActiveTrue}
          changeBtnActiveFalse={changeBtnActiveFalse}
          //ProductInsertLast
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          price={price}
          setPrice={setPrice}
          file={file}
          setFile={setFile}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          grade={grade}
          setGrade={setGrade}
          partOrder={partOrder}
          setPartOrder={setPartOrder}
        />
      </div>
      <div className="productInsert-nextBtn">
        <ProductInsertBtn
          progressArr={progressArr}
          pip={pip}
          changePip={changePip}
        />
      </div>
    </div>
  );
};

export default ProductInsert;

//컴포넌트
const ProductInsertProgress = (props) => {
  const pip = props.pip;
  const progressArr = props.progressArr;
  return (
    //pip = ProductInsertProgress
    <div className="pip">
      <div className="pip-line-area">
        <div
          className={
            pip === progressArr[1] || pip === progressArr[2]
              ? "pip-line1 active-pip-line"
              : "pip-line1"
          }
        ></div>
        <div
          className={
            pip === progressArr[2] ? "pip-line2 active-pip-line" : "pip-line2"
          }
        ></div>
      </div>
      <div className="pip-circle-area">
        <span
          className={
            progressArr.indexOf(pip) > -1
              ? "material-icons pip-circle active-pip-circle"
              : "material-icons pip-circle"
          }
        >
          {progressArr.indexOf(pip) > -1 ? "circle" : "radio_button_unchecked"}
        </span>
        <span
          className={
            progressArr.indexOf(pip) > 0
              ? "material-icons pip-circle active-pip-circle"
              : "material-icons pip-circle"
          }
        >
          {progressArr.indexOf(pip) > 0 ? "circle" : "radio_button_unchecked"}
        </span>
        <span
          className={
            progressArr.indexOf(pip) > 1
              ? "material-icons pip-circle active-pip-circle"
              : "material-icons pip-circle"
          }
        >
          {progressArr.indexOf(pip) > 1 ? "circle" : "radio_button_unchecked"}
        </span>
      </div>
      <div className="pip-text-area">
        <span
          className={
            pip === progressArr[0] ? "pip-text active-pip-text" : "pip-text"
          }
        >
          {progressArr[0]}
        </span>
        <span
          className={
            pip === progressArr[1] ? "pip-text active-pip-text" : "pip-text"
          }
        >
          {progressArr[1]}
        </span>
        <span
          className={
            pip === progressArr[2] ? "pip-text active-pip-text" : "pip-text"
          }
        >
          {progressArr[2]}
        </span>
      </div>
    </div>
  );
};

const ProductInsertBtn = (props) => {
  const { progressArr, pip, changePip } = props;
  let beforeText;
  if (progressArr.indexOf(pip) === 0) {
    beforeText = "등록 취소";
  } else {
    beforeText = progressArr[progressArr.indexOf(pip) - 1];
  }
  let nextText = progressArr[progressArr.indexOf(pip) + 1];
  return (
    <div>
      <button
        className="productInsertBtn beforeBtn"
        type="button"
        onClick={changePip}
        value={beforeText}
      >
        {beforeText}
      </button>
      <button
        className="productInsertBtn"
        type="button"
        onClick={changePip}
        value={nextText}
      >
        {nextText}
      </button>
    </div>
  );
};
