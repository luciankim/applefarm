import { useEffect, useState } from "react";
import "./productMain.css";
import ProductCategory from "./ProductCategory";
import ProductSummary from "./ProductSummary";
import ProductChart from "./ProductChart";
import ProductList from "./ProductList";
import ProductRecentTrade from "./ProductRecentTrade";
import ProductTab from "./ProductTab";
import { useLocation } from "react-router-dom";

const ProductMain = (props) => {
  //const { table, navProductLine, navProductGen } = props;
  const location = useLocation();
  const [navTable, setNavTable] = useState(location.state.navTable);
  const [navProductLine, setNavProductLine] = useState(
    location.state.navProductLine
  );
  const [navProductGen, setNavProductGen] = useState(
    location.state.navProductGen
  );
  console.log(location.state.navTable); //확인
  useEffect(() => {
    setNavTable(location.state.navTable);
    setNavProductLine(location.state.navProductLine);
    setNavProductGen(location.state.navProductGen);
    setProductLine(location.state.navProductLine);
    setProductGen(navProductGen ? navProductGen : "");
  }, [
    location.state.navTable,
    location.state.navProductLine,
    location.state.navProductGen,
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [productLine, setProductLine] = useState(navProductLine);
  const [productGen, setProductGen] = useState(
    navProductGen ? navProductGen : ""
  );
  const [productModel, setProductModel] = useState("");
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
  ]);

  const [productMainTab, setProductMainTab] = useState("CHART");
  const changeMainTab = (e) => {
    setProductMainTab(e.target.id);
  };

  //<화면 출력 순서>
  //카테고리js
  //차트js, 거래건js
  //리스트js
  return (
    <div className="productMain">
      <div className="productMain-title">
        {navTable === "IPHONE_TBL"
          ? "iPhone"
          : navTable === "MACBOOK_TBL"
          ? "MacBook"
          : navTable === "IPAD_TBL"
          ? "iPad"
          : navTable === "WATCH_TBL"
          ? "Apple Watch"
          : navTable === "AIRPODS_TBL"
          ? "에어팟"
          : ""}
      </div>
      <ProductCategory
        /*axios용*/
        navTable={navTable}
        navProductLine={navProductLine}
        navProductGen={navProductGen}
        /*--axios용*/
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

      {/*탭*/}
      <ProductTab
        productTab={productMainTab}
        changeTab={changeMainTab}
        tabNameArr={["LIST", "CHART", "RECENT", "REFUND&DELIVERY"]}
      />

      <div className="productMain-content-wrap">
        <div className="productMain-content">
          <div
            className={
              productMainTab === "LIST" ? "" : "productMain-content-hide"
            }
          >
            <ProductList />
          </div>
          <div
            className={
              productMainTab === "CHART" ? "" : "productMain-content-hide"
            }
          >
            {/*productQuality가 undefined또는null인거 조심!!!*/}
            <ProductChart productQuality={productQuality} />
          </div>
          <div
            className={
              productMainTab === "RECENT" ? "" : "productMain-content-hide"
            }
          >
            <ProductRecentTrade />
          </div>
          <div
            className={
              productMainTab === "REFUND&DELIVERY"
                ? ""
                : "productMain-content-hide"
            }
          >
            <div>환불 배송 규정</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;

/*
uselocation usenavigation??
*/
