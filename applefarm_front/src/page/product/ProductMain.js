import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { Radio } from "../../component/FormFrm";

const ProductMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [productLine, setProductLine] = useState("");
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
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  useEffect(() => {
    clear();
    setProductModel("");
    setProductModel2("");
  }, [productGen]);
  useEffect(() => {
    clear();
    setProductModel2("");
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

      <ul>
        {colorArr.map((color, index) => {
          return (
            <li key={"color" + index}>
              <Radio
                val={color}
                name="color"
                selectValue={productColor}
                setSelectValue={setProductColor}
              />
            </li>
          );
        })}
      </ul>

      {colorArr.indexOf(productColor) !== -1 ? (
        <img
          src={
            "/image/categoryImage/" +
            imageArr[colorArr.indexOf(productColor)] +
            ".png"
          }
        />
      ) : (
        <></>
      )}

      <ul>
        {storageArr.map((storage, index) => {
          return (
            <li key={"storage" + index}>
              <Radio
                val={storage}
                name="storage"
                selectValue={productStorage}
                setSelectValue={setProductStorage}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {memoryArr.map((memory, index) => {
          return (
            <li key={"memory" + index}>
              <Radio
                val={memory}
                name="memory"
                selectValue={productMemory}
                setSelectValue={setProductMemory}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {chipArr.map((chip, index) => {
          return (
            <li key={"cbip" + index}>
              <Radio
                val={chip}
                name="chip"
                selectValue={productChip}
                setSelectValue={setProductChip}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {cpuArr.map((cpu, index) => {
          return (
            <li key={"cpu" + index}>
              <Radio
                val={cpu}
                name="cpu"
                selectValue={productCpu}
                setSelectValue={setProductCpu}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {gpuArr.map((gpu, index) => {
          return (
            <li key={"gpu" + index}>
              <Radio
                val={gpu}
                name="gpu"
                selectValue={productGpu}
                setSelectValue={setProductGpu}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {sizeArr.map((size, index) => {
          return (
            <li key={"size" + index}>
              <Radio
                val={size}
                name="size"
                selectValue={productSize}
                setSelectValue={setProductSize}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {connectivityArr.map((connectivity, index) => {
          return (
            <li key={"connectivity" + index}>
              <Radio
                val={connectivity}
                name="connectivity"
                selectValue={productConnectivity}
                setSelectValue={setProductConnectivity}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {chargeArr.map((charge, index) => {
          return (
            <li key={"charge" + index}>
              <Radio
                val={charge}
                name="charge"
                selectValue={productCharge}
                setSelectValue={setProductCharge}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductMain;
