import { Route, Routes } from "react-router-dom";
import ProductMain from "./ProductMain";
import ProductDetail from "./ProductDetail";
import ProductInsert from "./ProductInsert";
import ProductQualityFrm from "./ProductQualityFrm";
import ProductUpdate from "./ProductUpdate";

const Product = (props) => {
  const isLogin = props.isLogin;
  return (
    <Routes>
      <Route path="/main" element={<ProductMain isLogin={isLogin} />} />
      <Route path="/:productNo" element={<ProductDetail isLogin={isLogin} />} />
      <Route path="/insert" element={<ProductInsert />} />
      <Route path="/update/:productNo" element={<ProductUpdate />} />
    </Routes>
  );
};
export default Product;
