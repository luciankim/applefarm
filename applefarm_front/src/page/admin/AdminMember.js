import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../../component/FormFrm";
import { DelModal } from "../member/Modal";
import axios from "axios";
const AdminMember = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/admin/member/" + reqPage)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <div className="mypage-current-wrap">
      <div className="mypage-current-title">
        <p className="admin-current-p">회원관리</p>
      </div>
      <div className="member-like-tbl-box">
        <table>
          <thead>
            <tr>
              <th>회원번호</th>
              <th>회원아이디</th>
              <th>회원등급</th>
              <th>판매점수</th>
              <th>판매자등급</th>
              <th>가입일</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((like, index) => {
              return (
                <LikeItem
                  key={"like" + index}
                  like={like}
                  likeList={memberList}
                  setLikeList={setMemberList}
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
      <td>zz</td>
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

export default AdminMember;
