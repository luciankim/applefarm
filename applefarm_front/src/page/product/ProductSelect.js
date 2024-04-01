const ProductSelect = (props) => {
  return (
    <div>
      <ul>
        {genArr.map((gen, index) => {
          return (
            <li key={"gen" + index}>
              <Radio
                val={gen}
                name="gen"
                selectValue={productGen}
                setSelectValue={setProductGen}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {modelArr.map((model, index) => {
          return (
            <li key={"model" + index}>
              <Radio
                val={model}
                name="model"
                selectValue={productModel}
                setSelectValue={setProductModel}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {model2Arr.map((model2, index) => {
          return (
            <li key={"modelmodel" + index}>
              <Radio
                val={model2}
                name="model2"
                selectValue={productModel2}
                setSelectValue={setProductModel2}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {colorArr.map((color, index) => {
          return (
            <li key={"color" + index}>
              <Radio
                val={color}
                name="color"
                selectValue={productColor}
                setSelectValue={setProductColor}
              />
            </li>
          );
        })}
      </ul>

      {colorArr.indexOf(productColor) !== -1 ? (
        <img
          src={
            "/image/categoryImage/" +
            imageArr[colorArr.indexOf(productColor)] +
            ".png"
          }
        />
      ) : (
        <></>
      )}

      <ul>
        {storageArr.map((storage, index) => {
          return (
            <li key={"storage" + index}>
              <Radio
                val={storage}
                name="storage"
                selectValue={productStorage}
                setSelectValue={setProductStorage}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {memoryArr.map((memory, index) => {
          return (
            <li key={"memory" + index}>
              <Radio
                val={memory}
                name="memory"
                selectValue={productMemory}
                setSelectValue={setProductMemory}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {chipArr.map((chip, index) => {
          return (
            <li key={"cbip" + index}>
              <Radio
                val={chip}
                name="chip"
                selectValue={productChip}
                setSelectValue={setProductChip}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {cpuArr.map((cpu, index) => {
          return (
            <li key={"cpu" + index}>
              <Radio
                val={cpu}
                name="cpu"
                selectValue={productCpu}
                setSelectValue={setProductCpu}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {gpuArr.map((gpu, index) => {
          return (
            <li key={"gpu" + index}>
              <Radio
                val={gpu}
                name="gpu"
                selectValue={productGpu}
                setSelectValue={setProductGpu}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {sizeArr.map((size, index) => {
          return (
            <li key={"size" + index}>
              <Radio
                val={size}
                name="size"
                selectValue={productSize}
                setSelectValue={setProductSize}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {connectivityArr.map((connectivity, index) => {
          return (
            <li key={"connectivity" + index}>
              <Radio
                val={connectivity}
                name="connectivity"
                selectValue={productConnectivity}
                setSelectValue={setProductConnectivity}
              />
            </li>
          );
        })}
      </ul>

      <ul>
        {chargeArr.map((charge, index) => {
          return (
            <li key={"charge" + index}>
              <Radio
                val={charge}
                name="charge"
                selectValue={productCharge}
                setSelectValue={setProductCharge}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductSelect;
