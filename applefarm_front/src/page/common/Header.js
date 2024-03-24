import { Link } from "react-router-dom";
import { Input } from "../../component/FormFrm";
import { Button } from "../../component/FormFrm";
import { Select } from "../../component/FormFrm";
import { useState } from "react";

const Header = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;





  return (
    <header>
      <div className="topbar"></div>
      <div className="header">
        <LogoForm />
        <SearchForm />
        <LoginForm isLogin={isLogin} logout={logout} />
      </div>

      <NavMenu />
    </header>
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

  return (
    <div className="searchForm">
      <Select options={options}  addId="searchSelect" onChange={handleSelectChange}/>
      <Input type="text" data={searchKeyword} setData={setSearchKeyword} />
      <Button
        type="submit"
        addClass="search-btn"
        id="search-btn"
        icon={<span className="material-icons">search</span>}
      />
    </div>
  );
};

const LoginForm = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;
  return (
    <div className="header-link">
      {isLogin ? (
        <>
          <Link to="/member" title="마이페이지">
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
          <Link>
            <span className="material-icons">favorite_border</span>
          </Link>
          <Link to="/ref">
            <span className="material-icons">shopping_cart</span>
          </Link>
        </>
      )}
    </div>
  );
};

const NavMenu = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="navMenu-li">
          <Link to="#">Mac</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="#">MacBook Air</Link>
            </li>
            <li>
              <Link to="#">MacBook Pro</Link>
            </li>
            <li>
              <Link to="#">iMac</Link>
            </li>
            <li>
              <Link to="#">Mac mini</Link>
            </li>
            <li>
              <Link to="#">Mac Studio</Link>
            </li>
            <li>
              <Link to="#">Mac Pro</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">iPad</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="#">iPad Pro</Link>
            </li>
            <li>
              <Link to="#">iPad</Link>
            </li>
            <li>
              <Link to="#">iPad mini</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">iPhone</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="#">iPhone 15 Pro</Link>
            </li>
            <li>
              <Link to="#">iPhone 15</Link>
            </li>
            <li>
              <Link to="#">iPhone 14</Link>
            </li>
            <li>
              <Link to="#">iPhone 13</Link>
            </li>
            <li>
              <Link to="#">iPhone SE</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">Watch</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="#">Apple Watch Series 9</Link>
            </li>
            <li>
              <Link to="#">Apple Watch Ultra 2</Link>
            </li>
            <li>
              <Link to="#">Apple Watch SE</Link>
            </li>
            <li>
              <Link to="#">Apple Watch Nike</Link>
            </li>
            <li>
              <Link to="#">Apple Watch Goods</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">AirPods</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="#">AirPods 2세대</Link>
            </li>
            <li>
              <Link to="#">AirPods 3세대</Link>
            </li>
            <li>
              <Link to="#">AirPods Pro 2세대</Link>
            </li>
            <li>
              <Link to="#">AirPods Max</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">Community</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="#">질문게시판</Link>
            </li>
            <li>
              <Link to="#">자랑게시판</Link>
            </li>
            <li>
              <Link to="#">자유게시판</Link>
            </li>
            <li>
              <Link to="#">체험단모집</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
