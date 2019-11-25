import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CakeList from './CakeList';
import config from './config';
import CakeComments from './CakeComments';

class App extends Component {
  state = { cakes: [] }

  componentDidMount() {
    fetch(`${config.url}/cakes`,  
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )        
    .then(resCakes => {
        if (!resCakes.ok) {
          return resCakes.json().then(err => Promise.reject(err))
        }
        return resCakes.json()
    })
    .then(cakes => {
        this.setState({ cakes: cakes });
    })
    .catch(err => console.log(err))
  }

  render() {   
    const { cakes } = this.state

    return ( 
      <div className='app'>
          <Route exact path='/' render={(routeProps) =>
            <CakeList 
              cakes={cakes} 
              routeProps={routeProps} 
            />} 
          /> 

          <Route path='/:id' render={(routeProps) =>
            <CakeComments cakes={cakes} routeProps={routeProps} />} 
          />
      </div>
     );
  }
}
 
export default App;
