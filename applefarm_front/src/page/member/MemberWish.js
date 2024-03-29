import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../../component/FormFrm";
import "./member.css";
import { useState } from "react";
const MemberWish = () => {
  const [likeList, setLikeList] = useState([
    {
      img: "/image/iphone.jpg",
      name: "아이폰 12 프로 128기가 블랙",
      quality: "A급",
      price: "800,000",
      seller: "user01",
    },
    {
      img: "/image/iphone.jpg",
      name: "에어팟 프로 1세대",
      quality: "b급",
      price: "33,000",
      seller: "user35",
    },
    {
      img: "/image/iphone.jpg",
      name: "아이폰 15 256기가 핑크",
      quality: "c급",
      price: "40,000",
      seller: "user42",
    },
  ]);
  const navigate = useNavigate();
  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        <span className="material-icons like-icon">favorite</span>
      </div>
      <div className="member-like-tbl-box">
        <table>
          <thead>
            <tr>
              <th>LIKE</th>
              <th colSpan={2}>ITEM</th>
              <th>QUALITY</th>
              <th>PRICE</th>
              <th>SELLER</th>
              <th>PURCHASE</th>
            </tr>
          </thead>
          <tbody>
            {likeList.map((like, index) => {
              return <LikeItem key={"like" + index} like={like} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const LikeItem = (props) => {
  const like = props.like;
  const navigate = useNavigate();
  const purchase = () => {
    //구매페이지 이동
    navigate("/purchase", { state: { like: like } });
  };
  const likeCancel = () => {
    //좋아요 테이블 삭제구현
  };
  return (
    <tr>
      <td>
        <span className="material-icons like-cancel-icon" onClick={likeCancel}>
          favorite
        </span>
      </td>
      <td>
        <div className="member-like-img-box">
          <img src={like.img} />
        </div>
      </td>
      <td className="likeName-td">{like.name}</td>
      <td>{like.quality}</td>
      <td>{like.price}</td>
      <td>{like.seller}</td>
      <td className="purchase-btn-box">
        <Button3 text="구매하기" clickEvent={purchase} />
      </td>
    </tr>
  );
};
export default MemberWish;
