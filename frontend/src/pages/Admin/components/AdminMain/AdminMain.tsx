import QrModal from "../../../../components/QrModal/QrModal";
import  Button  from "react-bootstrap/Button";
import { useState } from "react";
export default function AdminMain() {
  const [showQrViewer, setShowQrViewer] = useState<null | string>(null);
  const handleShowQR = (bookingNumber: string) => {
    setShowQrViewer(bookingNumber)
  }
  const bookingNumber = "HLF143";
  return (
    <main>
      <h3 className="mt-5">Main</h3>
      <Button variant="outline-secondary" onClick={() => handleShowQR(bookingNumber)}>Qr Code viewer</Button>
      <QrModal show={showQrViewer ? true : false} hide={() => setShowQrViewer(null)} bookingNumber={bookingNumber} />
    </main>
  )
}