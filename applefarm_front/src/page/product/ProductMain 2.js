import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { Radio } from "../../component/FormFrm";

const ProductMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [categoryArr, setCategoryArr] = useState([]);

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

  /*
  const requestCategory = {
    table: props.table, //"iphone_tbl"
    productLine: props.productLine,
    productGen: props.productGen,
  };
  */
  //원래는 위처럼 해야 하는데, 일단은 임시로 아래처럼 직접 입력하였음
  const requestCategory = {
    table: "IPHONE_TBL",
    productLine: "iPhone",
    //productGen: "iPhone 15 Series",
  };

  /*
setProductLine(res.data.data.productLine);
setProductGen(res.data.data.productGen);
setProductModel(res.data.data.productModel);
setProductModel2(res.data.data.productModel2);
setProductColor(res.data.data.productColor.splice(","));
setProductImage(res.data.data.productImage.splice(","));
setProductStorage(res.data.data.productStorage.splice(","));
setProductMemory(res.data.data.productMemory.splice(","));
setProductChip(res.data.data.productChip.splice(","));
setProductCpu(res.data.data.productCpu.splice(","));
setProductGpu(res.data.data.productGpu.splice(","));
setProductSize(res.data.data.productSize);
setProductConnectivity(res.data.data.productConnectivity.splice(","));
setProductCharge(res.data.data.productCharge.splice(",")); 
  */

  useEffect(() => {
    axios
      .post(backServer + "/product/category", requestCategory)
      .then((res) => {
        clear();
        categoryArr.length = 0; //초기화하고
        res.data.data.forEach((item) => {
          categoryArr.push(item); //배열에 추가하고
        });
        setCategoryArr([...categoryArr]); //set
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  const genArr = [];
  const modelArr = [];
  const model2Arr = [];
  categoryArr.forEach((category) => {
    if (!genArr.includes(category.productGen)) {
      genArr.push(category.productGen);
    }
    if (
      (category.productLine === "iPhone" ||
        "MacBook Pro" ||
        "MacBook Air" ||
        "Apple Watch Ultra" ||
        "Apple Watch Series" ||
        "Apple Watch SE") &&
      category.productGen === productGen &&
      !modelArr.includes(category.productModel)
    ) {
      modelArr.push(category.productModel);
    }
    if (
      (category.productLine === "MacBook Pro" || "MacBook Air") &&
      category.productGen === productGen &&
      category.productModel === productModel &&
      !model2Arr.includes(category.productModel2)
    ) {
      model2Arr.push(category.productModel2);
    }
  });

  const selectedCategory = categoryArr.filter((category) =>
    category.productLine === "iPhone" ||
    "Apple Watch Ultra" ||
    "Apple Watch Series" ||
    "Apple Watch SE"
      ? category.productGen === productGen &&
        category.productModel === productModel
      : category.productModel === "MacBook Pro" || "MacBook Air"
      ? category.productGen === productGen &&
        category.productModel === productModel &&
        category.productModel2 === productModel2
      : category.productGen === productGen
  );
  console.log(selectedCategory);

  //화면 출력 순서
  //카테고리js
  //차트js, 거래건js
  //리스트js
  return (
    <div>
      <ul>
        {genArr.map((gen, index) => {
          return (
            <li key={"gen" + index}>
              <Radio
                val={gen}
                name="gen"
                selectValue={productGen}
                setSelectValue={setProductGen}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {modelArr.map((model, index) => {
          return (
            <li key={"model" + index}>
              <Radio
                val={model}
                name="model"
                selectValue={productModel}
                setSelectValue={setProductModel}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {model2Arr.map((model2, index) => {
          return (
            <li key={"modelmodel" + index}>
              <Radio
                val={model2}
                name="model2"
                selectValue={productModel2}
                setSelectValue={setProductModel2}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductMain;
