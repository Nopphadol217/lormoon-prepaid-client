import { useState } from "react";
import {
  Upload,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Loader2,
  QrCode,
  Download,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function PaymentValidator() {
  const [slipOkData, setSlipOkData] = useState(null);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
    setError(null);
    setQrCode(null);
    setSlipOkData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQrCode(null);
    setSlipOkData(null);

    if (!files) {
      setError("กรุณาเลือกไฟล์สลิปการโอนเงิน");
      setLoading(false);
      return;
    }

    // สร้าง form data เพื่อส่งไฟล์ไปยัง API รวม /api/process
    const formData = new FormData();
    formData.append("slip", files);

    const API_PREFIX = import.meta.env.VITE_API_PREFIX;

    try {
      const res = await fetch(`${API_PREFIX}/api/checkslip_and_genqrcode`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // data จะประกอบด้วย slipData และ qrCode
      setSlipOkData(data.slipData.data);
      setQrCode(data.qrCode);
    } catch (error) {
      console.error("Error during processing: ", error);
      setError("เกิดข้อผิดพลาดในการตรวจสอบสลิปหรือสร้าง QR Code กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCode) return;

    // สร้าง link ชั่วคราวเพื่อดาวน์โหลด QR Code
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-code-${slipOkData?.amount || "unknown"}thb.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>ระบบชำระเงินและรับ QR Code</CardTitle>
        <CardDescription>
          อัพโหลดสลิปการโอนเงินเพื่อรับ QR Code สำหรับชาร์จรถ
          <div className="mt-2 text-sm font-medium text-blue-600">
            ยอดชำระที่รองรับ: 20, 50, 100 บาท
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="slip-upload"
            />
            <label htmlFor="slip-upload" className="cursor-pointer">
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <div className="text-sm text-gray-600">
                  {files ? (
                    <span className="text-blue-600 font-medium">
                      {files.name}
                    </span>
                  ) : (
                    <>
                      <span className="text-blue-600 font-medium">
                        คลิกเพื่อเลือก
                      </span>{" "}
                      หรือลากไฟล์มาวางที่นี่
                      <br />
                      <span className="text-xs text-gray-500">
                        รองรับไฟล์ภาพทุกประเภท
                      </span>
                    </>
                  )}
                </div>
              </div>
            </label>
          </div>

          {/* Preview Image */}
          {files && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(files)}
                alt="slip preview"
                className="max-h-64 rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={!files || loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังตรวจสอบ...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                ตรวจสอบสลิปและรับ QR Code
              </>
            )}
          </Button>
        </form>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Result Section */}
        {slipOkData && !error && (
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex justify-center">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full ${
                  slipOkData?.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {slipOkData?.success ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                {slipOkData?.success
                  ? "สลิปโอนเงินถูกต้อง"
                  : "สลิปโอนเงินไม่ถูกต้อง"}
              </div>
            </div>

            {/* Transaction Details */}
            <Card>
              <CardContent className="p-6 grid gap-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">จำนวนเงิน</div>
                    <div className="font-medium">
                      {slipOkData?.amount?.toLocaleString() || "-"} บาท
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">วันที่โอนเงิน</div>
                    <div className="font-medium">
                      {slipOkData?.transDate || "-"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">เวลาที่โอนเงิน</div>
                    <div className="font-medium">
                      {slipOkData?.transTime || "-"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Section */}
            {qrCode && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    <QrCode className="w-6 h-6 inline-block mr-2" />
                    QR Code สำหรับชาร์จรถ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center p-6">
                    <img
                      src={qrCode}
                      alt="QR Code for charging"
                      className="max-w-[200px]"
                    />
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleDownloadQR}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    บันทึก QR Code
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PaymentValidator;