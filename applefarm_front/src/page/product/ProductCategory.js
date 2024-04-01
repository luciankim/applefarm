import { useEffect, useState } from "react";
import "./productMain.css";
import axios from "axios";
import { PswRadio } from "../../component/FormFrm";

const ProductCategory = (props) => {
  const {
    selectedCategory,
    setSelectedCategory,
    //table,
    //naviProductLine,
    //naviProductGen,
  } = props;

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [productLine, setProductLine] = useState(""); //useState(naviProductLine)
  const [productGen, setProductGen] = useState("");
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

  const [categoryArr, setCategoryArr] = useState([]);
  //const [selectedCategory, setSelectedCategory] = useState(null);

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

  //원래는 속성으로 받아온 값을 써야 하는데, 일단은 임시로 아래처럼 직접 입력하였음
  const requestCategory = {
    table: "IPHONE_TBL", //table: table,
    productLine: "iPhone", //productLine: naviProductLine,
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
  categoryArr.forEach((category) => {
    if (!genArr.includes(category.productGen)) {
      genArr.push(category.productGen);
    }
  });
  categoryArr.forEach((category) => {
    if (
      (category.productLine === "iPhone" ||
        "MacBook Pro" ||
        "MacBook Air" ||
        "Apple Watch Ultra" ||
        "Apple Watch Series" ||
        "Apple Watch SE") &&
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
  categoryArr.forEach((category) => {
    if (
      (category.productLine === "MacBook Pro" || "MacBook Air") &&
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
          : category.productModel === "MacBook Pro" || "MacBook Air"
          ? category.productGen === productGen &&
            category.productModel === productModel &&
            category.productModel2 === productModel2
          : category.productGen === productGen
      )[0] //categoryArr이 배열이니까, 배열 자체가 아닌 배열의 값인 객체(위 로직의 결과는 반드시 1개임)를 값으로 저장.
    );
  }, [productGen, productModel, productModel2]);

  //초기화
  useEffect(() => {
    setProductModel("");
    setProductModel2("");
    clear();
  }, [productGen]);
  useEffect(() => {
    setProductModel2("");
    clear();
  }, [productModel]);

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

  return (
    <div className="product-category-wrap">
      {/*좌측 영역*/}
      <div className="product-category-wrap-left">
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
            src={"/image/categoryImage/iPhone_representation.png"}
          />
        )}
      </div>
      {/*//좌측 영역*/}

      {/*우측 영역*/}
      <div className="product-category-wrap-right">
        {
          <ArrMap //ul태그
            arr={genArr}
            name="gen"
            selectValue={productGen}
            setSelectValue={setProductGen}
          />
        }
        {
          <ArrMap //ul태그
            arr={modelArr}
            name="model"
            selectValue={productModel}
            setSelectValue={setProductModel}
          />
        }
        {
          <ArrMap //ul태그
            arr={model2Arr}
            name="model2"
            selectValue={productModel2}
            setSelectValue={setProductModel2}
          />
        }
        {
          <ArrMap //ul태그
            arr={colorArr}
            name="color"
            selectValue={productColor}
            setSelectValue={setProductColor}
          />
        }

        {
          <ArrMap //ul태그
            arr={storageArr}
            name="storage"
            selectValue={productStorage}
            setSelectValue={setProductStorage}
          />
        }

        {
          <ArrMap //ul태그
            arr={memoryArr}
            name="memory"
            selectValue={productMemory}
            setSelectValue={setProductMemory}
          />
        }

        {
          <ArrMap //ul태그
            arr={chipArr}
            name="cbip"
            selectValue={productChip}
            setSelectValue={setProductChip}
          />
        }

        {
          <ArrMap //ul태그
            arr={cpuArr}
            name="cpu"
            selectValue={productCpu}
            setSelectValue={setProductCpu}
          />
        }

        {
          <ArrMap //ul태그
            arr={gpuArr}
            name="gpu"
            selectValue={productGpu}
            setSelectValue={setProductGpu}
          />
        }

        {
          <ArrMap //ul태그
            arr={sizeArr}
            name="size"
            selectValue={productSize}
            setSelectValue={setProductSize}
          />
        }

        {
          <ArrMap //ul태그
            arr={connectivityArr}
            name="connectivity"
            selectValue={productConnectivity}
            setSelectValue={setProductConnectivity}
          />
        }
        {
          <ArrMap //ul태그
            arr={chargeArr}
            name="charge"
            selectValue={productCharge}
            setSelectValue={setProductCharge}
          />
        }
      </div>
      {/*//우측 영역*/}
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
      return table === "iphone_tbl" ? "시리즈" : "세대";
    } else if (name === "model2") {
      return selectValue === "2018년" || "2019년" || "2020년"
        ? "포트 수"
        : "모델";
    } else if (name === "model") {
      return table === "macbook_tbl" ? "화면 크기" : "모델";
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
        <ul>
          {arr.map((item, index) => {
            return (
              <li key={name + index}>
                <PswRadio
                  val={item}
                  name={name}
                  selectValue={selectValue}
                  setSelectValue={setSelectValue}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default ProductCategory;
