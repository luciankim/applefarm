import axios from "axios";
import "./productInsert.css";
import React, { useEffect, useState } from "react";
import { Button1, Button2, Button3 } from "../../component/FormFrm";

const ProductQualityInsert = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [totalQuality, setTotalQuality] = useState();
  const [grade, setGrade] = useState();
  const [qualityState, setQualityState] = useState({});
  const [score, setScore] = useState({});
  const tableName = "IPHONE_TBL";
  const [qualityList, setQualityList] = useState([]);
  const [image, setImage] = useState({});

  const handleQualityChange = (part, value) => {
    const item = qualityList.find((item) => item.part === part);

    const index = qualityList
      .find((item) => item.part === part)
      .productStatus.split("/")
      .indexOf(value);

    const imageName = item.productStatusImage
      ? item.productStatusImage.split("/")[index]
      : "default";

    // console.log(index); // 선택된 품질에 해당하는 인덱스 값을 설정합니다.
    console.log(imageName);

    setScore((prevScores) => ({
      ...prevScores,
      [part]: index,
    }));

    setQualityState((prev) => ({
      ...prev,
      [part]: value,
    }));

    setImage((prevImages) => ({
      ...prevImages,
      [part]:
        imageName !== "default"
          ? "/image/qualityImage/" + imageName + ".png"
          : undefined,
    }));
  };

  const calculateTotalScore = () => {
    const s = Object.values(score).reduce((total, num) => total + num + 1, 0);

    return s;
  };

  const prevPage = () => {};

  const nextPage = () => {};

  //console.log(score); //{액정: 3, 뒷판&측면: 3, 잔상: 3, 디스플레이: 1}
  //console.log(qualityState); //{액정: '심각한 파손', 뒷판&측면: '휨', 잔상: '심한 잔상, 백화 3개 이상', 디스플레이: '불량, 멍, 얼룩, 줄'}

  // console.log(Object.keys(score).length);
  // console.log(qualityList.length);

  //Object.values() 메서드는 객체(obj)의 열거 가능한 속성 값들을 배열로 반환
  //score 객체가 {액정: 1, 배터리: 2}라면, Object.values(score)는 [1, 2]를 반환
  //reduce() 메서드는 배열의 각 요소에 대해 주어진 "리듀서(reducer)" 함수를 실행하고, 하나의 결과값을 반환합니다.

  // 이 메서드는 두 개의 인자를 받습니다: 콜백 함수와 초기값입니다.
  // 콜백 함수는 네 개의 인자를 받을 수 있습니다. 이 예제에서는 첫 번째 인자(total)와 두 번째 인자(num)만 사용합니다.
  // total은 누산기(accumulator)로, 콜백의 반환값이 누적됩니다. 초기값은 reduce() 메서드의 두 번째 인자로 전달되며, 여기서는 0입니다.
  // num은 현재 처리되고 있는 배열의 요소입니다.
  // 콜백 함수의 몸체에서는 total + num을 계산하여, 배열의 모든 요소를 순회하며 누적 합을 구합니다.

  // console.log(calculateTotalScore() / qualityList.length);
  // console.log(qualityList);

  // if(qualityList.length < calculateTotalScore() < qualityList.length*1.5){
  //   setGrade('a');
  // }

  useEffect(() => {
    // console.log(Object.keys(score).length);
    // console.log(qualityList.length);
    // console.log(calculateTotalScore());

    if (calculateTotalScore() / qualityList.length < 1.4) {
      setGrade("A");
    } else if (calculateTotalScore() / qualityList.length < 1.8) {
      setGrade("B");
    } else if (calculateTotalScore() / qualityList.length < 2.2) {
      setGrade("C");
    } else {
      setGrade("D");
    }

    console.log(calculateTotalScore() / qualityList.length);
    console.log(grade);
    console.log(image);
  }, [handleQualityChange]);

  useEffect(() => {
    setTotalQuality(grade);
  }, [grade]);

  useEffect(() => {
    axios
      .get(backServer + "/product/quality/" + tableName)
      .then((res) => {
        // console.log(res.data);
        setQualityList(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="quality-select-total-wrap">
      <div className="quality-select-wrap">
        <div className="quality-select-title">품질 선택</div>

        {qualityList.map((item, index) => {
          const arr = item.productStatus.split("/");
          const imagePath = image[item.part];
          // console.log(arr);

          // console.log(item);
          return (
            <QualitySelectInputWrap
              key={item.part + index}
              type="radio"
              className={
                arr.length === 1
                  ? "radio radio1"
                  : arr.length === 2
                  ? "radio radio2"
                  : arr.length === 3
                  ? "radio radio3"
                  : arr.length === 4
                  ? "radio radio4"
                  : ""
              }
              part={item.part}
              value1={arr[0]}
              id1={arr[0] ? item.part + "1" : undefined}
              value2={arr[1]}
              id2={arr[1] ? item.part + "2" : undefined}
              value3={arr[2]}
              id3={arr[2] ? item.part + "3" : undefined}
              value4={arr[3]}
              id4={arr[3] ? item.part + "4" : undefined}
              data={qualityState[item.part]} // 이 부분이 `qualityState` 객체에서 해당 `part`의 상태를 참조합니다.
              setData={(value) => handleQualityChange(item.part, value)}
              // 이 부분이 상태를 설정하는 함수를 전달합니다.
              name={item.part}
              // img1={
              //   "/image/qualityImage/" +
              //   item.productStatusImage.split("/")[0] +
              //   ".png"
              // }
              // img1={"/image/qualityImage/phoneAfterimage_A.png"}

              // onChange={(value) => handleQualityChange(item.part, value)}
              img1={imagePath}
            />
          );
        })}
        {/* 기록된 점수의 키 개수와 리스트의 전체 길이와 같다면,
        즉 전부 선택했다면 평점 라디오가 뜨도록한다. */}

        {Object.keys(score).length === qualityList.length ? (
          <QualitySelectInputWrap2
            type="radio"
            className="score-radio radio4"
            part="평점"
            value1="A"
            value2="B"
            value3="C"
            value4="D"
            id1="score1"
            id2="score2"
            id3="score3"
            id4="score4"
            name="score"
            data={totalQuality}
            setData={setTotalQuality}
            selectedGrade={grade} // 현재 선택된 grade를 전달
          ></QualitySelectInputWrap2>
        ) : (
          ""
        )}
        <div className="quality-select-button">
          <Button1 text="이전으로" onclick="prevPage" addId="gy"></Button1>
          <Button1 text="다음으로" onclick="nextPage" addId="gy"></Button1>
        </div>

        {/* <div>
          <div>{calculateTotalScore()}</div>
        </div> */}
      </div>
    </div>
  );
};

const QualitySelectInputWrap = (props) => {
  const part = props.part;
  const type = props.type;
  const className = props.className;

  const value1 = props.value1;
  const id1 = props.id1;

  const value2 = props.value2;
  const id2 = props.id2;

  const value3 = props.value3;
  const id3 = props.id3;

  const value4 = props.value4;
  const id4 = props.id4;

  const name = props.name;
  const setData = props.setData;
  const data = props.data;

  const img1 = props.img1;
  const img2 = props.img2;

  // const selectedGrade = props.selectedGrade;

  return (
    <div className="quality-select-input-area">
      {/* <div className="quality-type">
        <div>액정</div>
        <div>기스</div>
      </div> */}
      <QualityTypeLavel part={part} data={data} />

      <div>
        <RadioInput
          type={type}
          className={className}
          value={value1}
          id={id1}
          name={name}
          setData={setData}
          // checked={selectedGrade === value1} // "A"가 현재 선택된 grade와 일치하면 true
        ></RadioInput>
        <RadioInput
          type={type}
          className={className}
          value={value2}
          id={id2}
          name={name}
          setData={setData}
          // checked={selectedGrade === value2}
        ></RadioInput>
        <RadioInput
          type={type}
          className={className}
          value={value3}
          id={id3}
          name={name}
          setData={setData}
          // checked={selectedGrade === value3}
        ></RadioInput>
        <RadioInput
          type={type}
          className={className}
          value={value4}
          id={id4}
          name={name}
          setData={setData}
          // checked={selectedGrade === value4}
        ></RadioInput>
      </div>

      {/* <div className="quality-select-image">
            <img src="/image/default.png" />
            <img src="/image/default.png" />
          </div> */}
      <ImageInput img1={img1} img2={img2} />
    </div>
  );
};

const QualitySelectInputWrap2 = (props) => {
  const part = props.part;
  const type = props.type;
  const className = props.className;

  const value1 = props.value1;
  const id1 = props.id1;

  const value2 = props.value2;
  const id2 = props.id2;

  const value3 = props.value3;
  const id3 = props.id3;

  const value4 = props.value4;
  const id4 = props.id4;

  const name = props.name;
  const setData = props.setData;
  const data = props.data;

  const img1 = props.img1;
  const img2 = props.img2;

  const selectedGrade = props.selectedGrade;

  return (
    <div className="quality-select-input-area">
      {/* <div className="quality-type">
        <div>액정</div>
        <div>기스</div>
      </div> */}
      <QualityTypeLavel part={part} data={data} />

      <div>
        <RadioInput2
          type={type}
          className={className}
          value={value1}
          id={id1}
          name={name}
          setData={setData}
          checked={selectedGrade === value1} // "A"가 현재 선택된 grade와 일치하면 true
        ></RadioInput2>
        <RadioInput2
          type={type}
          className={className}
          value={value2}
          id={id2}
          name={name}
          setData={setData}
          checked={selectedGrade === value2}
        ></RadioInput2>
        <RadioInput2
          type={type}
          className={className}
          value={value3}
          id={id3}
          name={name}
          setData={setData}
          checked={selectedGrade === value3}
        ></RadioInput2>
        <RadioInput2
          type={type}
          className={className}
          value={value4}
          id={id4}
          name={name}
          setData={setData}
          checked={selectedGrade === value4}
        ></RadioInput2>
      </div>

      {/* <div className="quality-select-image">
            <img src="/image/default.png" />
            <img src="/image/default.png" />
          </div> */}
      <ImageInput img1={img1} img2={img2} />
    </div>
  );
};

const RadioInput = (props) => {
  const type = props.type;
  const id = props.id;
  const className = props.className;
  const name = props.name;
  const value = props.value;
  const labelText = props.value;
  const setData = props.setData;
  // const checked = props.checked;

  const changeData = (e) => {
    setData(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <>
      {value !== undefined ? (
        <div className="quality-select-input-wrap">
          <input
            type={type}
            id={id}
            defaultValue={value}
            className={className}
            name={name}
            onChange={changeData}
            // checked={checked}
          />
          <label htmlFor={id}>{labelText}</label>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const RadioInput2 = (props) => {
  const type = props.type;
  const id = props.id;
  const className = props.className;
  const name = props.name;
  const value = props.value;
  const labelText = props.value;
  const setData = props.setData;
  const checked = props.checked;
  // const disabled = props.disabled;

  const changeData = (e) => {
    setData(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <>
      {value !== undefined ? (
        <div className="quality-select-input-wrap">
          <input
            type={type}
            id={id}
            defaultValue={value}
            className={className}
            name={name}
            onChange={changeData}
            checked={checked}
            disabled={true}
          />
          <label htmlFor={id}>{labelText}</label>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const QualityTypeLavel = (props) => {
  const part = props.part;
  const data = props.data;

  return (
    <>
      <div className="quality-type">
        <div>{part}</div>
        <div>{data}</div>
      </div>
    </>
  );
};

const ImageInput = (props) => {
  const img1 = props.img1;
  const img2 = props.img2;

  return (
    <>
      {img2 !== undefined ? (
        <div className="quality-select-image1">
          <img className="quality-image" src={img1} />
          <img src={img2} />
        </div>
      ) : (
        <div className="quality-select-image2">
          <img src={img1} className={img1 ? "quality-image" : ""} />
        </div>
      )}
    </>
  );
};

export default ProductQualityInsert;
