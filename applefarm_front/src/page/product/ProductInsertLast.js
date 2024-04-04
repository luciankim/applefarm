import { useState, useEffect } from "react";
import ProductInsertLastFrm from "./ProductInsertLastFrm";
import axios from "axios";

const ProductInsertLast = (props) => {
  //데이터 전송용
  // const [title, setTitle] = useState(); //제목
  // const [content, setContent] = useState(); //내용
  // const [price, setPrice] = useState(); //가격
  // const [file, setFile] = useState([]); //이미지
  // const [thumbnail, setThumbnail] = useState(); //대표이미지
  const title = props.title;
  const setTitle = props.setTitle;
  const content = props.content;
  const setContent = props.setContent;
  const price = props.price;
  const setPrice = props.setPrice;  
  const file = props.file;
  const setFile = props.setFile;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;

  const backServer = process.env.REACT_WEB_BACK_SERVER;

  const insert = props.insert;

  const grade = props.grade;
  const setGrade = props.setGrade;
  const partOrder = props.partOrder;
  const setPartOrder = props.setPartOrder;

  //화면 출력용
  const [fileList, setFileList] = useState([]); //이미지 미리보기
  const [image, setImage] = useState(null); //대표이미지 미리보기

  const writeBtn = () => {
    if (title && content && price && file && thumbnail) {
      console.log("제목: ", title); //필수
      console.log("내용: ", content);
      console.log("가격: ", price);
      console.log("파일: ", file);
      console.log("대표이미지: ", thumbnail);
      console.log(grade);
      console.log(partOrder);
      console.log("등록 완료");

      axios.post()
    }
    
  };

 

  return (
    <div className="insert-last-write-wrap">
      <div className="insert-last-frm-title">상세 입력 페이지</div>
      <ProductInsertLastFrm
        title={title}
        content={content}
        price={price}
        file={file}
        thumbnail={thumbnail}
        fileList={fileList}
        image={image}
        setTitle={setTitle}
        setContent={setContent}
        setPrice={setPrice}
        setFile={setFile}
        setThumbnail={setThumbnail}
        setFileList={setFileList}
        setImage={setImage}
        writeBtn={writeBtn}
      />
    </div>
  );

  return;
};

export default ProductInsertLast;
