import { useState } from "react";
import { Button1, Button3, Input } from "../../component/FormFrm";
import "./member.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");

  const navigate = useNavigate();

  /*로그인*/

  /*회원가입*/
  const join = () => {
    navigate("/join");
  };

  return (
    <>
      <div className="login-wrap">
        <div className="logo"></div>
        <div className="login-input">
          <LoginInput
            label="아이디"
            content="memberId"
            type="text"
            data={memberId}
            setData={setMemberId}
          />
          <LoginInput
            label="비밀번호"
            content="memberPw"
            type="text"
            data={memberPw}
            setData={setMemberPw}
          />
          <div className="btn-box">
            <Button3 text="로그인" />
          </div>
          <div className="btn-box">
            <Button3 text="회원가입" clickEvent={join} />
          </div>
          <div className="login-search-box">
            <Link to="#">아이디찾기</Link>
            <span className="material-icons">horizontal_rule</span>
            <Link to="#">비밀번호찾기</Link>
          </div>
        </div>
      </div>
    </>
  );
};

const LoginInput = (props) => {
  const label = props.label;
  const content = props.content;
  const type = props.type;
  const data = props.data;
  const setData = props.setData;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input data={data} setData={setData} type={type} content={content} />
        </div>
      </div>
    </div>
  );
};

export default Login;
