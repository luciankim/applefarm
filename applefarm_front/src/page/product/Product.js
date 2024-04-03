import { Route, Routes } from "react-router-dom";
import ProductMain from "./ProductMain";
import ProductDetail from "./ProductDetail";
import ProductInsert from "./ProductInsert";

const Product = (props) => {
  return (
    <Routes>
      <Route path="/main" element={<ProductMain />} />
      <Route path="/detail" element={<ProductDetail />} />
      <Route path="/insert" element={<ProductInsert />} />
    </Routes>
  );
};
export default Product;
