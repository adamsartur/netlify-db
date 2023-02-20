import { X } from "phosphor-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "preact/hooks";

interface QRProps {
  setIsQRVisible: Function;
  isQRVisible: boolean;
}

function QRModal({ setIsQRVisible, isQRVisible }: QRProps) {
  function onScanSuccess(decodedText: any, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  return (
    <div className={isQRVisible ? "overlay-modal" : "overlay-modal hidden"}>
      <div className="qr-code-modal">
        <div className="qr-code-wrapper">
          <a
            onClick={() => {
              setIsQRVisible(false);
            }}
            className="close-modal"
          >
            <X />
          </a>
          <h1>Read Code</h1>
          <div id="reader" width="600px"></div>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
export default QRModal;
