import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from '@/assets/wandeklogo.png'; // ใช้การ import ภาพ

const Logo = () => {
  return (
    <Button asChild variant="ghost">
      <Link to="/"> 
        <img src={logo} alt="Logo" className="Logo" style={{ width: '150px', height: '45px' }} />
      </Link>
    </Button>
  );
};

export default Logo;
