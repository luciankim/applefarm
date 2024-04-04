import React, { useEffect, useState } from "react";
import "./productMain.css";
import axios from "axios";
import { PswRadio, PswRadioQuality } from "../../component/FormFrm";
import ProductSummary from "./ProductSummary";

const ProductCategory = (props) => {
  const {
    table,
    naviProductLine,

    selectedCategory,
    setSelectedCategory,

    productLine,
    setProductLine,
    productGen,
    setProductGen,
    productModel,
    setProductModel,
    productModel2,
    setProductModel2,
    productColor,
    setProductColor,
    productImage,
    setProductImage,
    productStorage,
    setProductStorage,
    productMemory,
    setProductMemory,
    productChip,
    setProductChip,
    productCpu,
    setProductCpu,
    productGpu,
    setProductGpu,
    productSize,
    setProductSize,
    productConnectivity,
    setProductConnectivity,
    productCharge,
    setProductCharge,

    productQuality,
    setProductQuality,
    selectedProduct,

    changeBtnActiveTrue,
    changeBtnActiveFalse,
    pip,
  } = props;

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [categoryArr, setCategoryArr] = useState([]);

  //카테고리 특정에 사용될 배열 변수
  const genArr = [];
  const modelArr = [];
  const model2Arr = [];
  //특정된 카테고리의 각 key의 값들(문자열)을 split(',')해서 받을 배열 변수
  const [colorArr, setColorArr] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [storageArr, setStorageArr] = useState([]);
  const [memoryArr, setMemoryArr] = useState([]);
  const [chipArr, setChipArr] = useState([]);
  const [cpuArr, setCpuArr] = useState([]);
  const [gpuArr, setGpuArr] = useState([]);
  const [sizeArr, setSizeArr] = useState([]);
  const [connectivityArr, setConnectivityArr] = useState([]);
  const [chargeArr, setChargeArr] = useState([]);

  const clear = () => {
    setProductColor("");
    setProductImage("");
    setProductStorage("");
    setProductMemory("");
    setProductChip("");
    setProductCpu("");
    setProductGpu("");
    setProductSize("");
    setProductConnectivity("");
    setProductCharge("");
    setProductQuality("");

    setColorArr([]);
    setImageArr([]);
    setStorageArr([]);
    setMemoryArr([]);
    setChipArr([]);
    setCpuArr([]);
    setGpuArr([]);
    setSizeArr([]);
    setConnectivityArr([]);
    setChargeArr([]);
  };

  //초기화
  useEffect(() => {
    setProductModel("");
    setProductModel2("");
    clear();
    modelArr.length = 0;
    model2Arr.length = 0;
  }, [productGen]);
  useEffect(() => {
    setProductModel2("");
    clear();
    model2Arr.length = 0;
  }, [productModel]);

  const requestCategory = {
    table: table,
    productLine: naviProductLine,
  };
  useEffect(() => {
    axios
      .post(backServer + "/product/category", requestCategory)
      .then((res) => {
        res.data.data.forEach((item) => {
          categoryArr.push(item); //배열에 추가하고
        });
        setCategoryArr([...categoryArr]); //set
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  //카테고리 1개 특정하기 위한 코드
  //gen
  categoryArr.forEach((category) => {
    if (!genArr.includes(category.productGen)) {
      genArr.push(category.productGen);
    }
  });
  //model
  categoryArr.forEach((category) => {
    if (
      (category.productLine === "iPhone" ||
        category.productLine === "MacBook Pro" ||
        category.productLine === "MacBook Air" ||
        category.productLine === "Apple Watch Ultra" ||
        category.productLine === "Apple Watch Series" ||
        category.productLine === "Apple Watch SE") &&
      category.productGen === productGen &&
      //model컬럼에 null인게 하나라도 있으면
      //modelArr.length = 1
      //modelArr[0] = [null]
      //그래서 아래의 한 줄이 추가로 필요
      category.productModel !== null &&
      !modelArr.includes(category.productModel)
    ) {
      modelArr.push(category.productModel);
    }
  });
  //model2
  categoryArr.forEach((category) => {
    if (
      (category.productLine === "MacBook Pro" ||
        category.productLine === "MacBook Air") &&
      category.productGen === productGen &&
      category.productModel === productModel &&
      //model2컬럼에 null인게 하나라도 있으면
      //model2Arr.length = 1
      //model2Arr[0] = [null]
      //그래서 아래의 한 줄이 추가로 필요
      category.productModel2 !== null &&
      !model2Arr.includes(category.productModel2)
    ) {
      model2Arr.push(category.productModel2);
    }
  });

  useEffect(() => {
    setSelectedCategory(
      categoryArr.filter((category) =>
        category.productLine === "iPhone" ||
        "Apple Watch Ultra" ||
        "Apple Watch Series" ||
        "Apple Watch SE"
          ? category.productGen === productGen &&
            category.productModel === productModel
          : category.productModel === "MacBook Pro" ||
            category.productModel === "MacBook Air"
          ? category.productGen === productGen &&
            category.productModel === productModel &&
            category.productModel2 === productModel2
          : category.productGen === productGen
      )[0] //categoryArr이 배열이니까, 배열 자체가 아닌 배열의 값인 객체(위 로직의 결과는 반드시 1개임)를 값으로 저장.
    );
  }, [productGen, productModel, productModel2]);

  //1개 특정된 카테고리의 컬럼별 데이터들을 ","로 구분해서 배열로 만듦
  useEffect(() => {
    if (selectedCategory) {
      //undefined나 null이면 false
      if (selectedCategory.productColor !== null) {
        setColorArr([...selectedCategory.productColor.split(",")]);
      }
      if (selectedCategory.productImage !== null) {
        setImageArr([...selectedCategory.productImage.split(",")]);
      }
      if (selectedCategory.productStorage !== null) {
        setStorageArr([...selectedCategory.productStorage.split(",")]);
      }
      if (selectedCategory.productMemory !== null) {
        setMemoryArr([...selectedCategory.productMemory.split(",")]);
      }
      if (selectedCategory.productChip !== null) {
        setChipArr([...selectedCategory.productChip.split(",")]);
      }
      if (selectedCategory.productCpu !== null) {
        setCpuArr([...selectedCategory.productCpu.split(",")]);
      }
      if (selectedCategory.productGpu !== null) {
        setGpuArr([...selectedCategory.productGpu.split(",")]);
      }
      if (selectedCategory.productSize !== null) {
        setSizeArr([...selectedCategory.productSize.split(",")]);
      }
      if (selectedCategory.productConnectivity !== null) {
        setConnectivityArr([
          ...selectedCategory.productConnectivity.split(","),
        ]);
      }
      if (selectedCategory.productCharge !== null) {
        setChargeArr([...selectedCategory.productCharge.split(",")]);
      }
    }
  }, [selectedCategory]);

  //ProductInsert.js에서 "품질선택"으로 넘어가기 위한 조건 ->changeBtnActive
  const productArr = [
    "iPhone",
    "MacBook Pro",
    "MacBook Air",
    "iPad Pro 12.9",
    "iPad Pro 11",
    "iPad Air",
    "iPad Mini",
    "iPad",
    "Apple Watch Ultra",
    "Apple Watch Series",
    "Apple Watch SE",
    "AirPods Max",
    "AirPods Pro",
    "AirPods",
  ];
  useEffect(() => {
    if (pip) {
      //pip가 notundefined이거나 notnull일때. 즉 pip가 true일때. 즉 productInsert.js에서 넘어왔을 때.
      if (productArr.indexOf(selectedProduct.productLine) >= 11) {
        //에어팟
        if (selectedProduct.productColor && selectedProduct.productCharge) {
          changeBtnActiveTrue();
        } else {
          changeBtnActiveFalse();
        }
      } else if (productArr.indexOf(selectedProduct.productLine) >= 8) {
        //애플워치
        if (
          selectedProduct.productColor &&
          selectedProduct.productSize &&
          selectedProduct.productConnectivity
        ) {
          changeBtnActiveTrue();
        } else {
          changeBtnActiveFalse();
        }
      } else if (productArr.indexOf(selectedProduct.productLine) >= 3) {
        //아이패드
        if (
          selectedProduct.productColor &&
          selectedProduct.productStorage &&
          selectedProduct.productConnectivity
        ) {
          changeBtnActiveTrue();
        } else {
          changeBtnActiveFalse();
        }
      } else if (productArr.indexOf(selectedProduct.productLine) >= 1) {
        //맥북
        //2018~2020년
        if (
          selectedProduct.productGen === "2018년" ||
          selectedProduct.productGen === "2019년" ||
          selectedProduct.productGen === "2020년"
        ) {
          if (
            selectedProduct.productColor &&
            selectedProduct.productStorage &&
            selectedProduct.productMemory &&
            selectedProduct.productCpu &&
            selectedProduct.productGpu
          ) {
            changeBtnActiveTrue();
          } else {
            changeBtnActiveFalse();
          }
          //M1이후
        } else if (
          selectedProduct.productColor &&
          selectedProduct.productStorage &&
          selectedProduct.productMemory &&
          selectedProduct.productChip
        ) {
          changeBtnActiveTrue();
        } else {
          changeBtnActiveFalse();
        }
      } else if (productArr.indexOf(selectedProduct.productLine) >= 0) {
        //아이폰
        if (selectedProduct.productColor && selectedProduct.productStorage) {
          changeBtnActiveTrue();
        } else {
          changeBtnActiveFalse();
        }
      } else {
        changeBtnActiveFalse();
      }
    }
  }, [selectedProduct]);

  return (
    <div className="productCategory-wrap">
      {/*좌측 영역*/}
      <div className="productCategory-wrap-left">
        <div>
          {colorArr.indexOf(productColor) !== -1 ? (
            <img
              className="categoryImage"
              src={
                "/image/categoryImage/" +
                imageArr[colorArr.indexOf(productColor)] +
                ".png"
              }
            />
          ) : (
            <img
              className="categoryImage"
              //아래 이미지는 추후 수정 필요
              src={"/image/categoryImage/iPhone_representation.png"}
            />
          )}
        </div>
      </div>
      {/*//좌측 영역*/}

      {/*우측 영역*/}
      <div className="productCategory-wrap-right">
        {
          <ArrMap //ul태그
            arr={genArr}
            name="gen"
            selectValue={productGen}
            setSelectValue={setProductGen}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={modelArr}
            name="model"
            selectValue={productModel}
            setSelectValue={setProductModel}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={model2Arr}
            name="model2"
            selectValue={productModel2}
            setSelectValue={setProductModel2}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={colorArr}
            name="color"
            selectValue={productColor}
            setSelectValue={setProductColor}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={storageArr}
            name="storage"
            selectValue={productStorage}
            setSelectValue={setProductStorage}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={memoryArr}
            name="memory"
            selectValue={productMemory}
            setSelectValue={setProductMemory}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={chipArr}
            name="chip"
            selectValue={productChip}
            setSelectValue={setProductChip}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={cpuArr}
            name="cpu"
            selectValue={productCpu}
            setSelectValue={setProductCpu}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={gpuArr}
            name="gpu"
            selectValue={productGpu}
            setSelectValue={setProductGpu}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={sizeArr}
            name="size"
            selectValue={productSize}
            setSelectValue={setProductSize}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={connectivityArr}
            name="connectivity"
            selectValue={productConnectivity}
            setSelectValue={setProductConnectivity}
            table={table}
          />
        }
        {
          <ArrMap //ul태그
            arr={chargeArr}
            name="charge"
            selectValue={productCharge}
            setSelectValue={setProductCharge}
            table={table}
          />
        }
        {selectedCategory && !pip ? (
          <ArrMap //ul태그
            arr={["A", "B", "C", "D"]}
            name="quality"
            selectValue={productQuality}
            setSelectValue={setProductQuality}
            table={table}
          />
        ) : (
          ""
        )}
        <ProductSummary selectedProduct={selectedProduct} />
      </div>
      {/*--우측 영역*/}
    </div>
  );
};

const ArrMap = (props) => {
  const arr = props.arr;
  const name = props.name;
  const selectValue = props.selectValue;
  const setSelectValue = props.setSelectValue;
  const table = props.table;

  const optionTitle = () => {
    if (name === "gen") {
      return table === "IPHONE_TBL" ? "시리즈" : "세대";
    } else if (name === "model") {
      return table === "MACBOOK_TBL" ? "화면 크기" : "모델";
    } else if (name === "model2") {
      return "모델";
    } else if (name === "color") {
      return "색상";
    } else if (name === "storage") {
      return "저장 용량";
    } else if (name === "memory") {
      return "메모리(램)";
    } else if (name === "chip") {
      return "칩";
    } else if (name === "cpu") {
      return "CPU";
    } else if (name === "gpu") {
      return "GPU";
    } else if (name === "connectivity") {
      return "연결성";
    } else if (name === "size") {
      return "화면 크기";
    } else if (name === "charge") {
      return "충전 방식";
    } else if (name === "quality") {
      return "품질";
    }
  };

  if (arr.length === 0) {
    return <></>;
  } else {
    return (
      <div className="category-option">
        <div>
          <div className="category-option-title">{optionTitle()}</div>
          <div className="category-option-select">{selectValue}</div>
        </div>
        <ul className={name === "quality" ? "quality-option-ul" : ""}>
          {arr.map((item, index) => {
            return (
              <li
                key={name + index}
                className={name === "quality" ? "quality-option-li" : ""}
              >
                {name === "quality" ? (
                  <PswRadioQuality
                    val={item}
                    name={name}
                    selectValue={selectValue}
                    setSelectValue={setSelectValue}
                    color={item} //colorArr일때만 활용됨
                  />
                ) : (
                  <PswRadio
                    val={item}
                    name={name}
                    selectValue={selectValue}
                    setSelectValue={setSelectValue}
                    color={item} //colorArr일때만 활용됨
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default ProductCategory;
