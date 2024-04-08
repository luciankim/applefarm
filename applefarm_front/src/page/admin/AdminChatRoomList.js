import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import "./admin.css";

const AdminChatRoomList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const member = props.member;
  const chatModalBackGround = useRef();
  const setModalOpen = props.setModalOpen;
  const chatAreaRef = useRef(null);
  const [chatRooms, setChatRooms] = useState([]); //채팅방 목록 저장할 상태 변수
  const imgSrc = process.env.PUBLIC_URL + "/image/apple.png";
  console.log("최초 접속 시 아이디 확인: ", member.memberId);
  useEffect(() => {
    //0. memberId로 채팅방 목록 불러오기
    //1. memberGrade가 1(사용자)인지 3(관리자)인지 확인
    //2. 채팅방 목록 불러오기
    //관리자: 1)목록O: li 리스트 나열(채팅방 연결=소켓준비), 2)목록x: 없습니다.
    //사용자: 1)목록O: li 리스트 나열(채팅방 연결=소켓준비), 2)목록x: 채팅버튼 추가(채팅방 연결=소켓준비)

    axios
      .get(backServer + "/admin/chatRoomList/" + member.memberId)
      .then((res) => {
        console.log("채팅방 목록 조회 결과: ", res.data.data);
        setChatRooms(res.data.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  //모달밖 클릭시
  const modalBack = (e) => {
    if (e.target === chatModalBackGround.current) {
      setModalOpen(false);
    }
  };

  return (
    <div className="chat-modal-current-wrap" onClick={modalBack}>
      <div className="chat-modal-content">
        {/* 채팅창 헤더 */}
        <div className="chat-header">
          <div className="chat-list">채팅</div>
        </div>
        {/* 채팅방 목록 출력 */}
        <div className="chat-room-list">
          <ul className="chat-list-ul">
            {chatRooms.map((room, index) => (
              <li key={"room" + index} className="chat-list-li">
                <div className="chat-list-div">
                  <div className="chat-list-body">
                    <img src={imgSrc} />
                    <div className="chat-title-content">
                      <p className="chat-list-title">{room.roomTitle}</p>
                      <p className="chat-list-content">내용</p>
                    </div>
                  </div>

                  <span className="chat-list-time">{room.roomCreateTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminChatRoomList;
