import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Receipt } from "lucide-react"; // หรือไอคอนที่ต้องการใช้งาน
import '../easyslip/checkslip.css'
import {
  QrCode,
  MessageCircle,
  Info,
  CheckCircle,
  X,
  Loader2,
  Battery,
  Zap,
  Timer,
  ArrowUp,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import logo from "@/assets/wandeklogo.png";
import qrCodeImage from "@/assets/QRcode.jpg";
import lineOa from "@/assets/S_gainfriends_2dbarcodes_GW.png"
import payment20 from "@/assets/20.png"
import payment50 from "@/assets/50.png"
import payment100 from "@/assets/100.png"
import P1 from "@/assets/P1.png"; // Import QR code image
import { Link } from "react-router-dom";
import ImageCarousel from "@/components/Slide-Swiper/SlidePrepaid";
import Checkslip from "../easyslip/Checkslip";
import Header from "./Header";

const QRCodeShop = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [orderId, setOrderId] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const chargingPlans = [
    {
      id: 1,
      duration: "1 ชั่วโมง",
      price: 20,
      description: "ชาร์จได้ 1 ชั่วโมง",
      type: "รายครั้ง",
      features: ["ใช้ได้ตลอด", "ไฟฟ้า: 1 หน่วย"],
      popular: false,
    },
    {
      id: 2,
      duration: "2 ชั่วโมง 30 นาที",
      price: 50,
      description: "สามารถชาร์จได้ 2 ชม. 30 น.",
      type: "รายครั้ง",
      features: ["ใช้ได้ตลอด", "ไฟฟ้า: 2 หน่วย"],
      popular: true,
    },
    {
      id: 3,
      duration: "5 ชั่วโมง",
      price: 100,
      description: "สามารถชาร์จได้ 5 ชม.",
      type: "รายวัน",
      features: ["ใช้ได้ตลอด", "ไฟฟ้า: 5 หน่วย"],
      popular: false,
    },
  ];

  // Function to generate Line Pay QR Code
  const generateLinePayQR20 = async (plan) => {
    setIsGenerating(true);
    try {
      // Simulate API call to generate Line Pay QR code
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            orderId: `ORDER${Math.random().toString(36).substr(2, 9)}`,
            qrCode: payment20, // Placeholder for actual QR code
          });
        }, 1500);
      });

      setOrderId(response.orderId);
      setPaymentStatus("pending");
    } catch (error) {
      setPaymentStatus("failed");
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to check payment status

  const handlePurchase = (plan) => {
    setSelectedPlan(plan);
    setShowConfirmation(true);
  };

  const confirmPurchase = async () => {
    setShowConfirmation(false);
    await generateLinePayQR(selectedPlan);
  };

  // Function to open Line
  const openLine = () => {
    window.open("https://line.me", "_blank");
  };

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <Header/>

      <section id="plans" className="py-20">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">แพ็คเกจชาร์จ</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        เลือกแพ็คเกจที่เหมาะกับการใช้งานของคุณ ชำระเงินง่ายๆ ผ่าน Line
      </p>
      <div className="flex justify-center">
        <ImageCarousel />
      </div>
    </div>

    {/* ปรับ Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {chargingPlans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative transition-all hover:shadow-lg ${
            selectedPlan?.id === plan.id ? "ring-2 ring-blue-500" : ""
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600">
              แนะนำ
            </Badge>
          )}
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  {plan.duration}
                </h3>
                <Badge variant="secondary">{plan.type}</Badge>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">฿{plan.price}</span>
                <p className="text-sm text-gray-500">รวม VAT</p>
              </div>
            </div>
            <div className="space-y-3 mb-6 flex-grow">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-auto"
              onClick={() => handlePurchase(plan)}
            >
              <QrCode className="w-4 h-4 mr-2" />
              เลือกแพ็คเกจนี้
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


       {/* New Check Slip Section */}
      <section id="checkslip" className="py-20 bg-gradient-animated">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              ตรวจสอบการชำระเงิน
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">ตรวจสอบสลิปการชำระเงิน</h2>
            <p className="text-gray-200 max-w-2xl mx-auto font-bold">
              ตรวจสอบสถานะการชำระเงินและรับรหัสยืนยันการชาร์จของคุณ
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Checkslip />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23000" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
                }}
              />
            </div>

            {/* Content */}
            <div className="text-center md:text-left z-10 flex-1">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                ต้องการความช่วยเหลือ?
              </h2>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl">
                ติดต่อเราโดยตรงผ่าน Line
                เพื่อรับคำแนะนำในการเลือกแพ็กเกจที่เหมาะกับคุณ
                พร้อมโปรโมชั่นพิเศษสำหรับลูกค้าที่ติดต่อผ่าน Line
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {/* แทน Button ด้วย <a> และแสดงภาพปุ่ม Line ในลักษณะของปุ่ม */}
                  <a
                    href="https://lin.ee/4mCvvw1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#00B900] text-white px-8 py-4 rounded-xl gap-3 transform transition-transform hover:scale-105 hover:bg-[#009900]"
                  >
          
                    <span>ติดต่อผ่าน Line</span>
                  </a>

                <div className="flex items-center gap-2 text-gray-500">
                  <Info className="w-5 h-5" />
                  <span>ตอบกลับภายใน 5 นาที</span>
                </div>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="relative z-10">
              <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src={lineOa}
                  alt="Line QR Code"
                  className="w-40 h-40 object-contain"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transform -rotate-3">
                  แสกนเพื่อแอดไลน์
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                บริการที่น่าเชื่อถือ
              </h3>
              <p className="text-gray-600">มีระบบ AI ในการตรวจจับขณะชาร์จ</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ชำระเงินปลอดภัย</h3>
              <p className="text-gray-600">
                รองรับการชำระเงินผ่าน Line และระบบชำระเงินชั้นนำ
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                บริการตลอด 24 ชั่วโมง
              </h3>
              <p className="text-gray-600">
                พร้อมให้บริการและช่วยเหลือคุณตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">ยืนยันการชำระเงิน</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmation(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">
                    แพ็คเกจที่เลือก: {selectedPlan.duration}
                  </p>
                  <p className="text-gray-600">ราคา: ฿{selectedPlan.price}</p>
                </div>
                <Alert>
                  <Info className="w-4 h-4" />
                  <AlertDescription>
                    กรุณาตรวจสอบแพ็คเกจที่เลือกก่อนชำระเงิน
                    เมื่อชำระเงินแล้วจะไม่สามารถขอคืนเงินได้
                  </AlertDescription>
                </Alert>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={confirmPurchase}>
                    ดำเนินการชำระเงิน
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowConfirmation(false)}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

