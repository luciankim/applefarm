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
      <Route path="/detail" element={<ProductDetail />} />
      <Route path="/insert" element={<ProductInsert />} />
      {/* <Route path="/insert2" element={<ProductQualityInsert/>}></Route> */}
      {/* <Route path="/insert3" element={<ProductInsertLast/>} /> */}
    </Routes>
  );
};
export default Product;
