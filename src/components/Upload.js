import { useState } from "react";
import axios from "axios";

import "./upload.css";

function Upload() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData.file:", formData.file);
    const sendData = new FormData();
    sendData.append("file", formData.file, formData.file.name);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/upload",
        data: sendData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Formular erfolgreich gesendet.");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="Upload">
        <h1>Datei Upload</h1>
        <form
          id="fileForm"
          name="fileForm"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <label htmlFor="file">Datei auswählen:</label>
          <input type="file" name="file" id="file" onChange={handleChange} />

          <button type="submit">Datei senden</button>
        </form>
      </main>
      <footer>formData: {JSON.stringify(formData)}</footer>
    </>
  );
}

export default Upload;
