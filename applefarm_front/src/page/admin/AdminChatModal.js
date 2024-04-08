import { useEffect, useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";

const AdminChatModal = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const socketServer = backServer.replace("http://", "ws://");
  const [ws, sewWs] = useState({});
  const member = props.member;
  const chatModalBackGround = useRef();
  const setModalOpen = props.setModalOpen;

  useEffect(() => {
    const socket = new WebSocket(socketServer + "/allChat");
    sewWs(socket);
    console.log("소켓", socket);
    return () => {
      console.log("채팅페이지에서 나감");
      socket.close();
    };
  }, []);

  //모달밖 클릭시
  const modalBack = (e) => {
    if (e.target === chatModalBackGround.current) {
      setModalOpen(false);
    }
  };

  //웹소켓 연결이 완료되면 실행할 함수
  const startChat = () => {
    //json 형태로 아이디 전송 (세션<->닉네임 연결위함)
    const data = { type: "enter", memberId: member.memberId };
    ws.send(JSON.stringify(data));
  };

  //서버에서 데이터를 받으면 실행되는 함수
  const receiveMsg = (receiveData) => {
    const receiveStr = receiveData.data;
    //문자열을 다시 객체로 변환
    const chat = JSON.parse(receiveStr);
    console.log("받은 데이터", receiveStr);
    console.log("챗: ", chat);
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

  const sendMessage = () => {
    const data = {
      type: "chat",
      memberId: member.memberId,
      message: chatMessage,
    };
    console.log(JSON.stringify(data));
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
    <div
      className="chat-modal-current-wrap"
      ref={chatModalBackGround}
      onClick={modalBack}
    >
      <div className="chat-modal-content">
        <div className="chat-header">
          <div class="h2">ChatGPT</div>
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
            onClick={sendMessage}
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
            <span class="material-icons">account_circle</span>
            <span className="name">{chat.memberId}</span>
          </div>
          <div className="chatting-message">{chat.message}</div>
        </div>
      )}
    </>
  );
};

export default AdminChatModal;