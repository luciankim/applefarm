import "./member.css";
import {
  Button1,
  Button3,
  Input,
  Radio,
  Select,
} from "../../component/FormFrm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberName, setMemberName] = useState(""); //이름
  const [memberNickName, setMemberNickName] = useState(""); //닉네임
  const [memberId, setMemberId] = useState(""); //아이디
  const [memberPw, setMemberPw] = useState(""); //비밀번호
  const [memberPhone, setMemberPhone] = useState(""); //전화번호
  const [memberAccountnumber, setMemberAccountnumber] = useState(""); //계좌번호
  const [memberEmail, setMemberEmail] = useState(""); //이메일
  const [memberGender, setMemberGender] = useState(""); //성별

  //화면구현용
  const [bankName, setBankName] = useState(""); //은행이름
  const [verifCode, setVerifCode] = useState(""); //이메일 인증코도
  const [confirmPw, setConfirmPw] = useState(""); //비밀번호 확인
  const [depositorName, setDepositorName] = useState(""); //예금주명

  const [checkRegId, setCheckRegId] = useState(""); //아이디 정규식 메세지
  const [checkRegPw, setCheckRegPw] = useState(""); //비밀번호 정규식 메세지
  const [checkRegEmail, setCheckRegEmail] = useState(""); //이메일 정규식 메세지
  const [checkRegNickName, setCheckRegNickName] = useState(""); //닉네임 정규식 메세지
  const [checkRegName, setCheckRegName] = useState(""); //이름 정규식 메세지
  const [checkRegAccountNumber, setCheckRegAccountNumber] = useState(""); //계좌 정규식 메세지
  const [checkVerifCode, setCheckVerifCode] = useState(""); //인증코드 정규식 메세지
  const [checkRegPhone, setCheckRegPhone] = useState(""); //전화번호 정규식 메세지
  const [checkRePw, setCheckRePw] = useState(""); //비밀번호 확인 메세지
  const [checkRegDepositorName, setCheckDepositorName] = useState(""); //예금주 정규식 메세지

  const [btnDisabledForEmail, setBtnDisabledForEmail] = useState(false); //버튼,인풋 비/활성화
  const [btnDisabledForVerif, setBtnDisabledForVerif] = useState(true);
  const [btnDisabledForJoin, setBtnDisabledJoin] = useState(true);
  const [disabledForEmailInput, setDisabledForEmailInput] = useState(false);
  const [disabledForVerifInput, setDisabledForVerifInput] = useState(false);

  const [emailButtonColor, setEmailButtonColor] = useState("#0267f3"); //버튼색깔
  const [verifButtonColor, setVerifButtonColor] = useState("#b7b7b7");
  const [joinButtonColor, setJoinButtonColor] = useState("#b7b7b7");

  const [currentAuthCode, setCurrentAuthCode] = useState(""); //인증코드 저장

  /*성별값변경*/
  const genderChange = (event) => {
    setMemberGender(event.target.value); //선택된 값으로 상태 변경
  };

  const navigate = useNavigate();

  /*은행 리스트 */
  const bankList = [
    "국민은행",
    "신한은행",
    "IBK기업은행",
    "우리은행",
    "카카오뱅크",
    "케이뱅크",
    "토스뱅크",
    "부산은행",
    "대구은행",
    "광주은행",
    "제주은행",
    "농협은행",
    "우체국",
    "새마을금고",
    "한국씨티은행",
    "하나은행",
    "신협은행",
    "NH은행",
  ];
  /**이메일 중복체크(+정규식) */
  const emailChk = () => {
    const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (regEmail.test(memberEmail)) {
      axios
        .post(backServer + "/member/email/" + memberEmail)
        .then((res) => {
          if (res.data.message === "duplication") {
            setCheckRegEmail("이미 사용중인 이메일입니다.");
          } else {
            setCheckRegEmail("");
          }
        })
        .catch((res) => {});
    } else {
      setCheckRegEmail(
        "이메일을 다시 입력해주세요. 예)applefarm@applefarm.co.kr"
      );
    }
  };
  /**인증코드 메일전송 */
  const sendVerifCode = () => {
    if (memberEmail !== "") {
      axios
        .post(backServer + "/member/sendCode/" + memberEmail)
        .then((res) => {
          if (res.data.message === "success") {
            const authCode = res.data.data;
            console.log(authCode);
            setCurrentAuthCode(authCode);
            //chkVerifCode({ authCode }); 필요없음
            disabledEmailInput(); // 이메일 인풋 비활
            setBtnDisabledForEmail(true); //이메일 인증 버튼 비활
            setVerifButtonColor("#0267f3"); // 인증코드 버튼 파란색으로
            setBtnDisabledForVerif(false); // 인증코드 버튼 활성
          }
        })
        .catch((res) => {});
    } else {
      Swal.fire("이메일을 입력해주세요.");
    }
  };
  /**인증코드 === 입력코드 */
  const chkVerifCode = () => {
    console.log(verifCode);
    console.log(currentAuthCode);
    if (currentAuthCode === verifCode) {
      setCheckVerifCode("");
    }
  };

  /*인증버튼 클릭 시 인풋 비활성화*/
  const disabledVerifCodeInput = () => {
    if (currentAuthCode === verifCode) {
      disabledVerifInput(); //인풋 비활성화
      setBtnDisabledForVerif(true); //인증버튼 비활성화
    } else {
      Swal.fire("인증코드가 잘못되었습니다.");
    }
  };

  /*이메일 인풋 비활함수*/
  const disabledEmailInput = () => {
    setDisabledForEmailInput(true);
  };

  /*인증코드 인풋 비활함수*/
  const disabledVerifInput = () => {
    setDisabledForVerifInput(true);
  };

  /*아이디 중복체크*/
  const idChk = () => {
    const regId = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;

    if (regId.test(memberId)) {
      axios
        .post(backServer + "/member/id/" + memberId)
        .then((res) => {
          if (res.data.message === "duplication") {
            setCheckRegId("이미 사용중인 아이디입니다.");
          } else {
            setCheckRegId("");
          }
        })
        .catch((res) => {});
    } else {
      setCheckRegId("영문자로 시작하는 영문자 또는 숫자 4~20자");
    }
  };

  /*닉네임 중복체크*/
  const nickNameChk = () => {
    const regNickName = /^[a-zA-Z0-9가-힣]{2,16}$/;

    if (regNickName.test(memberNickName)) {
      axios
        .post(backServer + "/member/nickName/" + memberNickName)
        .then((res) => {
          if (res.data.message === "duplication") {
            setCheckRegNickName("이미 사용중인 닉네임입니다.");
          } else {
            setCheckRegNickName("");
          }
        })
        .catch((res) => {});
    } else {
      setCheckRegNickName("2자 이상 16자 이하, 영문 또는 숫자 또는 한글");
    }
  };

  /*이름정규식*/
  const nameChk = () => {
    const regName = /^[가-힣a-zA-Z]{2,16}$/;

    if (regName.test(memberName)) {
      setCheckRegName("");
    } else {
      setCheckRegName("영문 또는 한글만 입력 가능");
    }

    if (regName.test(depositorName)) {
      setCheckDepositorName("");
    } else {
      setCheckDepositorName("예금주명을 정확히 입력하세요.");
    }
  };

  /*비밀번호 정규식*/
  const pwChk = () => {
    const regPw =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}$/;

    if (regPw.test(memberPw)) {
      setCheckRegPw("");
    } else {
      setCheckRegPw("영문,숫자,특수문자 조합 4~16자");
    }
  };

  /*비밀번호 확인*/
  const rePwChk = () => {
    if (memberPw === confirmPw) {
      setCheckRePw("");
    } else {
      setCheckRePw("비밀번호가 일치하지 않습니다.");
    }
  };

  /*계좌번호 정규식*/
  const accountNumberChk = () => {
    const regAccountNumber = /^[0-9-]+$/;

    if (regAccountNumber.test(memberAccountnumber)) {
      setCheckRegAccountNumber("");
    } else {
      setCheckRegAccountNumber("숫자와 하이픈('-')만 입력 가능");
    }
  };

  /*전화번호 정규식*/
  const phoneChk = () => {
    const regPhone = /^\d{3}-\d{4}-\d{4}$/;
    if (regPhone.test(memberPhone)) {
      setCheckRegPhone("");
    } else {
      setCheckRegPhone("숫자, 하이픈('-') 포함 13자 입력, 예)010-0000-0000");
    }
  };

  /*가입하기*/

  const join = () => {
    if (
      memberEmail !== "" &&
      verifCode !== "" &&
      memberName !== "" &&
      memberId !== "" &&
      memberPw !== "" &&
      confirmPw !== "" &&
      memberNickName !== "" &&
      checkRePw === "" &&
      checkRegEmail === "" &&
      checkRegId === "" &&
      checkRegName === "" &&
      checkRegNickName === "" &&
      checkRegPhone === "" &&
      checkRegPw === "" &&
      checkVerifCode === ""
    ) {
      const obj = {
        memberEmail,
        memberId,
        memberPw,
        memberName,
        memberNickName,
        memberPhone,
        bankName,
        memberAccountnumber,
        depositorName,
      };
      setJoinButtonColor("#0267f3");
      axios
        .post(backServer + "/member/join", obj)
        .then((res) => {
          if (res.data.message === "success") {
            console.log(res.data);

            navigate("/");
          } else {
            Swal.fire(
              "처리 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
          }
        })
        .catch((res) => {
          console.log(res.data.data);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>
      <div className="input-with-btn">
        <JoinInputWrap
          label="이메일"
          id="memberEmail"
          type="text"
          value={memberEmail}
          setData={setMemberEmail}
          checkMsg={checkRegEmail}
          blurEvent={emailChk}
          placeholder="예)applefarm@applefarm.co.kr"
          disabled={disabledForEmailInput}
        />
        <Button3
          className="email-btn"
          text="이메일 인증"
          type="button"
          disabled={btnDisabledForEmail}
          clickEvent={sendVerifCode}
          style={{ backgroundColor: emailButtonColor }}
        />
      </div>
      <div className="input-with-btn">
        <JoinInputWrap
          label="인증코드"
          id="verifCode"
          type="text"
          value={verifCode}
          setData={setVerifCode}
          blurEvent={chkVerifCode}
          checkMsg={checkVerifCode}
          disabled={disabledForVerifInput}
          placeholder="인증코드를 입력해주세요."
        />
        <Button3
          className="email-btn"
          text="인증하기"
          type="button"
          style={{ backgroundColor: verifButtonColor }}
          disabled={btnDisabledForVerif}
          clickEvent={disabledVerifCodeInput}
        />
      </div>
      <JoinInputWrap
        label="이름"
        id="memberName"
        type="text"
        value={memberName}
        setData={setMemberName}
        checkMsg={checkRegName}
        placeholder="이름을 입력해주세요."
        blurEvent={nameChk}
      />
      {/** 
      <div className="join-gender">
        <div className="gender-box">
          <div className="gender-title">성별</div>
          <label>
            <input
              type="radio"
              name="memberGender"
              value="1"
              checked={memberGender === "1"}
              onChange={genderChange}
            />
            남자
          </label>
          <label>
            <input
              type="radio"
              name="memberGender"
              value="2"
              checked={memberGender === "2"}
              onChange={genderChange}
            />
            여자
          </label>
        </div>
      </div>
      */}

      <JoinInputWrap
        label="전화번호"
        id="memberPhone"
        type="text"
        value={memberPhone}
        setData={setMemberPhone}
        checkMsg={checkRegPhone}
        placeholder="예)010-1234-5678"
        blurEvent={phoneChk}
      />

      <JoinInputWrap
        label="아이디"
        id="memberId"
        type="text"
        value={memberId}
        setData={setMemberId}
        checkMsg={checkRegId}
        placeholder="영문자로 시작하는 영문자 또는 숫자 4~20자"
        blurEvent={idChk}
      />
      <JoinInputWrap
        label="비밀번호"
        id="memberPw"
        type="password"
        value={memberPw}
        setData={setMemberPw}
        checkMsg={checkRegPw}
        placeholder="영문,숫자,특수문자 조합 4~16자"
        blurEvent={pwChk}
      />
      <JoinInputWrap
        label="비밀번호확인"
        id="confirmPw"
        type="password"
        value={confirmPw}
        setData={setConfirmPw}
        checkMsg={checkRePw}
        placeholder="비밀번호를 다시 입력해주세요."
        blurEvent={rePwChk}
      />
      <JoinInputWrap
        label="닉네임"
        id="memberNickName"
        type="text"
        value={memberNickName}
        setData={setMemberNickName}
        checkMsg={checkRegNickName}
        placeholder="2자 이상 16자 이하, 영문 또는 숫자 또는 한글"
        blurEvent={nickNameChk}
      />
      <div className="join-input-wrap">
        <div className="bank-input-wrap">
          <div className="label">
            <label htmlFor="bankName" className="bank-title">
              정산계좌추가<span className="little-text"> (선택항목)</span>
            </label>
          </div>
          <div className="bank-input-box">
            <select
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            >
              {bankList.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <JoinInputWrap
            label="계좌번호"
            id="memberAccountnumber"
            type="text"
            value={memberAccountnumber}
            setData={setMemberAccountnumber}
            checkMsg={checkRegAccountNumber}
            placeholder="'-'포함해서 입력해주세요."
            blurEvent={accountNumberChk}
          />
          <JoinInputWrap
            label="예금주명"
            id="depositorName"
            type="text"
            value={depositorName}
            setData={setDepositorName}
            checkMsg={checkRegDepositorName}
            placeholder="예금주명을 정확히 입력하세요."
            blurEvent={nameChk}
          />
        </div>
      </div>
      <div className=""></div>
      <div className="join-btn">
        <Button3
          text="가입하기"
          clickEvent={join}
          style={{ backgroundColor: joinButtonColor }}
        />
      </div>
    </div>
  );
};

const AgreeModal = () => {};

const JoinInputWrap = (props) => {
  const label = props.label;
  const id = props.id;
  const type = props.type;
  const data = props.value;
  const setData = props.setData;
  const blurEvent = props.blurEvent;
  const placeholder = props.placeholder;
  const checkMsg = props.checkMsg;
  const disabled = props.disabled;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={id}>{label}</label>
        </div>
        <div className="input-wrap">
          <Input
            id={id}
            type={type}
            value={data}
            setData={setData}
            blurEvent={blurEvent}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>
      {checkMsg ? <div className="check-msg">{checkMsg}</div> : ""}
    </div>
  );
};
export default Join;
