import { useEffect, useState } from "react";
import "./product.css";
import "./productMain.css";
import axios from "axios";
import { Radio } from "../../component/FormFrm";
import ProductCategory from "./ProductCategory";

const ProductMain = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  /*
  const table: props.table; //"iphone_tbl"
  const naviProductLine: props.naviProductLine;
  const naviProductGen: props.naviProductGen;
  */

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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        //table={table}
        //naviProductLine={naviProductLine}
        //naviProductGen={naviProductGen}
      />
    </div>
  );
};

export default ProductMain;
