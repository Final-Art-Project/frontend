import "./App.css";

function App() {
  return (
    <div className="App">


      <div className='introBox'>
      <img src="./logo.png" className="App-logo" alt="logo" />
		    <p className="introTxt">Hello, this is an Artists-Page.</p>
      </div>

      <div className='flipCardBoxBox'>
        
      <ImageSlider slides={SliderData} />

      </div>

    </div>
  );
}

export default App;