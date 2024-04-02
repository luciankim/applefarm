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
        <ProductCategoryInsert setPage={setPage}/>
      </div>
      */}
      <div className={page === 2 ? "displayBlock" : "displayNone"}>
        <ProductQualityInsert setPage={setPage} />
      </div>
      <div className={page === 3 ? "displayBlock" : "displayNone"}>
        <ProductInsertLast setPage={setPage} />
      </div>
    </div>
  );
};

export default ProductInsert;
