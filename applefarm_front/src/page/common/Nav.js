import "./default.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = (props) => {
  const {
    table,
    naviProductLine,
    setNaviProductLine,
    naviProductGen,
    setNaviProductGen,
  } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  /*
  useEffect(() => {
    axios
      .get(backServer + "/common/navi")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);
  */

  return (
    <nav className="nav">
      <ul>
        <div className="dropdown-relative"></div>
        <li className="navMenu-li">
          <Link to="#">iPhone</Link>
          <ul className="dropdown-content drop-iPhone">
            <li>
              <Link to="#">iPhone 15 Series</Link>
              <ul>
                <li>
                  <Link to="#">iPhone 15 Pro Max</Link>
                </li>
                <li>
                  <Link to="#">iPhone 15 Pro</Link>
                </li>
                <li>
                  <Link to="#">iPhone 15 Plus</Link>
                </li>
                <li>
                  <Link to="#">iPhone 15</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">iPhone 14 Series</Link>
              <ul>
                <li>
                  <Link to="#">iPhone 14 Pro Max</Link>
                </li>
                <li>
                  <Link to="#">iPhone 14 Pro</Link>
                </li>
                <li>
                  <Link to="#">iPhone 14 Plus</Link>
                </li>
                <li>
                  <Link to="#">iPhone 14</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">iPhone 13 Series</Link>
            </li>
            <li>
              <Link to="#">iPhone 12 Series</Link>
            </li>
            <li>
              <Link to="#">iPhone 11 Series</Link>
            </li>
            <li>
              <Link to="#">iPhone XS Series</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">MacBook</Link>
          <ul className="dropdown-content drop-MacBook">
            <li>
              <Link to="#">MacBook Pro</Link>
              <ul>
                <li>
                  <Link to="#">MacBook Pro M3</Link>
                </li>
                <li>
                  <Link to="#">MacBook Pro M2</Link>
                </li>
                <li>
                  <Link to="#">MacBook Pro M1</Link>
                </li>
                <li>
                  <Link to="#">MacBook Pro Intel 10th</Link>
                </li>
                <li>
                  <Link to="#">MacBook Pro Intel 9th</Link>
                </li>
                <li>
                  <Link to="#">MacBook Pro Intel 8th</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">MacBook Air</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">iPad</Link>
          <ul className="dropdown-content drop-iPad">
            <li>
              <Link to="#">iPad Pro 12.9</Link>
              <ul>
                <li>
                  <Link to="#">iPad Pro 12.9 6세대</Link>
                </li>
                <li>
                  <Link to="#">iPad Pro 12.9 5세대</Link>
                </li>
                <li>
                  <Link to="#">iPad Pro 12.9 4세대</Link>
                </li>
                <li>
                  <Link to="#">iPad Pro 12.9 3세대</Link>
                </li>
                <li>
                  <Link to="#">iPad Pro 12.9 2세대</Link>
                </li>
                <li>
                  <Link to="#">iPad Pro 12.9 1세대</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">iPad Pro 11</Link>
            </li>
            <li>
              <Link to="#">iPad Air</Link>
            </li>
            <li>
              <Link to="#">iPad Mini</Link>
            </li>
            <li>
              <Link to="#">iPad</Link>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">Watch</Link>
          <ul className="dropdown-content drop-Watch">
            <li>
              <Link to="#">Apple Watch Ultra</Link>
              <ul>
                <li>
                  <Link to="#">Apple Watch Ultra 2세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch Ultra 1세대</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">Apple Watch Series</Link>
              <ul>
                <li>
                  <Link to="#">Apple Watch Series 9세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch Series 8세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch Series 7세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch Series 6세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch Series 5세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch Series 4세대</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">Apple Watch SE</Link>
              <ul>
                <li>
                  <Link to="#">Apple Watch SE 2세대</Link>
                </li>
                <li>
                  <Link to="#">Apple Watch SE 1세대</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">AirPods</Link>
          <ul className="dropdown-content drop-AirPods">
            <li>
              <Link to="#">AirPods Max</Link>
              <ul>
                <li>
                  <Link to="#">AirPods Max 1세대</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">AirPods Pro</Link>
              <ul>
                <li>
                  <Link to="#">AirPods Pro 2세대</Link>
                </li>
                <li>
                  <Link to="#">AirPods Pro 1세대</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">AirPods</Link>
              <ul>
                <li>
                  <Link to="#">AirPods 3세대</Link>
                </li>
                <li>
                  <Link to="#">AirPods 2세대</Link>
                </li>
                <li>
                  <Link to="#">AirPods 1세대</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="navMenu-li">
          <Link to="#">Community</Link>
          <ul className="dropdown-content drop-Community">
            <li>
              <Link to="">공지사항</Link>
            </li>
            <li>
              <Link to="/board/list">자유게시판</Link>
            </li>
            <li>
              <Link to="#">질문게시판</Link>
            </li>
            <li>
              <Link to="#">뽐내기게시판</Link>
            </li>
            <li>
              <Link to="#">매거진</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
