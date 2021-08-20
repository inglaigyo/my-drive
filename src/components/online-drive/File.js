import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { database } from "../../firebase";
import React from "react";
import { Container } from "react-bootstrap";
import { ReactComponent as ReactLogo } from "../../assets/File-pdf.svg";
export default function File({ file }) {
  function removeFile(e) {
    database.files
      .where("name", "==", e.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  }
  function duplicateFile(e) {
    console.log(e);
    database.files.add(e);
  }
  return (
    <div className="square border border-primary">
      <a href={file.url} target="_blank">
        <Container>
          <ReactLogo style={{ Height: "10vh", Width: "10vh" }} />
        </Container>
        <div class=" align-items-center justify-content-center">
          {file.name}
        </div>
      </a>
      <button onClick={() => removeFile(file)}>Delete</button>
      <button onClick={() => duplicateFile(file)}>Duplicate</button>
    </div>
  );
}
