import axios from "axios";
import "./board.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button1, Button2, Button3 } from "../../component/FormFrm";
import Swal from "sweetalert2";
import Comment from "./Comment";

const BoardView = (props) => {
  // const isLogin = props.isLogin;
  const isLogin = true;
  const params = useParams();
  const boardNo = params.boardNo; //댓글
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [board, setBoard] = useState({});
  const [memberNo, setMemberNo] = useState(21); //댓글
  const [commentContent, setCommentContent] = useState(""); //댓글
  const [selfRef, setSelfRef] = useState(0); //댓글
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/board/one/" + boardNo)
      .then((res) => {
        console.log("전체조회", res.data.data);
        setBoard(res.data.data.board);
        console.log("게시물", board);
        setCommentList(res.data.data.commentList);
        console.log("댓글", commentList);
      })
      .catch((res) => {
        console.log(res);
      });
    // if (isLogin) {
    //   axios.get(backServer + "/member").then((res) => {
    //     setMember(res.data.data);
    //     console.log(res.data.data);
    //   });
    // }
  }, [commentContent]);
  const modify = () => {
    navigate("/board/modify/" + boardNo);
  };
  const back = () => {
    navigate("/board/list"); // 기본적으로 지정된 URL로 이동
  };
  const deleteBoard = () => {
    Swal.fire({
      icon: "warning",
      text: "게시글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(backServer + "/board/" + board.boardNo)
          .then((res) => {
            if (res.data.message === "success") {
              console.log("삭제", res.data.message);
              navigate("/board/list");
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    });
  };

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
            <div>작성자 {board.memberNo}</div>
            <div>작성일 {board.boardDate}</div>
            <div>조회수 {board.readCount}</div>
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
      <div
        className="board-view-detail"
        dangerouslySetInnerHTML={{ __html: board.boardContent }}
      ></div>

      {/* 댓글출력 */}
      <div className="commentBox">
        <ul className="posting-comment">
          {commentList.map((comment, index) => {
            return (
              <li key={"comment" + index}>
                <div className="comment-info">
                  <div className="comment-writer">
                    작성자 {comment.commentWriter}
                  </div>
                  <div className="comment-date">
                    작성일 {comment.commentDate}
                  </div>
                </div>
                <div
                  className="comment-content"
                  dangerouslySetInnerHTML={{ __html: comment.commentContent }}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* 댓글입력 */}
      <div className="inputCommentBox">
        <Comment
          boardNo={boardNo}
          memberNo={memberNo}
          commentContent={commentContent}
          setCommentContent={setCommentContent}
          commentList={commentList}
          setCommentList={setCommentList}
          selfRef={selfRef}
          setSelfRef={setSelfRef}
        />
      </div>
      {isLogin ? (
        <div className="board-view-btn-zone">
          {/* {member && member.memberId === board.boardWriter ? ( */}
          {isLogin ? (
            <>
              <Button1 text="수정" clickEvent={modify} />
              <Button2 text="삭제" clickEvent={deleteBoard} />
              <Button3 text="목록" clickEvent={back} />
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const FileItem = (props) => {
  const file = props.file;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const fileDown = () => {
    axios
      .get(backServer + "/board/file/" + file.fileNo, {
        //axios는 기본적으로 모든 응답을 json으로 처리 -> 이 요청은 파일을받아야함
        //-> json으로는 처리가 불가능 -> 파일형식으로 받겠다
        responseType: "blob",
      })
      .then((res) => {
        //서버에서 바이너리데이터 -> blob 형태로 변경
        const blob = new Blob([res.data]);
        //blob데이터를 다운로드할 수 있는 임시 링크 생성
        const fileObjectUrl = window.URL.createObjectURL(blob);
        //blob데이터를 다운로드할 링크 생성
        const link = document.createElement("a"); //a태그생성
        link.href = fileObjectUrl; //위에서 만든 파일링크와 연결
        link.style.display = "none"; //화면에서는 안보이게 처리
        //다운로드할 파일 이름 지정
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileObjectUrl);
      })
      .catch((res) => {});
  };
  return (
    <div className="board-file">
      <span className="material-icons file-icon" onClick={fileDown}>
        file_download
      </span>
      <span className="file-name">{file.filename}</span>
    </div>
  );
};

export default BoardView;
