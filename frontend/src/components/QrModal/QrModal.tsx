import Modal from "react-bootstrap/Modal";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import Button from "react-bootstrap/Button";


interface QrModalProps {
  show: boolean;
  hide: () => void;
  bookingNumber: string;
}

function downloadStringAsFile(data: string, filename: string) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = data;
  a.click();
}


export default function QrModal({ show, hide, bookingNumber }: QrModalProps) {
  // Add this to parent component where QrModal will be imported into
  //const [showQrViewer, setShowQrViewer] = useState<null | string>(null);
  //const handleShowQR = (bookingNumber: string) => {
  //  setShowQrViewer(bookingNumber);
  //};

  const svgRef = useRef<SVGSVGElement>(null);

  function downloadQrSVG() {
    const node = svgRef.current;
    if (node == null) {
      return;
    }
    const serializer = new XMLSerializer();
    const fileURI = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<?xml version="1.0" standalone="no"?>' + serializer.serializeToString(node));
    
    downloadStringAsFile(fileURI, 'qrcode-svg.svg');

  }
  return (
    <Modal
      show={show}
      onHide={hide}
      dialogClassName="qr-modal"
      contentClassName="qr-modal-content"
      backdropClassName="qr-modal-backdrop"
      aria-label="Qr-Code"
      centered
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title
          id="qr-viewer-modal"
          as="p"
          className="text-secondary"
        >
          <small>Bokningsnummer: </small> {bookingNumber}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QRCodeSVG
          ref={svgRef}
          value={bookingNumber}
          title={"qr kod visare"}
          size={225}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          imageSettings={{
            src: "/images/favicon-16x16.png",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            opacity: 1,
            excavate: true,
          }}
        />
        <Button variant="outline-secondary mt-5" onClick={downloadQrSVG}>Spara QR-kod</Button>
      </Modal.Body>
    </Modal>
  );
}


// In parent component use this to show QrModal with choosen bookingNumber
//<Button variant="outline-secondary" onClick={() => handleShowQR(bookingNumber)}>Qr Code viewer</Button>

// Add this to the parent component
//<QrModal show={showQrViewer ? true : false} hide={() => setShowQrViewer(null)} bookingNumber={bookingNumber} />