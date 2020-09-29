import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import ReactPlayer from "react-player";
// import "bootstrap/dist/css/bootstrap.min.css";

function ModalComponent({ show }) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      {/* <button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </button> */}

      <Modal show={show}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <ReactPlayer
            width="480px"
            height="240px"
            controls
            url="https://indiascience.pc.cdn.bitgravity.com/transcoded_videos/5f55f923e11d070947b5a9de/1080/video.m3u8"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
