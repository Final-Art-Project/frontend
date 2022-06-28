import { useState, useEffect } from "react";
import { getImages, searchImages } from "./api";
import { Header } from "./components/Header";
import { Link } from "react-router-dom";

import "./App.css";

import './App.css';
import ImageSlider from './components/ImageSlider';
import {SliderData} from './components/SliderData';

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  return (
    <>
      <Header />
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      ></nav>
      <Link to="upload">Upload</Link> |{" "}
      <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required="required"
          placeholder="Enter a search value..."
        ></input>
        <button type="submit">Search</button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>
      <div className="image-grid">
        {imageList.map((image) => (
          <img src={image.url} alt={image.public_id}></img>
        ))}
      </div>
      <div className="footer">
        {nextCursor && (
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        )}
      </div>
 

    <div className="App">


      <div className='introBox'>
      <img src="./logo.png" className="App-logo" alt="logo" />
		    <p className="introTxt">Hello, this is an Artists-Page.</p>
      </div>

      <div className='flipCardBoxBox'>
        
      <ImageSlider slides={SliderData} />

      </div>

    </div>
    </>
  );
}


