import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { getFileSize } from "../../../../../utils/getFileSize";


interface ImageUploadProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
  fileList?: File[] | null;
  preview?: string | null;
  previewList?: string[] | null;
  label: string;
  desc: string;
  controlId: string;
  name: string;
  handleRemoveImage: () => void;
  handleRemoveFromList: (index: number) => void;
}
export default function ImageUpload({ handleImageChange, preview, file, label, desc, controlId, name, handleRemoveImage, fileList, previewList, handleRemoveFromList }: ImageUploadProps) {
  const [index, setIndex] = useState(0);
  const [remove, setRemove] = useState<number | null>(null);
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  }
  const handleRemove = (index: number) => {
      if (index === remove) {
        handleRemoveImage();
        setRemove(null);
      } else {
        setRemove(index);
      }
  }
  const handleRemoveFromPostersList = (index: number) => {
    if (remove === index) {
      handleRemoveFromList(index)
      setRemove(null);
    } else {
      setRemove(index);
    }
  }
  return (
    <Form.Group
      controlId={controlId}
      className="border border-secondary rounded p-3"
    >
      <Row>
        <Col>
          <Form.Label className="text-secondary fw-bold fs-4">
            {label}
          </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="d-flex flex-column justify-content-around"
        >
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {desc}
            </Col>
          </Row>
          {name !== "postersList" && !file && (
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  className="text-secondary border-0"
                  size="sm"
                  name={name}
                  onChange={handleImageChange}
                />
              </Col>
            </Row>
          )}
          {name === "postersList" && fileList && fileList.length === 0 && (
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  className="text-secondary border-0"
                  size="sm"
                  name={name}
                  onChange={handleImageChange}
                  multiple
                />
              </Col>
            </Row>
          )}

          {file && (
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {file && (
                  <Row>
                    <Col>
                      <Row>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <p>Filnamn: </p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <p>{file.name}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <p>Filstorlek: </p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <p>{getFileSize(file.size)}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          {preview && (
                            <Button
                              type="button"
                              variant={`${
                                remove ? "outline-danger" : "outline-secondary"
                              }`}
                              onClick={() => handleRemove(1)}
                            >
                              {remove ? "Är du säker" : "Ta bort bild"}
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          )}
          {previewList && previewList.length > 0 && (
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="d-flex flex-column justify-content-around gap-3">
                {previewList.map((_, fileButtonIndex) => (
                  <Row key={fileButtonIndex}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Button
                        type="button"
                        variant={`${remove === fileButtonIndex ? "outline-danger" : "outline-secondary"}`}
                        className="w-75"
                        onClick={() => handleRemoveFromPostersList(fileButtonIndex)}>
                        {remove === fileButtonIndex ? "Är du säker?" : `Ta bort bild ${fileButtonIndex + 1}`}
                        {/* Ta bort bild{` ${fileButtonIndex + 1}`} */}
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          )}
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          {preview && <Image src={preview} fluid thumbnail />}
          {fileList && fileList.length > 0 && previewList && (
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {fileList.map((file, fileIndex) => (
                <Carousel.Item
                  key={fileIndex}
                  className="filelist-carousel-item"
                >
                  <p>
                    {fileIndex + 1}. {file.name}, {getFileSize(file.size)}
                  </p>
                  <Image src={previewList[fileIndex]} fluid thumbnail />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
      </Row>
    </Form.Group>
  );
}