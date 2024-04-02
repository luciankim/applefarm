import { useState } from "react";
import { Button1, Button2, Button3, Input } from "../../component/FormFrm";
import "./member.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberId, setMemberId] = useState(""); //아이디
  const [memberPw, setMemberPw] = useState(""); //비밀번호

  const setIsLogin = props.setIsLogin;

  const navigate = useNavigate();

  const LogoForm = () => {
    return (
      <div className="main-logo">
        <Link to="/">
          {/* <img src="../image/logo.png" alt="logo" /> */}
          <img
            src="../image/apple.png"
            alt="logo"
            style={{ width: "35px", height: "auto" }}
          />
        </Link>
      </div>
    );
  };

  // 엔터 키를 누를 때 로그인 버튼 클릭
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onkeydown(); // 전달받은 onKeyDown 함수 호출
    }
  };

  /*로그인*/
  const login = () => {
    if (memberId !== "" && memberPw !== "") {
      const obj = { memberId, memberPw };
      axios
        .post(backServer + "/member/login", obj)
        .then((res) => {
          if (res.data.message === "success") {
            console.log(res.data);

            window.localStorage.setItem("token", res.data.data); //세션 대신에 로컬스토리에 저장해줌. 서버에서 클라이언트로 넘어옴.

            setIsLogin(true); //로그인 성공했을 때 로그인 값을 true 로 변경

            navigate("/");
          } else {
            Swal.fire("아이디 또는 비밀번호를 확인하세요.");
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    }
  };

  /*회원가입*/
  const join = () => {
    navigate("/join");
  };

  return (
    <>
      <div className="login-wrap">
        <div className="logo">
          <LogoForm />
        </div>
        <div className="login-input">
          <LoginInput
            label="아이디"
            content="memberId"
            type="text"
            data={memberId}
            setData={setMemberId}
            placeholder="아이디를 입력하세요."
            onKeyDown={handleKeyPress}
          />
          <LoginInput
            label="비밀번호"
            content="memberPw"
            type="password"
            data={memberPw}
            setData={setMemberPw}
            placeholder="비밀번호를 입력하세요."
            onKeyDown={handleKeyPress}
          />
          <div className="login-btn-box">
            <Button1 id="login-btn" text="로그인" clickEvent={login} />
          </div>

          <div className="login-search-box">
            <Link to="/join">회원가입</Link>
            <span className="material-icons">horizontal_rule</span>
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
  const placeholder = props.placeholder;
  const onKeyDown = props.onKeyDown;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input
            data={data}
            setData={setData}
            type={type}
            content={content}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
