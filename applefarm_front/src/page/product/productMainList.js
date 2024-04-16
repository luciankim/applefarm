import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../component/Pagination";

const ProductMainList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const selectedProduct = props.selectedProduct;

  const [productList, setProductList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    const obj = { ...selectedProduct, reqPage: reqPage };
    axios
      .post(backServer + "/product/mainList", obj)
      .then((res) => {
        if (res.data.message === "success") {
          setProductList(res.data.data.productList);
          console.log(res.data.data.productList.length);
          setPageInfo(res.data.data.pi);
        } else {
          console.log(res.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [selectedProduct, reqPage]);

  return (
    <div className="productMainList">
      <div className="productMainList-card">
        {productList.map((product, index) => {
          return (
            <ProductCard
              key={"productMainList-card" + index}
              product={product}
            />
          );
        })}
      </div>
      <div className="productMainList-page">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
    </div>
  );
};

export default ProductMainList;

const ProductCard = (props) => {
  const productNo = props.product.productNo;
  const thumbnail = props.product.productThumbnail;
  const title = props.product.productTitle;
  const price = props.product.productPrice;
  const date = props.product.productDateToChar;
  const likeCount = props.product.likeCount;
  const tradeState = props.product.tradeState;

  const backServer = process.env.REACT_APP_BACK_SERVER;

  return (
    <div className="productCard-wrap">
      <Link to={"/product/" + productNo}>
        <div className="productCard-image">
          <img alt={title} src={backServer + "/product/img/" + thumbnail} />
        </div>
        <div className="productCard-desc">
          <div className="productCard-title">{title}</div>
          <div className="productCard-price">
            {price.toLocaleString() + " 원"}
          </div>
          <div className="productCard-date">{date}</div>
          <div className="productCard-likeCount">
            <span className="material-icons like-image">favorite</span>
            <span>{likeCount}</span>
            <span>{tradeState ? " ∙ " + tradeState : ""}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
