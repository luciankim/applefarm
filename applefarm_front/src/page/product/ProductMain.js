import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { Radio } from "../../component/FormFrm";
import ProductCategory from "./ProductCategory";

const ProductMain = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  /*
  const naviTable: props.navitable //"iphone_tbl"
  const naviProductLine: props.naviProductLine
  const naviProductGen: props.naviProductGen
  */

  //<화면 출력 순서>
  //카테고리js
  //차트js, 거래건js
  //리스트js
  return (
    <ProductCategory
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      //naviTable={naviTable}
      //naviProductLine={naviProductLine}
      //naviProductGen={naviProductGen}
    />
  );
};

export default ProductMain;