{selectedPlan && !showConfirmation && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <Card className="max-w-md w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">ชำระเงินผ่าน Prompt pay</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedPlan(null);
              setPaymentStatus("pending");
              setOrderId(null);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {isGenerating ? (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <p>กำลังสร้าง QR Code...</p>
          </div>
        ) : paymentStatus === "success" ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">ชำระเงินสำเร็จ!</h4>
            <p className="text-gray-600 mb-4">
              รหัสการชาร์จถูกส่งไปยัง Line ของคุณแล้ว
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setSelectedPlan(null);
                setPaymentStatus("pending");
                setOrderId(null);
              }}
            >
              เสร็จสิ้น
            </Button>
          </div>
        ) : paymentStatus === "failed" ? (
          <div className="text-center py-8">
            <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">เกิดข้อผิดพลาด</h4>
            <p className="text-gray-600 mb-4">
              ไม่สามารถสร้าง QR Code ได้ กรุณาลองใหม่อีกครั้ง
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setPaymentStatus("pending");
                confirmPurchase();
              }}
            >
              ลองใหม่
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white p-8 rounded-lg mb-4">
              <img
                src={
                  selectedPlan?.id === 1
                    ? payment20
                    : selectedPlan?.id === 2
                    ? payment50
                    : selectedPlan?.id === 3
                    ? payment100
                    : qrCodeImage // รูป default
                }
                alt={`Line Pay QR Code for ${selectedPlan?.price} THB`}
                className="mx-auto w-48 h-48 object-contain"
              />
            </div>
            <Alert className="mb-4">
              <Info className="w-4 h-4" />
              <AlertDescription>
                สแกน QR Code เพื่อชำระเงินสำหรับแพ็คเกจ "{selectedPlan?.duration}"
                ราคา ฿{selectedPlan?.price}
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => setSelectedPlan(null)}
              >
                เสร็จสิ้น
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setPaymentStatus("pending")}
              >
                ยกเลิก
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  </div>
)}

      {/* New About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                ทำไมต้องเลือกใช้บริการของเรา?
              </h2>
              <p className="text-lg text-gray-600">
                เราให้บริการระบบชาร์จที่ทันสมัย ปลอดภัย และใช้งานง่าย
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Battery className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      ชาร์จได้ทุกที่ทุกเวลา
                    </h3>
                    <p className="text-gray-600">
                      เครื่องชาร์จของเรามีให้บริการครอบคลุมทั่วประเทศ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      ระบบชาร์จที่ปลอดภัย
                    </h3>
                    <p className="text-gray-600">
                      มาตรฐานการชาร์จระดับสากล พร้อมระบบป้องกันไฟกระชาก
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Timer className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      ควบคุมเวลาได้ด้วยตัวคุณ
                    </h3>
                    <p className="text-gray-600">
                      เลือกระยะเวลาการชาร์จได้ตามต้องการ ไม่มีค่าใช้จ่ายแอบแฝง
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      ระบบ AI ตรวจจับรถยนต์
                    </h3>
                    <p className="text-gray-600">
                      ระบบ AI
                      อัจฉริยะที่สามารถตรวจจับรถยนต์ขณะชาร์จเพื่อความปลอดภัยสูงสุด
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-6">ดูเพิ่มเติม</Button>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden">
                <img
                  src={P1} // Replace with your actual image
                  alt="Charging Station"
                  className="image-about object-cover w-full h-auto"
                />
              </div>
              {/* Floating stats card */}
              <Card className="absolute -bottom-7 -left-6 md:w-64">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">ประสิทธิภาพ</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          2-3 เท่า
                        </p>
                        <p className="text-sm text-gray-600">ชาร์จได้เร็ว</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">98%</p>
                        <p className="text-sm text-gray-600">ความพึงพอใจ</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Back-to-Top Button */}
      {showBackToTop && (
        <button
          className="fixed bottom-8 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default QRCodeShop;
