import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../component/Pagination";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { Select } from "../../component/FormFrm";

const AdminProduct = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [startDate, setStartDate] = useState(dayjs("2023-11-07"));
  const [endDate, setEndDate] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // 추가: 활성 버튼 상태
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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

  const options = ["아이폰", "아이패드"];
  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        <p className="admin-current-p">상품 관리</p>
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
              <div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "black" }}
                >
                  숨기기
                </Button>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      <div className="member-like-tbl-box" id="member-like-tbl-box">
        <table className="admin-product-tbl">
          <thead>
            <tr>
              <th width="15%">
                <Select options={options} />
              </th>
              <th width="30%">제목</th>
              <th width="15%">아이디</th>
              <th width="15%">작성일</th>
              <th width="10%">숨김상태</th>
              <th width="10%">체크박스</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((board, index) => {
              return (
                <ReportItem
                  key={"board" + index}
                  board={board}
                  boardList={boardList}
                  setBoardList={setBoardList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-page-wrap">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
    </div>
  );
};

const ReportItem = (props) => {
  const board = props.board;
  const backServer = process.env.REACT_APP_BACK_SERVER; //BackServer의 IP:Port

  return (
    <tr>
      <td>dd1</td>
      <td>dd2</td>
      <td>3dd</td>
      <td>dd4</td>
      <td>5dd</td>
    </tr>
  );
};

export default AdminProduct;
