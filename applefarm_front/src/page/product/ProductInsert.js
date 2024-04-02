import { useBlocker } from "react-router-dom";
import ProductQualityInsert from "./ProductQualityInsert";
import ProductInsertLast from "./ProductInsertLast";
import { useState } from "react";
import ProductCategoryInsert from "./ProductCategoryInsert";

const ProductInsert = (props) => {
  const [page, setPage] = useState(2);

  return (
    <div>
      {/*}
      <div className={page === 1 ? "displayBlock" : "displayNone"}>
        <ProductCategoryInsert />
      </div>
      */}
      <div className={page === 2 ? "displayBlock" : "displayNone"}>
        <ProductQualityInsert />
      </div>
      <div className={page === 3 ? "displayBlock" : "displayNone"}>
        <ProductInsertLast />
      </div>
    </div>
  );
};

export default ProductInsert;
