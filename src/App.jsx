import { Component, useState } from 'react';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import './App.css';


class App extends Component {
    constructor() {
    super();
    this.state = { 
      input: '',
      imageUrl: '',
      boxes: []
     };
    }

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
  const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(this.state.input)}`;
    this.setState({ imageUrl: proxiedUrl });
        }

  render() {
  return (
      <div className="App">
        <ParticlesBg type="cobweb" num={125} bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition 
          imageUrl={this.state.imageUrl}
          boxes={this.state.boxes} 
          setBoxes={(boxes) => this.setState({ boxes })}  />

        </div>
    );
  }
}

export default App
