import Tab from "./Tab";
import axios from "axios";
import { useEffect, useState } from "react";

const RefundHistory = (props) => {
  const [product, setProduct] = useState({}); //상품테이블 데이터
  const [refund, setRefund] = useState({}); //환불테이블 데이터

  const member = props.member;
  const memberNo = member.memberNo;

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState(["진행중", "완료"]);

  useEffect(() => {
    axios
      .post(backServer + "/member/getProduct/" + memberNo)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setProduct(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });

    axios
      .post(backServer + "/member/getRefund/" + memberNo)
      .then((res) => {
        console.log(res.data);
        setRefund(res.data.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [memberNo, backServer]);

  return (
    <>
      <div>환불내역</div>

      <div>
        <Tab
          tabMenu={tabMenu}
          setTabMenu={setTabMenu}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === 0 ? "진행중" : "완료"}
      </div>
    </>
  );
};

export default RefundHistory;
