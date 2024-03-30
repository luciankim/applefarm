import { Input } from "../../component/FormFrm";
import "./boardFrm.css";
import TextEditor from "../../component/TextEditor";
import { Button1 } from "../../component/FormFrm";
const BoardFrm = (props) => {
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const boardContent = props.boardContent;
  const setBoardContent = props.setBoardContent;
  const boardType = props.boardType;
  const setBoardType = props.setBoardType;

  //전송용
  const boardFile = props.boardFile;
  const setBoardFile = props.setBoardFile;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;

  //출력용
  const fileList = props.fileList; //동일
  const setFileList = props.setFileList;
  const boardThumbnail = props.boardThumbnail;
  const setBoardThumbnail = props.setBoardThumbnail;

  const buttonFunction = props.buttonFunction;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  //--------------썸네일 파일 추가시 동작할 함수---------------
  const changeThumbnail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setThumbnail(files[0]); //전송용 state에 file객체를 세팅
      //화면 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setBoardThumbnail(reader.result);
      };
    } else {
      setThumbnail(null);
      setBoardThumbnail(null);
      setThumbnail(null);
    }
  };

  //--------------첨부파일 추가 시 동작할 함수------------------
  const changeFile = (e) => {
    const files = e.currentTarget.files;
    console.log("ㅋㅋ", files);
    setBoardFile(files); //전송용
    const arr = new Array();
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i].name);
    }
    setFileList(arr);
  };
  return (
    <div className="board-frm-wrap">
      <div className="board-frm-top">
        <div className="board-thumbnail">
          {boardThumbnail === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={boardThumbnail} />
          )}
        </div>
        <div className="board-info">
          <table className="board-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="boardTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={boardTitle}
                    setData={setBoardTitle}
                    content="boardTitle"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="thumbnail">대표이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={changeThumbnail}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="boardFile">첨부파일</label>
                </td>
                <td>
                  <input type="file" onChange={changeFile} multiple />
                </td>
              </tr>
              <tr className="file-list">
                <td>파일목록</td>
                <td>
                  <div className="file-zone">
                    {fileList.map((item, index) => {
                      return (
                        <p key={"newFile" + index}>
                          <span className="filename">{item}</span>
                        </p>
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-frm-bottom">
        <TextEditor
          data={boardContent}
          setData={setBoardContent}
          url={backServer + "/board/editor"}
        />
      </div>
      <div className="board-write-btn-box">
        <Button1
          text="작성하기"
          clickEvent={buttonFunction}
          addId="board-write-btn"
        />
      </div>
    </div>
  );
};

export default BoardFrm;
