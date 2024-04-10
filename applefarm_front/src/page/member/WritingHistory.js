import axios from "axios";
import { useEffect, useState } from "react";

const WritingHistory = (props) => {
  //자유게시판(댓글있음), 1대1문의 게시판(댓글없음)

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const member = props.member;
  const memberNo = member.memberNo;
  const [board, setBoard] = useState({});

  //자유게시판

  useEffect(() => {
    axios
      .get(backServer + "/member/getBoardInfo/" + memberNo)
      .then((res) => {
        if (res.data.message === "success") {
          setBoard(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  //자유게시판 댓글

  return (
    <>
      <div>내가 쓴 글</div>
      <button></button>
    </>
  );
};

export default WritingHistory;
