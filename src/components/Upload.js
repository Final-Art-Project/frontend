import "./upload.css";
import { useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { Image } from "cloudinary-react";

export default function Upload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageData, setImageData] = useState(null);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", selectedImages);
    formData.append("upload_preset", "Art-Project");

    const postImage = async () => {
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,

          formData
        );
        console.log(response);
        setImageData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    postImage();
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <h1 className="heading">Cloudinary Image Upload</h1>
        <article className="article">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setSelectedImages(e.target.files[0])}
            className="input"
          />
          <button onClick={uploadImage} className="button">
            Upload Image
          </button>
        </article>

        <article className="image-container">
          {imageData && (
            <Image
              cloudName="CLOUD_NAME"
              publicId={`https://res.cloudinary.com/CLOUD_NAME/image/upload/v1649427526/${imageData.public_id}`}
            />
          )}
        </article>
      </div>
    </>
  );
}
