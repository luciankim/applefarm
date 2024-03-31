import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";

const ProductMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  /*
  const category = {
    table: props.table, //"iphone_tbl"
    productLine: props.productLine,
    productGen: props.productGen,
  };
  */
  const category = {
    table: "IPHONE_TBL",
    productLine: "iPhone",
    productGen: "iPhone 15 Series",
  };

  const [productLine, setProductLine] = useState("");
  const [productGen, setProductGen] = useState("");
  const [productModel, setProductModel] = useState("");
  const [productModel2, setProductModel2] = useState("");
  const [productColor, setProductColor] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productStorage, setProductStorage] = useState([]);
  const [productMemory, setProductMemory] = useState([]);
  const [productChip, setProductChip] = useState([]);
  const [productCpu, setProductCpu] = useState([]);
  const [productGpu, setProductGpu] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productConnectivity, setProductConnectivity] = useState([]);
  const [productCharge, setProductCharge] = useState([]);

  const clear = () => {
    setProductLine("");
    setProductGen("");
    setProductModel("");
    setProductModel2("");
    setProductColor([]);
    setProductImage([]);
    setProductStorage([]);
    setProductMemory([]);
    setProductChip([]);
    setProductCpu([]);
    setProductGpu([]);
    setProductSize([]);
    setProductConnectivity([]);
    setProductCharge([]);
  };

  useEffect(() => {
    axios
      .post(backServer + "/product/category", category)
      .then((res) => {
        console.log(res.data.data);
        setProductLine(res.data.data.productLine);
        setProductGen(res.data.data.productGen);
        setProductModel(res.data.data.productModel);
        setProductModel2(res.data.data.productModel2);
        setProductColor(res.data.data.productColor);
        setProductImage(res.data.data.productImage.splice(","));
        setProductStorage(res.data.data.productStorage.splice(","));
        setProductMemory(res.data.data.productMemory.splice(","));
        setProductChip(res.data.data.productChip.splice(","));
        setProductCpu(res.data.data.productCpu.splice(","));
        setProductGpu(res.data.data.productGpu.splice(","));
        setProductSize(res.data.data.productSize);
        setProductConnectivity(res.data.data.productConnectivity.splice(","));
        setProductCharge(res.data.data.productCharge.splice(","));
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);
  console.log(productLine);
  console.log();
  //화면 출력 순서
  //카테고리js
  //차트js, 거래건js
  //리스트js
  return <h1>안녕</h1>;
};

export default ProductMain;
