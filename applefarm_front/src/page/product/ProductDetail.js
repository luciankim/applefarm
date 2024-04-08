import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  
  useEffect(() => {
    axios
      .get(backServer + "/product/" + productNo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return(
    <div className="product-detail-wrap">

    </div>
  );
};

export default ProductDetail;
