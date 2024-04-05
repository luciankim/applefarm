import { useEffect, useState } from "react";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import React from "react";
import Chart from "react-apexcharts";

const AdminDashboard = () => {
  const [productList, setProductList] = useState([]);
  const [startDate, setStartDate] = useState(dayjs("2023-11-07"));
  const [endDate, setEndDate] = useState(dayjs("2024-04-02"));
  const filterStartDate = startDate.format("YYYY-MM-DD");
  const filterEndDate = endDate.format("YYYY-MM-DD");
  const [activeButton, setActiveButton] = useState(null); // 추가: 활성 버튼 상태
  const [checkedList, setCheckedList] = useState([]);
  const [productHideChange, setProductHideChange] = useState(false); // 숨김 상태 변경 감지 상태 추가

  // 1개월 버튼 클릭 시
  const oneMonth = () => {
    const today = dayjs();
    const oneMonthAgo = today.subtract(1, "month");
    setStartDate(oneMonthAgo);
    setEndDate(today);
    setActiveButton("oneMonth"); // 추가: 버튼 활성 상태 설정
  };

  // 6개월 버튼 클릭 시
  const sixMonth = () => {
    const today = dayjs();
    const sixMonthsAgo = today.subtract(6, "month");
    setStartDate(sixMonthsAgo);
    setEndDate(today);
    setActiveButton("sixMonth"); // 추가: 버튼 활성 상태 설정
  };

  // 전체 버튼 클릭 시
  const all = () => {
    // 전체 기간을 원하는 날짜로 설정
    // 예를 들어, 프로젝트 시작일부터 현재까지의 기간 등을 설정할 수 있습니다.
    // 이 예시에서는 프로젝트 시작일이 2022년 1월 1일이라고 가정합니다.
    const projectStartDate = dayjs("2023-11-07");
    const today = dayjs();
    setStartDate(projectStartDate);
    setEndDate(today);
    setActiveButton("all"); // 추가: 버튼 활성 상태 설정
  };

  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    axios
      .get(selectedValue + "/" + filterStartDate + "/" + filterEndDate)
      .then((res) => {
        setProductList(res.data.data.adminProductList);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [startDate, endDate, selectedValue, productHideChange]);

  //다운로드 : Pdf or Excel
  const download = () => {
    const checkedObject = {};
    checkedList.forEach((value, index) => {
      checkedObject[`item${index}`] = value; // 각 값(value)을 특정 키(item0, item1, ...)와 연결하여 객체 생성
    });
    axios
      .patch("/admin/hideProduct", checkedObject)
      .then((res) => {
        setProductHideChange(!productHideChange);
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  // 구독 버튼 : 메일 입력 시, 월초 발송
  const subscribe = () => {
    const checkedObject = {};
    checkedList.forEach((value, index) => {
      checkedObject[`item${index}`] = value; // 각 값(value)을 특정 키(item0, item1, ...)와 연결하여 객체 생성
    });
    axios
      .patch(checkedObject)
      .then((res) => {
        setProductHideChange(!productHideChange);
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  const [options] = useState({
    series: [
      {
        name: "월별 거래대금(좌)",
        type: "column",
        data: [23, 10, 10, 20, 10, 22, 17, 10, 22, 22, 12, 16],
        // color: "var(--main_01)",
      },
      {
        name: "누적 거래대금(우)",
        type: "area",
        data: [23, 32, 42, 52, 72, 92, 130, 160, 180, 200, 212, 250],
        style: {
          fontSize: "20px",
        },
      },
    ],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "거래대금 추이",
      style: {
        fontSize: "20px",
        fontWeight: "900",
        fontFamily: "ns-b",
        color: "#263238",
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],

    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        // title: {
        //   text: "누적 거래대금",
        // },
      },
      {
        opposite: true,
        // title: {
        //   text: "월별 거래대금",
        // },
      },
    ],
  });

  // 회원 차트

  const [options2] = useState({
    series: [
      {
        name: "회원수",
        type: "column",
        data: [23, 10, 10, 20, 10, 22, 17, 10, 22, 22, 12, 16],
        // color: "var(--main_01)",
      },
    ],
    chart: {
      height: "10px",
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "회원수 추이",
      style: {
        fontSize: "20px",
        fontWeight: "900",
        fontFamily: "ns-b",
        color: "#263238",
      },
    },
  });

  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        <p className="admin-current-p">대시보드</p>
        <div className="date-select-wrap">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <div>
                <Button
                  variant="contained"
                  onClick={oneMonth}
                  style={{
                    backgroundColor:
                      activeButton === "oneMonth" ? "#0d6efd" : "#9d9d9d",
                  }}
                >
                  최근 1개월
                </Button>
                <Button
                  variant="contained"
                  onClick={sixMonth}
                  style={{
                    backgroundColor:
                      activeButton === "sixMonth" ? "#0d6efd" : "#9d9d9d",
                  }}
                >
                  6개월
                </Button>
                <Button
                  variant="contained"
                  onClick={all}
                  style={{
                    backgroundColor:
                      activeButton === "all" ? "#0d6efd" : "#9d9d9d",
                  }}
                >
                  전체
                </Button>
              </div>
              <DatePicker
                label="시작날짜"
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                label="종료날짜"
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
              <div className="btnWrap">
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                    onClick={download}
                    addId="dashboard-download"
                  >
                    다운로드
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "var(--main_02" }}
                    onClick={subscribe}
                  >
                    구독하기
                  </Button>
                </div>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>

        {/* 대시보드 콘텐츠 시작*/}
        <div className="dashboard-wrap">
          <div className="summary">
            <div className="total-member">
              <p>회원 수</p>
              <h4>45,204명</h4>
            </div>
            <div className="total-product">
              <p>거래금액 합계</p>
              <h4>45,204건</h4>
            </div>
            <div className="tota-trade">
              <p>판매중 상품 수</p>
              <h4>45,204건</h4>
            </div>
          </div>
          <div className="charts">
            <Chart options={options} series={options.series} />
          </div>

          <div className="charts">
            <Chart
              options={options2}
              series={options2.series}
              type="area"
              height={350}
            />
          </div>

          <div className="rank-wrap">
            <div className="top-seller">
              <ul>
                <p>판매 랭커</p>
                <li>1등</li>
                <li>2등</li>
                <li>3등</li>
                <li>4등</li>
                <li>5등</li>
              </ul>
            </div>
            <div className="top-buyer">
              <ul>
                <p>구매 랭커</p>
                <li>1등</li>
                <li>2등</li>
                <li>3등</li>
                <li>4등</li>
                <li>5등</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
