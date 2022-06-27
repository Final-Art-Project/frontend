import './App.css';
import ImageSlider from './components/ImageSlider';
import {SliderData} from './components/SliderData';

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