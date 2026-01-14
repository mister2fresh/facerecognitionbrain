import { Component, useState } from 'react';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import './App.css';

const returnClarifaiRequestOptions = (imageUrl) => {
      // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = '3340933bc0dc4796a84906a76b9b44d9';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';    
    const APP_ID = 'main';
    // Change these to whatever model and image input you want to use
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
      const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
}


class App extends Component {
  constructor(){
    super();
    this.state = { 
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(response => {
          console.log('hi', response)
          // if (response) {
          //   fetch('http://localhost:3000/image', {
          //     method: 'put',
          //     headers: {'Content-Type': 'application/json'},
          //     body: JSON.stringify({
          //       id: this.state.user.id
          //     })
          //   })
          //   .then(response => response.json())
          //   .then(count => {
          //     this.setState(Object.assign(this.state.user, { entries: count}))
            // })
          }
        // }
       );
      }    

// App.models.predict(
      //     Clarifai.face-detection,
      //     this.state.input)
      //   .then(
      //     function(response) {
      //       console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

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
        <FaceRecognition imageUrl={this.state.imageUrl} />

        </div>
    );
  }
}
export default App
