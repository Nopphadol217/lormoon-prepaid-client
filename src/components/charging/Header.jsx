import { useState } from "react";
import { 
  Upload,
  Clock,
  Building2,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Loader2,
  QrCode,
  Download,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Receipt
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Logo from "@/assets/wandeklogo.png";

function GuideContent({ step, onNext, onPrev, onClose, totalSteps }) {
  const guides = [
    {
      title: "เลือกแพ็คเกจ",
      description: "เลือกแพ็คเกจที่ต้องการจากตัวเลือกที่มีให้ (20, 50, หรือ 100 บาท) โดยกดที่ปุ่ม 'เริ่มต้นใช้งาน'"
    },
    {
      title: "การชำระเงิน",
      description: "หลังจากเลือกแพ็คเกจ ระบบจะแสดง QR Code สำหรับชำระเงินผ่าน Line หรือแอพธนาคาร เมื่อชำระเงินเสร็จให้บันทึกสลิปการโอนเงินไว้"
    },
    {
      title: "ตรวจสอบสลิป",
      description: "กดที่ปุ่ม 'ตรวจสอบสลิป' และอัพโหลดสลิปการโอนเงินที่ได้บันทึกไว้ ระบบจะทำการตรวจสอบความถูกต้อง"
    },
    {
      title: "รับ QR Code",
      description: "เมื่อตรวจสอบสลิปผ่านแล้ว กดปุ่ม 'รับ QR Code' เพื่อรับ QR Code สำหรับชาร์จรถ และสามารถบันทึก QR Code เก็บไว้ได้"
    }
  ];

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>คู่มือการใช้งาน ({step + 1}/{totalSteps})</DialogTitle>
        <DialogDescription>
          {guides[step].title}
        </DialogDescription>
      </DialogHeader>

      <div className="min-h-[100px] p-4 bg-slate-50 rounded-lg">
        {guides[step].description}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={step === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          ย้อนกลับ
        </Button>
        
        {step === totalSteps - 1 ? (
          <Button onClick={onClose}>
            <CheckCircle className="w-4 h-4 mr-2" />
            เสร็จสิ้น
          </Button>
        ) : (
          <Button onClick={onNext}>
            ถัดไป
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Header({ logo }) {
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const totalSteps = 4;

  const handleNext = () => {
    if (guideStep < totalSteps - 1) {
      setGuideStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (guideStep > 0) {
      setGuideStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setShowGuide(false);
    setGuideStep(0);
  };

  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-300 text-white py-20 bg-gradient-animated">
      <div className="max-w-7xl mx-auto px-4 text-center relative">
        {/* Guide Button */}
        <div className="absolute top-0 right-4">
          <Dialog open={showGuide} onOpenChange={setShowGuide}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/10 border-white hover:bg-white/20"
              >
                <Info className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <GuideContent
                step={guideStep}
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
                totalSteps={totalSteps}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-center items-center mb-6 space-x-4">
          <h1 className="text-3xl font-bold">
            ยินดีต้อนรับสู่เว็บขายบัตรชาร์จง่ายๆ{" "}
            <Button asChild variant="secondary" className="align-middle mt-2">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  className="Logo"
                  style={{ width: "150px", height: "45px" }}
                />
              </Link>
            </Button>
          </h1>
        </div>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          เลือกแพ็คเกจที่เหมาะกับคุณ และรับ QR Code สำหรับชำระเงินผ่าน Line ทันที
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-white text-blue-600 hover:bg-blue-50"
            onClick={() =>
              document
                .getElementById("plans")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <Zap className="w-4 h-4 mr-2" />
            เริ่มต้นใช้งาน
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={() =>
              document
                .getElementById("checkslip")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <Receipt className="w-4 h-4 mr-2" />
            ตรวจสอบสลิป
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Header ;