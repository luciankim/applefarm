import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../../component/FormFrm";
import "./member.css";
import { useEffect, useRef, useState } from "react";
import { DelModal } from "./Modal";

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
  useEffect(() => {
    //좋아요 리스트 조회하기
  }, []);

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
              return (
                <LikeItem
                  key={"like" + index}
                  like={like}
                  likeList={likeList}
                  setLikeList={setLikeList}
                />
              );
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

  //구매 페이지 이동 작성 예정
  const purchase = () => {
    //구매페이지 이동
    navigate("/purchase", { state: { like: like } });
  };

  //모달
  const likeList = props.likeList;
  const setLikeList = props.setLikeList;
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  //좋아요 삭제
  const likeDelFun = () => {
    // 삭제 동작 처리 로직 작성 예정 -> 데이터 생성시 구현 예정
    console.log(like);
    const newLikeList = likeList.filter((item) => {
      return item !== like;
    });
    setLikeList(newLikeList);
    setModalOpen(false);
  };

  return (
    <tr>
      <td>
        <span className="material-icons like-cancel-icon" onClick={showModal}>
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
      <td>
        {modalOpen && (
          <DelModal setModalOpen={setModalOpen} clickEvent={likeDelFun} />
        )}
      </td>
    </tr>
  );
};
export default MemberWish;
