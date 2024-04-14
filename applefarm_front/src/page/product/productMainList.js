import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductMainList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const selectedProduct = props.selectedProduct;

  const [productList, setProductList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    const obj = { product: selectedProduct, reqPage: reqPage };
    axios
      .post(backServer + "/product/productMainList", obj)
      .then((res) => {
        console.log(res.data.data);
        setProductList(res.data.data.productList);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

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
      <div className="productMainList-page"></div>
    </div>
  );
};

export default ProductMainList;

const ProductCard = (props) => {
  const productNo = props.product.productNo;
  const thumbnail = props.product.Thumbnail;
  const title = props.product.productTitle;
  const price = props.product.productPrice;
  const date = props.product.productDate;
  const likeCount = props.product.likeCount;
  const tradeState = props.product.tradeState;

  return (
    <div className="productCard-wrap">
      <Link to={"/product/" + productNo}>
        <div className="productCard-image">
          <img alt={title} src={thumbnail} />
        </div>
        <div className="productCard-desc">
          <div className="productCard-title">{title}</div>
          <div className="productCard-price">{price}</div>
          <div className="productCard-date">{date}</div>
          <div className="productCard-likeCount">
            <span>{likeCount}</span>
            <span>{tradeState ? "∙ " + tradeState : ""}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
