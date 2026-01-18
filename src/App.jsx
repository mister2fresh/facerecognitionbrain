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

const initialState = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        email: '',
        id: '',
        name: '',
        entries: 0,
        joined: ''
      }
     }

class App extends Component {
    constructor() {
    super();
    this.state = initialState;
    }

  loadUser = (data) => {
    this.setState({user: {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
  }})
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
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log)
        }

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(initialState)
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

  render() {
  const  { isSignedIn, imageUrl, route, boxes, user} = this.state;
  return (
      <div className="App">
        <ParticlesBg type="cobweb" num={125} bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
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
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
         )
  }
          
       </div> 
    );
  }
  
}

export default App
