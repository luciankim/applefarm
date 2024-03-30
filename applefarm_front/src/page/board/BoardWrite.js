import { useState } from "react";
import BoardFrm from "./BoardFrm";

const BoardWrite = () => {
  //제목, 썸네일, 내용, 첨부파일 -> 글 작성을 위해서 사용자에게 받아야 하는 정보 -> state 생성(데이터 전송용)
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardType, setBoardType] = useState(2);
  const [productCategory, setProductCategory] = useState(null);
  const [boardFile, setBoardFile] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  //사용자 화면 출력용 state (화면전송시 사용하지 않음)
  const [fileList, setFileList] = useState([]); //화면출력용 애들이 변수명이랑 같음
  const [boardThumbnail, setBoardThumbnail] = useState(null); //썸네일 미리보기

  const write = () => {
    console.log("게시글 작성 고고");
  };
  return (
    <div className="board-write-wrap">
      <div className="board-frm-title">게시글 작성</div>
      <BoardFrm
        boardTitle={boardTitle}
        setBoardTitle={setBoardTitle}
        boardContent={boardContent}
        setBoardContent={setBoardContent}
        boardType={boardType}
        setBoardType={setBoardType}
        boardFile={boardFile}
        setBoardFile={setBoardFile}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        fileList={fileList}
        setFileList={setFileList}
        boardThumbnail={boardThumbnail}
        setBoardThumbnail={setBoardThumbnail}
        buttonEvent={write}
      />
    </div>
  );
};

export default BoardWrite;
