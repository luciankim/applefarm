import React from "react";
import BoardItem from "./BoardItem";
import Pagination from "../../component/Pagination";

const BoardTable = ({
  boardList,
  pageInfo,
  reqPage,
  setReqPage,
  isSearchResult,
}) => {
  return (
    <div>
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
            {isSearchResult && boardList.length === 0 ? (
              <tr>
                <td colSpan="5">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              boardList.map((board, index) => (
                <BoardItem key={"board" + index} board={board} />
              ))
            )}
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

export default BoardTable;
