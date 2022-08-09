import "./upload.css";
import { useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { FaUpload } from "react-icons/fa";
import { Image } from "cloudinary-react";

export default function Upload() {
  const [selectedImages, setSelectedImages] = useState(null);

  const [imageData, setImageData] = useState(null);
  const [tags, setTags] = useState("");

  const uploadImage = () => {
    const tagsArray = tags.split(",");
    const trimmedArray = tagsArray.map((tag) => {
      return tag.trim();
    });

    const formData = new FormData();
    formData.append("file", selectedImages);
    formData.append("upload_preset", "Art-Project");
    formData.append("tags", trimmedArray);

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
        <h1 className="heading">Upload Image </h1>
        <article className="article">
          <input
            type="file"
            name="file"
            id="file"
            placeholder="Upload an Image"
            onChange={(e) => setSelectedImages(e.target.files[0])}
            className="input"
          />
          {selectedImages && (
            <input
              className="input"
              placeholder="add a tags or description to the photo"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          )}

          <button
            onClick={uploadImage}
            className="button"
            disabled={selectedImages === null}
          >
            <FaUpload />
          </button>
        </article>

        <article className="image-container">
          {imageData && (
            <Image
              cloudName="CLOUD_NAME"
              publicId={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1649427526/${imageData.public_id}`}
            />
          )}
        </article>
      </div>
    </>
  );
}
