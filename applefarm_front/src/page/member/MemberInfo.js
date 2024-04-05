import { useEffect, useState } from "react";
import SideMenu from "../../component/SideMenu";
import axios from "axios";
import { useAsyncError, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input } from "@mui/material";
import { Button3 } from "../../component/FormFrm";
import "./member.css";

const MemberInfo = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const checkMsg = props.checkMsg;

  const isLogin = props.isLogin;

  //비밀번호 수정
  const [updatePw, setUpdatePw] = useState("");

  //비밀번호 확인

  const [chkUpdatePw, setChkUpdatePw] = useState("");

  //토큰에서 회원정보 가져오기
  const member = props.member;

  //이메일 수정
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  //인증코드 입력
  const changeVerifCode = (e) => {
    setVerifCode(e.target.value);
  };

  //비밀번호 set
  const changePw = (e) => {
    setUpdatePw(e.target.value);
  };

  //비밀번호 확인 set
  const changeChkPw = (e) => {
    setChkUpdatePw(e.target.value);
  };

  //이메일 수정
  const [email, setEmail] = useState("");

  const [verifCode, setVerifCode] = useState(""); //이메일 인증코도
  const [currentAuthCode, setCurrentAuthCode] = useState(""); //인증코드 저장

  //이메일/수정 인풋(삼항연산자)
  const [changeInputStatus, setChangeInputStatus] = useState(false);
  const [returnInputStatus, setReturnInputStatus] = useState(true);

  //비밀번호 변경 인풋
  const [changePwInputStatus, setChangePwInputStatus] = useState(false);
  const [returnPwInputStatus, setReturnPwInputStatus] = useState(true);

  const [disabledForEmailInput, setDisabledForEmailInput] = useState(false); //인풋 비/활성화
  const [disabledForVerifInput, setDisabledForVerifInput] = useState(false);

  //이메일 수정 시 이메일 중복 체크
  const [dupEmail, setDupEmail] = useState("");

  //이메일 메세지
  const [emailMsg, setEmailMsg] = useState("");

  //이메일 인증 버튼
  const [emailBtn, setEmailBtn] = useState(false);

  const changeEmailInput = () => {
    setChangeInputStatus(true);
  };
  const returnEmailInput = () => {
    setReturnInputStatus(false);
  };

  //이메일 중복/정규식 체크
  const emailChk = () => {
    const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (regEmail.test(email)) {
      axios
        .post(backServer + "/member/emailChk/" + email)
        .then((res) => {
          if (res.data.message === "duplication") {
            setEmailBtn(true);
            setEmailMsg("이미 사용중인 이메일입니다.");
          } else if (res.data.message === "not duplication") {
            setEmailMsg("");
            setEmailBtn(false);
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      Swal.fire("이메일을 다시 입력해주세요. 예)applefarm@applefarm.co.kr");
    }
  };

  //이메일 인증 코드 전송
  const sendVerifCode = () => {
    if (email !== "") {
      axios
        .post(backServer + "/member/email/" + email)
        .then((res) => {
          if (res.data.message === "success") {
            const authCode = res.data.data;
            console.log(authCode);
            setCurrentAuthCode(authCode);
            //chkVerifCode({ authCode }); 필요없음
            setDisabledForEmailInput(true);
            setEmailBtn(true);
          }
        })
        .catch((res) => {});
    } else {
      Swal.fire("이메일을 입력해주세요.");
    }
  };
  useEffect(() => {
    setEmail(member.memberEmail);
  }, [member]);

  console.log(member);

  /**인증코드 === 입력코드 */
  const chkVerifCode = () => {
    console.log(verifCode);
    console.log(currentAuthCode);
    console.log(email);
  };

  const navigate = useNavigate();

  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }

  return (
    <>
      <div className="mypage-sideMenu"></div>
      <div className="info-wrap">
        <table>
          <tbody>
            {changeInputStatus ? (
              <>
                <tr>
                  <td>이메일 주소 변경</td>
                  <td>
                    <input
                      className="info-input"
                      type="text"
                      setData={setEmail}
                      onChange={changeEmail}
                      onBlur={emailChk}
                      checkMsg={setEmailMsg}
                      disabled={disabledForEmailInput}
                    />
                  </td>
                  <td className="input-change-btn">
                    <button
                      className="change-btn"
                      onClick={sendVerifCode}
                      disabled={emailBtn}
                    >
                      메일인증
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setChangeInputStatus(false)}
                    >
                      취소
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>{emailMsg}</td>
                </tr>
                <tr>
                  <td>인증 코드</td>
                  <td>
                    <input
                      className="info-input"
                      value={verifCode}
                      setData={setVerifCode}
                      onChange={changeVerifCode}
                    />
                  </td>
                  <td className="input-change-btn">
                    <button className="change-btn" onClick={chkVerifCode}>
                      인증
                    </button>
                  </td>
                </tr>
              </>
            ) : returnInputStatus ? (
              <>
                <tr>
                  <td>이메일</td>
                  <td>
                    <input className="info-input" type="text" value={email} />
                  </td>
                  <td className="input-change-btn">
                    <button
                      className="change-btn"
                      onClick={() => setChangeInputStatus(true)}
                    >
                      변경
                    </button>
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>이메일 주소 변경</td>
                  <td>
                    <input
                      className="info-input"
                      type="text"
                      setData={setEmail}
                      onChange={changeEmail}
                      onBlur={emailChk}
                      checkMsg={setEmailMsg}
                      disabled={disabledForEmailInput}
                    />
                  </td>
                  <td className="input-change-btn">
                    <button
                      className="change-btn"
                      onClick={sendVerifCode}
                      disabled={emailBtn}
                    >
                      메일인증
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setReturnInputStatus(true)}
                    >
                      취소
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>{emailMsg}</td>
                </tr>
                <tr>
                  <td>인증 코드</td>
                  <td>
                    <input
                      className="info-input"
                      value={verifCode}
                      setData={setVerifCode}
                      onChange={changeVerifCode}
                    />
                  </td>
                  <td className="input-change-btn">
                    <button className="change-btn" onClick={chkVerifCode}>
                      인증
                    </button>
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td>아이디</td>
              <td>
                <input
                  className="info-input"
                  type="text"
                  value={member.memberId}
                />
              </td>
            </tr>
            {changePwInputStatus ? (
              // 비밀번호 변경 입력 상태
              <>
                <tr>
                  <td>비밀번호 변경</td>
                  <td>
                    <input
                      className="info-input"
                      type="password"
                      value={updatePw}
                      setData={setUpdatePw}
                      onChange={changePw}
                    />
                  </td>
                </tr>
                <tr>
                  <td>비밀번호 확인</td>
                  <td>
                    <input
                      className="info-input"
                      type="password"
                      value={chkUpdatePw}
                      setData={setChkUpdatePw}
                      onChange={changeChkPw}
                    />
                  </td>
                  <td className="input-change-btn">
                    <button
                      className="change-btn"
                      onClick={() => {
                        setReturnPwInputStatus(true); // 비밀번호 변경 완료 상태로 전환
                        setChangePwInputStatus(false); // 비밀번호 변경 입력 상태 비활성화
                      }}
                    >
                      완료
                    </button>
                  </td>
                </tr>
              </>
            ) : returnPwInputStatus ? (
              // 비밀번호 복귀 입력 상태
              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    className="info-input"
                    type="password"
                    value="123456789"
                  />
                </td>
                <td className="input-change-btn">
                  <button
                    className="change-btn"
                    onClick={() => setChangePwInputStatus(true)} // 비밀번호 변경 입력 상태로 전환
                  >
                    변경
                  </button>
                </td>
              </tr>
            ) : (
              // 비밀번호 변경 입력 상태
              <>
                <tr>
                  <td>비밀번호 변경</td>
                  <td>
                    <input
                      className="info-input"
                      type="password"
                      value={updatePw}
                      setData={setUpdatePw}
                      onChange={changePw}
                    />
                  </td>
                </tr>
                <tr>
                  <td>비밀번호 확인</td>
                  <td>
                    <input
                      className="info-input"
                      type="password"
                      value={chkUpdatePw}
                      setData={setChkUpdatePw}
                      onChange={changeChkPw}
                    />
                  </td>
                  <td className="input-change-btn">
                    <button
                      className="change-btn"
                      onClick={setReturnPwInputStatus} // 비밀번호 변경 완료 상태로 전환
                    >
                      완료
                    </button>
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td>전화번호</td>
              <td>
                <input
                  className="info-input"
                  type="text"
                  value={member.memberPhone}
                />
              </td>
              <td className="input-change-btn">
                <button className="change-btn">변경</button>
              </td>
            </tr>
          </tbody>
          <div className="delete-btn-box">
            <button className="delete-btn">회원탈퇴</button>
          </div>
        </table>
      </div>
    </>
  );
};

const InfoInput = (props) => {
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

export default MemberInfo;
