import { useEffect, useState } from "react";
import SideMenu from "../../component/SideMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input } from "@mui/material";

const MemberInfo = (props) => {
  const token = window.localStorage.getItem("token"); //로그인 정보가 token 에 들어있음.
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const isLogin = props.isLogin;

  const navigate = useNavigate();

  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }

  useEffect(() => {
    axios
      .get(backServer + "/member/info")
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <>
      <div className="mypage-sideMenu"></div>
      <div className="content">
        <InfoInput />
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
