import { useEffect, useRef, useState } from "react";
import "./productInsert.css";
import ReactQuill from "react-quill";
import { Button1 } from "../../component/FormFrm";
import TextEditor from "../../component/TextEditor";

const ProductInsertLastFrm = (props) => {
  //정의

  const backServer = process.env.REACT_APP_BACK_SERVER;

  //전송용
  const title = props.title;
  const setTitle = props.setTitle;
  const content = props.content;
  const setContent = props.setContent;
  const price = props.price;
  const setPrice = props.setPrice;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;

  const file = props.file;
  const setFile = props.setFile;

  const [selectedImage, setSelectedImage] = useState(null);

  //화면구성
  const image = props.image;
  const setImage = props.setImage;
  const fileList = props.fileList;
  const setFileList = props.setFileList;

  //화면구성메세지
  const [checkTitleMsg, setCheckTitleMsg] = useState("");
  const [checkPriceMsg, setCheckPriceMsg] = useState("");

  const writeBtn = props.writeBtn;

  const titleCheck = () => {
    const titleReg = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()_+|<>?:{}]{5,30}$/;

    console.log(titleReg.test(title));

    if (titleReg.test(title)) {
      setCheckTitleMsg("");
    } else {
      setCheckTitleMsg("제목은 영어 대/소문자/숫자/한글로 5~30글자 입니다.");
    }
  };
  const priceCheck = () => {
    const priceReg = /^[0-9]{4,7}$/;

    if (priceReg.test(price)) {
      setCheckPriceMsg("");
    } else {
      setCheckPriceMsg(
        "가격설정이 잘못되었습니다. 1000-9999999사이의 숫자를 입력해주세요."
      );
    }
  };

  const [filePreviews, setFilePreviews] = useState([]);
  const changeFile = (e) => {
    // const files = e.target.files;
    // console.log(files);
    // setFile(files);
    // console.log(files);
    // const arr = new Array();
    // //파일리스트는 배열처럼 보이지만 배열은 아님
    // for (let i = 0; i < files.length; i++) {
    //   arr.push(files[i].name);
    // }
    // setFileList(arr);

    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files); // 파일 객체를 배열로 변환 [File, File, File]

      const previews = [];

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // previews.push(reader.result); // 파일 읽기가 완료되면 previews 배열에 추가
          previews.push({ dataUrl: reader.result, file: file }); // 파일 객체와 Data URL 함께 저장
          if (previews.length === fileArray.length) {
            setFilePreviews(previews); // 모든 파일이 읽혀지면 상태 업데이트
          }
        };
        reader.readAsDataURL(file); // 각 파일을 Data URL로 읽기
      });

      setFile(files); // 기존의 파일 상태 업데이트 로직을 유지
      const arr = fileArray.map((file) => file.name);
      setFileList(arr); // 파일 이름 목록 상태 업데이트
    }
  };

  const handleImageSelect = (selectedPreview) => {
    setSelectedImage(selectedPreview.dataUrl); // 선택된 이미지의 Data URL을 상태에 저장
    setImage(selectedPreview.dataUrl); // 화면에 보여줄 이미지 설정
    setThumbnail(selectedPreview.file); // 선택된 이미지의 파일 객체를 setThumbnail에 저장
  };

  // const changeThumbnail = (e) => {
  //   const files = e.target.files;
  //   if (files.length !== 0 && files[0] != 0) {
  //     setThumbnail(files[0]); //전송용 state에 file객체를 세팅
  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[0]);
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //   } else {
  //     setThumbnail(null);
  //     setImage(null);
  //   }
  // };

  // useEffect(() => {
  //   console.log(thumbnail);
  // }, [thumbnail]);

  useEffect(() => {
    console.log(selectedImage);
  }, [handleImageSelect]);

  return (
    <div className="insert-last-frm-wrap">
      {/* <div className="insert-last-frm-top">
        <div className="insert-last-thumbnail">
          {thumbnail === undefined || thumbnail === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={thumbnail} />
          )}
        </div>
      </div> */}

      <table className="insert-last-frm-tbl">
        <tbody>
          <tr style={{ height: "100px" }}>
            <th>타이틀</th>
            <td>
              <Input
                data={title}
                setData={setTitle}
                type="text"
                blurEvent={titleCheck}
                blurText={checkTitleMsg}
              ></Input>
            </td>
          </tr>
          <tr style={{ height: "400px" }} className="">
            <th>제품 상세 설명</th>
            <td>
              {/* <ReactQuill ref={quillRef} theme="snow" className="note" /> */}
              <TextEditor
                data={content}
                setData={setContent}
                url={backServer + "/board/editor"}
              ></TextEditor>
            </td>
          </tr>
          <tr style={{ height: "50px" }}>
            <th>판매 희망가</th>
            <td>
              <Input
                data={price}
                setData={setPrice}
                type="text"
                blurEvent={priceCheck}
                blurText={checkPriceMsg}
              ></Input>
            </td>
          </tr>
          <tr style={{ height: "400px" }}>
            <th>여기는 차트</th>
            <td>1</td>
          </tr>
          <tr style={{ height: "300px" }}>
            <th>썸내일 등록</th>
            <td>
              <div className="insert-last-thumbnail">
                {image ? (
                  <img src={image} alt="Thumbnail" />
                ) : (
                  <img src="/image/default.png" alt="Default" />
                )}
              </div>
            </td>
          </tr>
          <tr style={{ height: "100px" }}>
            <th>사진등록</th>
            <td className="thumbnail-area">
              <input type="file" onChange={changeFile} multiple id="upload1"/>
            
            </td>
          </tr>
          <tr style={{ height: "200px" }}>
            <th>사진</th>
            <td>
              <div className="file-preview-zone">
                {filePreviews.map((preview, index) => (
                  <div className="file-preview" key={index}>
                    <img
                      src={preview.dataUrl}
                      alt="Preview"
                      className={`file-preview-image ${selectedImage === preview.dataUrl ? "selected-image" : ""}`}
                      
                      onClick={() => handleImageSelect(preview)}
                    />
                  </div>
                ))}
              </div>
              <div>대표 이미지 선택: ㅁ클릭</div>
            </td>
          </tr>

          <tr>
            <td colSpan={2} className="insert-btn">
              <button onClick={writeBtn}>완료</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductInsertLastFrm;

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const id = props.id;
  const blurEvent = props.blurEvent;
  const blurText = props.blurText;

  const changeData = (e) => {
    setData(e.target.value);
  };

  return (
    <div>
      <input
        id={id}
        type={type}
        value={data || ""}
        onChange={changeData}
        className="input-form"
        onBlur={blurEvent}
      />
      {blurEvent !== undefined ? (
        <div>
          <input className="blur-form" type="text" value={blurText} disabled />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
