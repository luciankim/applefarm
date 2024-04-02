import axios from "axios";
import "./product.css";
import React, { useEffect, useState } from "react";

const QualitySelectFrm = (props) => {
  const [liquidCrystal, setLiquildCrystal] = useState();
  const [backAndFront, setBackAndFront] = useState();
  const [afterimage, setAfterimage] = useState();
  const [display, setDisplay] = useState();

  const [power, setPower] = useState();
  const [camera, setCamera] = useState();
  const [wifi, setWifi] = useState();
  const [biometrics, setBiometrics] = useState();
  const [compass, setCompass] = useState();
  const [voiceRecording, setVoiceRecording] = useState();

  const [totalQuality, setTotalQuality] = useState();

  const [qualityState, setQualityState] = useState({});

  const [score, setScore] = useState({});

  const g = "";

  const [totalScore, setTotalScore] = useState();

  const handleQualityChange = (part, value) => {
    const index = qualityList
      .find((item) => item.part === part)
      .productStatus.split("/")
      .indexOf(value);
    console.log(index);

    // 선택된 품질에 해당하는 인덱스 값을 설정합니다.
    setScore((prevScores) => ({
      ...prevScores,
      [part]: index,
    }));

    setQualityState((prev) => ({
      ...prev,
      [part]: value,
    }));
  };

  const calculateTotalScore = () => {
    const s = Object.values(score).reduce((total, num) => total + num, 0);

    return s;
  };

  const backServer = process.env.REACT_APP_BACK_SERVER;
  // console.log(liquidCrystal);
  // console.log(backAndFront);
  const tableName = "IPHONE_TBL";

  const [qualityList, setQualityList] = useState([]);

  // console.log(qualityList);

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
          // console.log(arr);
          return (
            <>
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
                setData={(value) => handleQualityChange(item.part, value)} // 이 부분이 상태를 설정하는 함수를 전달합니다.
                name={item.part}
                img1="/image/default.png"
                onChange={(value) => handleQualityChange(item.part, value)}
              />
            </>
          );
        })}

        <QualitySelectInputWrap
          type="radio"
          className="radio radio4"
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
        ></QualitySelectInputWrap>

        <div>
          <div>{calculateTotalScore()}</div>
        </div>

        {/* <QualitySelectInputWrap
          part="액정"
          type="radio"
          className="radio radio4"
          
          value2="경미한 잔기스"
          id2="liquidCrystal2"
          value3="심한 기스, 파손, 전면 뜸"
          id3="liquidCrystal3"value1="정상"
          id1="liquidCrystal1"
          value4="심각한 파손"
          id4="liquidCrystal4"
          name="liquidCrystal"
          data={liquidCrystal}
          setData={setLiquildCrystal}
          img1="/image/default.png"
        />

        <QualitySelectInputWrap
          part="뒷판&측면"
          type="radio"
          className="radio radio4"
          value1="정상"
          id1="backAndFront1"
          value2="경미한 잔기스"
          id2="backAndFront2"
          value3="심한 기스, 파손, 전면 뜸"
          id3="backAndFront3"
          value4="휨"
          id4="backAndFront4"
          name="backAndFront"
          data={backAndFront}
          setData={setBackAndFront}
          img1="/image/default.png"
          img2="/image/default.png"
        />

        <QualitySelectInputWrap
          part="잔상"
          type="radio"
          className="radio radio4"
          value1="정상"
          id1="afterimage1"
          value2="약한 잔상"
          id2="afterimage2"
          value3="강한 잔상, 백화 1~2개"
          id3="afterimage3"
          value4="심한 잔상, 백화 3개 이상"
          id4="afterimage4"
          name="afterimage"
          data={afterimage}
          setData={setAfterimage}
          img1="/image/default.png"
        />

        <QualitySelectInputWrap
          part="화면"
          type="radio"
          className="radio radio2"
          value1="정상"
          id1="display1"
          value2="불량,멍,얼룩,줄"
          id2="display2"
          name="display"
          data={display}
          setData={setDisplay}
          img1="/image/default.png"
        />

        <div className="quality-select-half">
          <div>
            <QualitySelectInputWrap
              part="전원"
              type="radio"
              className="radio radio2"
              value1="정상"
              id1="power1"
              value2="불량"
              id2="power2"
              name="power"
              data={power}
              setData={setPower}
            />
          </div>
          <div>
            <QualitySelectInputWrap
              part="카메라"
              type="radio"
              className="radio radio2"
              value1="정상"
              id1="camera1"
              value2="불량,파손"
              id2="camera2"
              name="camera"
              data={camera}
              setData={setCamera}
            />
          </div>
        </div>

        <div className="quality-select-half">
          <div>
            <QualitySelectInputWrap
              part="와이파이"
              type="radio"
              className="radio radio2"
              value1="정상"
              id1="wifi1"
              value2="불량"
              id2="wifi2"
              name="wifi"
              data={wifi}
              setData={setWifi}
            />
          </div>
          <div>
            <QualitySelectInputWrap
              part="생체인식(지문/FACD ID)"
              type="radio"
              className="radio radio2"
              value1="정상"
              id1="biometrics1"
              value2="불량,파손"
              id2="biometrics2"
              name="biometrics"
              data={biometrics}
              setData={setBiometrics}
            />
          </div>
        </div>

        <div className="quality-select-half">
          <div>
            <QualitySelectInputWrap
              part="나침반"
              type="radio"
              className="radio radio2"
              value1="정상"
              id1="compass1"
              value2="불량"
              id2="compass2"
              name="compass"
              data={compass}
              setData={setCompass}
            />
          </div>
          <div>
            <QualitySelectInputWrap
              part="음성녹음"
              type="radio"
              className="radio radio2"
              value1="정상"
              id1="voiceRecording1"
              value2="불량,파손"
              id2="voiceRecording2"
              name="voiceRecording"
              data={voiceRecording}
              setData={setVoiceRecording}
            />
          </div>
        </div>

        <div>
          <div className="total-quality">
            <QualitySelectInputWrap
              part="선택된 품질"
              type="radio"
              className="radio radio4"
              value1="A"
              id1="totalQuality1"
              value2="B"
              id2="totalQuality2"
              value3="C"
              id3="totalQuality3"
              value4="D"
              id4="totalQuality4"
              name="totalQuality"
              data={totalQuality}
              setData={setTotalQuality}
            />
          </div>
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

  return (
    <div className="quality-select-input-area">
      {/* <div className="quality-type">
        <div>액정</div>
        <div>기스</div>
      </div> */}
      <QualityTypeLavel part={part} data={data} />

      {id1 !== undefined &&
      id2 !== undefined &&
      id3 !== undefined &&
      id4 !== undefined ? (
        <div>
          <RadioInput
            type={type}
            className={className}
            value={value1}
            id={id1}
            name={name}
            setData={setData}
          ></RadioInput>
          <RadioInput
            type={type}
            className={className}
            value={value2}
            id={id2}
            name={name}
            setData={setData}
          ></RadioInput>
          <RadioInput
            type={type}
            className={className}
            value={value3}
            id={id3}
            name={name}
            setData={setData}
          ></RadioInput>
          <RadioInput
            type={type}
            className={className}
            value={value4}
            id={id4}
            name={name}
            setData={setData}
          ></RadioInput>
        </div>
      ) : id1 !== undefined &&
        id2 !== undefined &&
        id3 !== undefined &&
        id4 === undefined ? (
        <div>
          <RadioInput
            type={type}
            className={className}
            value={value1}
            id={id1}
            name={name}
            setData={setData}
          ></RadioInput>
          <RadioInput
            type={type}
            className={className}
            value={value2}
            id={id2}
            name={name}
            setData={setData}
          ></RadioInput>
          <RadioInput
            type={type}
            className={className}
            value={value3}
            id={id3}
            name={name}
            setData={setData}
          ></RadioInput>
        </div>
      ) : id1 !== undefined &&
        id2 !== undefined &&
        id3 === undefined &&
        id4 === undefined ? (
        <div>
          <RadioInput
            type={type}
            className={className}
            value={value1}
            id={id1}
            name={name}
            setData={setData}
          ></RadioInput>
          <RadioInput
            type={type}
            className={className}
            value={value2}
            id={id2}
            name={name}
            setData={setData}
          ></RadioInput>
        </div>
      ) : id1 !== undefined &&
        id2 === undefined &&
        id3 === undefined &&
        id4 === undefined ? (
        <div>
          <RadioInput
            type={type}
            className={className}
            value={value1}
            id={id1}
            name={name}
            setData={setData}
          ></RadioInput>
        </div>
      ) : (
        ""
      )}

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

  const changeData = (e) => {
    // setData(e.target.value);
    props.setData(e.target.value); // 수정된 코드
    console.log(e.target.value);
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
          <img src={img1} />
          <img src={img2} />
        </div>
      ) : (
        <div className="quality-select-image2">
          <img src={img1} />
        </div>
      )}
    </>
  );
};

export default QualitySelectFrm;
