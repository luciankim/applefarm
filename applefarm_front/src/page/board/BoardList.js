import { useEffect, useState } from "react";
import { Button } from "../../component/FormFrm";
import axios from "axios";
import Pagination from "../../component/Pagination";
import { useNavigate } from "react-router-dom";

const BoardList = (props) => {
  // const isLogin = props.isLogin;
  const isLogin = true;
  const [boardList, setBoardList] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState([]);
  //페이징을 구현하는 화면도 react로 작성
  //페이징 구현에 필요한 데이터들을 객체로 받음(totalPage 등)
  const [pageInfo, setPageInfo] = useState({});
  //처음에는 1페이지, 페이지 바뀔때마다 useEffect 돌아가도록 세팅
  const [reqPage, setReqPage] = useState(1);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  //아무것도 적지 않으면 로드될 때 한번 돌아가는 effect 함수
  useEffect(() => {
    axios
      .get(backServer + "/board/list/" + reqPage)
      .then((res) => {
        console.log(res.data.data);
        setBoardList(res.data.data.boardList);
        setTotalPostCount(res.data.data.totalPostCount);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);

  const navigate = useNavigate();
  const writeBtn = () => {
    navigate("/board/write");
  };

  return (
    <div className="board-wrap">
      <div className="board-title">
        <p>자유게시판</p>
      </div>
      {isLogin ? (
        <div className="board-subtitle">
          <span className="totalPostCount">총 {totalPostCount} 개의 글</span>
          <Button text="글쓰기" addId="writeBtn" clickEvent={writeBtn} />
        </div>
      ) : (
        ""
      )}
      <div className="board-tbl-box">
        <table>
          <thead>
            <tr>
              <th width="15%">번호</th>
              <th width="35%">제목</th>
              <th width="20%">닉네임</th>
              <th width="20%">작성일</th>
              <th width="10%">조회수</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((board, index) => {
              return <BoardItem key={"board" + index} board={board} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="board-page">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
    </div>
  );
};

const BoardItem = (props) => {
  const board = props.board;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const boardView = () => {
    navigate("/board/view/" + board.boardNo);
  };
  return (
    <tr>
      <td>{board.boardNo}</td>
      <td onClick={boardView}>
        {board.boardTitle}
        {/* {board.boardThumbnai === null ? (
          <img src="/image/default.png" />
        ) : (
          <img src={backServer + "/board/thumbnail/" + board.boardThumbnail} />
        )} */}
      </td>
      <td>{board.memberNickName}</td>
      <td>{board.boardDate}</td>
      <td>{board.readCount}</td>
    </tr>
  );
};

export default BoardList;
