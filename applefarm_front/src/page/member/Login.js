import { useEffect, useState } from "react";
import { Button1, Button2, Button3, Input } from "../../component/FormFrm";
import "./member.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";

const Login = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberId, setMemberId] = useState(""); //아이디
  const [memberPw, setMemberPw] = useState(""); //비밀번호
  const [findIdModalIsOpen, setFindIdModalIsOpen] = useState(false); //아이디 찾기 모달 열기/닫기
  const [findPwModalIsOpen, setFindPwModalIsOpen] = useState(false); //비밀번호 찾기 모달 열기/닫기

  const [findEmail, setFindEmail] = useState(""); //이메일로 아이디 찾기

  const [checkRegEmail, setCheckRegEmail] = useState(""); //이메일 정규식 메세지

  const [emailBtnDisabled, setEmailBtnDisabled] = useState(true);

  const changeEmail = (e) => {
    setFindEmail(e.target.value);
  };

  const loginFunction = props.login;

  const navigate = useNavigate();

  // 아이디 찾기 모달 열기
  const openFindIdModal = () => {
    setFindIdModalIsOpen(true);
  };

  // 아이디 찾기 모달 닫기
  const closeFindIdModal = () => {
    setFindIdModalIsOpen(false);
    setFindEmail("");
    setCheckRegEmail("");
  };

  // 비밀번호 찾기 모달 열기
  const openFindPwModal = () => {
    setFindPwModalIsOpen(true);
  };

  // 비밀번호 찾기 모달 닫기
  const closeFindPwModal = () => {
    setFindPwModalIsOpen(false);
  };

  /*모달 스타일 적용*/
  const modalStyle = {
    content: {
      padding: "39px",
      width: "50%",
      height: "50%",
      margin: "12% 25%",
      borderRadius: "15px",
    },
  };

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

  const enter = (e) => {
    if (e.keyCode === 13 && memberId !== "" && memberPw !== "") {
      login();
    }
  };

  //이메일 정규식
  const chkRegEmail = () => {
    const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (regEmail.test(findEmail)) {
      setCheckRegEmail("");
      setEmailBtnDisabled(false);
    } else {
      setCheckRegEmail(
        "이메일을 다시 입력해주세요. 예)applefarm@applefarm.co.kr"
      );
    }
  };

  //이메일로 인증 받고 아이디 찾기
  const findId = () => {
    const m = { memberEmail: findEmail };

    console.log(m.memberEmail);

    axios
      .post(backServer + "/member/findId", m)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "no email") {
          Swal.fire("존재하지 않은 이메일입니다.");
        } else if (res.data.message === "success") {
          Swal.fire("해당 이메일로 아이디를 전송했습니다.");
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  //member 정보 가져오기
  const [member, setMember] = useState({});
  useEffect(() => {
    axios
      .get(backServer + "/member/info")
      .then((res) => {
        console.log(res.data);
        setMember(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  /*로그인*/
  const login = () => {
    if (memberId !== "" && memberPw !== "") {
      const obj = { memberId, memberPw };
      axios
        .post(backServer + "/member/login", obj)
        .then((res) => {
          if (res.data.message === "success") {
            loginFunction(res.data.data);
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
          />
          <LoginInput
            label="비밀번호"
            content="memberPw"
            type="password"
            data={memberPw}
            setData={setMemberPw}
            placeholder="비밀번호를 입력하세요."
            onKeyUp={enter}
          />
          <div className="login-btn-box">
            <Button1 id="login-btn" text="로그인" clickEvent={login} />
          </div>

          <div className="login-search-box">
            <Link to="/join">회원가입</Link>
            <span className="material-icons findInfo">horizontal_rule</span>
            <span className="findId" onClick={openFindIdModal}>
              아이디찾기
            </span>
            <span className="material-icons findInfo">horizontal_rule</span>
            <span className="findPw" onClick={openFindPwModal}>
              비밀번호찾기
            </span>
          </div>
        </div>
      </div>
      {/* 아이디 찾기 모달 */}
      <Modal
        isOpen={findIdModalIsOpen}
        onRequestClose={closeFindIdModal}
        style={modalStyle}
      >
        <div>아이디 찾기</div>
        <div>
          가입 시 등록하신 이메일 주소를 입력하시면 해당 이메일로 아이디를
          전송해 드립니다.
        </div>
        <div>이메일 주소</div>

        <input
          type="text"
          value={findEmail}
          setData={setFindEmail}
          onChange={changeEmail}
          onBlur={chkRegEmail}
        />
        <button disabled={emailBtnDisabled} onClick={findId}>
          전송
        </button>
        <div>{checkRegEmail}</div>

        <div className="modal-close">
          <button className="modal-btn" onClick={closeFindIdModal}>
            닫기
          </button>
        </div>
      </Modal>

      {/* 비밀번호 찾기 모달 */}
      <Modal
        isOpen={findPwModalIsOpen}
        onRequestClose={closeFindPwModal}
        style={modalStyle}
      >
        <div>비밀번호 찾기</div>

        <div className="modal-close">
          <button className="modal-btn" onClick={closeFindPwModal}>
            닫기
          </button>
        </div>
      </Modal>
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
  const onKeyUp = props.onKeyUp;

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
            onKeyUp={onKeyUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
