import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CakeList from './CakeList';

class App extends Component {
  state = { cakes: [] }

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
      </div>
     );
  }
}
 
export default App;
