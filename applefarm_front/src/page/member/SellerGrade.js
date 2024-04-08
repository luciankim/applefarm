import "./member.css";

const SellerGrade = (props) => {
  const member = props.member;

  return (
    <>
      <div className="mypage-content-sellerGrade">
        <div className="sellerGrade-title">판매자 등급</div>

        <div className="sellerGrade-wrap">
          <div className="sellerGrade-box1">
            <div>현재등급</div>
            <div className="grade-data">{member.sellerGrade}</div>
          </div>
          <div className="sellerGrade-box2">
            <div>판매수수료(최대)</div>
            <div className="grade-data">6.0%</div>
          </div>
        </div>
        <div className="sellerGrade-info">
          <div className="grade-img-box">
            <img className="grade-img" src="../image/grade.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerGrade;
