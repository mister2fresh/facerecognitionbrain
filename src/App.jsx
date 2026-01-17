import { Component, useState } from 'react';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Signin from './Components/Signin/Signin';
import './App.css';


class App extends Component {
    constructor() {
    super();
    this.state = { 
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
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

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

  render() {
  const  { isSignedIn, imageUrl, route, boxes} = this.state;
  return (
      <div className="App">
        <ParticlesBg type="cobweb" num={125} bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
          />
          <FaceRecognition 
          imageUrl={imageUrl}
          boxes={boxes} 
          setBoxes={(boxes) => this.setState({ boxes })} />
          </div>
         : (
          route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
         )
  }
          
       </div> 
    );
  }
  
}

export default App
