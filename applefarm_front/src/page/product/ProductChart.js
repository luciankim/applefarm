import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ProductTab from "./ProductTab";

const ProductChart = (props) => {
  const productQuality = props.productQuality;

  //탭에서도 활용함
  const termArr = ["1개월", "3개월", "6개월", "1년"];
  const [term, setTerm] = useState(termArr[0]);
  //탭
  const changeTerm = (e) => {
    setTerm(e.target.value);
  };
  //axios
  useEffect(() => {}, [productQuality, term]);

  //데이터
  const data = [
    { name: "12월 1일", A: 1000000, B: 1330000, C: 5000000, D: 5000000 },
    { name: "12월 2일", A: 4000000, B: 2330000, C: 1000000, D: 4000000 },
    { name: "12월 3일", A: 3000000, B: 3330000, C: 4000000, D: 3000000 },
    { name: "12월 4일", A: 4000000, B: 4330000, C: 2000000, D: 2000000 },
    { name: "12월 5일", A: 2000000, B: 5330000, C: 3000000, D: 1000000 },
    { name: "12월 6일", A: 1000000, B: 1330000, C: 5000000, D: 5000000 },
    { name: "12월 7일", A: 4000000, B: 2330000, C: 1000000, D: 4000000 },
    { name: "12월 8일", A: 3000000, B: 3330000, C: 4000000, D: 3000000 },
    { name: "12월 9일", A: 4000000, B: 4330000, C: 2000000, D: 2000000 },
    { name: "12월 10일", A: 2000000, B: 5330000, C: 3000000, D: 1000000 },
    { name: "12월 11일", A: 1000000, B: 1330000, C: 5000000, D: 5000000 },
    { name: "12월 12일", A: 4000000, B: 2330000, C: 1000000, D: 4000000 },
    { name: "12월 13일", A: 3000000, B: 3330000, C: 4000000, D: 3000000 },
    { name: "12월 14일", A: 4000000, B: 4330000, C: 2000000, D: 2000000 },
    { name: "12월 15일", A: 2000000, B: 5330000, C: 3000000, D: 1000000 },
    { name: "12월 16일", A: 2000000, B: 5330000, C: 3000000, D: 1000000 },
    { name: "12월 17일", A: 1000000, B: 1330000, C: 5000000, D: 5000000 },
    { name: "12월 18일", A: 4000000, B: 2330000, C: 1000000, D: 4000000 },
    { name: "12월 19일", A: 3000000, B: 3330000, C: 4000000, D: 3000000 },
    { name: "12월 20일", A: 4000000, B: 4330000, C: 2000000, D: 1000000 },
  ];

  const renderLineChart = (
    <LineChart
      width={1080}
      height={600}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
    >
      <Line
        type="monotone"
        dataKey="A" //품질
        stroke="#0267f3" //선 색
        strokeWidth={productQuality === "A" ? "5" : "1"} //선 굵기
        activeDot={productQuality === "A" ? { r: 10 } : { r: 1 }} //점 굵기
      />
      <Line
        type="monotone"
        dataKey="B"
        stroke="#82ca9d"
        strokeWidth={productQuality === "B" ? "5" : "1"}
        activeDot={productQuality === "B" ? { r: 10 } : { r: 1 }}
      />
      <Line
        type="monotone"
        dataKey="C"
        stroke="#8884d8"
        strokeWidth={productQuality === "C" ? "5" : "1"}
        activeDot={productQuality === "C" ? { r: 10 } : { r: 1 }}
      />
      <Line
        type="monotone"
        dataKey="D"
        stroke="#8f8f8f"
        strokeWidth={productQuality === "D" ? "5" : "1"}
        activeDot={productQuality === "D" ? { r: 10 } : { r: 1 }}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
    </LineChart>
  );

  return (
    <div className="productChart">
      <div className="productChart-title">시세</div>
      <div className="productChart-button">
        <div className="productChart-btns">
          {termArr.map((termItem, index) => {
            return (
              <Btn
                key={termItem + term + index}
                bg={term === termItem ? "bg1" : "bg2"}
                text={termItem}
                value={termItem}
                clickEvent={changeTerm}
              />
            );
          })}
        </div>
        {/*
        <ProductTab
          productTab={term}
          changeTab={changeChartTab}
          tabNameArr={termArr}
        />
        */}
      </div>
      <div className="productChart-content">{renderLineChart}</div>
    </div>
  );
};

export default ProductChart;

const Btn = (props) => {
  const { bg, text, value, clickEvent } = props;
  return (
    <button
      className={"button_form " + bg}
      type="button"
      onClick={clickEvent}
      value={value}
    >
      {text}
    </button>
  );
};
