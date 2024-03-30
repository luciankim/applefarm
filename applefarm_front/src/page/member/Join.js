import "./member.css";
import { Button3, Input } from "../../component/FormFrm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberName, setMemberName] = useState(""); //이름
  const [membmerNickName, setMemberNickName] = useState(""); //닉네임
  const [memberId, setMemberId] = useState(""); //아이디
  const [memberPw, setMEmberPw] = useState(""); //비밀번호
  const [memberPhone, setMemberPw] = useState(""); //전화번호
  const [memberAccountNumber, setMemberAccountNumber] = useState(""); //계좌번호
  const [memberEmail, setMemberEmail] = useState(""); //이메일

  //화면구현용
  const [bankName, setBankName] = useState(""); //은행이름
  const [verifCode, setVerifCode] = useState(""); //이메일 인증코도
  const [confirmPw, setConfirmPw] = useState(""); //비밀번호 확인

  const [checkRegId, setCheckRegId] = useState(""); //아이디 정규식
  const [checkRegPw, setCheckRegPw] = useState(""); //비밀번호 정규식
  const [checkRegEmail, setCheckRegEmail] = useState(""); //이메일 정규식

  const navigate = useNavigate();
  const sendEmailVerif = () => {
    const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (regEmail.test(memberEmail)) {
      axios.post(backServer + "member/email" + memberEmail); //주소 : 회원가입할때 member 와 구분해주기 위해 email 붙이기
    } else {
    }
  };
  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>

      <JoinInputWrap
        label="이메일"
        id="memberEmail"
        type="text"
        value={memberEmail}
        setValue={setMemberEmail}
      />
      <div>
        <Button3 text="이메일인증" onClick={sendEmailVerif} />
      </div>
    </div>
  );
};

const JoinInputWrap = (props) => {
  const label = props.label;
  const id = props.id;
  const type = props.type;
  const data = props.data;
  const setData = props.setData;
  const changeData = props.changeData;
  const blurEvent = props.blurEvent;
  const placeholder = props.placeholder;
  const verifCode = props.verifCode;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={id}>{label}</label>
        </div>
        <div className="input">
          <Input
            id={id}
            type={type}
            value={data}
            setData={setData}
            onBlur={blurEvent}
          />
        </div>
        <div></div>
        {verifCode ? (
          <div>
            <div className="label">
              <label htmlFor={id}>{label}</label>
            </div>
            <div className="input">
              <Input
                id={id}
                type={type}
                value={data}
                setData={setData}
                onBlur={blurEvent}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Join;
