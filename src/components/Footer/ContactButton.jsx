import React, { useState } from "react";
import { Phone, Mail, MessageCircle, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import qrCodeImage from "@/assets/QRcode.jpg";
const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  const openMessenger = () => {
    window.open("https://www.facebook.com/profile.php?id=100025249931118", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* QR Code Alert Dialog */}
      <AlertDialog open={showQRCode} onOpenChange={setShowQRCode}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>แสกน QR Code เพื่อติดต่อ</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center">
              <img
                src={qrCodeImage}
                alt="Line QR Code"
                className="w-64 h-64 object-contain my-4"
              />
              <p className="text-center text-gray-600">
                แสกน QR Code เพื่อเพิ่มเพื่อนใน Line และติดต่อกับเรา
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowQRCode(false)}>
              ตกลง
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Main toggle button */}
      <button
        onClick={toggleButtons}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-200 hover:bg-gray-300 shadow-lg transform transition-all duration-300 ease-in-out"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <MessageCircle className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Contact buttons container */}
      <div
        className={`absolute bottom-20 right-0 flex flex-col gap-3 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Line Button */}
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => setShowQRCode(true)}
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm whitespace-nowrap">Add @LormoonPrepaid</span>
          </button>
          <button
            onClick={() => setShowQRCode(true)}
            className="w-12 h-12 flex items-center justify-center bg-[#00B900] rounded-full shadow-lg hover:bg-[#00a000] transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Messenger Button */}
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={openMessenger}
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm whitespace-nowrap">วิทยาลัยเทคนิคนครสวรรค์</span>
          </button>
          <button
            onClick={openMessenger}
            className="w-12 h-12 flex items-center justify-center bg-[#0084FF] rounded-full shadow-lg hover:bg-[#0074e0] transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Phone Button */}
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full">
            <span className="text-sm whitespace-nowrap">โทร 089-9613059</span>
          </div>
          <div className="w-12 h-12 flex items-center justify-center bg-[#0099FF] rounded-full shadow-lg">
            <Phone className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Email Button */}
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full">
            <span className="text-sm whitespace-nowrap">อีเมล Support@nkstec.ac.th</span>
          </div>
          <div className="w-12 h-12 flex items-center justify-center bg-[#FF6B00] rounded-full shadow-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactButton;