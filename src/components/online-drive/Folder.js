import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";

export default function Folder({ folder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(folder.name);
  async function removeFolder(e) {
    await database.folders
      .where("name", "==", e.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  }
  async function duplicateFolder(e) {
    await database.folders.add(e);
  }

  function renameModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Button
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder }
        }}
        variant="outline-dark"
        className="w-100"
        as={Link}
      >
        <Container className="square  align-items-center justify-content-center">
          <FontAwesomeIcon icon={faFolder} style={{ height: "10vh" }} />
        </Container>

        <div class=" align-items-center justify-content-center">
          {folder.name}
        </div>
      </Button>
      <button onClick={() => removeFolder(folder)}>Delete</button>
      <button onClick={() => duplicateFolder(folder)}>Duplicate</button>
      <button onClick={() => renameModal()}>Rename</button>
      {/* Modal for Rename */}
      <Modal show={open} onHide={closeModal}>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Rename Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName()}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
