import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ProductApexChart = (props) => {
  const productQuality = props.productQuality;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState([]);

  const state = {
    series: [
      {
        type: "column",
        name: "거래량",
        data: [40, 50, 60, 70, 80, 70, 80, 90, 100],
      },
      {
        type: "line",
        name: "거래가격",
        data: [
          1000000, 900000, 800000, 750000, 700000, 730000, 700000, 650000,
          600000,
        ],
      },
    ],

    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
        //horizontalAlign: "right",
      },
      stroke: {
        width: [0, 4], //첫번째 seires의 두께, 두 번째 시리즈의 두께
        curve: "smooth",
      },
      markers: {
        size: [4, 4],
      },
      title: {
        text: "거래량/거래가격",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "9일 전",
          "8일 전",
          "7일 전",
          "6일 전",
          "5일 전",
          "4일 전",
          "3일 전",
          "2일 전",
          "1일 전",
        ],
      },
      yaxis: [
        //거래량(좌측 Y축)
        {
          labels: {
            style: {
              colors: ["rgba(0, 143, 251, 0.85)"],
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            /*
            formatter: (value) => {
              return val;
            },
            */
          },
          axisBorder: {
            show: true,
            color: "#78909C",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "#78909C",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          title: {
            text: ["거래량"],
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "rgba(0, 143, 251, 0.85)",
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },

        //거래가격(우측 Y축)
        {
          opposite: true, //이거 있어야 오른쪽에 라벨 뜸!!!
          labels: {
            style: {
              colors: ["rgba(0, 227, 150, 0.85)"],
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            /*
            formatter: (value) => {
              return val;
            },
            */
          },
          axisBorder: {
            show: true,
            color: "#78909C",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "#78909C",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          title: {
            text: ["거래가격"],
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "rgba(0, 227, 150, 0.85)",
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div id="chart">
        <Chart
          series={state.series}
          options={state.options}
          width={"100%"}
          height={500}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ProductApexChart;
