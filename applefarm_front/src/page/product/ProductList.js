import  axios  from "axios";
import { useEffect, useState } from "react";
import "./productList.css";


const ProductList = (props) => {
  const [tableName,setTableName] = useState("IPHONE_TBL");

  const [productList,setProductList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(()=>{
    axios.get(backServer + "/product/productList/"+tableName+"?reqPage="+reqPage)
    .then((res)=>{
      console.log(res.data.data);
      // setProductList(res.data.data.productList);
    })
    .catch((res)=>{
      console.log(res.data);
    })
  },[])



  return (
  <div>
    <div className="productList-top">
      <div className="productList-top-title">

      </div>
    </div>
    <div className="productList-search">

    </div>
    <div className="productList-select">

    </div>
    <div className="productList-item">

    </div>
    <div className="productList-page">

    </div>
  </div>);
};

export default ProductList;
