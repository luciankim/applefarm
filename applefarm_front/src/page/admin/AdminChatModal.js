import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";

const AdminChatModal = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const socketServer = backServer.replace("http://", "ws://");
  const [ws, sewWs] = useState({});
  const member = props.member;
  const room = props.room;

  useEffect(() => {
    const socket = new WebSocket(socketServer + "/allChat");
    sewWs(socket);

    //1. 채팅 내용 불러오기
    axios
      .get(backServer + "/admin/chatMessageInfo/" + room.roomNo)
      .then((res) => {
        console.log("채팅방 목록 조회 결과: ", res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      console.log("채팅페이지에서 나감");
      socket.close();
    };
  }, []);

  //웹소켓 연결이 완료되면 실행할 함수
  const startChat = () => {
    //json 형태로 아이디 전송 (세션<->닉네임 연결위함)
    const data = {
      type: "enter",
      memberId: member.memberId,
    };
    ws.send(JSON.stringify(data));
  };

  //서버에서 데이터를 받으면 실행되는 함수
  const receiveMsg = (receiveData) => {
    const receiveStr = receiveData.data;
    //문자열을 다시 객체로 변환
    const chat = JSON.parse(receiveStr);
    console.log("받은 데이터", receiveStr);
    setChatList([...chatList, chat]);
  };

  //웹소켓 연결이 종료되면 실행할 함수
  const endChat = () => {};

  //웹소켓 객체에 각 함수를 연결
  ws.onopen = startChat;
  ws.onmessage = receiveMsg;
  ws.onclose = endChat;

  const [chatList, setChatList] = useState([]); //채팅목록
  const [chatMessage, setChatMessage] = useState(""); //전송 메시지
  const [btnStatus, setBtnStatus] = useState(true);

  const inputChatMessage = (e) => {
    const checkValue = e.target.value.replaceAll("\n", "");
    if (chatMessage === "" && checkValue === "") {
      setBtnStatus(true);
      return;
    }
    setChatMessage(e.target.value);
    setBtnStatus(false);
  };

  const sendMessage = (room) => {
    const data = {
      type: "chat",
      memberId: member.memberId,
      message: chatMessage,
      roomNo: room.roomNo,
    };
    console.log("보낸메시지: ", JSON.stringify(data));
    ws.send(JSON.stringify(data));
    setChatMessage("");
    setBtnStatus(true);
  };

  const inputKeyboard = (e) => {
    if (e.keyCode === 13 && !e.shiftKey && chatMessage !== "") {
      sendMessage();
    }
  };
  const chatAreaRef = useRef(null);
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <div className="chat-modal-current-wrap">
      <div className="chat-modal-content">
        <div className="chat-header">
          <div className="h2">{room.roomTitle}</div>
        </div>

        <div className="chat-body">
          <div className="chat-message-area" ref={chatAreaRef}>
            {chatList.map((chat, index) => {
              return (
                <ChattingMessage
                  key={"chat-message" + index}
                  chat={chat}
                  memberId={member.memberId}
                />
              );
            })}
          </div>
        </div>

        <div className="chat-footer">
          <textarea
            className="chat-message"
            placeholder="Input message"
            value={chatMessage}
            onChange={inputChatMessage}
            onKeyUp={inputKeyboard}
          ></textarea>
          <button
            className="sendMessage"
            disabled={btnStatus}
            onClick={() => sendMessage(room)}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

const ChattingMessage = (props) => {
  const chat = props.chat;
  const memberId = props.memberId;

  return (
    <>
      {chat.type === "enter" ? (
        <p className="info">
          <span>{chat.memberId} 님이 입장하셨습니다.</span>
        </p>
      ) : chat.type === "out" ? (
        <p className="info">
          <span>{chat.memberId} 님이 나가셨습니다.</span>
        </p>
      ) : (
        <div
          className={chat.memberId === memberId ? "chat right" : "chat left"}
        >
          <div className="user">
            <span className="material-icons">account_circle</span>
            <span className="name">{chat.memberId}</span>
          </div>
          <div className="chatting-message">{chat.message}</div>
        </div>
      )}
    </>
  );
};

export default AdminChatModal;
