import { Link } from "react-router-dom";
import { Input } from "../../component/FormFrm";
import { Button } from "../../component/FormFrm";
import { Select } from "../../component/FormFrm";
import { useState } from "react";

const Header = (props) => {
  const isLogin = props.isLogin; //로그인 값 받아오기 (헤더에서 App.js)
  const logout = props.logout; //(App.js)헤더에서 보낸 로그아웃 받아오기

  return (
    <>
      <div className="topbar"></div>
      <div className="header">
        <LogoForm />
      </div>
      <div className="header2">
        <LoginForm isLogin={isLogin} logout={logout} />
      </div>
    </>
  );
};

// 컴포넌트
const LogoForm = () => {
  return (
    <div className="main-logo">
      <Link to="/">
        {/* <img src="../image/logo.png" alt="logo" /> */}
        <img src="../image/logo.png" alt="logo" />
      </Link>
    </div>
  );
};

const SearchForm = () => {
  const [SelectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("Select:", event.target.value);
  };

  const options = [
    { value: "", label: "All" },
    { value: "1", label: "Mac" },
    { value: "2", label: "iPad" },
    { value: "3", label: "iPhone" },
    { value: "4", label: "Watch" },
    { value: "5", label: "AirPods" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");

  return <div className="searchForm"></div>;
};

const LoginForm = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;
  return (
    <div className="header-link">
      {isLogin ? (
        <>
          <Link to="/mypage/loginInfo" title="마이페이지">
            <span className="material-icons">face</span>
          </Link>

          <Link to="#" title="로그아웃">
            <span className="material-icons" onClick={logout}>
              logout
            </span>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" title="로그인">
            <span className="material-icons">login</span>
          </Link>
          <Link to="/join" title="회원가입">
            <span className="material-icons">assignment_ind</span>
          </Link>
          <Link to="/mypage/wish" title="위시리스트">
            <span className="material-icons">favorite_border</span>
          </Link>
          <Link>
            <span className="material-icons">email</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
