import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const BoardView = (props) => {
  // const isLogin = props.isLogin;
  const params = useParams();
  const boardNo = params.boardNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [board, setBoard] = useState({});
  const [member, setMember] = useState(null);
  useEffect(() => {
    axios
      .get(backServer + "/board/one/" + boardNo)
      .then((res) => {
        console.log(res.data.data);
        setBoard(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div className="board-view-wrap">
      <div className="board-view-top">
        <div className="board-view-thumbnail">
          {board.boardThumbnail === null ? (
            <img src="/image/default.png"></img>
          ) : (
            <img
              src={backServer + "/board/thumbnail/" + board.boardThumbnail}
            />
          )}
        </div>
        <div className="board-view-info">
          <div className="board-view-title">{board.boardTitle}</div>
          <div className="board-view-sub-info">
            <div>{board.boardWriter}</div>
            <div>{board.boardDate}</div>
          </div>
          <div className="board-view-file">
            <div>첨부파일</div>
            <div className="file-zone">
              {board.fileList
                ? board.fileList.map((file, index) => {
                    return <FileItem key={"file" + index} file={file} />;
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="board-view-detail"></div>
    </div>
  );
};

const FileItem = (props) => {
  const file = props.file;
  return (
    <div className="board-file">
      <span className="material-icons">file_download</span>
      <span className="file-name">{file.filename}</span>
    </div>
  );
};

export default BoardView;
