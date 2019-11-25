import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CakeList from './CakeList';
import config from './config';
import CakeComments from './CakeComments';
import AddCake from './AddCake';
import EditCake from './EditCake';
import './style/Cakes.css';

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

  addCake = (newCake) => {
    const newCakes = this.state.cakes.concat(
      { id: newCake.id, 
        name: newCake.name, 
        comment: newCake.comment, 
        imageUrl: newCake.imageUrl, 
        yumFactor: newCake.yumFactor
      }
    )
    this.setState({ cakes: newCakes });  
  }

  deleteCake = (cakeId) => {
    const newCakes = this.state.cakes.filter(cake => cake.id !== cakeId)
    this.setState({ cakes: newCakes });
  } 

  editCake = (updatedCake) => {
    this.setState({
      cakes: this.state.cakes.map(cake =>
        (cake.id !== updatedCake.id) ? cake : updatedCake
      )
    })
  }

  render() {   
    const { cakes } = this.state

    return ( 
      <div className='app'>
          <Route exact path='/' render={(routeProps) =>
            <CakeList 
              cakes={cakes} 
              routeProps={routeProps} 
              deleteCake={this.deleteCake} 
            />} 
          /> 

          <Route path='/:id' render={(routeProps) =>
            <CakeComments cakes={cakes} routeProps={routeProps} />} 
          />

          <Route path='/add-cake' render={(routeProps) =>
            <AddCake cakes={cakes} addCake={this.addCake} routeProps={routeProps} />}
          />

          <Route path='/edit-cake/:id' render={(routeProps) =>
            <EditCake cakes={cakes} editCake={this.editCake} routeProps={routeProps} />}
          />  
      </div>
     );
  }
}
 
export default App;
