import { BrowserRouter, Routes, Route } from "react-router";

import { Outlet } from "react-router";
import Home from "@/pages/Home";
import About from "@/pages/About"; // หรือเปลี่ยน path ให้ตรงกับโครงสร้างไฟล์ของคุณ
import Dashboard from "@/pages/admin/Dashboard"; // หรือเปลี่ยน path ให้ตรงกับโครงสร้างไฟล์ของคุณ\
import Manage from "@/pages/admin/Manage"; // หรือเปลี่ยน path ให้ตรงกับโครงสร้างไฟล์ของคุณ
import Layout from "@/layouts/Layout";
import Layoutadmin from "@/layouts/LayoutAdmin";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<Layout/>}>         
        <Route path="/" element={<Home/>} />
         <Route path="/pre-paid" element={<Home/>} />
          <Route path="about" element={<About/>} />
        </Route>

        {/* Private */}
        <Route path="admin" element={<Layoutadmin/>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path="manage" element={<Manage/>}></Route>
        </Route>

        <Route path="*" element={<h1>Page Not found404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
