import React, { useState, useEffect } from "react";
import { getImages, searchImages } from "./api";
import { Header } from "./components/Header";
import Overlay from "./components/Overlay";
import { FaSearch } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";

import "./App.css";
//import ScrollButton from './components/ScrollButton';
//import { Content, } from './components/Styles';

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      console.log(responseJson);
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

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  window.addEventListener("scroll", toggleVisible);

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
      <button>
        <FaArrowUp
          className="scrollButton"
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
        />
      </button>
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
          placeholder="Enter for example a search value museum, animals, nature, beach, plants, food, landmarks, children, drawing, snow ..."
        ></input>
        <button className="search-but" type="submit">
          <FaSearch />
        </button>
        <button className="clear-but" type="button" onClick={resetForm}>
          Clear
        </button>
      </form>
      <h1>Welcome to the gallery of photos</h1>
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
          <button className="load-more" onClick={handleLoadMoreButtonClick}>
            Load More
          </button>
        )}
        {/* <button className="top-but">
          <FaArrowUp />
        </button> */}
      </div>
    </>
  );
};

export default App;
