import { useBlocker } from "react-router-dom";
import ProductQualityInsert from "./ProductQualityInsert";
import ProductInsertLast from "./ProductInsertLast";
import { useState } from "react";
import ProductCategoryInsert from "./ProductCategoryInsert";
import ProductTab from "./ProductTab";

const ProductInsert = (props) => {
  //탭
  const progressArr = ["제품 선택", "품질 선택", "세부 내용"];
  const [pip, setPip] = useState(progressArr[0]); //pip = progressInsertProgress
  const changePip = (e) => {
    setPip(e.target.value);
  };

  return (
    <div className="productInsert-wrap">
      <div className="productInsert-title">상품 등록</div>
      <div className="pip-bar">
        <ProductInsertProgress pip={pip} progressArr={progressArr} />
      </div>
      <div className={pip === progressArr[0] ? "" : "displayNone"}>
        <ProductCategoryInsert />
      </div>
      <div className={pip === progressArr[1] ? "" : "displayNone"}>
        <ProductQualityInsert />
      </div>
      <div className={pip === progressArr[2] ? "" : "displayNone"}>
        <ProductInsertLast />
      </div>
      <div className="pip-bar">
        <NextBtn pip={pip} changePip={setPip} />
      </div>
    </div>
  );
};

export default ProductInsert;

const ProductInsertProgress = (props) => {
  const pip = props.pip;
  const progressArr = props.progressArr;
  return (
    //pip = ProductInsertProgress
    <div className="pip">
      <div className="pip-line-area">
        <div
          className={
            pip === progressArr[1] ? "pip-line1 active-pip-line" : "pip-line1"
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

const NextBtn = (props) => {
  const changePip = props.changePip;
  return <div>여기에 버튼 2개</div>;
};
