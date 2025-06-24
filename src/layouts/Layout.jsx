
import { Outlet } from "react-router";
import Navbar from "@/components/Navbar/Navbar";
import ChargingCard from "../components/charging/ChargingCard";
import QRCodeShop from "../components/Footer/Footer";


const Layout = () => {
  return (
    <div>
        <Navbar/>
      <Outlet /> {/* จำเป็นสำหรับการแสดงผลหน้า */}
       <ChargingCard/>
       <QRCodeShop/>
       
    </div>
  );
};

export default Layout;
