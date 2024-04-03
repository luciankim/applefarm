import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../../component/FormFrm";
import "./member.css";
import { useEffect, useRef, useState } from "react";
import { DelModal } from "./Modal";
import axios from "axios";

const MemberWish = () => {
  const [likeList, setLikeList] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  //const memberNo = 45; //==> 로그인 구현이후 수정필요
  useEffect(() => {
    axios
      .get(backServer + "/member/likeList")
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setLikeList(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [status]);

  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        {/**<span className="material-icons like-icon">favorite</span>  */}
        좋아요
      </div>
      <div className="member-like-tbl-box">
        {likeList.length === 0 ? (
          <div className="no-like-list">
            <span className="material-icons wish-icon">heart_broken</span>
            <div>추가하신 내역이 없습니다.</div>
          </div>
        ) : (
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
                    setStatus={setStatus}
                    status={status}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
const LikeItem = (props) => {
  const like = props.like;
  const setStatus = props.setStatus;
  const status = props.status;
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;

  //구매 페이지 이동 작성 예정
  const purchase = () => {
    //구매페이지 이동
    navigate("/purchase", { state: { product: like } });
  };

  //모달
  const likeList = props.likeList;
  const setLikeList = props.setLikeList;
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  //console.log(like.likeNo);
  //좋아요 삭제
  const likeDelFun = () => {
    // 삭제 동작 처리 로직 작성 예정 -> 데이터 생성시 구현 예정
    axios
      .delete(backServer + "/member/like/" + like.likeNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setStatus(!status);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
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
          <img src={like.productThumbnail} />
        </div>
      </td>
      <td className="likeName-td">{like.productSummary}</td>
      <td>{like.productQuality}</td>
      <td>{like.productPrice.toLocaleString()}원</td>
      <td>{like.memberNickName}</td>
      <td className="purchase-btn-box">
        <Button3 text="구매하기" clickEvent={purchase} />
      </td>
      <td>
        {modalOpen && (
          <DelModal
            setModalOpen={setModalOpen}
            clickEvent={likeDelFun}
            text="Are you sure you want to delete this item?"
            icon="heart_broken"
          />
        )}
      </td>
    </tr>
  );
};
export default MemberWish;
