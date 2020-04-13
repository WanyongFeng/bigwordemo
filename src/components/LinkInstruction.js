import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function LinkInstruction({ name, body}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="Button" onClick={handleShow}>
        {name}
      </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </>
  );
}

export default LinkInstruction;
