import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import logo from "@/assets/wandeklogo.png";
import ContactButton from "@/components/Footer/ContactButton";

import {
  Battery,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  MessageCircle
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Battery className="w-6 h-6 text-slate-300" />
              <Button variant="ghost" asChild className="p-0">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto"
                  />
                </Link>
              </Button>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              บริการชาร์จรถจักรยานยนต์ไฟฟ้าที่สะดวก รวดเร็ว ปลอดภัย
              ครอบคลุมทั่วประเทศ
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">ลิงก์ด่วน</h3>
            <nav className="flex flex-col gap-2">
              {['วิธีใช้งาน', 'ตำแหน่งตู้ชาร์จ', 'แพ็กเกจและราคา', 'สมัครสมาชิก', 'โปรโมชั่น'].map((item) => (
                <Button key={item} variant="link" className="h-auto p-0 text-slate-400 hover:text-white justify-start" asChild>
                  <a href="#">{item}</a>
                </Button>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">ช่วยเหลือ</h3>
            <nav className="flex flex-col gap-2">
              {['คำถามที่พบบ่อย', 'นโยบายความเป็นส่วนตัว', 'เงื่อนไขการใช้งาน', 'แจ้งปัญหาการใช้งาน', 'ติดต่อเรา'].map((item) => (
                <Button key={item} variant="link" className="h-auto p-0 text-slate-400 hover:text-white justify-start" asChild>
                  <a href="#">{item}</a>
                </Button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white">ติดต่อเรา</h3>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: '089-9613059' },
                  { icon: Mail, text: 'support@nkstec.ac.th' },
                  { icon: MapPin, text: '400 ถ. สวรรค์วิถี ตำบลปากน้ำโพ อำเภอเมืองนครสวรรค์ นครสวรรค์ 60000' },
                  { icon: MessageCircle, text: 'Line: @LormoonNotify' }
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-400">
                    <Icon className="w-5 h-5 text-white shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 bg-slate-800" />
         {/* เรียกใช้ ContactButton */}
              <div className="mt-8 ">
                <ContactButton />
              </div>
        <div className="text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} LORMOON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;