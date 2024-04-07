import { Route, Routes } from "react-router-dom";
import ProductMain from "./ProductMain";
import ProductDetail from "./ProductDetail";
import ProductInsert from "./ProductInsert";
import ProductInsertLast from "./ProductInsertLast";
import ProductQualityInsert from "./ProductQualityInsert";

const Product = (props) => {
  const { table, navProductLine, navProductGen } = props;
  return (
    <Routes>
      <Route
        path="/main"
        element={
          <ProductMain
            table={table}
            navProductLine={navProductLine}
            navProductGen={navProductGen}
          />
        }
      />
      <Route path="/detail" element={<ProductDetail />} />
      <Route
        path="/insert"
        element={
          <ProductInsert
            table={table}
            navProductLine={navProductLine}
            navProductGen={navProductGen}
          />
        }
      />
      {/* <Route path="/insert2" element={<ProductQualityInsert/>}></Route> */}
      {/* <Route path="/insert3" element={<ProductInsertLast/>} /> */}
    </Routes>
  );
};
export default Product;
