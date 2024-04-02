import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../component/Pagination";

const AdminReport = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  //ReqPage가 변경될 때마다, axios
  useEffect(() => {
    axios
      .get(backServer + "/admin/board/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setBoardList(res.data.data.boardList);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [reqPage]);

  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        <p className="admin-current-p">게시물 관리</p>
      </div>
      <div className="member-like-tbl-box" id="member-like-tbl-box">
        <table>
          <thead>
            <tr>
              <th width="15%">구분</th>
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
export default AdminReport;
