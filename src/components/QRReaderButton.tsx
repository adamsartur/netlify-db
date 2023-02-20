import { QrCode } from "phosphor-react";

interface QRProps {
  setIsQRVisible: Function;
  isQRVisible: boolean;
}

function QRReaderButton({ setIsQRVisible, isQRVisible }: QRProps) {
  return (
    <a
      className="qr-code"
      title="Read QR Code"
      onClick={() => {
        setIsQRVisible(true);
      }}
    >
      <QrCode />
    </a>
  );
}
export default QRReaderButton;
