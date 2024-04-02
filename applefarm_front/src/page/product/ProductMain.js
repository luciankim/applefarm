import { useEffect, useState } from "react";
import "./productMain.css";
import ProductCategory from "./ProductCategory";
import ProductSummary from "./ProductSummary";

const ProductMain = (props) => {
  /*
  const table = props.table; //"iphone_tbl"
  const naviProductLine = props.naviProductLine;
  const naviProductGen = props.naviProductGen;
  */
  const table = "IPHONE_TBL"; //반드시 대문자로 받을것!!
  const naviProductLine = "iPhone";
  const naviProductGen = ""; //없을 경우 ""로 받을것!!

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [productLine, setProductLine] = useState(naviProductLine);
  const [productGen, setProductGen] = useState(naviProductGen);
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
      setProductQuality: setProductQuality,
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

  //<화면 출력 순서>
  //카테고리js
  //차트js, 거래건js
  //리스트js
  return (
    <div className="productMain">
      <div className="productMain-title">
        {/*
        table === "iphone_tbl"
          ? "iPhone"
          : table === "macbook_tbl"
          ? "MacBook"
          : table === "ipad_tbl"
          ? "iPad"
          : table === "watch_tbl"
          ? "Apple Watch"
          : table === "airpods_tbl"
          ? "에어팟"
          : ""
          */}
        {"iPhone"}
      </div>
      <ProductCategory
        /*axios용*/
        table={table}
        naviProductLine={naviProductLine}
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
      />
      <ProductSummary selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductMain;
