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
    productLine: "iphone",
    productGen: "iPhone 15 Series",
  };
  const categoryStr = JSON.stringify(category);

  useEffect(() => {
    axios
      .post(backServer + "/category", categoryStr)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  //화면 출력 순서
  //카테고리js
  //차트js, 거래건js
  //리스트js
  return <h1>안녕</h1>;
};

export default ProductMain;
