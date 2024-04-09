import { Route, Routes } from "react-router-dom";
import ProductMain from "./ProductMain";
import ProductDetail from "./ProductDetail";
import ProductInsert from "./ProductInsert";
import ProductInsertLast from "./ProductInsertLast";
import ProductQualityInsert from "./ProductQualityInsert";

const Product = (props) => {
  const token = props.token;
  const isLogin = props.isLogin;
  return (
    <Routes>
      <Route path="/main" element={<ProductMain />} />
      <Route
        path="/:productNo"
        element={<ProductDetail isLogin={isLogin} token={token} />}
      />
      <Route path="/insert" element={<ProductInsert />} />
    </Routes>
  );
};
export default Product;
