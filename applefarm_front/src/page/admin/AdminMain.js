import AdminStat from "./AdminStat";
import AdminRefund from "./AdminRefund";
import { Route, Routes } from "react-router-dom";

const AdminMain = () => {
  return (
    <div className="inner-section-wrap">
      <Routes>
        <Route path="/stat" element={<AdminStat />} />
        <Route path="/refund" element={<AdminRefund />} />
      </Routes>
    </div>
  );
};

export default AdminMain;
