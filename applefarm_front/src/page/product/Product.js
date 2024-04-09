import { Route, Routes } from "react-router-dom";
import ProductMain from "./ProductMain";
import ProductDetail from "./ProductDetail";
import ProductInsert from "./ProductInsert";
import ProductInsertLast from "./ProductInsertLast";
import ProductQualityInsert from "./ProductQualityInsert";

const Product = (props) => {
  return (
    <Routes>
      <Route path="/main" element={<ProductMain />} />
      <Route path="/:productNo" element={<ProductDetail />} />
      <Route path="/insert" element={<ProductInsert />} />
    </Routes>
  );
};
export default Product;
