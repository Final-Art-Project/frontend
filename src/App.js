import React, { useState, useEffect } from "react";
import { getImages, searchImages } from "./api";
import { Header } from "./components/Header";
import Overlay from "./components/Overlay";
import { FaSearch } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import "./App.css";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    };

    fetchData();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const responseJson = await searchImages(searchValue, nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };

  const resetForm = async () => {
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);

    setSearchValue("");
  };

  const handleDelete = async (public_id) => {
    try {
      console.log("public_id:", public_id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete`, {
        data: {
          public_id: public_id,
        },
      });
      setImageList(imageList.filter((image) => image.public_id !== public_id));
      setOverlayVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Overlay
        visible={overlayVisible}
        image={selectedImage}
        onClose={() => {
          setOverlayVisible(false);
        }}
        onDelete={(public_id) => {
          handleDelete(public_id);
        }}
      />

      <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required="required"
          placeholder="Enter a search value..."
        ></input>
        <button type="submit">
          <FaSearch />
        </button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>
      <div className="image-grid">
        {imageList.map((image) => (
          <img
            key={image.public_id}
            onClick={() => {
              setSelectedImage(image);
              setOverlayVisible(true);
            }}
            src={image.url}
            alt={image.public_id}
          ></img>
        ))}
      </div>
      <div className="footer">
        {nextCursor && (
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        )}
        <button>
          <FaArrowUp />
        </button>
      </div>
    </>
  );
};

export default App;
